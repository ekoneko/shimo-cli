import * as fs from "fs";
import * as path from "path";
import * as rimraf from "rimraf";
import { v1 } from "uuid";

export function getUserData() {
  if (path.isAbsolute(process.env.USER_DATA!)) {
    return process.env.USER_DATA!;
  }
  return path.join(process.cwd(), process.env.USER_DATA!);
}

export function removeUserData() {
  const userDataPath = getUserData();
  rimraf.sync(userDataPath);
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

export function readConf(name: string) {
  const userData = getUserData();
  try {
    const result = fs.readFileSync(getConfPath(name)).toString();
    return JSON.parse(result);
  } catch (err) {
    return undefined;
  }
}

export function writeConf(name: string, content: string) {
  fs.writeFileSync(getConfPath(name), content);
}

export function getConfPath(name: string) {
  const userData = getUserData();
  return path.join(userData, name);
}

export function getATempFilePath() {
  const userData = getUserData();
  const prefix = ".tmp";
  return path.join(userData, prefix + v1());
}
