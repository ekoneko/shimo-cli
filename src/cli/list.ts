import { Result } from "meow";
import { pick, camelCase } from "lodash";
import {
  getFileList,
  getUpdated,
  getCreated,
  getShared,
  getUsed,
  getStarred,
  getShortcuts,
  getTrash,
} from "../list";
import { format } from "../utils/format";

const DEFAULT_FIELDS = ["guid", "name", "createdAt", "updatedAt", "user.name"];
// other fields:  "user", "updatedUser", "type"

const MAX_LIMIT = 150;
const DEFAULT_LIMIT = 20;

function getLimit(cli: Result) {
  const limit = parseInt(cli.flags.limit, 10) || DEFAULT_LIMIT;
  return Math.max(1, Math.min(MAX_LIMIT, limit));
}

function getFrom(cli: Result) {
  return cli.flags.from;
}

async function getFiles(category: string, cli: Result) {
  switch (category) {
    case "updated":
      return getUpdated(getLimit(cli), getFrom(cli));
    case "used":
      return getUsed(getLimit(cli), getFrom(cli));
    case "created":
      return getCreated(getLimit(cli), getFrom(cli));
    case "shared":
      return getShared(getLimit(cli), getFrom(cli));
    case "starred":
      return getStarred();
    case "shortcuts":
      return getShortcuts();
    case "trash":
      return getTrash();
    default:
      return getFileList(category);
  }
}

export const name = ["list"];
export const description = "display file list from desktop or folder";
export const command = async (cli: Result) => {
  const files = await getFiles(cli.input[1], cli);
  const fields: string[] = cli.flags.fields
    ? (cli.flags.fields as string).split(",")
    : DEFAULT_FIELDS;
  const result = files.map((file) => pick(file, fields));
  process.stdout.write(format(result, cli.flags.format) + "\n");
};
