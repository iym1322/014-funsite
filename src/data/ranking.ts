// 勝手にランキング用データ(CONTENTS_PLAN.md 2-6「楽曲統計・人気投票」の具体化)。
// お題ごとの「候補曲」の定義だけをここで管理する(運営が決める静的な情報)。
// 実際の得票数はSupabase(ranking_votesテーブル/ranking_resultsビュー)から
// ブラウザ側で取得し、この候補リストとマージして表示する。
export type RankingChoice = {
  trackSlug: string; // discography.ts の該当曲slug
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
      { trackSlug: "uni-verse-first-take" },
      { trackSlug: "gambling-hall" },
      { trackSlug: "koi-wa-explosion" },
      { trackSlug: "aoi-housougeki" },
    ],
  },
  {
    id: "memorable",
    question: "一番思い出に残った曲は？",
    choices: [
      { trackSlug: "kimi-janakya-dame-mitai" },
      { trackSlug: "otomodachi-film" },
      { trackSlug: "sea-of-wonderland" },
      { trackSlug: "no-7" },
    ],
  },
  {
    id: "karaoke",
    question: "カラオケで歌うなら？",
    choices: [
      { trackSlug: "kagome-kagome" },
      { trackSlug: "ningen" },
      { trackSlug: "otomodachi-film" },
      { trackSlug: "kimi-janakya-dame-mitai" },
    ],
  },
];
