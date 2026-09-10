// オーイシ検定用のクイズ問題データ(CONTENTS_PLAN.md C-27「クイズコーナー」の具体化)。
// 出題順・選択肢の表示順はクイズページ側でシャッフルするため、ここでの並び順に意味はない。
// 各問題の事実関係はWeb検索・discography.ts/schedule.tsとの照合で裏取り済み
// (出身地/誕生日/ソロデビュー年/各種タイアップ/アルバム収録曲/ファンクラブ名/
// 武道館公演の詳細/「ニンゲン」収録曲等)。

export type QuizQuestion = {
  id: string;
  // 複数ジャンルにまたがる問題は複数指定できる(表示順がそのままバッジの表示順になる)。
  // パーソナリティ=オーイシ自身の主観的な発言・自称・好み、プロフィール・経歴=客観的に
  // 裏付けできる経歴上の事実、という区分。両方の性質を持つ問題は両方を指定する。
  categories: string[];
  question: string;
  choices: string[];
  answerIndex: number; // choices内の正解のindex
  explanation: string;
  // 解説に関連するサイト内ページへのリンク(任意)。対応する個別ページが無い場合は省略する。
  relatedHref?: string;
  relatedLabel?: string;
  // 将来の初級/中級/上級選択機能向けに保持している(正答率データが十分たまるまでは未使用)。
  difficulty?: "初級" | "中級" | "上級";
};

