// 勝手にランキング用データ(CONTENTS_PLAN.md 2-6「楽曲統計・人気投票」の具体化)。
// お題ごとの「候補曲」の定義だけをここで管理する(運営が決める静的な情報)。
// 実際の得票数はSupabase(ranking_votesテーブル/ranking_resultsビュー)から
// ブラウザ側で取得し、この候補リストとマージして表示する。
import { tracks } from "./discography";

export type RankingChoice = {
  trackSlug: string; // discography.ts の該当曲slug
};

export type RankingQuestion = {
  id: string;
  question: string;
  // "all-singles" を指定すると、候補曲を個別に列挙せずシングル全曲を対象にできる
  // (resolveRankingChoices で実際の候補リストに解決する)。
  choices: RankingChoice[] | "all-singles";
};

// choices が "all-singles" の場合はシングル全曲(slugを持つもの)を候補として解決する。
export function resolveRankingChoices(question: RankingQuestion): RankingChoice[] {
  if (question.choices === "all-singles") {
    return tracks
      .filter((t) => t.slug && t.type === "シングル")
      .map((t) => ({ trackSlug: t.slug as string }));
  }
  return question.choices;
}

export const rankingQuestions: RankingQuestion[] = [
  {
    id: "favorite",
    question: "一番好きな楽曲は？",
    choices: "all-singles",
  },
  {
    id: "coolest",
    question: "一番かっこいい曲は？",
    choices: "all-singles",
  },
  {
    id: "memorable",
    question: "一番思い出に残った曲は？",
    choices: "all-singles",
  },
  {
    id: "karaoke",
    question: "カラオケで歌うなら？",
    choices: "all-singles",
  },
  {
    id: "tearjerker",
    question: "一番泣ける曲は？",
    choices: "all-singles",
  },
  {
    id: "hype",
    question: "一番テンションが上がる曲は？",
    choices: "all-singles",
  },
  {
    id: "recommend",
    question: "はじめての人にすすめるなら？",
    choices: "all-singles",
  },
  {
    id: "live",
    question: "ライブで一番盛り上がる曲は？",
    choices: "all-singles",
  },
  {
    id: "bgm",
    question: "作業用BGMにするなら？",
    choices: "all-singles",
  },
];
