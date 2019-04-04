interface FileType {
  id: number;
  name: string;
  url: string;
  stringType: string;
}

export const FileTypeMap: {
  [key: string]: FileType;
} = {
  "0": { id: 0, name: "文档", url: "doc", stringType: "document" },
  "1": { id: 1, name: "文件夹", url: "folder", stringType: "folder" },
  "2": { id: 2, name: "未知类型", url: "files", stringType: "unknown" },
  "3": { id: 3, name: "图片", url: "files", stringType: "img" },
  "4": { id: 4, name: "PDF", url: "files", stringType: "pdf" },
  "5": { id: 5, name: "表格", url: "files", stringType: "xls" },
  "6": { id: 6, name: "文档", url: "files", stringType: "docx" },
  "7": { id: 7, name: "演示文稿", url: "files", stringType: "ppt" },
  "8": { id: 8, name: "音频", url: "files", stringType: "mp3" },
  "9": { id: 9, name: "压缩文件", url: "files", stringType: "zip" },
  "10": { id: 10, name: "视频", url: "files", stringType: "mp4" },
  "11": { id: 11, name: "WPS 文件", url: "files", stringType: "wps" },
  "-1": { id: -1, name: "表格", url: "spreadsheet", stringType: "spreadsheet" },
  "-2": { id: -2, name: "文档", url: "docs", stringType: "newdoc" },
  "-3": { id: -3, name: "表格", url: "sheet", stringType: "sheet" },
  "-4": { id: -4, name: "表格", url: "sheets", stringType: "mosheet" },
  "-5": { id: -5, name: "幻灯片", url: "slides", stringType: "slide" },
  "-6": { id: -6, name: "文档", url: "docx", stringType: "modoc" },
  "-7": { id: -7, name: "思维导图", url: "mindmaps", stringType: "mindmap" },
  "-8": { id: -8, name: "表单", url: "forms", stringType: "form" },
  "-9": { id: -9, name: "白板", url: "boards", stringType: "board" },
};
