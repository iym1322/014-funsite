// 勝手にランキング用データ(CONTENTS_PLAN.md 2-6「楽曲統計・人気投票」の具体化)。
// 運営が用意したお題ごとに、訪問者が候補曲へ投票してランキングを見られるようにしたい機能。
// 投稿・投票の保存先(バックエンド)がまだ無いため、得票数はすべてサンプル値。
// 本番投票機能を実装したら、この配列をDB/APIからの集計結果に置き換える想定。
export type RankingChoice = {
  trackSlug: string; // discography.ts の該当曲slug
  votes: number; // サンプル得票数
};

export type RankingQuestion = {
  id: string;
  question: string;
  choices: RankingChoice[];
};

export const rankingQuestions: RankingQuestion[] = [
  {
    id: "coolest",
    question: "一番かっこいい曲は？",
    choices: [
      { trackSlug: "uni-verse-first-take", votes: 34 },
      { trackSlug: "gambling-hall", votes: 27 },
      { trackSlug: "koi-wa-explosion", votes: 19 },
      { trackSlug: "aoi-housougeki", votes: 12 },
    ],
  },
  {
    id: "memorable",
    question: "一番思い出に残った曲は？",
    choices: [
      { trackSlug: "kimi-janakya-dame-mitai", votes: 41 },
      { trackSlug: "otomodachi-film", votes: 22 },
      { trackSlug: "sea-of-wonderland", votes: 15 },
      { trackSlug: "no-7", votes: 9 },
    ],
  },
  {
    id: "karaoke",
    question: "カラオケで歌うなら？",
    choices: [
      { trackSlug: "kagome-kagome", votes: 30 },
      { trackSlug: "ningen", votes: 24 },
      { trackSlug: "otomodachi-film", votes: 18 },
      { trackSlug: "kimi-janakya-dame-mitai", votes: 17 },
    ],
  },
];
