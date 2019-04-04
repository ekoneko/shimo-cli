import { request } from "./utils/request";
import { File } from "./types";

// type: string, folder: string = "0", content?: string
interface CreateFileParams {
  type: string;
  name: string;
  folder: string;
  content?: string;
}

export async function createFile(options: CreateFileParams) {
  const url = process.env.API_URL + "/files";
  const params: any = {
    folder: options.folder,
    name: options.name,
    type: options.type,
  };
  if (options.content) {
    params.content = options.content;
  }
  const res = await request({
    url,
    method: "POST",
    body: JSON.stringify(params),
  });
  if (res.ok) {
    const result: File = await res.json();
    return result;
  } else {
    throw new Error(`Request failed ${res.status} ${res.statusText}`);
  }
}

export async function deleteFile(guid: string) {
  const url = `${process.env.API_URL}/files/${guid}`;
  const res = await request({
    url,
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error(`Request failed ${res.status} ${res.statusText}`);
  }
}
