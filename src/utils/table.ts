// import { padEnd } from "lodash";

function getTextLength(text: string) {
  const chineseWords = text.match(/[^\x00-\xff]/g);
  return text.length + (chineseWords ? chineseWords.length : 0);
}

function padEnd(text: string, length: number) {
  const textLength = getTextLength(text);
  if (textLength > length) {
    return text;
  }
  return text + " ".repeat(length - textLength);
}

function textWrap(text: string, count: number, suffix = "...") {
  return text.slice(0, count) + suffix;
}

export function display(data: string[][], stdout = process.stdout) {
  const maxLength = stdout.columns;
  const cellLength: number[] = [];
  data.forEach((row) =>
    row.forEach((cell, index) => {
      const length = getTextLength(cell);
      cellLength[index] = cellLength[index] ? Math.max(cellLength[index], length) : length;
    }),
  );
  const result = data
    .map((row) => row.map((cell, index) => padEnd(cell, cellLength[index] + 2)).join(""))
    .join("\n");
  stdout.write(result);
}
