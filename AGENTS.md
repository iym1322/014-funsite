## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## ディスコグラフィー個別ページのルール

`src/data/discography.ts` の `Track` 1件を編集・追加するときのルール。

**ページが作られる条件:** `slug` を設定した曲だけ `/works/[slug]` に個別ページが生成され、`/works` 一覧にもカードとして表示される(`works.astro`/`works/[slug].astro` はどちらも `tracks.filter((t) => t.slug)`)。`slug` が無い曲はアルバム収録曲欄・セットリスト欄でリンク無しのプレーンテキストとして表示されるだけ。

**必須フィールド:** `group`・`type`・`date`・`title` の4つ(メタ行と見出しに必ず出る)。それ以外(`image`・`youtube`・`appleMusic`・`spotify`・`description`など)はすべて任意で、無くても壊れずに省略表示される(画像→プレースホルダー、リンク→「◯◯で検索」フォールバック、説明文→セクション自体非表示)。

**画像(`image`)の取得優先順位:**
1. `public/images/works/` に既にファイルがあればそれを使う(`resolveTrackCoverSrc` がファイル名を正規化して自動マッチングするので、`image`には拡張子なしのファイル名だけ書けばよい)
2. iTunesの公開Search API(`https://itunes.apple.com/lookup?id=<ID>&country=jp`)。`artworkUrl100` の `100x100bb.jpg` を `1200x1200bb.jpg` に書き換えると高解像度の公式ジャケットが取れる
3. 配信されていない古い曲は、EC商品写真(Amazon.co.jp/HMV/Tower Records/CDJapan) → Discogs → 公式レーベル/アーティストサイトの過去ページ → 公式YouTubeサムネイル(`https://img.youtube.com/vi/<動画ID>/maxresdefault.jpg`)の順で試す

**YouTubeリンク(`youtube`)のルール:** 動画が公式チャンネルのものと確認できても、実際のMV(映像作品)でない場合(レーベルの自動生成「Provided to YouTube by …」音源アップロード、短いティザークリップなど)は、`youtube` にリンクは設定しつつ `youtubeAudioOnly: true` も付ける。これにより「YouTubeで見る」リンクは機能するが、ページにiframe埋め込みはされない(`[slug].astro` の `const youtubeId = track.youtubeAudioOnly ? null : getYouTubeId(track.youtube);` が既にこの分岐を持っている)。

**画像・リンクの出典は必ず検証すること:** 憶測でURLやファイルを作らない。公式配信(iTunes/Apple Music/Spotify)・公式YouTubeチャンネルであることを確認してから設定する。
