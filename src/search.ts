import { request } from "./utils/request";
import { File } from "./types";

interface SearchResult {
  next: string;
  results: Array<{
    highlight: {
      name: string;
      content: string;
    };
    source: File & {
      ancestors: File[];
    };
  }>;
}
export async function search(keyword: string, limit: number, params?: string) {
  const url = process.env.API_URL + "/search_v2/files";
  const res = await request({
    url,
    method: "POST",
    body: JSON.stringify({
      keyword,
      limit,
      params,
    }),
  });
  if (res.ok) {
    const { next: nextParams, results }: SearchResult = await res.json();
    return {
      files: results.map(({ source }) => source),
      nextParams,
    };
  } else {
    throw new Error(`Request failed ${res.status} ${res.statusText}`);
  }
}
