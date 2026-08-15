// 投稿の「自分の投稿だけ削除できる」機能のための共通処理。
// ログイン機能が無いサイトのため、投稿時にランダムなトークンを生成し、
// そのSHA-256ハッシュをDBに保存する。トークン本体はブラウザのlocalStorageにのみ
// 保持し、削除時にDB関数(RPC)へ渡してハッシュ照合する(生トークンはDBに残らない)。
// 制約: ブラウザのデータを消す/別端末で開くと、その投稿は削除できなくなる。

export function generateOwnerToken(): string {
  return crypto.randomUUID();
}

export async function hashOwnerToken(token: string): Promise<string> {
  const bytes = new TextEncoder().encode(token);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function storageKey(namespace: string): string {
  return `funsite-owned-${namespace}`;
}

function readMap(namespace: string): Record<string, string> {
  try {
    const raw = localStorage.getItem(storageKey(namespace));
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveOwnerToken(namespace: string, postId: string, token: string): void {
  const map = readMap(namespace);
  map[postId] = token;
  localStorage.setItem(storageKey(namespace), JSON.stringify(map));
}

export function getOwnerToken(namespace: string, postId: string): string | null {
  return readMap(namespace)[postId] ?? null;
}

export function removeOwnerToken(namespace: string, postId: string): void {
  const map = readMap(namespace);
  delete map[postId];
  localStorage.setItem(storageKey(namespace), JSON.stringify(map));
}
