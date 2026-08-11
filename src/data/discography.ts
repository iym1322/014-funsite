// ディスコグラフィーの全曲データ(CONTENTS_PLAN.md 2-2「データの持ち方」方針に基づく単一データソース)。
// works.astro はこのファイルを読み込んで一覧表示・並べ替え・フィルターを行う。
// youtube/appleMusic/spotify は確認できたものだけ設定し、未確認のものは undefined のままにする
// (実在しないURLを書かないため)。sortDate は並べ替え用に日付が不明な部分を補って正規化したもの。

export type Track = {
  title: string;
  group: "Sound Schedule" | "大石昌良" | "オーイシマサヨシ" | "OxT" | "楽曲提供";
  type: "アルバム" | "シングル" | "映像" | "提供曲";
  date: string; // 表示用(判明している精度のまま。例: "2014", "2014.08", "2014.08.27")
  sortDate: string; // 並べ替え用に YYYY-MM-DD へ正規化(不明な月日は 01 で補完)
  tieIn?: string; // タイアップ・補足情報
  subject?: string; // 提供曲の場合の提供先アーティスト・作品名
  role?: string; // 提供曲の場合の関与(作詞/作曲/編曲など)
  note?: string;
  caution?: boolean; // 出典間で表記が揺れる/裏取り不十分な項目
  youtube?: string;
  appleMusic?: string;
  spotify?: string;
};

