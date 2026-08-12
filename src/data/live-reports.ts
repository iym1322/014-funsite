// イベントレポート用データ(CONTENTS_PLAN.md 2-4)。
// favorites.ts と同様、投稿の保存先(バックエンド)が無いためサンプル投稿のみを
// isSample:true で管理している。scheduleDate が一致する予定があれば
// カレンダーページと相互リンクする。
export type LiveReport = {
  id: string;
  eventTitle: string;
  scheduleDate?: string; // schedule.ts の date と一致すればカレンダーと連携表示
  venue?: string;
  author: string;
  body: string;
  isSample?: boolean;
};

export const liveReports: LiveReport[] = [
  {
    id: "sample-1",
    eventTitle: "オーイシ武道館 Vol.2",
    venue: "日本武道館",
    author: "運営(サンプル)",
    body: "初めての武道館参戦から一年、規模も演出もパワーアップしていて圧倒されました。アンコールの「ドラゴンエネルギー」で客席が一体になった瞬間が忘れられません。",
    isSample: true,
  },
  {
    id: "sample-2",
    eventTitle: "「仮歌Ⅲ」発売記念フリーライブ",
    scheduleDate: "2026-08-30",
    venue: "神奈川",
    author: "運営(サンプル)",
    body: "無料とは思えないボリュームのセットリストでした。新譜の楽曲を先行披露してくれたのも嬉しかったです。",
    isSample: true,
  },
];
