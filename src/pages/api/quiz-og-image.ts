// オーイシ検定の結果シェア用OGP画像を動的生成するAPI。
// クエリパラメータ(score/total/time/nickname/rank)を受け取り、PNG画像を返す。
//
// @vercel/ogは内部でsatori+resvgをEdge Runtime向けにバンドルしており、
// そのNode.js版ビルド(dist/index.node.js)はharfbuzzjsのコードをesbuildで
// ESM形式にインライン展開している。この際、harfbuzzjs内の`require("fs")`が
// 静的解析できずesbuildの「Dynamic require of ... is not supported」という
// 常にthrowするスタブに置き換えられてしまい、Vercel上のNode.jsサーバーレス
// 関数で実行すると例外になる(本番で実際に確認済み)。
// これを避けるため、@vercel/ogを使わず、satoriとresvg-jsを直接使用する。
// satoriは公式ビルドでharfbuzzjsを外部パッケージとして通常のimportで参照して
// おり、Node実行時はharfbuzzjs自身の素のCommonJSコードとして解決されるため、
// 上記の壊れたバンドル経路を通らない。resvg-jsもWASMではなくネイティブ
// バイナリ(N-API)なので同種の問題が起きない。
//
// フォントは可変フォント(fvarテーブルあり)ではなく、Regular/Boldの
// 静的ウェイトファイルを別々に使う。satoriが使うopentype.jsのフォーク
// (@shuding/opentype.js)はfvarテーブルのaxis名解決時にfont.namesを
// 参照するが、このビルドではname table自体が実装されておらずfont.namesが
// 常にundefinedのため、可変フォントを渡すと必ずクラッシュする
// (本番で実際に確認済み)。
import type { APIRoute } from "astro";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import notoSansJpRegularUrl from "../../assets/fonts/NotoSansJP-Regular.ttf?url";
import notoSansJpBoldUrl from "../../assets/fonts/NotoSansJP-Bold.ttf?url";

export const prerender = false;

let cachedFonts: { regular: ArrayBuffer; bold: ArrayBuffer } | null = null;

async function loadFontData(origin: string): Promise<{ regular: ArrayBuffer; bold: ArrayBuffer }> {
  if (cachedFonts) return cachedFonts;
  const [regularRes, boldRes] = await Promise.all([
    fetch(new URL(notoSansJpRegularUrl, origin)),
    fetch(new URL(notoSansJpBoldUrl, origin)),
  ]);
  if (!regularRes.ok || !boldRes.ok) throw new Error("フォントの読み込みに失敗しました");
  cachedFonts = {
    regular: await regularRes.arrayBuffer(),
    bold: await boldRes.arrayBuffer(),
  };
  return cachedFonts;
}

function el(type: string, props: Record<string, unknown> = {}, children?: unknown) {
  return { type, props: { ...props, children } };
}

export const GET: APIRoute = async ({ url }) => {
  const score = Math.max(0, Math.floor(Number(url.searchParams.get("score") ?? "0")));
  const total = Math.max(1, Math.floor(Number(url.searchParams.get("total") ?? "1")));
  const timeSec = Math.max(0, Number(url.searchParams.get("time") ?? "0"));
  const nickname = (url.searchParams.get("nickname") ?? "名無し").slice(0, 20);
  const rank = (url.searchParams.get("rank") ?? "").slice(0, 20);
  const isPerfect = score === total;

  const eyebrowText = "オーイシ検定 | 014 BASE";
  const rankText = rank || `${nickname}の記録`;
  const scoreText = `${score} / ${total} 問正解`;
  const timeText = `平均解答タイム ${timeSec.toFixed(1)}秒`;

  let fontData: { regular: ArrayBuffer; bold: ArrayBuffer };
  try {
    fontData = await loadFontData(url.origin);
  } catch (err) {
    const message = err instanceof Error ? `${err.message}\n${err.stack ?? ""}` : String(err);
    return new Response(`FONT_LOAD_ERROR: ${message}`, {
      status: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
    });
  }

  const tree = el(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "1200px",
        height: "630px",
        background: isPerfect
          ? "linear-gradient(135deg, #3a1f5c 0%, #5c3d00 55%, #e6b93d 100%)"
          : "linear-gradient(135deg, #1b1030 0%, #3a1f5c 100%)",
        color: "#ffffff",
        fontFamily: "Noto Sans JP",
      },
    },
    [
      el(
        "div",
        { style: { fontSize: 34, opacity: 0.85, marginBottom: 18, fontWeight: 400 } },
        eyebrowText
      ),
      el(
        "div",
        {
          style: {
            display: "flex",
            fontSize: 30,
            padding: "10px 32px",
            borderRadius: 999,
            background: isPerfect ? "linear-gradient(90deg,#f0b429,#ffdf7e)" : "rgba(255,255,255,0.15)",
            color: isPerfect ? "#5c3d00" : "#ffffff",
            marginBottom: 34,
            fontWeight: 700,
          },
        },
        rankText
      ),
      el("div", { style: { fontSize: 100, fontWeight: 700, marginBottom: 20 } }, scoreText),
      el("div", { style: { fontSize: 42, opacity: 0.9, fontWeight: 400 } }, timeText),
    ]
  );

  try {
    const svg = await satori(tree as never, {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Noto Sans JP", data: fontData.regular, weight: 400, style: "normal" },
        { name: "Noto Sans JP", data: fontData.bold, weight: 700, style: "normal" },
      ],
    });

    const resvg = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } });
    const pngBuffer = resvg.render().asPng();

    if (pngBuffer.byteLength === 0) {
      return new Response("EMPTY_IMAGE_BUFFER: render produced 0 bytes", {
        status: 500,
        headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
      });
    }

    return new Response(pngBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (err) {
    const message = err instanceof Error ? `${err.message}\n${err.stack ?? ""}` : String(err);
    return new Response(`RENDER_ERROR: ${message}`, {
      status: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
    });
  }
};