export const quizQuestions: QuizQuestion[] = [
  {
    id: "name-quiz",
    categories: ["プロフィール・経歴", "ライブ・イベント"],
    difficulty: "初級",
    question:
      "「君じゃなきゃダメみたい」(TVアニメ『月刊少女野崎くん』OP主題歌)でデビューし、以降「ようこそジャパリパークへ」など多くのアニメ主題歌を手掛け、2025年9月にはさいたまスーパーアリーナでのワンマンライブにて、会場・配信合わせ合計8万人を動員した、アニソンシンガーの名前は？",
    choices: ["オーイシマサヨシ", "オーマイゴシゴシ", "オーイシマサシ", "オーオシマサヨシ"],
    answerIndex: 0,
    explanation:
      "正解は「オーイシマサヨシ」。2014年、TVアニメ『月刊少女野崎くん』OP主題歌「君じゃなきゃダメみたい」でオーイシマサヨシ名義デビュー。以降『けものフレンズ』OP「ようこそジャパリパークへ」など数多くのアニメ主題歌を手掛けてきた。2025年9月27・28日には『オーイシSSA ~オーイシマサヨシ ワンマンライブ at さいたまスーパーアリーナ~』を2日間開催し、会場・配信合わせて合計8万人を動員した。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "oxt-unit",
    categories: ["プロフィール・経歴"],
    difficulty: "初級",
    question:
      "ボーカリストのオーイシマサヨシと、サウンドクリエイターのTom-H@ckによって結成されたデジタルロックユニットの名前は？",
    choices: ["OxT", "MYTH & ROID", "O&T", "Sound Schedule"],
    answerIndex: 0,
    explanation:
      "正解は「OxT(オクト)」。『ダイヤのA』のボーカルオーディションでの共演をきっかけに、2015年1月18日、オーイシマサヨシとTom-H@ckによるユニット「OxT」の始動が発表された。『オーバーロード』OP「Clattanoia」などで人気を博している。なお「MYTH & ROID」はTom-H@ckが手掛ける別のユニットで、オーイシは参加していない。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "sound-schedule-debut",
    categories: ["プロフィール・経歴"],
    difficulty: "初級",
    question:
      "大石昌良(Vo&Gt)、川原洋二(Dr)、沖裕志(Ba)によって結成され、2001年にメジャーデビューしたスリーピースバンドの名前は？",
    choices: ["Sound Schedule", "OxT", "MYTH & ROID", "O&T"],
    answerIndex: 0,
    explanation:
      "正解は「Sound Schedule」。1999年に結成されたスリーピースバンドで、大石昌良はVo&Guを担当し、2001年にメジャーデビューした。2006年に一度解散するも、2011年にメジャーデビュー10周年を機に再結成し、現在も断続的に活動を続けている。大石昌良名義でのソロ活動(2008年〜)、オーイシマサヨシ名義でのアニソン活動(2014年〜)の原点にあたるキャリアである。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "birthday",
    categories: ["プロフィール・経歴"],
    difficulty: "初級",
    question: "オーイシマサヨシ(大石昌良)の誕生日はいつ？",
    choices: ["1月5日", "2月5日", "5月1日", "5月5日"],
    answerIndex: 0,
    explanation:
      "正解は「1月5日」。1980年1月5日生まれ、愛媛県宇和島市出身。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "birthplace",
    categories: ["プロフィール・経歴"],
    difficulty: "初級",
    question: "オーイシマサヨシ(大石昌良)の出身地はどこ？",
    choices: ["愛媛県", "香川県", "高知県", "徳島県"],
    answerIndex: 0,
    explanation:
      "正解は「愛媛県」。愛媛県宇和島市出身。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "ooriya-mv-guest",
    categories: ["プロフィール・経歴", "ライブ・イベント"],
    difficulty: "中級",
    question:
      "「オトモダチフィルム」「ギフト」のMVに出演し、ワンマンライブにもゲストとして出演経験のあるモデル/タレントの名前は？",
    choices: ["アーリャ", "イーリャ", "ウーリャ", "オーリャ"],
    answerIndex: 2,
    explanation:
      "正解は「ウーリャ」。「オトモダチフィルム」「ギフト」のMVに出演したほか、『オーイシSSA ~オーイシマサヨシ ワンマンライブ at さいたまスーパーアリーナ~』にもゲストとして出演している。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "kato-junichi-collab",
    categories: ["プロフィール・経歴", "楽曲"],
    difficulty: "初級",
    question:
      "「ニコ生☆音楽王」や「ピザラジオ」でオーイシマサヨシとともにパーソナリティを務め、番組OPテーマ「ドラゴンエネルギー」を一緒に歌った人気配信者は誰？",
    choices: ["Gero", "もこう", "加藤純一", "おにや"],
    answerIndex: 2,
    explanation:
      "正解は「加藤純一」。ニコニコ生放送の音楽番組「ニコ生☆音楽王」や「オーイシ加藤のピザラジオ」でともにパーソナリティを務めるなど交流が深く、番組OPテーマ「ドラゴンエネルギー」ではオーイシマサヨシがボーカル、加藤純一がナレーション&ラップを担当している(シャウトはGeroが担当)。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "suzuki-airi-collab",
    categories: ["プロフィール・経歴", "楽曲"],
    difficulty: "初級",
    question:
      "「でしょでしょ!!」でオーイシマサヨシとともにMC(パーソナリティ)を務め、「主人公になろう!」でのコラボや「最強の推し!」の楽曲提供などを受けた歌手/女優は誰？",
    choices: ["鈴木愛理", "鈴木このみ", "田村ゆかり", "内田真礼"],
    answerIndex: 0,
    explanation:
      "正解は「鈴木愛理」。ネット番組「でしょでしょ!!」でオーイシマサヨシとMCを務め、「主人公になろう!」でゲストボーカルとして参加。ドラマ「推しが上司になりまして」主題歌「最強の推し!」など、大石昌良が作詞作曲を手掛けた楽曲提供も複数受けている。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "yantan-radio",
    categories: ["プロフィール・経歴"],
    difficulty: "初級",
    question:
      "オーイシマサヨシが火曜日パーソナリティを務める、MBSラジオの深夜番組(通称)は？",
    choices: ["ヤンタン", "ピザラジオ", "音楽王", "でしょでしょ"],
    answerIndex: 0,
    explanation:
      "正解は「ヤンタン」。正式名称は「MBSヤングタウン」で、放送開始55年を超える深夜ラジオの長寿番組。オーイシマサヨシは火曜日のパーソナリティを務めている。「ピザラジオ」「ニコ生☆音楽王」「でしょでしょ!!」もオーイシが出演する番組だが、いずれもMBSの火曜深夜番組ではない。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "animelo-summer-live",
    categories: ["プロフィール・経歴", "ライブ・イベント"],
    difficulty: "初級",
    question:
      "2015年に初出演し、2020年にはテーマソングを提供、さらに2023年には大トリを務めた国内最大級のアニソンライブイベントは？",
    choices: ["アニサマ", "アニマックス", "リスアニ", "超次元音楽祭"],
    answerIndex: 0,
    explanation:
      "正解は「アニサマ」(Animelo Summer Live)。オーイシマサヨシは2015年に初出演し、2020年にはテーマソング「なんてカラフルな世界!」を書き下ろした。2023年の「Animelo Summer Live 2023 -AXEL-」DAY3では大トリを務めている。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "cat-entertainment",
    categories: ["プロフィール・経歴"],
    difficulty: "中級",
    question:
      "現在オーイシが所属するユニット「OxT」で、ともにユニットを組んでいるTom-H@ckが社長を務める事務所名は？",
    choices: ["CAT entertainment", "TaWaRa", "F.M.F", "ポニーキャニオンアーティスツ"],
    answerIndex: 0,
    explanation:
      "正解は「CAT entertainment」。OxTの所属事務所であり、Tom-H@ckが代表取締役を務める。なお「TaWaRa」もTom-H@ckが設立した会社だが、こちらは音楽制作会社。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "oishi-1000yen-tag",
    categories: ["プロフィール・経歴", "ライブ・イベント"],
    difficulty: "中級",
    question:
      "オンラインワンマンライブ「世界が君を必要とする時が来たんだ」にて話題となり、現在も使われているライブチケット料金に由来したTwitterの世界トレンドで1位を記録したタグ名は？",
    choices: ["#オーイシ1000円", "#オーイシ千円", "#1000円のオーイシ", "#オーイシ1000円祭り"],
    answerIndex: 0,
    explanation:
      "正解は「#オーイシ1000円」。オンラインライブ「世界が君を必要とする時が来たんだ」で配信チケットを1000円という破格の価格で販売したことに由来するハッシュタグで、日本のTwitterトレンド1位を記録した。以降のワンマンライブでも同タグが使われ続けている。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "hikigatari-lab",
    categories: ["プロフィール・経歴", "ライブ・イベント"],
    difficulty: "初級",
    question:
      "2013年から始まった、大石昌良が「ギター1本でどこまでエンターテインメントができるのか」を追求するというコンセプトの弾き語りライブであり、そのままYouTubeチャンネル名にもなっているものは？",
    choices: ["弾き語りラボ", "弾き語り実験室", "アコースティックラボ", "ギター1本道場"],
    answerIndex: 0,
    explanation:
      "正解は「弾き語りラボ」。2013年から始まった、大石昌良が「ギター1本でどこまでいけるのか」をテーマに、研究員(観客)とともに弾き語りの可能性を追求するライブ企画で、同名のYouTubeチャンネル「大石昌良の弾き語りラボ」でも活動を続けている。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "oshaberi-kusomegane",
    categories: ["パーソナリティ", "プロフィール・経歴"],
    difficulty: "初級",
    question:
      "アニメ関連のコンテンツに関わるようになり「自分は人に喜んでもらうサービス業である」という意識が大事だと思うようになったことをきっかけに、大石昌良/オーイシマサヨシが自称するようになった愛称は？",
    choices: [
      "アニソン界のおしゃべりクソメガネ",
      "アニソン界の残念イケメン",
      "アニソン界のトーク番長",
      "アニソン界の名物メガネ",
    ],
    answerIndex: 0,
    explanation:
      "正解は「アニソン界のおしゃべりクソメガネ」。トレードマークの黒縁メガネと軽妙なトーク、サービス精神から自ら掲げるようになった愛称で、SNSなどでも親しまれている。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "sound-schedule-place",
    categories: ["プロフィール・経歴", "ライブ・イベント"],
    difficulty: "中級",
    question:
      "2011年に再結成したSound Scheduleが、毎年恒例で行っているライブのタイトルは？",
    choices: ["PLACE", "HOME", "ROOTS", "REUNION"],
    answerIndex: 0,
    explanation:
      "正解は「PLACE」。2011年のメジャーデビュー10周年を機に再結成したSound Scheduleが、毎年恒例で開催しているライブのタイトル。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "sound-schedule-formed-pref",
    categories: ["プロフィール・経歴"],
    difficulty: "中級",
    question: "Sound Scheduleが結成された都道府県は？",
    choices: ["兵庫", "愛媛", "大阪", "岡山"],
    answerIndex: 0,
    explanation:
      "正解は「兵庫」。Sound Scheduleは1999年、神戸商科大学(現・兵庫県立大学)の軽音楽部で結成された。なお「愛媛」は大石昌良自身の出身地(宇和島市)であり、結成地とは異なる。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "peter-pan-syndrome-tv",
    categories: ["プロフィール・経歴", "ライブ・イベント"],
    difficulty: "上級",
    question:
      "Sound Scheduleが2003年に出演し、「ピーターパン・シンドローム」を披露した音楽番組は？",
    choices: ["ミュージックステーション", "HEY!HEY!HEY! MUSIC CHAMP", "うたばん", "COUNT DOWN TV"],
    answerIndex: 0,
    explanation:
      "正解は「ミュージックステーション」。「ピーターパン・シンドローム」は2002年12月リリースのシングルで、新人バンドとしては異例のミュージックステーション出演を果たした楽曲のひとつ。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "ghibli-favorite",
    categories: ["パーソナリティ"],
    difficulty: "中級",
    question:
      "オーイシマサヨシが公式著書で「最も好き」と公言しているジブリ作品は？",
    choices: ["耳をすませば", "となりのトトロ", "千と千尋の神隠し", "魔女の宅急便"],
    answerIndex: 0,
    explanation:
      "正解は「耳をすませば」。主人公・雫が初めて物語を書き上げるもののうまくいかない場面を、プロの世界に足を踏み入れた証と捉えているという。大島渚監督がかつて語った、人生で一本奇跡的にいい映画を撮ることはあっても、二本目を撮れるかどうかがプロの仕事だという趣旨の言葉が念頭にあり、プロとして常にいい曲を作り続けることの大変さが身に染みてわかる作品として、特に心に響くと語っている。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "kimijanakya-debut-single",
    categories: ["楽曲", "プロフィール・経歴"],
    difficulty: "初級",
    question:
      "TVアニメ『月刊少女野崎くん』のOP主題歌で、オーイシマサヨシ名義での初シングルとなった楽曲は？",
    choices: ["君じゃなきゃダメみたい", "オトモダチフィルム", "楽園都市", "Hands"],
    answerIndex: 0,
    explanation:
      "正解は「君じゃなきゃダメみたい」。2014年、TVアニメ『月刊少女野崎くん』OP主題歌としてリリースされた、オーイシマサヨシ名義での初シングル。「オトモダチフィルム」(2018年)、「楽園都市」(2019年、『コップクラフト』OP)、「Hands」(2018年、『ウルトラマンR/B』OP)は、いずれも後年リリースされた別のシングル曲。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "clattanoia-etymology",
    categories: ["楽曲"],
    difficulty: "中級",
    question:
      "OxT「Clattanoia」(TVアニメ『オーバーロード』OP)は2つの単語を組み合わせた造語だが、その組み合わせは？",
    choices: ["Clatter + Paranoia", "Clatter + Pronoia", "Clash + Paranoia", "Clash + Pronoia"],
    answerIndex: 0,
    explanation:
      "正解は「Clatter(ガチャガチャという音)+ Paranoia(偏執症)」を組み合わせた造語。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "union-lyrics-taikutsu",
    categories: ["楽曲"],
    difficulty: "中級",
    question:
      "OxT「UNION」(TVアニメ『SSSS.GRIDMAN』OPテーマ)の歌詞「それじゃとりあえず同盟を結ぼうか―君を○○から救いに来たんだ!」の○○に入る言葉は？",
    choices: ["退屈", "孤独", "絶望", "運命"],
    answerIndex: 0,
    explanation:
      "正解は「退屈」。「それじゃとりあえず同盟を結ぼうか―君を\"退屈\"から救いに来たんだ!」というサビ前のフレーズで、歌詞カードでも「退屈」の部分がカギ括弧付きで強調されている。「UNION」は2018年11月7日リリースのTVアニメ『SSSS.GRIDMAN』オープニングテーマで、大石昌良が作詞・作曲を手掛けた。",
    relatedHref: "/works/union-oxt",
    relatedLabel: "「UNION」のページを見る",
  },
  {
    id: "entertainer-lyrics-azayakani",
    categories: ["楽曲"],
    difficulty: "中級",
    question:
      "オーイシマサヨシ「エンターテイナー」(1stアルバム表題曲)の歌詞「塞ぎ込んだ日常をどうか、○○に壊して」の○○に入る言葉は？",
    choices: ["鮮やか", "きれい", "派手", "粉々"],
    answerIndex: 0,
    explanation:
      "正解は「鮮やか」。「塞ぎ込んだ日常をどうか鮮やかに壊して」という歌詞で、エンターテイナーという存在が誰かの閉じた日常を鮮やかに変えていく、という楽曲のテーマを象徴するフレーズ。「エンターテイナー」は2021年8月25日リリースの1stアルバム表題曲で、自身のエンターテイナーとしての心情を投影した楽曲。",
    relatedHref: "/works/entertainer-song",
    relatedLabel: "「エンターテイナー」のページを見る",
  },
  {
    id: "first-take-not-performed",
    categories: ["楽曲"],
    difficulty: "中級",
    question:
      "次のうち、オーイシマサヨシが「THE FIRST TAKE」で歌ったことのない楽曲はどれ？",
    choices: ["君じゃなきゃダメみたい", "uni-verse", "Go EXCEED!!", "Butter-Fly"],
    answerIndex: 2,
    explanation:
      "正解は「Go EXCEED!!」。オーイシマサヨシは「君じゃなきゃダメみたい」(2024年、初出演)、「uni-verse」(劇場版『グリッドマン ユニバース』主題歌、2回目の出演)、「Butter-Fly」(2025年8月、ANISAMA FRIENDSの一員としてangela・奥井雅美・TrySail・FLOWと『デジモンアドベンチャー』OPテーマをカバー)を「THE FIRST TAKE」で披露しているが、『ダイヤのA』主題歌「Go EXCEED!!」(Tom-H@ck featuring 大石昌良名義)は「THE FIRST TAKE」で歌ったことはない。",
    relatedHref: "/works/kimi-janakya-dame-mitai-first-take",
    relatedLabel: "「君じゃなきゃダメみたい - From THE FIRST TAKE」のページを見る",
  },
  {
    id: "oishi-budokan-first",
    categories: ["プロフィール・経歴", "ライブ・イベント"],
    difficulty: "初級",
    question:
      "2024年に行われた、男性ソロのアニソンシンガーとしては史上初となるライブはどこで行われた？",
    choices: ["日本武道館", "Zepp DiverCity", "中野サンプラザホール", "NHKホール"],
    answerIndex: 0,
    explanation:
      "正解は「日本武道館」。2024年3月2日、男性ソロのアニソンシンガーとしては史上初となる単独武道館公演「オーイシ武道館 〜オーイシマサヨシ ワンマンライブ at 日本武道館〜」を開催し、会場に1万人の観客を集めた。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "bandori-hello-happy-world-japari",
    categories: ["楽曲"],
    difficulty: "中級",
    question:
      "人気リズムゲームアプリ『バンドリ！ ガールズバンドパーティ！』(BanG Dream!)にて、劇中バンド「ハロー、ハッピーワールド！」がカバーした、大石昌良/オーイシマサヨシの楽曲は？",
    choices: ["ようこそジャパリパークへ", "君じゃなきゃダメみたい", "UNION", "オトモダチフィルム"],
    answerIndex: 0,
    explanation:
      "正解は「ようこそジャパリパークへ」。『バンドリ！ ガールズバンドパーティ！』のカバーコレクションVol.8にて、ハロー、ハッピーワールド！がカバーしている。なお誤答の3曲(「君じゃなきゃダメみたい」「UNION」「オトモダチフィルム」)は、いずれも劇中バンドPoppin'Partyがカバーしている。",
    relatedHref: "/works/youkoso-japari-park",
    relatedLabel: "「ようこそジャパリパークへ」のページを見る",
  },
  {
    id: "makuradanshi-lookalike-cameo",
    categories: ["ライブ・イベント"],
    difficulty: "上級",
    question:
      "オーイシマサヨシ「枕男子」のライブでは、「電気消して!」のコールの後に暗転し、オーイシに似た人物が登場する定番の演出がある。次のうち、この演出に登場したことのないものはどれ？",
    choices: ["櫻井孝宏", "大石昌良", "ローディーのタカザワ君", "Sound Schedule"],
    answerIndex: 0,
    explanation:
      "正解は「櫻井孝宏」。この演出には大石昌良本人、ローディーのタカザワ君、Sound Scheduleのメンバーがそれぞれ登場したことがあるが、櫻井孝宏が登場したことはない。なお「仮歌ツアー」では櫻井孝宏からのフラワースタンドが会場に届いたことはある。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "yantan-paper-straw",
    categories: ["パーソナリティ"],
    difficulty: "中級",
    question:
      "オーイシマサヨシがラジオ番組「MBSヤングタウン」や「ピザラジオ」でたびたび不満を漏らし、ファンから「紙ストロー警察」とも呼ばれるきっかけになったものは？",
    choices: ["紙ストロー", "セルフレジ", "満員電車", "ビニール傘"],
    answerIndex: 0,
    explanation:
      "正解は「紙ストロー」。スターバックスなどで採用されている紙ストローへの不満をラジオで繰り返し語り、「紙ストロー警察」というあだ名がつくほどの名物ネタになっている。「オーイシマサヨシのMBSヤングタウン」(オーイシヤンタン)や「オーイシ×加藤のピザラジオ」でもたびたび話題に上っている。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "ssa-day1-kato-happi",
    categories: ["ライブ・イベント"],
    difficulty: "上級",
    question:
      "「オーイシSSA」Day1、楽曲「あとの祭り」にてトロッコで登場したゲスト・加藤純一が着ていた法被の背中に書かれていた一文字は？",
    choices: ["禊", "純", "罪", "罰"],
    answerIndex: 0,
    explanation:
      "正解は「禊」。「あとの祭り」というタイトルが当時話題になっていた加藤純一のニュースとタイミング的に重なったことにちなみ、法被に「禊」の一文字を背負ってトロッコで登場するという演出だった。登場後は「ドラゴンエネルギー」を歌唱し、最後に「ソイヤ!」とだけ叫んで去っていった。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "rab-dance-team",
    categories: ["楽曲"],
    difficulty: "中級",
    question:
      "オーイシマサヨシ「なまらめんこいギャル」や、佐久間大介(Snow Man)への提供曲「守りたい、その笑顔」のMVに振り付け・出演で参加しているダンスパフォーマンスチームの名前は？",
    choices: ["RAB", "OWV", "ACE", "ZAP"],
    answerIndex: 0,
    explanation:
      "正解は「RAB(リアルアキバボーイズ)」。アニソンに合わせたダンスパフォーマンスで知られるチームで、「なまらめんこいギャル」のMVに出演したほか、「守りたい、その笑顔」でも振り付け・出演を担当している。",
    relatedHref: "/works/namara-menkoi-gal",
    relatedLabel: "「なまらめんこいギャル」のページを見る",
  },
  {
    id: "pizza-radio-owakon",
    categories: ["パーソナリティ"],
    difficulty: "上級",
    question:
      "「オーイシ×加藤のピザラジオ」の企画「オーイシ理解度テスト」で明らかになった、オーイシマサヨシが最も言われたくない言葉は？",
    choices: ["オワコン", "老けた", "つまらない", "うるさい"],
    answerIndex: 0,
    explanation:
      "正解は「オワコン」。「オーイシ×加藤のピザラジオ」の企画「オーイシ理解度テスト」で本人が明かした、言われたくない言葉。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "anime-theme-song-matching",
    categories: ["楽曲"],
    difficulty: "中級",
    question: "次のうち、アニメタイトルと主題歌の組み合わせとして正しいものはどれ？",
    choices: [
      "好きになっちゃダメな人 ＋『お嬢と番犬くん』",
      "君じゃなきゃダメみたい ＋『コップクラフト』",
      "Hands ＋『月刊少女野崎くん』",
      "楽園都市 ＋『ウルトラマンR/B』",
    ],
    answerIndex: 0,
    explanation:
      "正解は「好きになっちゃダメな人＋『お嬢と番犬くん』」(2023年、OPテーマ)。他の3つは組み合わせが入れ替わっている。正しくは「君じゃなきゃダメみたい」は『月刊少女野崎くん』、「Hands」は『ウルトラマンR/B』、「楽園都市」は『コップクラフト』のオープニングテーマ。",
    relatedHref: "/works/suki-ni-naccha-dame-na-hito",
    relatedLabel: "「好きになっちゃダメな人」のページを見る",
  },
  {
    id: "desho-desho-final-secret-base",
    categories: ["ライブ・イベント"],
    difficulty: "中級",
    question:
      "「アニソン神曲カバーでしょdeショー!!」のリニューアル前最終回にて、鈴木愛理が大号泣しながらオーイシマサヨシと2人でカバーした楽曲は？",
    choices: ["secret base〜君がくれたもの〜", "changes", "again", "アンインストール"],
    answerIndex: 0,
    explanation:
      "正解は「secret base〜君がくれたもの〜」(ZONE、『あの日見た花の名前を僕達はまだ知らない』EDテーマ)。約3年半続いた番組のリニューアル前最終回で、鈴木愛理が涙をこらえきれなくなり途中から歌えなくなってしまうハプニングがあり、オーイシマサヨシは「ハモリパートで入ってたのに途中から愛理ちゃんが歌わないの。頑張って上のパートで歌いました」と振り返っている。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "high-maintenance-girl-lyrics-kenka",
    categories: ["楽曲"],
    difficulty: "中級",
    question:
      "オーイシマサヨシ「ハイメンテナンスガール」(TVアニメ『花織さんは転生しても喧嘩がしたい』OPテーマ)の歌い出し「いつものキミと○○がしたい」の○○に入る言葉は？",
    choices: ["喧嘩", "デート", "冒険", "旅行"],
    answerIndex: 0,
    explanation:
      "正解は「喧嘩」。歌い出しの「いつもの君と喧嘩がしたい」というフレーズは、アニメタイトル『花織さんは転生しても喧嘩がしたい』ともリンクしている。",
    relatedHref: "/works/high-maintenance-girl",
    relatedLabel: "「ハイメンテナンスガール」のページを見る",
  },
  {
    id: "oxt-most-theme-songs-diamond-a",
    categories: ["楽曲"],
    difficulty: "中級",
    question:
      "オーイシマサヨシ(OxT)が担当したTVアニメ主題歌の中で、シリーズ全体で最も曲数が多いのは？",
    choices: ["ダイヤのA", "オーバーロード", "陰の実力者になりたくて！", "SSSS.GRIDMAN"],
    answerIndex: 0,
    explanation:
      "正解は「ダイヤのA」。「Go EXCEED!!」「Perfect HERO」「KIMERO!!」「BLOOM OF YOUTH」「BRAND NEW BLUE」「ゴールデンアフタースクール」「Everlasting Dream」の計7曲を担当しており、OxTがTVアニメ主題歌を手がけた作品の中で最多。「オーバーロード」は「Clattanoia」「GO CRY GO」「Silent Solitude」「HOLLOW HUNGER」の4曲。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "go-cry-go-voi-count",
    categories: ["楽曲"],
    difficulty: "上級",
    question:
      "OxT「GO CRY GO」の楽曲中に登場するコール「ヴォイ!」は、Animelo Summer Live 2018のMCで明かされたところによると何回あるか？",
    choices: ["76回", "42回", "108回", "58回"],
    answerIndex: 0,
    explanation:
      "正解は「76回」。Animelo Summer Live 2018のMCにて明かされた回数。なお大型アニソンフェスに出演した際は、1日でおよそ500回もの「ヴォイ!」コールをしているらしい(オーイシ本人調べ)。",
    relatedHref: "/works/go-cry-go",
    relatedLabel: "「GO CRY GO」のページを見る",
  },
  {
    id: "rakuen-toshi-lyrics-paraiso",
    categories: ["楽曲"],
    difficulty: "中級",
    question:
      "オーイシマサヨシ「楽園都市」(TVアニメ『コップクラフト』OPテーマ)の歌詞「答えみたいな言い訳を 探すのさ ○○」の○○に入る言葉は？",
    choices: ["パライーソ", "ユートピア", "オアシス", "エルドラド"],
    answerIndex: 0,
    explanation:
      "正解は「パライーソ」。ポルトガル語で「楽園」を意味する言葉で、楽曲タイトル『楽園都市』の世界観ともリンクする印象的なフレーズとして使われている。",
    relatedHref: "/works/rakuen-toshi",
    relatedLabel: "「楽園都市」のページを見る",
  },
  {
    id: "ultraman-hosso-nickname",
    categories: ["パーソナリティ"],
    difficulty: "中級",
    question:
      "『ウルトラマンR/B』主題歌「Hands」を担当したオーイシマサヨシが、ファンからある名称でいじられている。それはどれ？",
    choices: ["ウルトラマンホッソ", "ウルトラマンモヤシ", "ウルトラマンガリガリ", "ウルトラマンメガネ"],
    answerIndex: 0,
    explanation:
      "正解は「ウルトラマンホッソ」。『ウルトラマンR/B』に登場する「ウルトラマンロッソ」と、オーイシマサヨシの細身の体型(細い)を掛けたファンいじりの愛称。",
    relatedHref: "/works/hands",
    relatedLabel: "「Hands」のページを見る",
  },
  {
    id: "gimu-warai",
    categories: ["パーソナリティ"],
    difficulty: "初級",
    question:
      "オーイシマサヨシの、心のこもっていない愛想笑いのことを通称何と呼ぶか？",
    choices: ["義務笑い", "営業スマイル", "作り笑い", "接待笑い"],
    answerIndex: 0,
    explanation:
      "正解は「義務笑い」。心のこもっていない愛想笑いを指すファン発祥の呼び方で、本人もX(旧Twitter)で「義務笑いなうに使っていいよ」と公認するほど定着した通称。ラジオ「MBSヤングタウン」でも「義務笑い？本気笑い？徹底検証！！」という企画が行われている。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "a3-game-title",
    categories: ["楽曲"],
    difficulty: "初級",
    question:
      "「MANKAI☆開花宣言」「春夏秋冬☆Blooming!」など、大石昌良/オーイシマサヨシが数多くの楽曲を提供したイケメン役者育成ゲームのタイトルは？",
    choices: ["A3!", "あんさんぶるスターズ!", "アイドリッシュセブン", "うたの☆プリンスさまっ♪"],
    answerIndex: 0,
    explanation:
      "正解は「A3!(エースリー)」。劇団員(イケメン役者)を育成するスマートフォンゲームで、大石昌良は「MANKAI☆開花宣言」「春夏秋冬☆Blooming!」「Act! Addict! Actors!」「Circle of Seasons」「ペテン師の憂鬱」など数多くの楽曲を提供している。",
    relatedHref: "/works/mankai-kaika-sengen",
    relatedLabel: "「MANKAI☆開花宣言」のページを見る",
  },
  {
    id: "favorite-anime-character-mikan",
    categories: ["パーソナリティ"],
    difficulty: "初級",
    question:
      "オーイシマサヨシが「結婚相手にしたい」とまで公言し、一貫して愛し続けていることで知られる『To LOVEる-とらぶる-』のお気に入りキャラクターは？",
    choices: ["結城美柑", "ラーラ・サタリン・デビルーク", "桃", "古手川唯"],
    answerIndex: 0,
    explanation:
      "正解は「結城美柑」。『To LOVEる-とらぶる-』に登場するキャラクターで、オーイシマサヨシが「結婚相手にしたい」キャラクターとして一貫して挙げ続けていることで知られる。「ブレずに結城美柑を愛するオーイシマサヨシ」というタイトルの動画が作られるほど有名なエピソード。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "oishi-budokan-narrator",
    categories: ["ライブ・イベント"],
    difficulty: "中級",
    question:
      "オーイシマサヨシのワンマンライブでは、毎回豪華声優がオープニングナレーターを担当している。2024年3月の「オーイシ武道館」で担当した男性声優は？",
    choices: ["津田健次郎", "緑川光", "中村悠一", "杉田智和"],
    answerIndex: 0,
    explanation:
      "正解は「津田健次郎」。「オーイシ武道館」(2024年3月2日)のオープニングナレーションを担当した。なお、緑川光は「オーイシ武道館 Vol.2」、中村悠一は「オーイシSSA」Day1、杉田智和は「オーイシSSA」Day2のオープニングナレーションをそれぞれ担当している。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "rajavetta-pizza",
    categories: ["楽曲", "プロフィール・経歴"],
    difficulty: "中級",
    question:
      "「ロールプレイング」のMVにも登場している、オーイシマサヨシの転機となった元バイト先のピザ屋の名前は？",
    choices: ["ラジャヴェッタ", "ピザーラ", "ドミノ・ピザ", "ナポリの窯"],
    answerIndex: 0,
    explanation:
      "正解は「ラジャヴェッタ」。宅配ピザ・イタリアンの店で、大石昌良がかつてアルバイトをしていた店として知られる。「ロールプレイング」のMVにも登場している。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "kinkan-uta-2020",
    categories: ["楽曲", "プロフィール・経歴"],
    difficulty: "中級",
    question:
      "オーイシマサヨシが「広告宣伝課長」に就任し、CMソングとして書き上げた楽曲は次のうちどれか？",
    choices: ["キンカンのうた2020", "エレクトリックパレード", "ようこそジャパリパークへ", "Hands"],
    answerIndex: 0,
    explanation:
      "正解は「キンカンのうた2020」。2020年5月28日、株式会社金冠堂の『キンカン広告宣伝課長』に就任し、あわせてCMソング「キンカンのうた2020」のミュージックビデオが公開された。なお「エレクトリックパレード」はJ-POWER(電源開発)とのコラボソングで、こちらは「特命広報アンバサダー」として制作された別のタイアップ曲。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "karauta-album",
    categories: ["楽曲"],
    difficulty: "初級",
    question:
      "自身が「大石昌良」名義で他アーティストに提供した楽曲を、「オーイシマサヨシ」名義でセルフカバーしたアルバムのタイトルは？",
    choices: ["仮歌", "本歌", "写し歌", "贈り歌"],
    answerIndex: 0,
    explanation:
      "正解は「仮歌」。楽曲提供の際、歌唱練習用に大石が自ら歌う「仮歌」にちなんだタイトルで、オケはオリジナルのまま、ボーカルのみをオーイシマサヨシが歌い直したカバーアルバム。第1弾は2017年、第2弾「仮歌Ⅱ」は2019年にリリースされた。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "youkoso-japari-park",
    categories: ["楽曲"],
    difficulty: "初級",
    question:
      "大石昌良が書き下ろし、日本レコード協会の2017年4月度有料音楽配信売上実績でゴールド認定を受けた、TVアニメ『けものフレンズ』のオープニングテーマ曲名は？",
    choices: ["ようこそジャパリパークへ", "乗ってけ!ジャパリビート", "け・も・の・だ・も・の", "フレ!フレ!ベストフレンズ"],
    answerIndex: 0,
    explanation:
      "正解は「ようこそジャパリパークへ」。どうぶつビスケッツ×PPPが歌うTVアニメ『けものフレンズ』OP主題歌で、日本レコード協会の2017年4月度有料音楽配信売上実績でゴールド認定を受けた。「乗ってけ!ジャパリビート」「け・も・の・だ・も・の」「フレ!フレ!ベストフレンズ」もいずれもどうぶつビスケッツ×PPPが歌う『けものフレンズ』関連の実在楽曲だが、OP主題歌ではない。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "pokemon-allstars-1025-last",
    categories: ["楽曲"],
    difficulty: "上級",
    question:
      "2026年9月にフルバージョンが公開された「ポケモンオールスターズ1025」(オーイシマサヨシ歌唱)で、歌詞に最後に登場するポケモンは？",
    choices: ["ミュウ", "アルセウス", "ジラーチ", "セレビィ"],
    answerIndex: 0,
    explanation:
      "正解は「ミュウ」。ポケモン30周年記念曲「ポケモンオールスターズ1025」は、大石昌良(オーイシマサヨシ)が作詞・作曲・歌唱を務め、歴代1025匹のポケモンが歌詞に登場する。2026年4月に213匹バージョンが先行公開され、同年9月にフルバージョンが公開された。歌詞の最後に登場するのは「アルセウス」の直後に歌われる「ミュウ」。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "oishi-nakayoshi",
    categories: ["楽曲"],
    difficulty: "中級",
    question:
      "TVアニメ『勇者が死んだ!』のOP主題歌「死んだ!」のMVに出演した、一般公募で選ばれたオーイシマサヨシそっくりの人たちのことをなんという？",
    choices: ["オーイシナカヨシ", "オーイシブラザーズ", "オーイシファミリー", "オーイシ軍団"],
    answerIndex: 0,
    explanation:
      "正解は「オーイシナカヨシ」。一般公募で選ばれたオーイシマサヨシそっくりの出演者たちの呼び名で、本人のX(旧Twitter)でも紹介された。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "azur-lane-songs",
    categories: ["楽曲"],
    difficulty: "中級",
    question:
      "大石昌良が歌っている次の楽曲のうち、スマートフォン向けアプリゲーム『アズールレーン』の楽曲でないものはどれか？",
    choices: ["碧い砲撃", "黄金航路", "Sea of Wonderland", "僕らの箱庭"],
    answerIndex: 3,
    explanation:
      "正解は「僕らの箱庭」。「碧い砲撃」は『アズールレーン』5周年記念ソング(2022年)、「黄金航路」は6周年記念ソング(2023年)、「Sea of Wonderland」は7周年記念ソング(2024年)として、いずれも大石昌良が作詞作曲・歌唱を務めている。「僕らの箱庭」はこれらとは異なる楽曲。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "female-artists-song-provided",
    categories: ["楽曲"],
    difficulty: "中級",
    question: "次のうち、大石昌良が楽曲提供を行っていない女性声優は誰か？",
    choices: ["水瀬いのり", "愛美", "上坂すみれ", "内田真礼"],
    answerIndex: 0,
    explanation:
      "正解は「水瀬いのり」。愛美には「かかった魔法はアマノジャク」(アルバム『AIMI SOUND』収録、2022年)、上坂すみれには「ハッピーエンドプリンセス」(2023年)、内田真礼には「BIG LOVE」(内田真礼×内田雄馬コラボシングル収録、2024年)を、いずれも大石昌良が作曲(または作詞作曲)で提供している。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "honoka-terasu",
    categories: ["楽曲", "プロフィール・経歴"],
    difficulty: "初級",
    question:
      "大石昌良の故郷・愛媛県宇和島市を歌った、大石昌良1stシングルの曲名は？",
    choices: ["ほのかてらす", "うしろのしょうめん", "あの街この街", "ラブ"],
    answerIndex: 0,
    explanation:
      "正解は「ほのかてらす」。2008年6月25日にリリースされた大石昌良のソロ1stシングルで、故郷である愛媛県宇和島市を歌った楽曲。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "gd-attraction",
    categories: ["楽曲", "プロフィール・経歴"],
    difficulty: "上級",
    question:
      "大石昌良の2ndアルバム『G.D.アトラクション』(2009年)の「G.D.」が指すものは？",
    choices: ["神戸", "愛媛", "Great Dream", "Good Day"],
    answerIndex: 0,
    explanation:
      "正解は「神戸」。「G.D.」は「God(神)」「Door(戸)」の頭文字を組み合わせた言葉遊びで、Sound Scheduleの結成地でもある神戸を指している。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "most-viewed-youtube-short",
    categories: ["ライブ・イベント"],
    difficulty: "中級",
    question:
      "オーイシマサヨシ公式YouTubeチャンネルのショート動画の中で、最も再生されているタイトルは？",
    choices: [
      "こんなんされたら歌えんやん",
      "作曲者本人が武道館でライブしてみた #サインはB",
      "鈴木愛理という天使様と踊ってみた",
      "ようこそジャパリパークへ - Live from オーイシ...",
    ],
    answerIndex: 0,
    explanation:
      "正解は「こんなんされたら歌えんやん」(1970万回視聴)。「ギフト」を歌唱中、観客席奥で完コピのダンスを披露していた通称「2人組のオタク」の姿に笑ってしまい、歌声がヘロヘロになってしまった様子を収めたショート動画で、公式チャンネルのショートの中でも歴代最多再生数を誇る(2位の「作曲者本人が武道館でライブしてみた」は1302万回視聴)。この動画がきっかけとなり、その後の「オーイシ武道館」「オーイシSSA」では実際に二人をステージに上げるという展開に至った。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "fanclub-name-club014",
    categories: ["プロフィール・経歴"],
    difficulty: "初級",
    question: "大石昌良/オーイシマサヨシのオフィシャルファンクラブの名称は？",
    choices: ["CLUB014", "FC MASAYOSHI", "OISHI FAMILY", "014 FRIENDS"],
    answerIndex: 0,
    explanation:
      "正解は「CLUB014」。会員番号付きの会員証や誕生日カード、チケット先行販売、不定期開催のファンクラブイベントなどの特典がある公式ファンクラブ。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "jari-name-yantan",
    categories: ["プロフィール・経歴"],
    difficulty: "中級",
    question:
      "オーイシマサヨシがパーソナリティを務めるラジオ「MBSヤングタウン」(通称オーイシヤンタン)で、リスナーのラジオネームにつける愛称は？",
    choices: ["ジャリネーム", "オーイシスト", "クソメガネーム", "ヤンタラー"],
    answerIndex: 0,
    explanation:
      "正解は「ジャリネーム」。「オーイシヤンタン」ではリスナーを「ジャリ」と呼び、投稿の際のラジオネームは「ジャリネーム」と呼ばれる。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "animelo-2020-theme-song",
    categories: ["楽曲", "ライブ・イベント"],
    difficulty: "中級",
    question:
      "大石昌良が制作し、自身が2023年に大トリを務めた際にも披露した、「Animelo Summer Live 2020-21 -COLORS-」のテーマソングは？",
    choices: ["なんてカラフルな世界!", "CROSSING STORIES", "Stand by...MUSIC!!!", "Sparkle"],
    answerIndex: 0,
    explanation:
      "正解は「なんてカラフルな世界!」。「Animelo Summer Live 2020-21 -COLORS-」のために書き下ろされたテーマソングで、2023年の「Animelo Summer Live 2023 -AXEL-」DAY3で大トリを務めた際にも披露された。「CROSSING STORIES」は2019年、「Stand by...MUSIC!!!」は2018年、「Sparkle」は2022年のテーマソング。",
    relatedHref: "/works/nante-colorful-na-sekai",
    relatedLabel: "「なんてカラフルな世界!」のページを見る",
  },
  {
    id: "uni-verse-gridman-universe-first-take",
    categories: ["楽曲", "ライブ・イベント"],
    difficulty: "中級",
    question:
      "劇場版『グリッドマン ユニバース』の主題歌であり、「THE FIRST TAKE」でも披露されたことのある楽曲は？",
    choices: ["uni-verse", "UNION", "インパーフェクト", "REUNION"],
    answerIndex: 0,
    explanation:
      "正解は「uni-verse」。劇場版『グリッドマン ユニバース』のために書き下ろされた主題歌で、シングル『ギフト』のカップリング曲としても収録されている。「THE FIRST TAKE」にも出演し披露された(2回目の出演)。「UNION」「REUNION」はOxTの楽曲、「インパーフェクト」はオーイシマサヨシ名義の楽曲(『SSSS.DYNAZENON』オープニングテーマ)。",
    relatedHref: "/works/uni-verse",
    relatedLabel: "「uni-verse」のページを見る",
  },
  {
    id: "otomodachi-film-lyrics-kotoba",
    categories: ["楽曲"],
    difficulty: "中級",
    question:
      "オーイシマサヨシ「オトモダチフィルム」(TVアニメ『多田くんは恋をしない』OPテーマ)の歌詞「届けたい○○があんだよ 今君に恋してるよ」の○○に入る言葉は？",
    choices: ["言葉", "気持ち", "想い", "本音"],
    answerIndex: 0,
    explanation:
      "正解は「言葉」。「届けたい言葉があんだよ 今君に恋してるよ」というストレートなフレーズが印象的な、『多田くんは恋をしない』のオープニングテーマ。",
    relatedHref: "/works/otomodachi-film",
    relatedLabel: "「オトモダチフィルム」のページを見る",
  },
  {
    id: "entertainer-budokan-ssa-opening",
    categories: ["楽曲", "ライブ・イベント"],
    difficulty: "中級",
    question:
      "コロナ禍に、いつかまた大声をあげてみんなで歌えることを夢見て作られた楽曲で、「オーイシ武道館」「オーイシSSA」(Day1)の一曲目に歌われたのは？",
    choices: ["エンターテイナー", "世界が君を必要とする時が来たんだ", "ギフト", "インパーフェクト"],
    answerIndex: 0,
    explanation:
      "正解は「エンターテイナー」。2021年8月25日リリース、コロナ禍でライブ活動が制限される中で作られた楽曲。「オーイシ武道館」(2024年3月)、「オーイシSSA」Day1(2025年9月27日)ともに、この曲がライブの一曲目として披露された。なお「世界が君を必要とする時が来たんだ」はオーイシSSA Day2の一曲目。",
    relatedHref: "/works/entertainer-song",
    relatedLabel: "「エンターテイナー」のページを見る",
  },
  {
    id: "imperfect-slump-collaboration",
    categories: ["楽曲"],
    difficulty: "中級",
    question:
      "オーイシマサヨシが精神的なスランプに陥っていた時期に、自分一人だけの力ではなく、周りの人たちの力も借りて制作した、「不完全な」を意味するタイトルの楽曲は？",
    choices: ["インパーフェクト", "REUNION", "UNION", "Hero"],
    answerIndex: 0,
    explanation:
      "正解は「インパーフェクト」。『SSSS.DYNAZENON』のOP主題歌で、タイトルは英語で「不完全な」を意味する。制作当時スランプに陥っていたオーイシは、作品テーマの「合体」に着想を得て、通常のデモをほぼ完成させてから演奏してもらうスタイルから一転、まだ煮詰まっていないデモを投げて返ってきたものを作品にするという、周囲の力を借りるスタイルに変更してこの曲を作り上げた。「REUNION」「UNION」はOxTの楽曲、「Hero」はオーイシマサヨシ名義の別楽曲。",
    relatedHref: "/works/imperfect",
    relatedLabel: "「インパーフェクト」のページを見る",
  },
  {
    id: "sekai-ga-kimi-wo-lyrics-ride-on",
    categories: ["楽曲"],
    difficulty: "中級",
    question:
      "オーイシマサヨシ「世界が君を必要とする時が来たんだ」(TVアニメ『トミカ絆合体 アースグランナー』OPテーマ)の歌詞「さぁキミの番だぜ ○○！○○！」の○○に入る言葉は？",
    choices: ["ライドオン", "ゴーオン", "レッツゴー", "ファイヤー"],
    answerIndex: 0,
    explanation:
      "正解は「ライドオン」。「さぁキミの番だぜ ライドオン！ライドオン！」という掛け声のようなフレーズが印象的な、『トミカ絆合体 アースグランナー』のオープニングテーマ。",
    relatedHref: "/works/sekai-ga-kimi-wo",
    relatedLabel: "「世界が君を必要とする時が来たんだ」のページを見る",
  },
  {
    id: "pizza-radio-haunted-spot-song",
    categories: ["パーソナリティ"],
    difficulty: "中級",
    question:
      "「オーイシ×加藤のピザラジオ」の心霊スポット企画にて、オーイシマサヨシが熱唱したことがある楽曲は次のうちどれ？",
    choices: ["楽園都市", "ようこそジャパリパークへ", "英雄の歌", "かごめかごめ"],
    answerIndex: 0,
    explanation:
      "正解は「楽園都市」。「オーイシ×加藤のピザラジオ」の心霊スポット企画にて、オーイシマサヨシが熱唱した楽曲。",
    relatedHref: "/works/rakuen-toshi",
    relatedLabel: "「楽園都市」のページを見る",
  },
  {
    id: "x-header-picture-kato",
    categories: ["パーソナリティ"],
    difficulty: "上級",
    question: "オーイシマサヨシのX(旧Twitter)のヘッダー画像は、誰との写真？",
    choices: ["加藤純一", "鈴木愛理", "Tom-H@ck", "佐久間大介"],
    answerIndex: 0,
    explanation:
      "正解は「加藤純一」。ラジオ番組「オーイシ×加藤のピザラジオ」で共演する加藤純一(うんこちゃん)と、2人でディズニーに行った際の写真がヘッダー画像に使われている。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "chicago-rob-marshall-broadway",
    categories: ["パーソナリティ"],
    difficulty: "中級",
    question:
      "大石昌良/オーイシマサヨシが好きすぎてブロードウェイまで観に行ったという、ロブ・マーシャル監督の映画作品は？",
    choices: ["CHICAGO", "NINE", "イントゥ・ザ・ウッズ", "メリー・ポピンズ リターンズ"],
    answerIndex: 0,
    explanation:
      "正解は「CHICAGO」。2002年のロブ・マーシャル監督作(アカデミー作品賞受賞)で、大石はこの作品が好きすぎて舞台版をブロードウェイまで観に行ったという。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "norwegian-wood-murakami-bible",
    categories: ["パーソナリティ"],
    difficulty: "中級",
    question:
      "大石昌良/オーイシマサヨシが「自身のバイブル」と公言し、年に一回は目を通すという、1987年に出版された村上春樹著の作品は？",
    choices: ["ノルウェイの森", "羊をめぐる冒険", "海辺のカフカ", "1Q84"],
    answerIndex: 0,
    explanation:
      "正解は「ノルウェイの森」。1987年出版の村上春樹の代表作で、大石は自身のバイブルと公言し、年に一回は読み返しているという。Sound Scheduleの楽曲には、村上春樹の世界観や文章を投影したものもある。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "anisama-oxt-collab-zaq",
    categories: ["ライブ・イベント"],
    difficulty: "中級",
    question:
      "アニサマ(Animelo Summer Live)では、OxT(オーイシマサヨシ)による豪華アーティストとのコラボステージも人気だが、次のうち楽曲とコラボ相手の組み合わせとして正しいものは？",
    choices: [
      "シュガーソングとビターステップ ＋ ZAQ",
      "ストロボメモリー ＋ 内田真礼",
      "GO! GO! MANIAC ＋ 田所あずさ",
      "君じゃなきゃダメみたい ＋ Poppin'Party",
    ],
    answerIndex: 0,
    explanation:
      "正解は「シュガーソングとビターステップ ＋ ZAQ」。アニサマ2018にて、OxTとZAQが「シュガーソングとビターステップ」(『血界戦線』EDテーマ)をコラボ披露した。なお内田真礼とのコラボ曲は「youthful beautiful」で、他の2組(田所あずさ、Poppin'Party)との組み合わせはANIMAX MUSIXでの共演。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "kusolip-live-routine",
    categories: ["パーソナリティ"],
    difficulty: "中級",
    question: "グッズ化もされた、オーイシマサヨシのライブ前ルーティンに欠かせないアイテムは？",
    choices: ["リップクリーム", "のど飴", "エナジードリンク", "ブラックコーヒー"],
    answerIndex: 0,
    explanation:
      "正解は「リップクリーム」。ライブ前に必ず使うというルーティンアイテムで、「おしゃべりクソリップ」としてグッズ化された(「オーイシSSA」物販にて販売)。また「オーイシSSA」では、ライブ本編前の映像としてこのリップクリームのオリジナルCMも流れた。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "digital-shoto-pre-live-video",
    categories: ["ライブ・イベント"],
    difficulty: "中級",
    question:
      "「オーイシ武道館」および「オーイシSSA」にて、ライブ本編前に流れるオープニング映像を制作したYouTubeチャンネルは？",
    choices: ["デジタル諸島", "東海オンエア", "どうがはじめてみました", "加藤純一"],
    answerIndex: 0,
    explanation:
      "正解は「デジタル諸島」。「オーイシ武道館」「オーイシSSA」のライブ本編前に流れるオープニング映像を手掛けたYouTubeチャンネル。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "desho-desho-final-cry-baby-best",
    categories: ["楽曲", "ライブ・イベント"],
    difficulty: "中級",
    question:
      "「アニソン神曲カバーでしょdeショー!!」のリニューアル前最終回にて、鈴木愛理がこれまでのオーイシマサヨシのカバーの中で「一番良かった」と選んだ楽曲は？",
    choices: ["Cry Baby", "うまぴょい伝説", "紅蓮の弓矢", "青のすみか"],
    answerIndex: 0,
    explanation:
      "正解は「Cry Baby」(Official髭男dism、TVアニメ『東京卍リベンジャーズ』OPテーマ)。番組のリニューアル前最終回にて、鈴木愛理がこれまでのオーイシマサヨシのカバーの中で「一番良かった」と選んだ楽曲。同じ最終回では、2人でのラストカバーとして「secret base〜君がくれたもの〜」も披露されている。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "yantan-225-manager-wish",
    categories: ["パーソナリティ"],
    difficulty: "上級",
    question: "オーイシマサヨシのマネージャーが「直してほしい」と思っている、オーイシの一面は？",
    choices: ["もう少しだけ話を聞いてほしい", "時間にルーズなところ", "すぐ話が脱線するところ", "忘れ物が多いところ"],
    answerIndex: 0,
    explanation:
      "正解は「もう少しだけ話を聞いてほしい」。「オーイシマサヨシのMBSヤングタウン」第225回で明かされた、マネージャーがオーイシに直してほしいと思っている点。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "jingu-stadium-anison-holy-ground",
    categories: ["パーソナリティ", "ライブ・イベント"],
    difficulty: "中級",
    question: "オーイシマサヨシ(大石昌良)が、アニソンシンガーとしての「聖地」だと語る場所は？",
    choices: ["神宮球場", "東京ドーム", "横浜スタジアム", "甲子園球場"],
    answerIndex: 0,
    explanation:
      "正解は「神宮球場」。TVアニメ『ダイヤのA』関連のオンリーイベントにて、OxTとして初めて大舞台での歌唱を経験した場所であり、「オーイシマサヨシのMBSヤングタウン」第91回にて、本人がアニソンシンガーとしての聖地と語っている。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "koume-tayu-budokan-vol2-guest",
    categories: ["パーソナリティ", "ライブ・イベント"],
    difficulty: "中級",
    question:
      "オーイシマサヨシが好きな芸人として名前を挙げたことがあり、「オーイシ武道館Vol.2」では「あとの祭り」のゲストとして登場した芸人は？",
    choices: ["コウメ太夫", "粗品", "和田まんじゅう", "鈴木もぐら"],
    answerIndex: 0,
    explanation:
      "正解は「コウメ太夫」。オーイシマサヨシが好きな芸人として名前を挙げたことがあり、「オーイシ武道館Vol.2」の「あとの祭り」ではゲストとして登場し、コミカルな掛け合いを披露した。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "pizza-radio-coyote-mokou",
    categories: ["パーソナリティ"],
    difficulty: "上級",
    question:
      "オーイシマサヨシの名言「もこう君さぁ…」が生まれた、「オーイシ×加藤のピザラジオ」のボードゲーム回のゲームタイトルは？",
    choices: ["コヨーテ", "スカル", "ウミガメのスープ", "コンプレックス人狼"],
    answerIndex: 0,
    explanation:
      "正解は「コヨーテ」。ボードゲーム「コヨーテ」をプレイした回にて生まれた、もこうへの名言「もこう君さぁ…」の元ネタとなった回。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "parallel-world-8th-single",
    categories: ["楽曲"],
    difficulty: "中級",
    question:
      "オーイシマサヨシとしての活動が多忙になっていく中で、改めて弾き語りでどこまでできるのかをチャレンジしたいという思いで作られた、アーバンな雰囲気かつファンクジャズ要素もある、大石昌良8枚目のシングル楽曲は？",
    choices: ["パラレルワールド", "ボーダーライン", "うしろのしょうめん", "幻想アンダーグラウンド"],
    answerIndex: 0,
    explanation:
      "正解は「パラレルワールド」。2018年3月リリースの大石昌良名義8枚目のシングルで、オーイシマサヨシとしての活動が多忙になっていく中、改めて弾き語りでどこまで表現できるかに挑戦したいという思いから制作された、アーバンな雰囲気とファンクジャズ要素を併せ持つ楽曲。",
    relatedHref: "/works/parallel-world",
    relatedLabel: "「パラレルワールド」のページを見る",
  },
  {
    id: "gensou-underground-4th-single",
    categories: ["楽曲"],
    difficulty: "中級",
    question:
      "神戸市営地下鉄が舞台となった、恋愛喜劇・悲劇のような内容で、大人なジャズテイストも加えた大石昌良4枚目のシングルは？",
    choices: ["幻想アンダーグラウンド", "ダイヤモンド", "うしろのしょうめん", "ボーダーライン"],
    answerIndex: 0,
    explanation:
      "正解は「幻想アンダーグラウンド」。2009年10月リリースの大石昌良ソロ4作目のシングルで、神戸市営地下鉄を舞台にした恋愛喜劇・悲劇のような内容の歌詞に、ジャズ・スウィング要素を加えた大人な雰囲気の楽曲。複数のテレビ番組でエンディングテーマとしても使用された。",
    relatedHref: "/works/gensou-underground",
    relatedLabel: "「幻想アンダーグラウンド」のページを見る",
  },
  {
    id: "kiteretsu-poemer-hikigatari-cover",
    categories: ["楽曲"],
    difficulty: "中級",
    question: "次のうち、大石昌良名義で弾き語りセルフカバーがリリースされているものは？",
    choices: ["奇天烈ポエマー", "楽園都市", "ベイビーミュージックライダー", "ぼうやの夢よ"],
    answerIndex: 0,
    explanation:
      "正解は「奇天烈ポエマー」。ゲーム『A3!』のキャラクターソングとして提供した楽曲だが、大石昌良のシングル『パラレルワールド』(EP仕様)に「奇天烈ポエマー(弾き語りver.)」としてセルフカバー版が収録されている。",
    relatedHref: "/works/kiteretsu-poemer",
    relatedLabel: "「奇天烈ポエマー」のページを見る",
  },
  {
    id: "pierrot-interlude-instrument",
    categories: ["楽曲"],
    difficulty: "上級",
    question: "大石昌良の楽曲「ピエロ」にて、間奏で紹介されない楽器(パート)は次のうちどれ？",
    choices: ["ピアノ", "トランペット", "ギター", "スキャット"],
    answerIndex: 0,
    explanation:
      "正解は「ピアノ」。「ピエロ」の間奏では、トランペット・ギター・スキャットが順に紹介されるパートがあるが、ピアノは登場しない。",
    relatedHref: "/works/pierrot-oishi",
    relatedLabel: "「ピエロ」のページを見る",
  },
  {
    id: "compass-lyrics-hibi",
    categories: ["楽曲"],
    difficulty: "上級",
    question:
      "Sound Schedule「コンパス」の歌詞「この先にある 名も無き○○へ 負けんな負けんな 今をつなぐ」の○○に入る言葉は？",
    choices: ["日々", "未来", "明日", "世界"],
    answerIndex: 0,
    explanation:
      "正解は「日々」。「この先にある 名も無き日々へ 負けんな負けんな 今をつなぐ」という歌詞。ライブではラスサビ前に、お客さんによるサビの合唱パートがある。",
    relatedHref: "/works/compass-sound-schedule",
    relatedLabel: "「コンパス」のページを見る",
  },
  {
    id: "hoeru-inu-to-kimi-1st-single",
    categories: ["楽曲"],
    difficulty: "中級",
    question:
      "男と女の「揺らぎ」・「相克」をドラマティックに描いた、Sound Schedule 1stシングルの表題曲は？",
    choices: ["吠える犬と君", "月が落ちる前に…", "シチューが飲みたくなる唄", "君という花"],
    answerIndex: 0,
    explanation:
      "正解は「吠える犬と君」。2001年9月19日リリースのSound Schedule 1stシングルの表題曲で、日本テレビ系『アッコとマチャミの新型テレビ』のエンディングテーマにもなった。男と女の「揺らぎ」「相克」をドラマティックに描いた楽曲。",
    relatedHref: "/works/hoeru-inu-to-kimi",
    relatedLabel: "「吠える犬と君」のページを見る",
  },
  {
    id: "sound-schedule-reunion-motto",
    categories: ["プロフィール・経歴"],
    difficulty: "中級",
    question:
      "2011年に再結成したSound Scheduleが、バンドとして掲げたモットー(スタイル)である「二度と○○しないバンド」の○○に入る言葉は？",
    choices: ["解散", "後悔", "妥協", "無理"],
    answerIndex: 0,
    explanation:
      "正解は「解散」。2011年の再結成にあたり、Sound Scheduleが掲げたモットー(スタイル)が「二度と解散しないバンド」。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "porsche-favorite-car",
    categories: ["パーソナリティ"],
    difficulty: "中級",
    question:
      "オーイシマサヨシが2021年に納車を報告し、2026年2月には新たな一台を迎えたことでも話題になった、愛車の自動車メーカーは？",
    choices: ["ポルシェ", "ベンツ", "BMW", "アウディ"],
    answerIndex: 0,
    explanation:
      "正解は「ポルシェ」。オーイシマサヨシは愛車としてポルシェを繰り返し購入していることで知られ、2021年の納車に続き、2026年2月にも新たなポルシェの納車を報告している。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "yantan-199-arrangement-fee",
    categories: ["パーソナリティ"],
    difficulty: "上級",
    question:
      "事務所で問題にもなってしまった、「オーイシマサヨシのMBSヤングタウン」第199回にてオーイシマサヨシが公開した、自身の編曲料は？",
    choices: ["35万円", "15万円", "50万円", "20万円"],
    answerIndex: 0,
    explanation:
      "正解は「35万円」。「オーイシマサヨシのMBSヤングタウン」第199回でオーイシが自身の編曲料を公開したところ、数年前から値上げをせずにきてしまっていたことが判明し、後輩などの相場にも影響を与えてしまう事態に。これをきっかけに、その後編曲料を大幅に値上げしたという。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "banana-no-kawa-niki",
    categories: ["パーソナリティ"],
    difficulty: "中級",
    question:
      "Snow Man・佐久間大介の投稿がきっかけでオーイシマサヨシがバナナを皮ごと食べることが判明し、そこからつけられたあだ名は？",
    choices: ["バナナの皮ニキ", "バナナ番長", "皮ごと侍", "バナナ仙人"],
    answerIndex: 0,
    explanation:
      "正解は「バナナの皮ニキ」。佐久間大介がバナナを皮ごと食べる投稿をしたところ、オーイシマサヨシが以前から同様に皮ごと食べていたことが判明し、ファンから「バナナの皮ニキ」と呼ばれるように。「オーイシ武道館Vol.2」の本編前映像でも「#バナナの皮ニキ」として話題にされた。なお実際には、皮ごと食べられる特殊な品種のバナナだった。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "ssa-day1-hands-zetton",
    categories: ["ライブ・イベント"],
    difficulty: "中級",
    question: "オーイシSSA Day1「Hands」(『ウルトラマンR/B』OPテーマ)にて登場した、シリーズを代表する怪獣は？",
    choices: ["ゼットン", "バルタン星人", "レッドキング", "ゴモラ"],
    answerIndex: 0,
    explanation:
      "正解は「ゼットン」。オーイシSSA Day1の「Hands」では、ウルトラマンロッソ・ブルーとともに、シリーズを代表する怪獣ゼットンがゲストとして登場した。",
    relatedHref: "/works/hands",
    relatedLabel: "「Hands」のページを見る",
  },
  {
    id: "ready-steady-derby-key-change",
    categories: ["楽曲"],
    difficulty: "上級",
    question:
      "オーイシマサヨシのセルフカバーアルバム『仮歌』シリーズでは、提供した仮歌がほぼ原キーのまま収録されているが、レコーディングでのキー変更などにより本家と異なるキーで収録されている例外的な楽曲は？",
    choices: ["Ready!! Steady!! Derby!!", "最強の推し！", "サインはB", "シンガロン進化論"],
    answerIndex: 0,
    explanation:
      "正解は「Ready!! Steady!! Derby!!」(劇場版『ウマ娘 プリティーダービー 新時代の扉』主題歌)。デモ段階では完成形より半音低いキーだったが、完成音源を聴いた大石は「サビなんかは4人がマジで競争してるみたいな、ゲートが開いてお互いを高め合いながら駆け出していく画が浮かびました」と語っている。",
    relatedHref: "/works/ready-steady-derby-kariuta-3",
    relatedLabel: "「Ready!! Steady!! Derby!!」のページを見る",
  },
  {
    id: "magical-music-tour-4th-album",
    categories: ["楽曲"],
    difficulty: "中級",
    question:
      "当時自分に足りていないと感じていた、エンタメに特化した楽曲づくりがテーマとされた大石昌良4thアルバムのタイトルは？",
    choices: ["マジカルミュージックツアー", "あの街この街", "G.D. アトラクション", "31マイスクリーム"],
    answerIndex: 0,
    explanation:
      "正解は「マジカルミュージックツアー」。2013年2月リリースの大石昌良ソロ4thアルバムで、ミュージカルを観ているかのようなポップな表現を取り入れた完全セルフプロデュース作品。",
    relatedHref: "/works/magical-music-tour",
    relatedLabel: "「マジカルミュージックツアー」のページを見る",
  },
  {
    id: "kiwi-batake-lyrics-84",
    categories: ["楽曲"],
    difficulty: "上級",
    question:
      "大石昌良「キウイ畑の宇宙船」の歌詞「チケット・トゥ・ザ・スペース 時代遅れのポンコツ○○」の○○に入る数字は？",
    choices: ["84", "77", "99", "72"],
    answerIndex: 0,
    explanation:
      "正解は「84」。「チケット・トゥ・ザ・スペース 時代遅れのポンコツ'84」という歌詞で、旧式のロケット/宇宙船をイメージしたユーモラスなフレーズ。",
    relatedHref: "/works/kiwi-batake-no-uchuusen",
    relatedLabel: "「キウイ畑の宇宙船」のページを見る",
  },
  {
    id: "rozan-b-sunday-yonchan-tv",
    categories: ["プロフィール・経歴"],
    difficulty: "上級",
    question:
      "サウスケ(Sound Schedule)時代に関西のラジオ番組「Bサンデー」で共演し、自身がテーマソングを提供した「よんちゃんTV」で再び共演することとなった芸人コンビは？",
    choices: ["ロザン", "麒麟", "笑い飯", "COWCOW"],
    answerIndex: 0,
    explanation:
      "正解は「ロザン」。Sound Schedule時代、MBSラジオ「Bサンデー」(2002年4月〜2004年3月)でロザン(菅広文・宇治原史規)と共演。後にMBS「よんちゃんTV」のOP/EDテーマ「嗚呼、素晴らしき日常」を書き下ろし、同番組で再び共演することとなった。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "kotoba-sagashi-pv-memory",
    categories: ["パーソナリティ"],
    difficulty: "上級",
    question:
      "大石昌良が、Sound Schedule時代のPV撮影の中で最も印象に残っていると語るのは、どの楽曲のPVか？",
    choices: ["ことばさがし", "ピーターパン・シンドローム", "吠える犬と君", "君という花"],
    answerIndex: 0,
    explanation:
      "正解は「ことばさがし」。このPVでは、大石が髪型を七三に整え、メガネをかけてバニーちゃんを膝に乗せ、ほっぺにキスされるというシーンを撮影。画面には映らない場所に事務所スタッフら大勢が待機しており、「お～!」「ヒュ～ヒュ～!」と囃し立てられるのが恥ずかしくてたまらず、「みんなどこかに行ってほしい」と本気で思うほど印象に残った撮影だったという。",
    relatedHref: "/works/kotoba-sagashi",
    relatedLabel: "「ことばさがし」のページを見る",
  },
  {
    id: "shinwaku-algorithm-riria-duet",
    categories: ["楽曲"],
    difficulty: "中級",
    question: "オリジナルアニメMVが制作された、シンガーソングライター・りりあ。とのデュエット楽曲は？",
    choices: ["神或アルゴリズム", "恋はエクスプロージョン", "沼", "ロールプレイング"],
    answerIndex: 0,
    explanation:
      "正解は「神或アルゴリズム」。シンガーソングライター・りりあ。とのデュエット楽曲で、作詞・作曲・編曲に加え、オリジナルアニメーションによるミュージックビデオの原案・プロデュースもオーイシマサヨシ自身が手がけた。",
    relatedHref: "/works/shinwaku-algorithm",
    relatedLabel: "「神或アルゴリズム」のページを見る",
  },
  {
    id: "hollow-hunger-overlord4-op",
    categories: ["楽曲"],
    difficulty: "中級",
    question:
      "情熱的で思わず踊りたくなるような、狂気に狂って踊ってしまうような要素を取り入れたと大石が語る、TVアニメ『オーバーロードIV』オープニングテーマは？",
    choices: ["HOLLOW HUNGER", "Clattanoia", "GO CRY GO", "Silent Solitude"],
    answerIndex: 0,
    explanation:
      "正解は「HOLLOW HUNGER」。2022年7月リリースのOxT12thシングルで、『オーバーロードIV』のオープニングテーマ。従来のOxTのデジタルロック路線とは違う方向性を目指し、スパニッシュな要素を取り入れることで、大石は「情熱的で思わず踊りたくなる、狂気に狂って踊ってしまうような」楽曲を目指したと語っている。",
    relatedHref: "/works/hollow-hunger",
    relatedLabel: "「HOLLOW HUNGER」のページを見る",
  },
  {
    id: "fire-lyrics-bouken",
    categories: ["楽曲"],
    difficulty: "上級",
    question:
      "大石昌良「ファイヤー！」の歌詞「日々に喝采を 常に感動を 宵闇に大いなる○○を」の○○に入る言葉は？",
    choices: ["冒険", "希望", "情熱", "奇跡"],
    answerIndex: 0,
    explanation:
      "正解は「冒険」。「日々に喝采を 常に感動を 宵闇に大いなる冒険を」という歌詞で、6thアルバム『君に聞かせる物語』にも収録された楽曲。",
    relatedHref: "/works/fire-oishi",
    relatedLabel: "「ファイヤー！」のページを見る",
  },
  {
    id: "anime-theme-song-matching-2",
    categories: ["楽曲"],
    difficulty: "中級",
    question: "次のうち、オーイシマサヨシの楽曲とアニメタイトルの組み合わせとして正しいものはどれ？",
    choices: [
      "ニンゲン ＋『人外教室の人間嫌い教師』",
      "死んだ! ＋『多田くんは恋をしない』",
      "オトモダチフィルム ＋『トミカ絆合体 アースグランナー』",
      "世界が君を必要とする時が来たんだ ＋『勇者が死んだ!』",
    ],
    answerIndex: 0,
    explanation:
      "正解は「ニンゲン＋『人外教室の人間嫌い教師』」(2026年1月リリース、TVアニメ『人外教室の人間嫌い教師』OPテーマ)。他の3つは組み合わせが入れ替わっている。正しくは「死んだ!」は『勇者が死んだ!』、「オトモダチフィルム」は『多田くんは恋をしない』、「世界が君を必要とする時が来たんだ」は『トミカ絆合体 アースグランナー』のオープニングテーマ。",
    relatedHref: "/works/ningen",
    relatedLabel: "「ニンゲン」のページを見る",
  },
  {
    id: "gamagaru-favorite-pokemon",
    categories: ["パーソナリティ"],
    difficulty: "中級",
    question: "オーイシマサヨシが「推しポケモン」として挙げているのは？",
    choices: ["ガマガル", "ピカチュウ", "コダック", "ヒトカゲ"],
    answerIndex: 0,
    explanation:
      "正解は「ガマガル」。きっかけは、ライブに毎回ガマガルのグッズを身に着けて参加する通称「ガマガルおじさん」というファンとの出会いで、サイン会で推しを聞かれた際に「ここで嘘をつくわけにはいかない」とガマガルと即答したことから、その魅力にのめり込んでいったという。",
    relatedHref: "/profile",
    relatedLabel: "プロフィールページを見る",
  },
  {
    id: "chance-oxt-self-cover",
    categories: ["楽曲"],
    difficulty: "中級",
    question:
      "「仮歌」など、セルフカバーも有名なオーイシマサヨシだが、大石昌良が楽曲提供したもののうち、OxTでセルフカバーされたものはどれ？",
    choices: ["チャンス！", "リングオブドランカー", "シンガロン進化論", "たとえ世界がそっぽ向いても"],
    answerIndex: 0,
    explanation:
      "正解は「チャンス！」。三森すずこの9thシングル表題曲(『ダイヤのA actⅡ』EDテーマ)として提供した楽曲で、OxTの2ndアルバム『REUNION』に「チャンス！ -OxT ver.-」としてセルフカバー収録されている。他の3曲はオーイシマサヨシ名義の「仮歌」シリーズでセルフカバーされているが、OxT名義でのセルフカバーはない。",
    relatedHref: "/works/chance-oxt",
    relatedLabel: "「チャンス！ -OxT ver.-」のページを見る",
  },
  {
    id: "myth-and-roid-oxt-cover",
    categories: ["楽曲"],
    difficulty: "中級",
    question:
      "Tom-H@ckは、オーイシマサヨシとのユニットOxTだけでなく、MYTH & ROIDとしても活動しているが、次のうちOxTがカバーしたMYTH & ROIDの楽曲はどれ？",
    choices: ["Paradisus-Paradoxum", "Deal with the devil", "STYX HELIX", "STRENGTH"],
    answerIndex: 0,
    explanation:
      "正解は「Paradisus-Paradoxum」。OxTのシングル『HIGHEST』のカップリングとして、MYTH & ROIDの楽曲「Paradisus-Paradoxum (Mare Tranquillitatis)」をOxTが再構築したカバーバージョンが収録されている。",
    relatedHref: "/works/paradisus-paradoxum-oxt",
    relatedLabel: "「Paradisus-Paradoxum (Mare Tranquillitatis)」(OxT ver.)のページを見る",
  },
  {
    id: "myth-and-roid-clattanoia-cover",
    categories: ["楽曲"],
    difficulty: "中級",
    question:
      "Tom-H@ckは、オーイシマサヨシとのユニットOxTだけでなく、MYTH & ROIDとしても活動しているが、次のうちMYTH & ROIDがカバーしたOxTの楽曲はどれ？",
    choices: ["Clattanoia", "UNION", "Go EXCEED!!", "HOLLOW HUNGER"],
    answerIndex: 0,
    explanation:
      "正解は「Clattanoia」。MYTH & ROIDのシングル『Endless Embrace』のカップリングとして、OxTの代表曲「Clattanoia」を「Clattanoia (penumbral)」としてカバーしている。両ユニットに共通してTom-H@ckが関わっていることから実現したカバー。",
    relatedHref: "/works/clattanoia",
    relatedLabel: "「Clattanoia」のページを見る",
  },
  {
    id: "crossing-toki-shunichi-shinda",
    categories: ["楽曲"],
    difficulty: "中級",
    question: "「声」を届けるカバーソングプロジェクト「CrosSing」にて、声優・土岐隼一が歌った楽曲は？",
    choices: ["死んだ!", "君じゃなきゃダメみたい", "楽園都市", "エンターテイナー"],
    answerIndex: 0,
    explanation:
      "正解は「死んだ!」。『東京リベンジャーズ』羽宮一虎役、『自縛少年花子くん』蒼井茜役、『A3!』瑠璃川幸役など数々の人気作品に出演し、アーティストとしても活動する土岐隼一が、「CrosSing」に2度目の登場。今回は自身も声優として出演するTVアニメ『勇者が死んだ!』のOPテーマ「死んだ!」を歌唱した。",
    relatedHref: "/works/shinda",
    relatedLabel: "「死んだ!」のページを見る",
  },
  {
    id: "kotoba-ijou-ni-lyrics-senritsu",
    categories: ["楽曲"],
    difficulty: "上級",
    question:
      "Sound Schedule「言葉以上に」の歌詞「言葉以上に 伝わるように 溢れ出す○○に込めて」の○○に入る言葉は？",
    choices: ["旋律", "想い", "涙", "鼓動"],
    answerIndex: 0,
    explanation:
      "正解は「旋律」。「言葉以上に 伝わるように 溢れ出す旋律に込めて」という歌詞で、言葉だけでは伝えきれない想いをメロディに乗せて届けるというテーマを象徴するフレーズ。アルバム『PLACE』に収録された楽曲。",
    relatedHref: "/works/kotoba-ijou-ni",
    relatedLabel: "「言葉以上に」のページを見る",
  },
  {
    id: "osananajimi-oishi-composed",
    categories: ["楽曲"],
    difficulty: "上級",
    question: "次のSound Scheduleの楽曲のうち、大石昌良が作曲したものはどれ？",
    choices: ["幼なじみ", "アンサー", "同じ空の下で", "コンパス"],
    answerIndex: 0,
    explanation:
      "正解は「幼なじみ」。大石昌良が作詞・作曲を手掛けた楽曲。他の3曲(「アンサー」「同じ空の下で」「コンパス」)は、作詞は大石昌良が担当しているが、作曲はドラムの川原洋二が手掛けている。",
    relatedHref: "/works/osananajimi",
    relatedLabel: "「幼なじみ」のページを見る",
  },
  {
    id: "budokan-makura-danshi-triangle",
    categories: ["楽曲", "ライブ・イベント"],
    difficulty: "中級",
    question: "「オーイシ武道館」にて「枕男子」の楽曲内で披露された、大石昌良名義の楽曲は？",
    choices: ["トライアングル", "パラレルワールド", "幻想アンダーグラウンド", "ファイヤー！"],
    answerIndex: 0,
    explanation:
      "正解は「トライアングル」。「オーイシ武道館」では「枕男子 ～トライアングル by 大石昌良～」として、大石昌良名義の楽曲「トライアングル」(3rdアルバム『31マイスクリーム』収録)が「枕男子」の楽曲内で披露された。なお「ファイヤー！」は同様の演出で「オーイシSSA」にて披露されている。",
    relatedHref: "/works/triangle-oishi",
    relatedLabel: "「トライアングル」のページを見る",
  },
];
