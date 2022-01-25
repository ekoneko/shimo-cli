import { Result } from "meow";
import * as cliParser from "../utils/cliParser";
import * as user from "../user";

export const name = "login";
export const description = [
  "login with cookie(Need to get auth cookie from browser manually)",
  "--with-token\tlogin with username and password(Need app client id/secret)",
].join("\n\t");
export const flags = <const>{
  withToken: {
    type: "boolean",
  },
};
export const command = async (cli: Result<typeof flags>) => {
  if (cli.flags.withToken) {
    try {
      const { username, password } = await cliParser.parseAuthInfo(cli);
      if (!username || !password) {
        process.stderr.write("Missing username or password\n");
        process.exit();
      }
      await user.loginWithPassword(username, password);
      process.stdout.write("success\n");
    } catch (err) {
      process.stderr.write((err.message || "login failed") + "\n");
    }
  } else {
    const cookie = await cliParser.parseCookie(cli);
    await user.loginWithCookie(cookie);
  }
};
