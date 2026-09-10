// オーイシ検定の結果シェア用OGP画像を動的生成するAPI。
// クエリパラメータ(score/total/time/nickname/rank)を受け取り、PNG画像を返す。
// satori(@vercel/ogが内部で使用)はCJKフォントを内蔵していないため、
// リクエスト時にネットワーク越しにフォントを取得する構成は避け、
// 可変フォント(Noto Sans JP)をビルド時にバンドルして使う(weightごとに
// 同じデータを指定すると、satoriがその太さを可変フォントから描画してくれる)。
import type { APIRoute } from "astro";
import { ImageResponse } from "@vercel/og";
import notoSansJpVariableUrl from "../../assets/fonts/NotoSansJP-Variable.ttf?url";

export const prerender = false;

let cachedFontData: ArrayBuffer | null = null;

async function loadFontData(origin: string): Promise<ArrayBuffer> {
  if (cachedFontData) return cachedFontData;
  const fontUrl = new URL(notoSansJpVariableUrl, origin);
  const response = await fetch(fontUrl);
  if (!response.ok) throw new Error("フォントの読み込みに失敗しました");
  cachedFontData = await response.arrayBuffer();
  return cachedFontData;
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

  let fontData: ArrayBuffer;
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
    const imageResponse = new ImageResponse(tree as never, {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Noto Sans JP", data: fontData, weight: 400, style: "normal" },
        { name: "Noto Sans JP", data: fontData, weight: 700, style: "normal" },
      ],
    });

    // ImageResponseが返すReadableStreamのボディは、Vercelの(Edgeではなく)
    // Node.jsサーバーレス関数経由だと空のまま届いてしまうことがあるため、
    // 一度バッファに読み切ってから通常のResponseとして返す。
    const buffer = await imageResponse.arrayBuffer();
    if (buffer.byteLength === 0) {
      return new Response("EMPTY_IMAGE_BUFFER: ImageResponse produced 0 bytes", {
        status: 500,
        headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
      });
    }
    return new Response(buffer, {
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
