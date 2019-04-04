import * as qs from "querystring";
import { request } from "./utils/request";
import { File } from "./types";
import { FileTypeMap } from "./consts/fileType";

export async function getFileList(guid?: string) {
  const url = process.env.API_URL + "/files";
  const query = guid ? qs.stringify({ folder: guid }) : "";
  const res = await request({
    url: `${url}?${query}`,
    method: "GET",
  });
  if (res.ok) {
    const result: File[] = await res.json();
    return result;
  } else {
    throw new Error(`Request failed ${res.status} ${res.statusText}`);
  }
}

export async function getUpdated(limit: number, from = Date.now()) {
  return getDashboard("updated", limit, from);
}

export async function getUsed(limit: number, from = Date.now()) {
  return getDashboard("used", limit, from);
}

export async function getCreated(limit: number, from = Date.now()) {
  return getDashboard("created", limit, from);
}

export async function getShared(limit: number, from = Date.now()) {
  return getDashboard("shared", limit, from);
}

export async function getDashboard(type: string, limit: number, from = Date.now()) {
  const url = process.env.API_URL + "/files";
  const query = qs.stringify({
    type,
    limit,
    lastTimestamp: from,
  });
  const res = await request({
    url: `${url}?${query}`,
    method: "GET",
  });
  if (res.ok) {
    const { list, nextURL } = await res.json();
    return list as File[];
  } else {
    throw new Error(`Request failed ${res.status} ${res.statusText}`);
  }
}

export async function getStarred() {
  const url = process.env.API_URL + "/files/starred";
  const res = await request({
    url: `${url}`,
    method: "GET",
  });
  if (res.ok) {
    const result: File[] = await res.json();
    return result;
  } else {
    throw new Error(`Request failed ${res.status} ${res.statusText}`);
  }
}

export async function getShortcuts() {
  const url = process.env.API_URL + "/desktop_shortcuts?pageSize=-1";
  const res = await request({
    url: `${url}`,
    method: "GET",
  });
  if (res.ok) {
    const result: Array<{ file: File; fileId: number }> = await res.json();
    return result.map(({ file }) => {
      file.type = FileTypeMap[file.type].stringType;
      return file;
    });
  } else {
    throw new Error(`Request failed ${res.status} ${res.statusText}`);
  }
}

export async function getTrash() {
  const url = process.env.API_URL + "/files/trash";
  const res = await request({
    url: `${url}`,
    method: "GET",
  });
  if (res.ok) {
    const result: File[] = await res.json();
    return result;
  } else {
    throw new Error(`Request failed ${res.status} ${res.statusText}`);
  }
}
