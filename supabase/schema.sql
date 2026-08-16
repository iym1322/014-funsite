-- ユーザー参加型機能(推し曲投稿・イベントレポート・投票)のDBスキーマ。
-- Supabaseダッシュボードの「SQL Editor」に貼り付けて実行する(再実行しても安全な
-- 冪等な内容になっている)。
-- 方針(CONTENTS_PLAN.md 5章): 即時公開・事後モデレーション。
-- anonキー(公開キー)には INSERT と SELECT のみ許可し、任意のUPDATE/DELETEは
-- 許可しない(荒らし投稿の削除はSupabaseダッシュボードから運営者が行う想定)。
-- 例外として、投稿者本人がowner_token_hash照合済みのRPC経由でのみ自分の投稿を
-- 削除できる(末尾「投稿の自己削除機能」セクション参照)。
--
-- 注意: プロジェクト作成時に「Automatically expose new tables」を無効にした場合、
-- RLSポリシーだけでなくテーブルへの基本的なGRANTも別途必要になる
-- (RLSは「行」単位の制御、GRANTは「テーブルにアクセスしてよいか」という前提の権限のため)。
-- このファイルの各セクション末尾で明示的に grant している。

-- =========================================
-- 推し曲コーナー投稿
-- =========================================
create table if not exists public.favorite_posts (
  id uuid primary key default gen_random_uuid(),
  track_slug text not null,
  author text not null check (char_length(author) between 1 and 50),
  body text not null check (char_length(body) between 1 and 500),
  likes integer not null default 0,
  owner_token_hash text,
  created_at timestamptz not null default now()
);

-- 既存テーブルへの追加(自分の投稿を削除できる機能。既存行はNULLのままとなり、
-- 元投稿者を特定できないため削除不可のままになる=想定どおりの挙動)。
alter table public.favorite_posts add column if not exists owner_token_hash text;

alter table public.favorite_posts enable row level security;

create policy "favorite_posts_select_all"
  on public.favorite_posts for select
  to anon
  using (true);

create policy "favorite_posts_insert_public"
  on public.favorite_posts for insert
  to anon
  with check (true);

grant usage on schema public to anon;
grant select, insert on public.favorite_posts to anon;

-- いいね数は anon に直接UPDATEさせず、+1だけを許可するRPC関数経由にする
-- (任意の値へのUPDATEや他人の投稿の改ざんを防ぐため)。
create or replace function public.increment_favorite_likes(post_id uuid)
returns void
language sql
security definer
set search_path = public
as $$
  update public.favorite_posts set likes = likes + 1 where id = post_id;
$$;

grant execute on function public.increment_favorite_likes(uuid) to anon;

-- いいね取り消し用(0未満にはならないようGREATESTでガード)。
create or replace function public.decrement_favorite_likes(post_id uuid)
returns void
language sql
security definer
set search_path = public
as $$
  update public.favorite_posts set likes = greatest(likes - 1, 0) where id = post_id;
$$;

grant execute on function public.decrement_favorite_likes(uuid) to anon;

-- =========================================
-- イベントレポート投稿
-- =========================================
create table if not exists public.live_reports (
  id uuid primary key default gen_random_uuid(),
  event_title text not null check (char_length(event_title) between 1 and 100),
  schedule_date date,
  venue text check (venue is null or char_length(venue) <= 100),
  author text not null check (char_length(author) between 1 and 50),
  body text not null check (char_length(body) between 1 and 800),
  image_urls jsonb not null default '[]'::jsonb,
  has_spoiler boolean not null default false,
  owner_token_hash text,
  created_at timestamptz not null default now()
);

alter table public.live_reports add column if not exists owner_token_hash text;
alter table public.live_reports add column if not exists has_spoiler boolean not null default false;

