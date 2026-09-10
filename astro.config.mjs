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
  adapter: vercel(),
});
