import { Result } from "meow";
import { rejects } from "assert";

interface AuthInfo {
  username: string;
  password: string;
}

async function askInput(label: string, hiddenInput = false) {
  return new Promise<string>((resolve) => {
    if (!process.stdin.setRawMode) {
      // not support
      hiddenInput = false;
    }
    process.stdout.write(label);
    if (hiddenInput) {
      process.stdin.setRawMode!(true);
    }
    let resultString = "";
    process.stdin.resume().on("data", (result: Buffer) => {
      if (hiddenInput) {
        const char = result.toString("utf8");
        switch (char) {
          case "\n":
          case "\r":
          case "\u0004": {
            process.stdin.setRawMode!(false);
            process.stdin.pause();
            process.stdout.write("\n");
            resolve(resultString);
            break;
          }
          case "\u0003": {
            process.stdin.setRawMode!(false);
            process.stdin.pause();
            process.stdout.write("\n^C");
            process.exit();
          }
          default: {
            resultString += result;
          }
        }
      } else {
        process.stdin.pause();
        resolve(result.toString());
      }
    });
  });
}

export async function parseAuthInfo(cli: Result): Promise<AuthInfo> {
  const username = cli.input[1] ? cli.input[1] : await askInput("Input email or mobile number:");
  const password = cli.input[2] ? cli.input[2] : await askInput("Input Password:", true);
  return {
    username: username.trim(),
    password: password.trim(),
  };
}
