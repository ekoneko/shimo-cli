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

export function parseLimit(cli: Result, defaultValue: number, max: number, min = 1) {
  const limit = parseInt(cli.flags.limit, 10) || defaultValue;
  return Math.max(min, Math.min(max, limit));
}

export function parseFrom(cli: Result) {
  return cli.flags.from;
}
