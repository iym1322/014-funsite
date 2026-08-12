// 推し曲コーナー用データ(CONTENTS_PLAN.md 2-3)。
// 現時点では投稿・評価の保存先(バックエンド)が無いため、サンプル投稿のみを
// isSample:true で管理している。本番投稿機能を実装したら、この配列を
// DBやAPIからの取得に置き換える想定。
import { tracks } from "./discography";

export type FavoritePost = {
  id: string;
  trackSlug: string; // discography.ts の該当曲slug
  author: string;
  body: string;
  likes: number;
  isSample?: boolean;
};

export const favoritePosts: FavoritePost[] = [
  {
    id: "sample-1",
    trackSlug: "uni-verse-first-take",
    author: "運営(サンプル)",
    body: "壮大なサビに向かっていく展開が好きです。THE FIRST TAKE版は生演奏ならではの緊張感があって、原曲とはまた違う魅力があります。",
    likes: 12,
    isSample: true,
  },
  {
    id: "sample-2",
    trackSlug: "kagome-kagome",
    author: "運営(サンプル)",
    body: "和のテイストとロックサウンドの組み合わせが新鮮。MVの妖怪モチーフの演出も含めて楽しめる一曲です。",
    likes: 8,
    isSample: true,
  },
  {
    id: "sample-3",
    trackSlug: "kimi-janakya-dame-mitai",
    author: "運営(サンプル)",
    body: "オーイシマサヨシ名義の原点。初めて聴いたときの疾走感を今でも覚えています。",
    likes: 20,
    isSample: true,
  },
];

export function trackFor(slug: string) {
  return tracks.find((t) => t.slug === slug);
}
