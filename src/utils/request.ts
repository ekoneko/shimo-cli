import fetch, { BodyInit, Request } from "node-fetch";
import { getUserToken, PREFIX_COOKIE } from "./userData";
const { version } = require("../../package.json");

interface Headers {
  [key: string]: string;
}

interface RequestOptions {
  url: string;
  method: Request["method"];
  body?: BodyInit;
  headers?: Headers;
}

export const defaultHeaders: Headers = {
  accept: "application/vnd.shimo.v2+json",
  "cache-control": "no-cache",
  "user-agent": `shimo-cli/${version}`,
  "content-type": "application/json",
};

export async function request(options: RequestOptions, withToken = true) {
  const headers = options.headers || defaultHeaders;
  if (withToken) {
    const token = getUserToken();
    if (token.startsWith(PREFIX_COOKIE)) {
      const cookie = token.replace(PREFIX_COOKIE, '')
      headers['Cookie'] = cookie
      headers['x-requested-with'] = 'XmlHttpRequest'
      headers['referer'] = options.url
      headers['origin'] = options.url
    } else {
      headers.Authorization = `Bearer ${token}`;
    }
  }
  return fetch(options.url, {
    method: options.method,
    headers: headers,
    body: options.body,
  });
}
