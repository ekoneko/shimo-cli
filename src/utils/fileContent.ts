import fetch from "node-fetch";
import { Content } from "../types/content";

export async function requestContent(contentUrl: string): Promise<Content> {
  const res = await fetch(contentUrl);
  const prefix = process.env.CONTENT_HEADER_META_PREFIX;
  const head = Number(res.headers.get(`${prefix}head`) || 0);
  const length = Number(res.headers.get(`${prefix}length`) || 0);
  const content = await res.text();
  return {
    head: head,
    pool: content.slice(length),
    content: content.slice(0, length),
  };
}
