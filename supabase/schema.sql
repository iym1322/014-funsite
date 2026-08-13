-- ユーザー参加型機能(推し曲投稿・イベントレポート・投票)のDBスキーマ。
-- Supabaseダッシュボードの「SQL Editor」に貼り付けて実行する。
-- 方針(CONTENTS_PLAN.md 5章): 即時公開・事後モデレーション。
-- anonキー(公開キー)には INSERT と SELECT のみ許可し、UPDATE/DELETEは許可しない
-- (荒らし投稿の削除はSupabaseダッシュボードから運営者が行う想定)。
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
  created_at timestamptz not null default now()
);

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
  created_at timestamptz not null default now()
);

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
-- 1行 = 1票。question_id + voter_token の組で一意にし、
-- 同じブラウザ(localStorageのトークン)からの同一お題への重複投票を防ぐ
-- (厳密な不正防止ではなく簡易的なもの)。
create table if not exists public.ranking_votes (
  id uuid primary key default gen_random_uuid(),
  question_id text not null,
  track_slug text not null,
  voter_token text not null,
  created_at timestamptz not null default now(),
  unique (question_id, voter_token)
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
  created_at timestamptz not null default now()
);

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
