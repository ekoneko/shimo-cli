import { toPairs, toArray, values } from "lodash";
import { display } from "./table";

export enum FormatType {
  TEXT = "text",
  JSON = "json",
  ONELINE = "oneline",
}

const TextPaddingSpaceCount = 2;

export const allowedTypes = [FormatType.TEXT, FormatType.JSON];

function formatText(data: any, level = 0) {
  let result = "";
  const paddingLeft = " ".repeat(level * TextPaddingSpaceCount);
  if (!data) {
    result += `${paddingLeft}\n`;
  } else if (typeof data !== "object") {
    result += paddingLeft + data;
  } else if (data instanceof Array) {
    result += data
      .reduce((pre, cur, index) => {
        pre[index] = `${paddingLeft}${formatText(cur, level)}`;
        return pre;
      }, [])
      .join("\n");
  } else {
    for (const [k, v] of toPairs(data)) {
      if (!v || typeof v !== "object") {
        result += `${paddingLeft}${k}: ${v}`;
      } else {
        result += `${paddingLeft}${k}:\n${formatText(v, level + 1)}`;
      }
      result += "\n";
    }
  }
  return result;
}

function formatOneline(data: any, stdout = process.stdout) {
  const arrayData = toArray(data);
  if (!arrayData[0]) {
    return "";
  } else if (["string", "number"].includes(typeof arrayData[0])) {
    return arrayData.join("\n");
  } else if (typeof arrayData[0] === "object") {
    const keys = Object.keys(arrayData[0]);
    const table = arrayData.map((item) => {
      return keys.reduce<string[]>((pre, cur) => {
        pre.push(
          ["string", "number"].includes(typeof item[cur]) ? item[cur] : values(item[cur]).join(" "),
        );
        return pre;
      }, []);
    });
    return display(table, stdout);
  } else {
    stdout.write("\n");
  }
}

export function format(data: any, type: FormatType, stdout = process.stdout) {
  switch (type) {
    case FormatType.JSON: {
      const result = JSON.stringify(data);
      stdout.write(result + "\n");
      break;
    }
    case FormatType.ONELINE: {
      formatOneline(data, stdout);
      break;
    }
    case FormatType.TEXT:
    default: {
      const result = formatText(data);
      stdout.write(result + "\n");
    }
  }
}
