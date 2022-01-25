import { Result } from "meow";
import * as path from "path";
import * as fs from "fs";
import * as download from "download";
import { exportFile } from "../file";
import { clearLine } from "../utils/input";

export const name = ["export"];
export const description = [
  "Export a file to disk",
  "shimo-cli export $guid $localPath",
  "--type export as docx|pdf|jpg|md default is docx",
].join("\n\t");
export const flags = <const>{
  type: {
    type: "string",
  },
};

const allowedTypes = ["docx", "pdf", "jpg", "md"];

async function checkFile(exportDir: string, type: "file" | "dir") {
  return new Promise<Boolean>((resolve) => {
    fs.stat(exportDir, (err, stat) => {
      if (err) {
        return resolve(false);
      }
      if (type === "dir") {
        return resolve(stat.isDirectory());
      } else if (type === "file") {
        return resolve(stat.isFile());
      }
      return resolve(true);
    });
  });
}

function downloadFile(downloadUrl: string, localPath: string) {
  return new Promise<void>((resolve, reject) => {
    download(downloadUrl)
      .on("response", (res) => {
        const total = +res.headers["content-length"];
        let downloadSize = 0;
        res.on("data", (data: Buffer) => {
          downloadSize += data.length;
          const progress = downloadSize / total;
          clearLine();
          process.stdout.write(`${Math.floor(progress * 100)}%\n`);
        });
        res.on("end", () => {
          process.stdout.write("\n");
          resolve();
        });
        res.on("error", (err: any) => {
          reject();
        });
      })
      .pipe(fs.createWriteStream(localPath));
  });
}

export const command = async (cli: Result<typeof flags>) => {
  const guid = cli.input[1];
  const exportPath = cli.input[2];
  const exportDir = path.parse(exportPath).dir;

  if (!(await checkFile(exportDir, "dir"))) {
    process.stderr.write(`${exportDir} no such directory`);
    process.exit();
  }

  const type = cli.flags.type || allowedTypes[0];
  if (!allowedTypes.includes(type)) {
    process.stderr.write(`Unknown export type.\nWe support ${allowedTypes.join(", ")}.`);
    process.exit();
  }
  const name = guid;
  const downloadUrl = await exportFile(guid, type, name);
  try {
    process.stdout.write(`Downloading: ${downloadUrl}\n`);
    await downloadFile(downloadUrl, exportPath);
    process.stdout.write("Export done");
  } catch (err) {
    process.stderr.write("Export failed");
  }
};
