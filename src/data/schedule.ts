// カレンダーページ用のスケジュールデータ(CONTENTS_PLAN.md 2-5)。
// 公式サイトのSCHEDULE（LIVE/EVENT）とDISCOGRAPHYをもとに、
// 2026年のライブ・イベント・主要リリースを掲載する。
// レギュラー番組は件数が多いため対象外。追加・変更時は公式情報を優先する。

export type ScheduleEvent = {
  date: string; // "YYYY-MM-DD"
  title: string;
  type: "release" | "live" | "event";
  note?: string;
  href?: string; // サイト内の関連ページ
  sourceUrl?: string; // 公式情報
};

const officialLiveSchedule = "https://www.014014.jp/schedule/live";

export const schedule: ScheduleEvent[] = [
  { date: "2026-01-10", title: "Sound Schedule LIVE 2026 -New Year Edition-", type: "live", note: "心斎橋BIGCAT", sourceUrl: officialLiveSchedule },
  { date: "2026-01-11", title: "「ニンゲン」デジタルリリース", type: "release", href: "/works/ningen", sourceUrl: "https://www.014014.jp/discography/7309" },
  { date: "2026-01-17", title: "Sound Schedule LIVE 2026 -New Year Edition-", type: "live", note: "渋谷duo MUSIC EXCHANGE", sourceUrl: officialLiveSchedule },
  { date: "2026-02-01", title: "リスアニ！LIVE 2026", type: "live", sourceUrl: officialLiveSchedule },
  { date: "2026-02-13", title: "WstudioRED 10th Anniversary「坊っちゃんと坊っちゃん」", type: "live", sourceUrl: officialLiveSchedule },
  { date: "2026-02-15", title: "堂島孝平 活動30周年大感謝祭", type: "live", sourceUrl: officialLiveSchedule },
  { date: "2026-02-18", title: "大石昌良×川崎鷹也", type: "live", sourceUrl: officialLiveSchedule },
  { date: "2026-02-20", title: "「ニンゲン」発売記念オンラインサイン会", type: "event", sourceUrl: officialLiveSchedule },
  { date: "2026-02-22", title: "山内“masshoi”優 Tribute Live 2026", type: "live", sourceUrl: officialLiveSchedule },
  { date: "2026-02-25", title: "「ニンゲン」CDリリース", type: "release", href: "/works/ningen", sourceUrl: "https://www.014014.jp/discography/7309" },
  { date: "2026-03-01", title: "「ニンゲン」発売記念フリーライブ", type: "event", note: "神奈川", sourceUrl: officialLiveSchedule },
  { date: "2026-03-07", title: "ANIMAX MUSIX 2026 OSAKA supported by Lemino", type: "live", sourceUrl: officialLiveSchedule },
  { date: "2026-03-08", title: "「ニンゲン」発売記念フリーライブ", type: "event", note: "アリオ八尾", sourceUrl: officialLiveSchedule },
  { date: "2026-03-20", title: "「オーイシSSA」発売記念オンラインサイン会", type: "event", sourceUrl: officialLiveSchedule },
  { date: "2026-03-25", title: "「オーイシSSA」Blu-ray／DVDリリース", type: "release", href: "/works/oishi-ssa", sourceUrl: "https://www.014014.jp/news/7400" },
  { date: "2026-03-25", title: "「ONENESS - From THE FIRST TAKE」リリース", type: "release", href: "/works/oneness-first-take" },
  { date: "2026-03-29", title: "「押尾コータローの押しても弾いてもスペシャル！」公開録音", type: "event", sourceUrl: officialLiveSchedule },
  { date: "2026-04-04", title: "「オーイシSSA」発売記念リリースイベント", type: "event", note: "東京", sourceUrl: officialLiveSchedule },
  { date: "2026-04-11", title: "「オーイシSSA」発売記念リリースイベント", type: "event", note: "大阪", sourceUrl: officialLiveSchedule },
  { date: "2026-04-23", title: "「ポケモンオールスターズ1025 (213/1025)」リリース", type: "release", href: "/works/pokemon-all-stars-1025" },
  { date: "2026-04-26", title: "「ニンゲン」発売記念フリーライブ", type: "event", note: "愛知", sourceUrl: officialLiveSchedule },
  { date: "2026-05-16", title: "マチ★アソビ SPECIAL LIVE", type: "live", sourceUrl: officialLiveSchedule },
  { date: "2026-05-20", title: "オーイシマサヨシ×鈴木愛理のでしょフェス!!2026", type: "live", note: "有明", sourceUrl: officialLiveSchedule },
  { date: "2026-05-28", title: "「君は恋人」発売記念オンラインサイン会", type: "event", sourceUrl: officialLiveSchedule },
  { date: "2026-06-03", title: "「君は恋人」リリース", type: "release", href: "/works/kimi-wa-koibito" },
  { date: "2026-06-09", title: "リスアニ！LIVE on TOKYO ANIME MUSIC HIGHLIGHTS", type: "live", sourceUrl: officialLiveSchedule },
  { date: "2026-06-13", title: "「君は恋人」発売記念フリーライブ＆特典会", type: "event", note: "セブンパークアリオ柏", sourceUrl: officialLiveSchedule },
  { date: "2026-06-20", title: "鈴フェス Vol.3", type: "live", sourceUrl: officialLiveSchedule },
  { date: "2026-07-03", title: "BLUE ENCOUNT 2MAN TOUR 2026", type: "live", sourceUrl: officialLiveSchedule },
  { date: "2026-07-04", title: "SOUND CONNECTION -Acoustic Sessions-", type: "live", sourceUrl: officialLiveSchedule },
  { date: "2026-07-12", title: "Animelo Summer Live 2026 -Messenger-", type: "live", sourceUrl: officialLiveSchedule },
  { date: "2026-07-12", title: "「ハイメンテナンスガール」リリース", type: "release", href: "/works/high-maintenance-girl" },
  { date: "2026-07-18", title: "「君は恋人」発売記念フリーライブ", type: "event", note: "高知", sourceUrl: officialLiveSchedule },
  { date: "2026-08-10", title: "LuckyFes’26", type: "live", note: "国営ひたち海浜公園 WING STAGE", sourceUrl: officialLiveSchedule },
  { date: "2026-08-20", title: "「仮歌Ⅲ」発売記念オンラインサイン会", type: "event", sourceUrl: officialLiveSchedule },
  { date: "2026-08-26", title: "「仮歌Ⅲ」CD・配信リリース", type: "release", href: "/works/kagauta-3" },
  { date: "2026-09-06", title: "AZUR LANE MUSI9 FES. SPECIAL MUSI9 LIVE", type: "live", sourceUrl: officialLiveSchedule },
  { date: "2026-09-09", title: "「嗚呼、素晴らしき日常」CD・配信リリース", type: "release", note: "大石昌良名義", href: "/works/aa-subarashiki-nichijou" },
  { date: "2026-09-22", title: "オーイシ武道館 Vol.3", type: "live", note: "日本武道館", sourceUrl: "https://www.014014.jp/schedules/7265" },
  { date: "2026-09-23", title: "大石武道館", type: "live", note: "日本武道館", sourceUrl: officialLiveSchedule },
  { date: "2026-09-26", title: "OxT ダイヤのA actⅡ -SS- The Talk & Live", type: "live", sourceUrl: officialLiveSchedule },
  { date: "2026-10-03", title: "Sound Schedule Live Tour “PLACE 2026”", type: "live", note: "心斎橋BIGCAT", sourceUrl: officialLiveSchedule },
  { date: "2026-10-04", title: "Sound Schedule Live Tour “PLACE 2026”", type: "live", note: "名古屋Electric Lady Land", sourceUrl: officialLiveSchedule },
  { date: "2026-10-10", title: "Sound Schedule Live Tour “PLACE 2026”", type: "live", note: "ヒューリックホール東京", sourceUrl: officialLiveSchedule },
  { date: "2026-10-11", title: "高槻魂!!2026", type: "live", sourceUrl: officialLiveSchedule },
  { date: "2026-10-17", title: "IPU・環太平洋大学「環太祭2026」", type: "live", sourceUrl: "https://www.014014.jp/news/7669" },
  { date: "2026-10-18", title: "DIALOGUE＋WITH vol.8 －オーイシマサヨシ－", type: "live", sourceUrl: officialLiveSchedule },
  { date: "2026-11-21", title: "ANIMAX MUSIX 2026 supported by Lemino", type: "live", sourceUrl: officialLiveSchedule },
].sort((a, b) => a.date.localeCompare(b.date));
