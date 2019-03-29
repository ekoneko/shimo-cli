import { Result } from "meow";

interface AuthInfo {
  username: string;
  password: string;
}

export function parseAuthInfo(cli: Result): AuthInfo {
  return {
    username: cli.input[1],
    password: cli.input[2],
  };
}