-- image_url(単一画像)からimage_urls(最大3枚のJSON配列)への移行。
-- 2回目以降の実行では image_urls が既に埋まっているため update 対象がなくなり、
-- image_url列も既に削除済みになるため、そのまま安全に再実行できる。
alter table public.live_reports add column if not exists image_urls jsonb not null default '[]'::jsonb;
do $$
begin
  if exists (select 1 from information_schema.columns where table_schema = 'public' and table_name = 'live_reports' and column_name = 'image_url') then
    update public.live_reports
    set image_urls = jsonb_build_array(image_url)
    where image_url is not null and image_urls = '[]'::jsonb;
    alter table public.live_reports drop column image_url;
  end if;
end $$;

-- 投稿写真用のストレージバケット(公開読み取り・anonアップロード可、5MB・画像形式限定)。
-- id/nameが既に存在する場合は設定(サイズ上限・許可MIME)だけ上書きする。
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('live-report-images', 'live-report-images', true, 5242880, array['image/jpeg','image/png','image/webp','image/gif'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "live_report_images_insert_public"
  on storage.objects for insert
  to anon
  with check (bucket_id = 'live-report-images');

create policy "live_report_images_select_public"
  on storage.objects for select
  to anon
  using (bucket_id = 'live-report-images');

alter table public.live_reports enable row level security;

create policy "live_reports_select_all"
  on public.live_reports for select
  to anon
  using (true);

create policy "live_reports_insert_public"
  on public.live_reports for insert
  to anon
  with check (true);

grant select, insert on public.live_reports to anon;

-- =========================================
-- 勝手にランキング 投票
-- =========================================
-- 1行 = 1票。question_id + voter_token + vote_month の組で一意にし、
-- 同じブラウザ(localStorageのトークン)からの同一お題への同月内の重複投票を防ぐ
-- (厳密な不正防止ではなく簡易的なもの)。vote_month はクライアントから渡さず、
-- DB側でinsert時点の年月を自動設定する(改ざん防止のため)。月が変われば
-- 別レコードとして投票できるようになり、投票権が毎月リセットされる。
create table if not exists public.ranking_votes (
  id uuid primary key default gen_random_uuid(),
  question_id text not null,
  track_slug text not null,
  voter_token text not null,
  vote_month text not null default to_char(now(), 'YYYY-MM'),
  created_at timestamptz not null default now(),
  unique (question_id, voter_token, vote_month)
);

alter table public.ranking_votes enable row level security;

create policy "ranking_votes_select_all"
  on public.ranking_votes for select
  to anon
  using (true);

create policy "ranking_votes_insert_public"
  on public.ranking_votes for insert
  to anon
  with check (true);

grant select, insert on public.ranking_votes to anon;

-- お題ごとの得票集計ビュー(勝手にランキングページから参照する)。
create or replace view public.ranking_results as
select question_id, track_slug, count(*)::int as votes
from public.ranking_votes
group by question_id, track_slug;

grant select on public.ranking_results to anon;

-- =========================================
-- オーイシ名場面投稿
-- =========================================
-- video_id/start_seconds は投稿されたYouTube URLをブラウザ側で解析した結果を保存する
-- (表示時に毎回URLを再パースしなくて済むようにするため)。source_url は元のURLをそのまま保持し、
-- 「YouTubeで見る」リンクに使う。
create table if not exists public.moments (
  id uuid primary key default gen_random_uuid(),
  channel text not null check (char_length(channel) between 1 and 50),
  video_title text not null check (char_length(video_title) between 1 and 100),
  video_id text not null check (char_length(video_id) = 11),
  start_seconds integer not null default 0 check (start_seconds >= 0),
  source_url text not null check (char_length(source_url) <= 300),
  comment text not null check (char_length(comment) between 1 and 300),
  author text not null check (char_length(author) between 1 and 50),
  likes integer not null default 0,
  owner_token_hash text,
  created_at timestamptz not null default now()
);

alter table public.moments add column if not exists owner_token_hash text;

alter table public.moments enable row level security;

create policy "moments_select_all"
  on public.moments for select
  to anon
  using (true);

create policy "moments_insert_public"
  on public.moments for insert
  to anon
  with check (true);

grant select, insert on public.moments to anon;

create or replace function public.increment_moment_likes(moment_id uuid)
returns void
language sql
security definer
set search_path = public
as $$
  update public.moments set likes = likes + 1 where id = moment_id;
$$;

grant execute on function public.increment_moment_likes(uuid) to anon;

create or replace function public.decrement_moment_likes(moment_id uuid)
returns void
language sql
security definer
set search_path = public
as $$
  update public.moments set likes = greatest(likes - 1, 0) where id = moment_id;
$$;

grant execute on function public.decrement_moment_likes(uuid) to anon;

-- =========================================
-- あなたのセットリスト投稿
-- =========================================
-- track_slugs は discography.ts の該当曲slugを並び順どおりに並べたJSON配列
-- (例: ["kimi-janakya-dame-mitai", "uni-verse", ...])。曲同士の関係は
-- 別テーブルに切り出さず、1カラムのJSON配列で持つ(セットリスト単位でしか
-- 参照しないため、これで十分シンプルに扱える)。
create table if not exists public.setlists (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 1 and 100),
  concept text not null check (char_length(concept) between 1 and 500),
  track_slugs jsonb not null check (
    jsonb_typeof(track_slugs) = 'array'
    and jsonb_array_length(track_slugs) between 3 and 20
  ),
  author text not null check (char_length(author) between 1 and 50),
  likes integer not null default 0,
  owner_token_hash text,
  created_at timestamptz not null default now()
);

alter table public.setlists add column if not exists owner_token_hash text;

alter table public.setlists enable row level security;

create policy "setlists_select_all"
  on public.setlists for select
  to anon
  using (true);

create policy "setlists_insert_public"
  on public.setlists for insert
  to anon
  with check (true);

grant select, insert on public.setlists to anon;

create or replace function public.increment_setlist_likes(setlist_id uuid)
returns void
language sql
security definer
set search_path = public
as $$
  update public.setlists set likes = likes + 1 where id = setlist_id;
$$;

grant execute on function public.increment_setlist_likes(uuid) to anon;

create or replace function public.decrement_setlist_likes(setlist_id uuid)
returns void
language sql
security definer
set search_path = public
as $$
  update public.setlists set likes = greatest(likes - 1, 0) where id = setlist_id;
$$;

grant execute on function public.decrement_setlist_likes(uuid) to anon;

-- =========================================
-- オーイシ検定 正答率集計
-- =========================================
-- 質問データ自体はsrc/data/quiz.tsの静的データで管理し、ここでは質問id(text)ごとの
-- 累計解答数・正解数だけを持つ。正答率から動的に難易度(初級/中級/上級)を算出する
-- ロジックはクライアント側(quiz.astro)にあり、サンプル数が少ない質問はどの難易度
-- でも出題対象になる(集計テーブル側では特に区別しない)。
create table if not exists public.quiz_stats (
  question_id text primary key,
  correct_count integer not null default 0,
  total_count integer not null default 0
);

alter table public.quiz_stats enable row level security;

create policy "quiz_stats_select_all"
  on public.quiz_stats for select
  to anon
  using (true);

grant select on public.quiz_stats to anon;

-- 直接のINSERT/UPDATEはanonに許可せず、+1集計だけを行うRPC経由にする
-- (任意の値へのUPDATEや不正な集計操作を防ぐため)。
create or replace function public.record_quiz_answer(q_id text, was_correct boolean)
returns void
language sql
security definer
set search_path = public
as $$
  insert into public.quiz_stats (question_id, correct_count, total_count)
  values (q_id, case when was_correct then 1 else 0 end, 1)
  on conflict (question_id) do update set
    correct_count = public.quiz_stats.correct_count + case when was_correct then 1 else 0 end,
    total_count = public.quiz_stats.total_count + 1;
$$;

grant execute on function public.record_quiz_answer(text, boolean) to anon;

-- =========================================
-- オーイシ検定 投稿問題
-- =========================================
-- ファンが自作した四択問題を投稿できるコーナー。他の投稿コーナーと同じ即時公開・
-- 事後モデレーション方針だが、こちらはクイズの「正解」という事実性を扱うため、
-- 「運営による事実確認は行っていない」旨をページ上に明記した上で、src/data/quiz.ts
-- の検定本編(正答率集計・難易度判定の対象)とは別区画として表示する
-- (誤った投稿がそのまま検定本編の統計や難易度判定に混入しないようにするため)。
create table if not exists public.quiz_submissions (
  id uuid primary key default gen_random_uuid(),
  category text not null check (char_length(category) between 1 and 30),
  question text not null check (char_length(question) between 1 and 200),
  choices jsonb not null check (
    jsonb_typeof(choices) = 'array'
    and jsonb_array_length(choices) = 4
  ),
  answer_index integer not null check (answer_index between 0 and 3),
  explanation text not null check (char_length(explanation) between 1 and 400),
  author text not null check (char_length(author) between 1 and 50),
  owner_token_hash text,
  created_at timestamptz not null default now()
);

alter table public.quiz_submissions enable row level security;

create policy "quiz_submissions_select_all"
  on public.quiz_submissions for select
  to anon
  using (true);

create policy "quiz_submissions_insert_public"
  on public.quiz_submissions for insert
  to anon
  with check (true);

grant select, insert on public.quiz_submissions to anon;

-- =========================================
-- 投稿の自己削除機能
-- =========================================
-- ログイン機能が無いため、投稿時にブラウザ側で生成したランダムなトークンの
-- SHA-256ハッシュ(hex文字列)をowner_token_hashに保存する。削除リクエストでは
-- 生トークンを受け取り、ここで同じ方式でハッシュ化して照合する
-- (生トークンはDBに保存されないため、テーブルの中身が漏れても悪用できない)。
-- owner_token_hashがNULLの行(トークン導入前の既存投稿)は誰も削除できない。

create or replace function public.delete_favorite_post(post_id uuid, token text)
returns void
language sql
security definer
set search_path = public, extensions
as $$
  delete from public.favorite_posts
  where id = post_id
    and owner_token_hash is not null
    and owner_token_hash = encode(digest(token, 'sha256'), 'hex');
$$;

grant execute on function public.delete_favorite_post(uuid, text) to anon;

create or replace function public.delete_live_report(report_id uuid, token text)
returns void
language sql
security definer
set search_path = public, extensions
as $$
  delete from public.live_reports
  where id = report_id
    and owner_token_hash is not null
    and owner_token_hash = encode(digest(token, 'sha256'), 'hex');
$$;

grant execute on function public.delete_live_report(uuid, text) to anon;

create or replace function public.delete_moment(moment_id uuid, token text)
returns void
language sql
security definer
set search_path = public, extensions
as $$
  delete from public.moments
  where id = moment_id
    and owner_token_hash is not null
    and owner_token_hash = encode(digest(token, 'sha256'), 'hex');
$$;

grant execute on function public.delete_moment(uuid, text) to anon;

create or replace function public.delete_setlist(setlist_id uuid, token text)
returns void
language sql
security definer
set search_path = public, extensions
as $$
  delete from public.setlists
  where id = setlist_id
    and owner_token_hash is not null
    and owner_token_hash = encode(digest(token, 'sha256'), 'hex');
$$;

grant execute on function public.delete_setlist(uuid, text) to anon;

create or replace function public.delete_quiz_submission(submission_id uuid, token text)
returns void
language sql
security definer
set search_path = public, extensions
as $$
  delete from public.quiz_submissions
  where id = submission_id
    and owner_token_hash is not null
    and owner_token_hash = encode(digest(token, 'sha256'), 'hex');
$$;

grant execute on function public.delete_quiz_submission(uuid, text) to anon;
