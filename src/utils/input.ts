import * as readline from "readline";

export async function ask(label: string, hiddenInput = false) {
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
    function listenInput(result: Buffer) {
      if (hiddenInput) {
        const char = result.toString("utf8");
        switch (char) {
          case "\n":
          case "\r":
          case "\u0004": {
            process.stdin.setRawMode!(false);
            process.stdin.pause();
            process.stdin.off("data", listenInput);
            process.stdout.write("\n");
            resolve(resultString);
            break;
          }
          case "\u0003": {
            process.stdin.setRawMode!(false);
            process.stdin.pause();
            process.stdin.off("data", listenInput);
            process.stdout.write("\n^C");
            process.exit();
          }
          default: {
            resultString += result;
          }
        }
      } else {
        process.stdin.pause();
        process.stdin.off("data", listenInput);
        resolve(result.toString().replace(/\n$/, ""));
      }
    }
    process.stdin.resume().on("data", listenInput);
  });
}

export async function more() {
  process.stdout.write("-- Press Enter --\n");
  return new Promise<boolean>((resolve) => {
    process.stdin.setRawMode!(true);
    process.stdin.resume().on("data", (result: Buffer) => {
      const char = result.toString("utf8");
      switch (char) {
        case "\n":
        case "\r":
        case "\u0004": {
          process.stdin.setRawMode!(false);
          process.stdin.pause();
          clearLine();
          resolve(true);
          break;
        }
        case "\u0003": {
          process.stdin.setRawMode!(false);
          process.stdin.pause();
          process.stdout.write("\n^C");
          process.exit();
        }
      }
    });
  });
}

export function clearLine() {
  readline.moveCursor(process.stdout, 0, -1);
  readline.clearLine(process.stdout, 0);
}

export function readStream() {
  return new Promise<string>((resolve, reject) => {
    process.stdin.resume();
    let data = "";
    process.stdin.on("data", (chunk) => {
      data += chunk;
    });
    process.stdin.on("end", () => {
      process.stdin.pause();
      resolve(data.trim());
    });
    process.stdin.on("error", (err) => {
      reject(err);
    });
  });
}
