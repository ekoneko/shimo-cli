import { Result } from "meow";
import { ask } from "./input";

interface AuthInfo {
  username: string;
  password: string;
}

export async function parseAuthInfo(cli: Result): Promise<AuthInfo> {
  const username = cli.input[1] ? cli.input[1] : await ask("Input Email or Mobile number:");
  const password = cli.input[2] ? cli.input[2] : await ask("Input Password:", true);
  return {
    username: username.trim(),
    password: password.trim(),
  };
}

export async function parseCookie(cli: Result): Promise<string> {
  const cookie = cli.input[1] || await ask("Input cookie name and value(like shimo_sid=xxxx):")
  if (!cookie.includes('=')) {
    throw new Error('Cookie format not match')
  }
  return cookie
}

export function parseLimit(cli: Result, defaultValue: number, max: number, min = 1) {
  const limit = parseInt(cli.flags.limit, 10) || defaultValue;
  return Math.max(min, Math.min(max, limit));
}

export function parseFrom(cli: Result) {
  return cli.flags.from;
}

export function parseFolder(cli: Result) {
  if (typeof cli.flags.folder !== "string") {
    return "0";
  }
  if (cli.flags.folder.match(/\w{16}/)) {
    return cli.flags.folder;
  }
  throw new Error("Folder is not a guid");
}
