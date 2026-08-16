// オーイシ検定用のクイズ問題データ(CONTENTS_PLAN.md C-27「クイズコーナー」の具体化)。
// 出題順・選択肢の表示順はクイズページ側でシャッフルするため、ここでの並び順に意味はない。
// 各問題の事実関係はWeb検索で裏取り済み(出身地/誕生日/ソロデビュー年/
// 「ようこそジャパリパークへ」のクレジット等)。

export type QuizQuestion = {
  id: string;
  category: string;
  question: string;
  choices: string[];
  answerIndex: number; // choices内の正解のindex
  explanation: string;
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: "birthplace",
    category: "プロフィール",
    question: "オーイシマサヨシの出身地はどこ？",
    choices: ["愛媛県", "香川県", "高知県", "徳島県"],
    answerIndex: 0,
    explanation:
      "オーイシマサヨシ(大石昌良)は愛媛県宇和島市出身。公式プロフィールにも愛媛県宇和島市出身と記載されている。",
  },
  {
    id: "birthday",
    category: "プロフィール",
    question: "オーイシマサヨシの誕生日はいつ？",
    choices: ["1月5日", "2月5日", "5月1日", "5月5日"],
    answerIndex: 0,
    explanation:
      "オーイシマサヨシは1980年1月5日生まれ。大石昌良名義とオーイシマサヨシ名義を使い分けながら幅広く活動している。",
  },
  {
    id: "sound-schedule",
    category: "プロフィール",
    question: "大石昌良がボーカル&ギターを務めるバンドはどれ？",
    choices: ["Sound Schedule", "OxT", "GRANRODEO", "SCREEN mode"],
    answerIndex: 0,
    explanation:
      "大石昌良はSound Schedule(サウンドスケジュール)のボーカル&ギターを担当。Sound Scheduleは2001年にメジャーデビューしている。",
  },
  {
    id: "oishi-masayoshi-start",
    category: "プロフィール",
    question: "「オーイシマサヨシ」名義で活動を開始したのは何年？",
    choices: ["2008年", "2011年", "2014年", "2017年"],
    answerIndex: 2,
    explanation:
      "2014年から、アニメ・ゲームなどのコンテンツ向け名義として「オーイシマサヨシ」での活動を開始。同年にアニメ『月刊少女野崎くん』のOPテーマ「君じゃなきゃダメみたい」をリリースした。",
  },
  {
    id: "kimi-janakya-dame-mitai-anime",
    category: "オーイシ楽曲",
    question: "「君じゃなきゃダメみたい」がオープニング主題歌となったアニメはどれ？",
    choices: ["けものフレンズ", "月刊少女野崎くん", "SSSS.GRIDMAN", "多田くんは恋をしない"],
    answerIndex: 1,
    explanation:
      "「君じゃなきゃダメみたい」は、2014年放送のTVアニメ『月刊少女野崎くん』のオープニングテーマ。オーイシマサヨシ名義を代表する初期の楽曲の一つ。",
  },
  {
    id: "oxt-unit",
    category: "OxT",
    question: "オーイシマサヨシとTom-H@ckによる音楽ユニットはどれ？",
    choices: ["OxT", "MYTH & ROID", "Sound Schedule", "SCREEN mode"],
    answerIndex: 0,
    explanation:
      "OxT(オクト)は、オーイシマサヨシとサウンドクリエイターのTom-H@ckによるユニット。アニメ作品を中心に数多くの主題歌を担当している。",
  },
  {
    id: "union-gridman",
    category: "OxT",
    question: "OxTが担当したアニメ『SSSS.GRIDMAN』のオープニング主題歌はどれ？",
    choices: ["Clattanoia", "UNION", "君じゃなきゃダメみたい", "インパーフェクト"],
    answerIndex: 1,
    explanation:
      "「UNION」はOxTが担当したTVアニメ『SSSS.GRIDMAN』のオープニングテーマ。OxTの代表曲の一つ。",
  },
  {
    id: "japari-park",
    category: "オーイシ楽曲",
    question: "オーイシマサヨシが作詞・作曲・編曲を担当した「ようこそジャパリパークへ」は、どのアニメの主題歌？",
    choices: ["けものフレンズ", "月刊少女野崎くん", "ダイヤのA", "多田くんは恋をしない"],
    answerIndex: 0,
    explanation:
      "「ようこそジャパリパークへ」はTVアニメ『けものフレンズ』のオープニングテーマ。どうぶつビスケッツ×PPPが歌唱し、オーイシマサヨシが作詞・作曲・編曲を担当した。2017年を代表するアニメソングの一つとして大きな話題になった。",
  },
  {
    id: "solo-debut",
    category: "プロフィール",
    question: "「大石昌良」名義でソロデビューしたのは何年？",
    choices: ["2001年", "2005年", "2008年", "2014年"],
    answerIndex: 2,
    explanation:
      "Sound Scheduleでの活動を経て、2008年に「大石昌良」名義でソロデビュー。その後2014年から「オーイシマサヨシ」名義でアニメ・ゲームなどのコンテンツ向け楽曲を中心に活動するようになった。",
  },
  {
    id: "kariuta-album",
    category: "オーイシ楽曲",
    question: "2017年に発売された、オーイシマサヨシ名義初のアルバムはどれ？",
    choices: ["エンターテイナー", "仮歌", "仮歌II", "ユニバース"],
    answerIndex: 1,
    explanation:
      "『仮歌』は2017年7月に発売されたオーイシマサヨシ初のアルバム。自身が他のアーティストなどに提供した楽曲をセルフカバーするという特徴的な作品で、「ようこそジャパリパークへ」なども収録されている。",
  },
];
