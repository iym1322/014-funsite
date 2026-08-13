// オーイシ名場面ページの「最新動画」カルーセル用。
// ビルド時にYouTube Data API v3で各配信元の最新動画を取得する
// (YOUTUBE_API_KEY はPUBLIC_を付けないサーバー専用のビルド時環境変数)。
// API呼び出しが失敗しても(未設定/割り当て超過/ネットワークエラー)ビルド自体は
// 落とさず、取得できたものだけを表示する。

const YOUTUBE_API_KEY = import.meta.env.YOUTUBE_API_KEY;

export type LatestVideo = {
  source: string;
  videoId: string;
  title: string;
  thumbnail: string;
  publishedAt: string;
  channelUrl: string;
};

type SourceDef = { source: string; playlistId: string; channelUrl: string };

// playlistIdは各配信元の「アップロード動画」プレイリスト(チャンネルの場合は
// チャンネルIDの先頭 UC を UU に置き換えたもの)、または直接指定のプレイリスト。
const sources: SourceDef[] = [
  {
    source: "公式チャンネル",
    playlistId: "UU6FmznwRG0CpdjtNyHucmTA",
    channelUrl: "https://www.youtube.com/@Masayoshi014",
  },
  {
    source: "弾き語りラボ",
    playlistId: "UU3TvY0biJcMRzQyu5hyOkXw",
    channelUrl: "https://www.youtube.com/channel/UC3TvY0biJcMRzQyu5hyOkXw",
  },
  {
    source: "でしょでしょ",
    playlistId: "PLRlGJA3aVEXCcsgivBffHlHegVIYKP2wk",
    channelUrl: "https://www.youtube.com/playlist?list=PLRlGJA3aVEXCcsgivBffHlHegVIYKP2wk",
  },
  {
    source: "ピザラジ",
    playlistId: "UUeWZN7rNRQaHCtMCdHEZFqw",
    channelUrl: "https://www.youtube.com/channel/UCeWZN7rNRQaHCtMCdHEZFqw",
  },
  {
    source: "ヤンタン",
    playlistId: "UUkzmIaEmGVYNGIPafmrTMog",
    channelUrl: "https://www.youtube.com/channel/UCkzmIaEmGVYNGIPafmrTMog",
  },
];

// "PT1M23S" のようなISO8601形式の動画尺を秒数に変換する。
function parseDurationSeconds(iso: string): number {
  const match = iso.match(/^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/);
  if (!match) return 0;
  const h = parseInt(match[1] ?? "0", 10);
  const m = parseInt(match[2] ?? "0", 10);
  const s = parseInt(match[3] ?? "0", 10);
  return h * 3600 + m * 60 + s;
}

// YouTube Data APIにはショート動画かどうかを示す項目がないため、
// 60秒以下の動画をショートとみなして除外する簡易的な判定。
const SHORT_MAX_SECONDS = 60;

async function fetchLatestFromPlaylist(playlistId: string, excludeShorts: boolean) {
  try {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${playlistId}&maxResults=10&key=${YOUTUBE_API_KEY}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    let items = (data.items ?? []).filter(
      (item: any) =>
        item.contentDetails?.videoPublishedAt &&
        item.snippet?.title !== "Private video" &&
        item.snippet?.title !== "Deleted video"
    );
    if (items.length === 0) return null;

    // プレイリストの並び順は必ずしも新しい順とは限らないため、実際の公開日時で並べ替える。
    items.sort(
      (a: any, b: any) =>
        new Date(b.contentDetails.videoPublishedAt).getTime() -
        new Date(a.contentDetails.videoPublishedAt).getTime()
    );

    if (excludeShorts) {
      const ids = items.map((item: any) => item.contentDetails.videoId).join(",");
      const durationRes = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${ids}&key=${YOUTUBE_API_KEY}`
      );
      if (durationRes.ok) {
        const durationData = await durationRes.json();
        const durations = new Map<string, number>(
          (durationData.items ?? []).map((v: any) => [v.id, parseDurationSeconds(v.contentDetails.duration)])
        );
        const longEnough = items.filter(
          (item: any) => (durations.get(item.contentDetails.videoId) ?? Infinity) > SHORT_MAX_SECONDS
        );
        // 直近の候補が全部ショートだった場合は、除外せず元の並びにフォールバックする。
        if (longEnough.length > 0) items = longEnough;
      }
    }

    const latest = items[0];
    return {
      videoId: latest.contentDetails.videoId as string,
      title: latest.snippet.title as string,
      thumbnail: (latest.snippet.thumbnails?.high?.url ?? latest.snippet.thumbnails?.medium?.url ?? "") as string,
      publishedAt: latest.contentDetails.videoPublishedAt as string,
    };
  } catch {
    return null;
  }
}

export async function fetchLatestVideos(): Promise<LatestVideo[]> {
  if (!YOUTUBE_API_KEY) return [];

  const results = await Promise.all(
    sources.map(async (s) => {
      const latest = await fetchLatestFromPlaylist(s.playlistId, true);
      if (!latest) return null;
      return { source: s.source, channelUrl: s.channelUrl, ...latest };
    })
  );

  return results.filter((r): r is LatestVideo => r !== null);
}

// ページ最下部の配信元リンク一覧用。APIの取得結果に関係なく常に表示できるよう、
// 静的なチャンネル情報だけを切り出して公開する。
export const channelSources: { source: string; channelUrl: string }[] = sources.map((s) => ({
  source: s.source,
  channelUrl: s.channelUrl,
}));
