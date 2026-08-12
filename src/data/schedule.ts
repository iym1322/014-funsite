// カレンダーページ用のスケジュールデータ(CONTENTS_PLAN.md 2-5)。
// ディスコグラフィーのリリース日に加え、ライブ・イベント出演など discography.ts に
// 含まれない予定もここでまとめて管理する(discography.tsとは別ファイルにして独立管理)。
// まずは2026年8月分のみ、公式サイト・公式SNS等の公開情報をもとに掲載している。

export type ScheduleEvent = {
  date: string; // "YYYY-MM-DD"
  title: string;
  type: "release" | "live" | "event";
  note?: string;
  href?: string; // 関連するディスコグラフィーページ等があればリンク
};

export const schedule: ScheduleEvent[] = [
  {
    date: "2026-08-02",
    title: "「嗚呼、素晴らしき日常」配信リリース",
    type: "release",
    href: "/works/aa-subarashiki-nichijou",
  },
  {
    date: "2026-08-06",
    title: "「仮歌Ⅲ」配信リリース",
    type: "release",
    href: "/works/kagauta-3",
  },
  {
    date: "2026-08-10",
    title: "音楽フェスティバル出演",
    type: "live",
    note: "国営ひたち海浜公園",
  },
  {
    date: "2026-08-20",
    title: "「仮歌Ⅲ」発売記念オンラインサイン会",
    type: "event",
  },
  {
    date: "2026-08-26",
    title: "「仮歌Ⅲ」CDリリース",
    type: "release",
    href: "/works/kagauta-3",
  },
  {
    date: "2026-08-30",
    title: "「仮歌Ⅲ」発売記念フリーライブ",
    type: "live",
    note: "神奈川",
  },
];
