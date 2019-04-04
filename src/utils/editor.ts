import * as fs from "fs";
import { spawn } from "child_process";
import { getATempFilePath } from "./userData";

export async function editFile(filePath: string) {
  return new Promise<void>((resolve) => {
    const editor = process.env.EDITOR || "vi";
    const child = spawn(editor, [filePath], {
      stdio: "inherit",
    });
    child.on("exit", () => {
      resolve();
    });
  });
}

export async function getContentFromEditor(initContent: string = "") {
  const editTempFile = getATempFilePath();
  fs.writeFileSync(editTempFile, initContent);
  await editFile(editTempFile);
  const content = fs.readFileSync(editTempFile).toString();
  fs.unlinkSync(editTempFile);
  return content;
}
