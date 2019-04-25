import * as fs from "fs";
import * as path from "path";
import { homedir } from "os";
import * as dotenv from "dotenv";
import { sync as mkdirpSync } from "mkdirp";
import { ask } from "./utils/input";

function didUseLocalConf() {
  const basePath = process.cwd();
  if (process.env.NODE_ENV !== "development") {
    return false;
  }
  try {
    const pkg = require(path.join(basePath, "package.json"));
    return pkg.name === "shimo-cli";
  } catch (err) {
    return false;
  }
}

async function initConf(homePath: string) {
  process.stdout.write("welcome to shimo-cli, init now...\n");
  const defaultUserData = path.join(homedir(), ".shimocli");
  const appClientId = await ask("APP_CLIENT_ID:");
  const appClientSecret = await ask("APP_CLIENT_SECRET:");
  const userData = (await ask(`USER DATA(${defaultUserData}):`)) || defaultUserData;
  const template = [
    `APP_CLIENT_ID=${appClientId}`,
    `APP_CLIENT_SECRET=${appClientSecret}`,
    "APP_URL=https://shimo.im",
    "API_URL=https://shimo.im/lizard-api",
    "WS_URL=wss://ws.shimo.im",
    "CONTENT_HEADER_META_PREFIX=x-oss-meta-",
    `USER_DATA=${userData}`,
  ].join("\n");
  mkdirpSync(defaultUserData);
  fs.writeFileSync(homePath, template);
  process.stdout.write(`\nHere is your config (in ${homePath})\n${template}\n`);
  process.stdout.write(
    "The session will exit. You can redo your command or modify your config manually\n",
  );
  process.exit();
}

async function getConfPath() {
  if (didUseLocalConf()) {
    const basePath = process.cwd();
    const confPath = path.join(basePath, ".env.local");
    if (fs.existsSync(confPath)) {
      return confPath;
    }
  }
  const homePath = path.join(homedir(), ".shimoclirc");
  if (!fs.existsSync(homePath)) {
    await initConf(homePath);
  }
  return homePath;
}

export async function config() {
  const confPath = await getConfPath();
  dotenv.config({
    path: confPath,
  });
}
