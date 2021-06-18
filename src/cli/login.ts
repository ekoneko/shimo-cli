import { Result } from "meow";
import * as cliParser from "../utils/cliParser";
import * as user from "../user";

export const name = "login";
export const description = [
  "login with username and password",
  "--with-cookie\tlogin from cookie"
].join("\n\t");
export const command = async (cli: Result) => {
  if (cli.flags.withCookie) {
    const cookie = await cliParser.parseCookie(cli)
    await user.loginWithCookie(cookie)
    return
  }
  try {
    process.stdout.write("Note: Login will failed if trigger captcha\n");
    process.stdout.write("Use login --with-cookie replaced\n\n");
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
};