const toSortDate = (date: string): string => {
  const parts = date.split(".");
  const y = parts[0]?.padEnd(4, "0") ?? "0000";
  const m = (parts[1] ?? "01").padStart(2, "0");
  const d = (parts[2] ?? "01").padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const raw: Omit<Track, "sortDate">[] = [
  // --- Sound Schedule ---
  { group: "Sound Schedule", type: "アルバム", date: "2000.11", title: "ここからはじまるストーリー", note: "インディーズ" },
  { group: "Sound Schedule", type: "アルバム", date: "2002.07", title: "イマココニアルモノ" },
  { group: "Sound Schedule", type: "アルバム", date: "2003.10", title: "456" },
  { group: "Sound Schedule", type: "アルバム", date: "2005.03", title: "ビオトープ" },
  { group: "Sound Schedule", type: "アルバム", date: "2006.02", title: "甘い夜", note: "iTunes Store限定配信" },
  { group: "Sound Schedule", type: "アルバム", date: "2006.09", title: "THE COMPLETE SS", note: "ベストアルバム" },
  { group: "Sound Schedule", type: "アルバム", date: "2011.09", title: "Place" },
  { group: "Sound Schedule", type: "アルバム", date: "2012.09", title: "FUTURE" },
  { group: "Sound Schedule", type: "アルバム", date: "2014.09", title: "LIVE", note: "ミニアルバム" },
  { group: "Sound Schedule", type: "アルバム", date: "2019.03", title: "Sound Schedule ALL TIME BEST", note: "ベストアルバム" },
  { group: "Sound Schedule", type: "シングル", date: "2001.07", title: "コモリウタ", note: "タワーレコード限定カセット" },
  { group: "Sound Schedule", type: "シングル", date: "2001.09", title: "吠える犬と君", tieIn: "「アッコとマチャミの新型テレビ」エンディングテーマ" },
  { group: "Sound Schedule", type: "シングル", date: "2001.11", title: "君という花", tieIn: "「JNNスポーツ&ニュース」テーマ曲" },
  { group: "Sound Schedule", type: "シングル", date: "2002.04", title: "幼なじみ", tieIn: "「COUNT DOWN TV」エンディング" },
  { group: "Sound Schedule", type: "シングル", date: "2002.12", title: "ピーターパン・シンドローム", tieIn: "「AX MUSIC-TV」テーマ曲" },
  { group: "Sound Schedule", type: "シングル", date: "2003.04", title: "ことばさがし", tieIn: "「saku saku」エンディング" },
  { group: "Sound Schedule", type: "シングル", date: "2003.07", title: "さらばピニャコラーダ", tieIn: "「おかしや?さんま!」エンディング" },
  { group: "Sound Schedule", type: "シングル", date: "2004.06", title: "スペシャルナンバー", tieIn: "「たけしの誰でもピカソ」エンディング" },
  { group: "Sound Schedule", type: "シングル", date: "2005.01", title: "アンサー", tieIn: "NHK-BS2「週刊なびTV」エンディング" },
  { group: "Sound Schedule", type: "シングル", date: "2016.09", title: "TIME MACHINE", caution: true },
  { group: "Sound Schedule", type: "映像", date: "2005.08", title: "SS FILMS 〜8 Clips of Singles〜" },
  { group: "Sound Schedule", type: "映像", date: "2006.02", title: "SS LIVES 〜Live Tour \"you can't beat that.\"〜" },
  { group: "Sound Schedule", type: "映像", date: "2020.03", title: "Sound Schedule Live Tour \"PLACE2019\" LIQUIDROOM" },

  // --- 大石昌良(ソロ) ---
  { group: "大石昌良", type: "アルバム", date: "2008.11", title: "あの街この街" },
  { group: "大石昌良", type: "アルバム", date: "2009.11", title: "G.D. アトラクション" },
  { group: "大石昌良", type: "アルバム", date: "2012.01", title: "31マイスクリーム" },
  { group: "大石昌良", type: "アルバム", date: "2013.02", title: "マジカルミュージックツアー" },
  { group: "大石昌良", type: "アルバム", date: "2015.12", title: "大石昌良の弾き語りラボ" },
  { group: "大石昌良", type: "アルバム", date: "2016.07", title: "君に聞かせる物語" },
  { group: "大石昌良", type: "シングル", date: "2008.06", title: "ほのかてらす", tieIn: "『神さまぁ〜ず』エンディングテーマ" },
  { group: "大石昌良", type: "シングル", date: "2008.09", title: "うしろのしょうめん" },
  { group: "大石昌良", type: "シングル", date: "2009.06", title: "ラブ", tieIn: "『クメピポ!』エンディングテーマ" },
  { group: "大石昌良", type: "シングル", date: "2009.10", title: "幻想アンダーグラウンド" },
  { group: "大石昌良", type: "シングル", date: "2010.12", title: "ダイヤモンド" },
  { group: "大石昌良", type: "シングル", date: "2013.03", title: "MAGICAL ACOUSTIC TOUR", caution: true },
  { group: "大石昌良", type: "シングル", date: "2013.12", title: "PHASE ONE" },
  { group: "大石昌良", type: "シングル", date: "2018.03", title: "パラレルワールド" },
  { group: "大石昌良", type: "シングル", date: "2018.11", title: "ボーダーライン" },
  { group: "大石昌良", type: "映像", date: "2010.03", title: "G.D.アトラクション(映像盤)" },
  { group: "大石昌良", type: "映像", date: "2013.09", title: "MAGICAL MUSIC TOUR THE LIVE @ SHIBUYA" },
  { group: "大石昌良", type: "映像", date: "2016.04", title: "大石昌良の弾き語りラボツアー2015 東京公演" },
  { group: "大石昌良", type: "映像", date: "2016.09", title: "耳の聞こえなくなった恋人とそのうたうたい" },
  { group: "大石昌良", type: "映像", date: "2019.05", title: "大石昌良の弾き語りラボ〜10th Anniversary \"One Man\" Show〜" },

  // --- オーイシマサヨシ ---
  { group: "オーイシマサヨシ", type: "アルバム", date: "2017.07", title: "仮歌", note: "カバーアルバム" },
  { group: "オーイシマサヨシ", type: "アルバム", date: "2019.06", title: "仮歌II", note: "カバーアルバム" },
  { group: "オーイシマサヨシ", type: "アルバム", date: "2021.08", title: "エンターテイナー" },
  { group: "オーイシマサヨシ", type: "アルバム", date: "2024.02", title: "ユニバース" },
  { group: "オーイシマサヨシ", type: "アルバム", date: "2026.08", title: "仮歌Ⅲ", note: "カバーアルバム(想定)", caution: true },
  { group: "オーイシマサヨシ", type: "シングル", date: "2014.08", title: "君じゃなきゃダメみたい", tieIn: "『月刊少女野崎くん』オープニングテーマ" },
  { group: "オーイシマサヨシ", type: "シングル", date: "2018.05", title: "オトモダチフィルム", tieIn: "『多田くんは恋をしない』オープニングテーマ" },
  { group: "オーイシマサヨシ", type: "シングル", date: "2018.07", title: "Hands", tieIn: "『ウルトラマンR/B』主題歌" },
  { group: "オーイシマサヨシ", type: "シングル", date: "2018.08", title: "ドラゴンエネルギー", tieIn: "オーイシマサヨシ×加藤純一名義。ネット番組テーマ曲" },
  { group: "オーイシマサヨシ", type: "シングル", date: "2019.04", title: "沼", tieIn: "『臨死‼江古田ちゃん』エンディングテーマ" },
  { group: "オーイシマサヨシ", type: "シングル", date: "2019.08", title: "楽園都市", tieIn: "『コップクラフト』オープニングテーマ" },
  { group: "オーイシマサヨシ", type: "シングル", date: "2019.11", title: "ボルテシモ", caution: true },
  { group: "オーイシマサヨシ", type: "シングル", date: "2020.02", title: "No.7", tieIn: "『地縛少年花子くん』オープニングテーマ", caution: true },
  { group: "オーイシマサヨシ", type: "シングル", date: "2020.06", title: "世界が君を必要とする時が来たんだ/英雄の歌", tieIn: "前者は『トミカ絆合体 アースグランナー』オープニングテーマ、後者は劇場版『モンスターストライク』主題歌" },
  { group: "オーイシマサヨシ", type: "シングル", date: "2020.07", title: "キンカンのうた2020", caution: true },
  { group: "オーイシマサヨシ", type: "シングル", date: "2021.02", title: "神或アルゴリズム", tieIn: "feat.りりあ。", caution: true },
  { group: "オーイシマサヨシ", type: "シングル", date: "2021.04", title: "インパーフェクト", tieIn: "『SSSS.DYNAZENON』オープニングテーマ" },
  { group: "オーイシマサヨシ", type: "シングル", date: "2021.04", title: "ロールプレイング", tieIn: "『ドラゴン、家を買う。』オープニングテーマ" },
  { group: "オーイシマサヨシ", type: "シングル", date: "2022.06", title: "恋はエクスプロージョン", tieIn: "『恋は世界征服のあとで』オープニングテーマ(feat.田村ゆかり)" },
  { group: "オーイシマサヨシ", type: "シングル", date: "2022.09", title: "碧い砲撃" },
  { group: "オーイシマサヨシ", type: "シングル", date: "2023.03", title: "ギフト", tieIn: "『お隣の天使様にいつの間にか駄目人間にされていた件』オープニングテーマ" },
  { group: "オーイシマサヨシ", type: "シングル", date: "2023.05", title: "死んだ!", tieIn: "『勇者が死んだ!』オープニングテーマ" },
  { group: "オーイシマサヨシ", type: "シングル", date: "2023.09", title: "黄金航路" },
  { group: "オーイシマサヨシ", type: "シングル", date: "2023.11", title: "好きになっちゃダメな人", tieIn: "『お嬢と番犬くん』オープニングテーマ" },
  { group: "オーイシマサヨシ", type: "シングル", date: "2024.02", title: "なまらめんこいギャル", tieIn: "『道産子ギャルはなまらめんこい』オープニングテーマ" },
  { group: "オーイシマサヨシ", type: "シングル", date: "2024.04", title: "デュエルしようぜ！" },
  { group: "オーイシマサヨシ", type: "シングル", date: "2024.08", title: "あとの祭り" },
  { group: "オーイシマサヨシ", type: "シングル", date: "2024.09", title: "Sea of Wonderland" },
  { group: "オーイシマサヨシ", type: "シングル", date: "2024.11", title: "ギャンブリングホール", tieIn: "『凍牌』オープニングテーマ" },
  { group: "オーイシマサヨシ", type: "シングル", date: "2025.01", title: "主人公になろう！", tieIn: "feat.鈴木愛理" },
  { group: "オーイシマサヨシ", type: "シングル", date: "2025.01", title: "L'oN" },
  { group: "オーイシマサヨシ", type: "シングル", date: "2025.03", title: "uni-verse – From THE FIRST TAKE", note: "THE FIRST TAKE配信" },
  { group: "オーイシマサヨシ", type: "シングル", date: "2025.03", title: "君じゃなきゃダメみたい – From THE FIRST TAKE", note: "THE FIRST TAKE配信" },
  { group: "オーイシマサヨシ", type: "シングル", date: "2025.07", title: "かごめかごめ" },
  { group: "オーイシマサヨシ", type: "シングル", date: "2025.07", title: "ふたりキャンプ", tieIn: "feat.SPECIAL OTHERS" },
  { group: "オーイシマサヨシ", type: "シングル", date: "2026.02", title: "ニンゲン" },
  { group: "オーイシマサヨシ", type: "シングル", date: "2026.04", title: "ポケモンオールスターズ1025", note: "213/1025" },
  { group: "オーイシマサヨシ", type: "シングル", date: "2026.06", title: "君は恋人" },
  { group: "オーイシマサヨシ", type: "シングル", date: "2026.07", title: "ハイメンテナンスガール" },
  { group: "オーイシマサヨシ", type: "シングル", date: "2026.08", title: "嗚呼、素晴らしき日常" },
  { group: "オーイシマサヨシ", type: "映像", date: "2017.12", title: "仮歌ツアー" },
  { group: "オーイシマサヨシ", type: "映像", date: "2019.11", title: "仮歌ツアー2019" },
  { group: "オーイシマサヨシ", type: "映像", date: "2022.03", title: "オーイシマサヨシ ワンマンライブ「エンターテイナー」" },
  { group: "オーイシマサヨシ", type: "映像", date: "2024.08", title: "オーイシ武道館 〜オーイシマサヨシ ワンマンライブ at 日本武道館〜" },
  { group: "オーイシマサヨシ", type: "映像", date: "2025.03", title: "オーイシSSA 〜オーイシマサヨシ ワンマンライブ at さいたまスーパーアリーナ〜", caution: true },
  { group: "オーイシマサヨシ", type: "映像", date: "2025.08", title: "オーイシ武道館 Vol.2 〜オーイシマサヨシ ワンマンライブ at 日本武道館〜", caution: true },

  // --- OxT ---
  { group: "OxT", type: "アルバム", date: "2016.03", title: "OxT COMPLETE SONGS \"ACE OF DIAMOND\"", note: "初期シングル集" },
  { group: "OxT", type: "アルバム", date: "2018.09", title: "Hello New World", note: "1stアルバム" },
  { group: "OxT", type: "アルバム", date: "2020.09", title: "REUNION", note: "2ndアルバム" },
  { group: "OxT", type: "シングル", date: "2013.10", title: "Go EXCEED!!", tieIn: "『ダイヤのA』主題歌" },
  { group: "OxT", type: "シングル", date: "2014", title: "Perfect HERO" },
  { group: "OxT", type: "シングル", date: "2015.05", title: "KIMERO!!" },
  { group: "OxT", type: "シングル", date: "2015.08", title: "Grateful Story", note: "10日間限定配信" },
  { group: "OxT", type: "シングル", date: "2015.08", title: "Clattanoia", tieIn: "『オーバーロード』オープニングテーマ" },
  { group: "OxT", type: "シングル", date: "2015.11", title: "BLOOM OF YOUTH", tieIn: "『ダイヤのA -SECOND SEASON-』エンディングテーマ" },
  { group: "OxT", type: "シングル", date: "2016.02", title: "STRIDER'S HIGH", tieIn: "『プリンス・オブ・ストライド オルタネイティブ』オープニングテーマ" },
  { group: "OxT", type: "シングル", date: "2017.01", title: "Be The Best! Be The Blue!/Tears of a Genius", caution: true },
  { group: "OxT", type: "シングル", date: "2017.01", title: "One Hand Message", caution: true },
  { group: "OxT", type: "シングル", date: "2018.01", title: "Number One", caution: true },
  { group: "OxT", type: "シングル", date: "2018.01", title: "GO CRY GO", caution: true },
  { group: "OxT", type: "シングル", date: "2018.08", title: "Silent Solitude", caution: true },
  { group: "OxT", type: "シングル", date: "2018.11", title: "UNION", tieIn: "『SSSS.GRIDMAN』オープニングテーマ" },
  { group: "OxT", type: "シングル", date: "2019.04", title: "ゴールデンアフタースクール", tieIn: "『ダイヤのA act II』エンディングテーマ" },
  { group: "OxT", type: "シングル", date: "2020.02", title: "Everlasting Dream", caution: true },
  { group: "OxT", type: "シングル", date: "2022.07", title: "HOLLOW HUNGER", caution: true },
  { group: "OxT", type: "シングル", date: "2022.10", title: "HIGHEST", caution: true },
  { group: "OxT", type: "シングル", date: "2023.10", title: "grayscale dominator", note: "配信限定" },
  { group: "OxT", type: "シングル", date: "2024.09", title: "WHEELER-DEALER", note: "配信限定" },
  { group: "OxT", type: "映像", date: "2019.03", title: "UNION MUSIC VIDEO/Making of UNION" },

  // --- 楽曲提供(他アーティスト) ---
  { group: "楽曲提供", type: "提供曲", date: "", title: "ブラッドタイプ☆ハートビート", subject: "アース・スター ドリーム", role: "作詞・作曲・編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "かかった魔法はアマノジャク", subject: "愛美", role: "作詞・作曲・編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "愛 for you!", subject: "i☆Ris", role: "作曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "わやわやわー!", subject: "亜咲花", role: "作詞・作曲・編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "ハッピーエンドプリンセス", subject: "上坂すみれ", role: "作詞・作曲・編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "私と、わたし", subject: "上田桃夏", role: "編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "モラトリアムダンスフロア", subject: "内田真礼", role: "作詞・作曲・編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "君のヒロインでいるために", subject: "内田真礼", role: "作詞・作曲・編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "BIG LOVE", subject: "内田真礼×内田雄馬", role: "作曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "ARK", subject: "浦島坂田船", role: "作詞・作曲・編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "シンデレラステップ", subject: "浦島坂田船", role: "作詞・作曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "名探偵キミに告ぐ", subject: "えなこ", role: "作詞・作曲・編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "シンガロン進化論", subject: "大橋彩香", role: "作詞・作曲・編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "リングオブドランカー", subject: "柿原徹也", role: "作詞・作曲・編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "トーキョーラビリンス", subject: "CUBERS", role: "作詞・作曲・編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "reborn", subject: "工藤圭一", role: "プロデュース・コーラス" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "ルーキー", subject: "工藤圭一", role: "プロデュース・コーラス" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "バトン", subject: "KEISUKE", role: "作詞・作曲・編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "ベイビーミュージックライダー", subject: "Gero", role: "作詞・作曲・編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "一期一会", subject: "koume", role: "作曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "フィッシュストーリー", subject: "斉藤壮馬", role: "作詞・作曲・編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "無限のトライ", subject: "阪本奨悟", role: "編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "守りたい、その笑顔", subject: "佐久間大介(Snow Man)", role: "作詞・作曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "turn on a radio", subject: "鈴村健一", role: "作曲・編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "最強の推し!", subject: "鈴木愛理", role: "作詞・作曲・編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "一生☆キミ推し", subject: "鈴木愛理", role: "作詞・作曲・編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "Nice to Me CHU!!!", subject: "鈴木このみ", role: "作詞・作曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "たとえ世界がそっぽ向いても", subject: "鈴木雅之", role: "作詞・作曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "ゼブラワールド", subject: "ZeBRA☆STAR", role: "作詞・作曲・編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "あしたてんきになあれ", subject: "Daisy×Daisy", role: "作詞・作曲・編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "とおりゃんせ", subject: "東山奈央", role: "作詞・作曲・編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "酸素", subject: "TRUE", role: "作曲・編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "スーパーヒーロー", subject: "となりの坂田。", role: "作詞・作曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "おんなじ拳", subject: "流れ星", role: "編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "ヒーローインポッシボー", subject: "花江夏樹", role: "作詞・作曲・編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "トビウオ", subject: "花れん", role: "作詞・作曲・編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "チョコレート革命", subject: "みみめめMIMI", role: "編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "チャンス!", subject: "三森すずこ", role: "作曲・編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "未来ノート", subject: "May'n", role: "作詞・作曲・編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "あはっててっぺんっ", subject: "May'n", role: "作詞・作曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "歌う魚", subject: "メロディーキッチン", role: "編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "きらきら", subject: "メロディーキッチン", role: "編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "花束", subject: "メロディーキッチン", role: "編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "不可侵領域デストロイヤー", subject: "りぶ", role: "作詞・作曲・編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "永遠ループ", subject: "和島あみ", role: "作詞" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "モノクロテリトリー", subject: "和島あみ", role: "作詞" },

  // --- 楽曲提供(アニメ・ゲーム・舞台) ---
  { group: "楽曲提供", type: "提供曲", date: "", title: "サヨナラから始まる物語", subject: "IDOLY PRIDE", role: "作詞・作曲・編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "星色のカレイドスコープ", subject: "IDOLY PRIDE", role: "作曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "☆(きらりん)トリルで始まっちゃう!", subject: "アニソン!プレミアム!", role: "作曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "なんてカラフルな世界!", subject: "Animelo Summer Live 2020/2021 -COLORS-", role: "作詞・作曲・編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "異世界かるてっと", subject: "異世界かるてっと", role: "作詞・作曲・編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "異世界ショータイム", subject: "異世界かるてっと2", role: "作詞・作曲・編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "異世界こんちぇると", subject: "異世界かるてっと3", role: "作曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "Ready!! Steady!! Derby!!", subject: "ウマ娘 プリティーダービー 新時代の扉(映画)", role: "作詞・作曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "Act! Addict! Actors!", subject: "アニメ「A3!」", role: "作詞・作曲・編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "Circle of Seasons", subject: "アニメ「A3!」", role: "作詞・作曲・編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "MANKAI☆開花宣言", subject: "ゲーム「A3!」", role: "作詞・作曲・編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "ワンダーランド・ア・ゴーゴー!!", subject: "ゲーム「A3!」", role: "作詞・作曲・編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "奇天烈ポエマー", subject: "ゲーム「A3!」", role: "作詞・作曲・編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "春夏秋冬☆Blooming!", subject: "ゲーム「A3!」", role: "作詞・作曲・編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "ペテン師の憂鬱", subject: "ゲーム「A3!」", role: "作詞・作曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "Ever☆Blooming!", subject: "ゲーム「A3!」", role: "作詞・作曲・編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "The Show Must Go On!", subject: "舞台「A3!」", role: "作詞・作曲・編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "サインはB", subject: "アニメ「【推しの子】」", role: "作詞・作曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "Bのリベンジ", subject: "アニメ「【推しの子】」", role: "作詞・作曲・編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "おばけずかんのうた〜いつでもどこでも〜", subject: "アニメ「おばけずかん」", role: "作曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "おばけずかんのうた", subject: "アニメ「おばけずかん」", role: "作詞・作曲・編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "ようこそジャパリパークへ", subject: "アニメ「けものフレンズ」", role: "作詞・作曲・編曲(平成アニソン大賞作詞賞受賞)" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "乗ってけ!ジャパリビート", subject: "アニメ「けものフレンズ2」", role: "作詞・作曲・編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "け・も・の・だ・も・の", subject: "ゲーム「けものフレンズ3」", role: "作詞・作曲・編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "フレ!フレ!ベストフレンズ", subject: "ゲーム「けものフレンズぱびりおん」", role: "作詞・作曲・編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "ゴクドルミュージック", subject: "アニメ「Back Street Girls -ゴクドルズ-」", role: "作詞・作曲・編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "無限のトライ", subject: "アニメ「トライナイツ」", role: "編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "Let's Go!! 〜Sing For Tomorrow〜", subject: "P's LIVE! 05", role: "作曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "ヒーローライセンス", subject: "配信コンテンツ「PRELUDERS」", role: "作詞・作曲・編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "枕男子", subject: "アニメ「枕男子」", role: "作詞・作曲・編曲" },
  { group: "楽曲提供", type: "提供曲", date: "", title: "ぼうやの夢よ", subject: "アニメ「Re:ゼロから始める異世界生活」", role: "作曲・編曲" },
];

export const tracks: Track[] = raw.map((t) => ({ ...t, sortDate: toSortDate(t.date || "0000") }));

export const groups = ["Sound Schedule", "大石昌良", "オーイシマサヨシ", "OxT", "楽曲提供"] as const;
export const types = ["アルバム", "シングル", "映像", "提供曲"] as const;
