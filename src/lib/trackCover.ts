import fs from "node:fs";
import path from "node:path";

const extensions = ["jpg", "jpeg", "png", "webp"];
const worksDir = path.join(process.cwd(), "public", "images", "works");

function normalizeName(value: string) {
  return value
    .normalize("NFKC")
    .toLocaleLowerCase("ja")
    .replace(/[^\p{L}\p{N}]/gu, "");
}

export function resolveTrackCoverSrc(
  image: string | undefined,
  title: string,
  fallbackImages: string[] = []
): string | null {
  if (!fs.existsSync(worksDir)) return null;

  const files = fs.readdirSync(worksDir);
  const candidates = [image, title, ...fallbackImages].filter(
    (candidate): candidate is string => Boolean(candidate)
  );

  for (const candidate of candidates) {
    const normalizedCandidate = normalizeName(candidate);
    const matchingFile = files.find((file) => {
      const extension = path.extname(file).slice(1).toLowerCase();
      return extensions.includes(extension) && normalizeName(path.parse(file).name) === normalizedCandidate;
    });
    if (matchingFile) return `/images/works/${encodeURIComponent(matchingFile)}`;
  }

  return null;
}
