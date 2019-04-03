import { spawn } from "child_process";

export function spawnEditorProcess(filePath: string) {
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
