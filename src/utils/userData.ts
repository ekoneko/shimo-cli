import * as fs from "fs";
import * as path from "path";

export function getUserData() {
  if (path.isAbsolute(process.env.USER_DATA!)) {
    return process.env.USER_DATA!;
  }
  return path.join(process.cwd(), process.env.USER_DATA!);
}

export function setUserToken(token: string) {
  const userData = getUserData();
  const tokenPath = path.join(userData, "token");
  fs.writeFileSync(tokenPath, token);
}

export function getUserToken() {
  const userData = getUserData();
  const tokenPath = path.join(userData, "token");
  if (!fs.existsSync(tokenPath)) {
    return "";
  }
  return fs
    .readFileSync(tokenPath)
    .toString()
    .trim();
}
