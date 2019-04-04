import { Result } from "meow";
import { FileTypeMap } from "../consts/fileType";
import { createFile } from "../file";
import { parseFolder } from "../utils/cliParser";
import { getContentFromEditor } from "../utils/editor";

export const name = ["file", "create"];
export const description = "Display current user info";
export const command = async (cli: Result) => {
  const type = cli.flags.type;
  const name = cli.input[2];
  const folder = parseFolder(cli);
  if (!name || !type) {
    process.stderr.write("Missing arguments: Need `--type` param");
    process.exit();
  }
  const currentType = Object.values(FileTypeMap).find((fileType) => fileType.stringType === type);
  if (!currentType) {
    process.stderr.write("type is not allowed");
    process.exit();
  }
  const content = cli.flags.content ? await getContentFromEditor() : undefined;
  const createdFile = await createFile({
    type,
    name,
    folder,
    content,
  });
  process.stdout.write("Created " + process.env.APP_URL + createdFile.url);
};
