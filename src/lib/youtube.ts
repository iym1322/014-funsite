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

async function fetchLatestFromPlaylist(playlistId: string) {
  try {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${playlistId}&maxResults=10&key=${YOUTUBE_API_KEY}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    const items = (data.items ?? []).filter(
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
      const latest = await fetchLatestFromPlaylist(s.playlistId);
      if (!latest) return null;
      return { source: s.source, channelUrl: s.channelUrl, ...latest };
    })
  );

  return results.filter((r): r is LatestVideo => r !== null);
}
