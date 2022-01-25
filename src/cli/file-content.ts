import { Result } from "meow";
import { getFileInfo } from "../file";
import { requestContent } from "../utils/fileContent";
import { format, FormatType } from "../utils/format";

export const name = ["file", "content"];
export const description = ["output file content", "--content-only"].join("\n\t");
export const flags = <const>{
  contentOnly: {
    type: "boolean",
  },
  format: {
    type: "string",
    default: "text",
  },
};

export const command = async (cli: Result<typeof flags>) => {
  if (!cli.input[2]) {
    process.stdout.write("No file to read");
    process.exit();
  }
  const guid = cli.input[2];
  try {
    const fileContent = await getFileInfo(guid);
    const { contentUrl } = fileContent;
    const content = await requestContent(contentUrl);
    if (cli.flags.contentOnly) {
      process.stdout.write(content.content);
    } else {
      format(content, cli.flags.format as FormatType);
    }
  } catch (err) {
    process.stderr.write("Read file failed", err);
  }
};
