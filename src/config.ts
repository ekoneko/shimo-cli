import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";

function getConfPath() {
  const basePath = process.cwd();
  const localConfPath = path.join(basePath, ".env.local");
  const defaultConfPath = path.join(basePath, ".env");
  if (process.env.NODE_ENV !== "production" && fs.existsSync(localConfPath)) {
    return localConfPath;
  }
  return defaultConfPath;
}

export function config() {
  const confPath = getConfPath();
  dotenv.config({
    path: confPath,
  });
}
