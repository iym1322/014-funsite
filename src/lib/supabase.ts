// Supabaseクライアント(ブラウザ側で使用)。
// 投稿・投票は anon(公開)キー + RLSポリシーで安全に制御している
// (anonキーはINSERT/SELECTのみ可能。UPDATE/DELETEはできない設計)。
// 参照: supabase/schema.sql
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // eslint-disable-next-line no-console
  console.warn(
    "Supabaseの環境変数が設定されていません(.env の PUBLIC_SUPABASE_URL / PUBLIC_SUPABASE_ANON_KEY を確認してください)。投稿・投票機能は動作しません。"
  );
}

export const supabase = createClient(supabaseUrl ?? "", supabaseAnonKey ?? "");

// 投票の重複防止用に、ブラウザごとのランダムトークンをlocalStorageで保持する。
export function getVoterToken(): string {
  const key = "funsite-voter-token";
  let token = localStorage.getItem(key);
  if (!token) {
    token = crypto.randomUUID();
    localStorage.setItem(key, token);
  }
  return token;
}
