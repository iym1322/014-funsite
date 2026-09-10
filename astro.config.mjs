// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://014-funsite.vercel.app',
  integrations: [sitemap()],
  // サイト全体は静的出力のまま、クイズ結果のOGPシェア用ページ/画像だけを
  // (各ページの `export const prerender = false` で)動的にレンダリングする。
  adapter: vercel({
    // satori(OGP画像生成)が使うharfbuzzjsはWASMバイナリをfs経由で読み込むため、
    // Vercelのビルド時ファイルトレーサーが自動検出できず、そのままだと
    // 本番のサーバーレス関数にhb.wasmが同梱されずENOENTになる。明示的に含める。
    includeFiles: [
      './node_modules/harfbuzzjs/hb.wasm',
      './node_modules/harfbuzzjs/hb-subset.wasm',
    ],
  }),
});
