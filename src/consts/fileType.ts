interface FileType {
  id: number;
  name: string;
  url: string;
  stringType: string;
}

export const FileTypeMap: {
  [key: string]: FileType;
} = {
  "0": { id: 0, name: "document(legacy)", url: "doc", stringType: "document" },
  "1": { id: 1, name: "folder", url: "folder", stringType: "folder" },
  "2": { id: 2, name: "unknown", url: "files", stringType: "unknown" },
  "3": { id: 3, name: "picture", url: "files", stringType: "img" },
  "4": { id: 4, name: "PDF", url: "files", stringType: "pdf" },
  "5": { id: 5, name: "Excel", url: "files", stringType: "xls" },
  "6": { id: 6, name: "Word", url: "files", stringType: "docx" },
  "7": { id: 7, name: "PPT", url: "files", stringType: "ppt" },
  "8": { id: 8, name: "Audio", url: "files", stringType: "mp3" },
  "9": { id: 9, name: "ZipFile", url: "files", stringType: "zip" },
  "10": { id: 10, name: "Video", url: "files", stringType: "mp4" },
  "11": { id: 11, name: "WPS", url: "files", stringType: "wps" },
  "-1": { id: -1, name: "sheet(legacy)", url: "spreadsheet", stringType: "spreadsheet" },
  "-2": { id: -2, name: "document", url: "docs", stringType: "newdoc" },
  "-3": { id: -3, name: "sheet(legacy)", url: "sheet", stringType: "sheet" },
  "-4": { id: -4, name: "sheet", url: "sheets", stringType: "mosheet" },
  "-5": { id: -5, name: "slide", url: "slides", stringType: "slide" },
  "-6": { id: -6, name: "classic doc", url: "docx", stringType: "modoc" },
  "-7": { id: -7, name: "mindmap", url: "mindmaps", stringType: "mindmap" },
  "-8": { id: -8, name: "form", url: "forms", stringType: "form" },
  "-9": { id: -9, name: "white board", url: "boards", stringType: "board" },
};
