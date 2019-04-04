import { FileTypeMap } from "../consts/fileType";

export function getFileUrl(type: string, guid: string) {
  if (FileTypeMap[type]) {
    return `${process.env.APP_URL!}/${FileTypeMap[type].url}/${guid}`;
  }
}
