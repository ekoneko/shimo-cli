import * as FormData from "form-data";
import * as fs from "fs";
import { request, defaultHeaders } from "./utils/request";
import { File } from "./types";

async function getFormLength(formData: FormData) {
  return new Promise<number>((resolve, reject) => {
    formData.getLength((err, length) => {
      if (err) {
        reject(err);
      } else {
        resolve(length);
      }
    });
  });
}

export async function importFile(filePath: string, folder: string, fileName: string, type: string) {
  const url = process.env.API_URL + "/files/import";
  const form = new FormData();
  form.append("type", type);
  form.append("name", fileName);
  form.append("parentId", folder);
  form.append("file", fs.createReadStream(filePath));
  const contentLength = await getFormLength(form);
  const headers = {
    ...defaultHeaders,
    ...form.getHeaders(),
    accept: "*/*",
    "content-length": contentLength.toString(),
  };
  const res = await request({
    url,
    method: "POST",
    headers,
    body: form,
  });
  if (res.ok) {
    const result: File = await res.json();
    return result;
  } else {
    console.log(await res.text());
    throw new Error(`Request failed ${res.status} ${res.statusText}`);
  }
}
