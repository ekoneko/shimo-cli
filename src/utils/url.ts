interface FileType {
  id: number;
  name: string;
  url: string;
}

const typeMap: {
  [key: string]: FileType;
} = {
  "0": { id: 0, name: "文档", url: "doc" },
  "1": { id: 1, name: "文件夹", url: "folder" },
  "2": { id: 2, name: "未知类型", url: "files" },
  "3": { id: 3, name: "图片", url: "files" },
  "4": { id: 4, name: "PDF", url: "files" },
  "5": { id: 5, name: "表格", url: "files" },
  "6": { id: 6, name: "文档", url: "files" },
  "7": { id: 7, name: "演示文稿", url: "files" },
  "8": { id: 8, name: "音频", url: "files" },
  "9": { id: 9, name: "压缩文件", url: "files" },
  "10": { id: 10, name: "视频", url: "files" },
  "11": { id: 11, name: "WPS 文件", url: "files" },
  "-1": { id: -1, name: "表格", url: "spreadsheet" },
  "-2": { id: -2, name: "文档", url: "docs" },
  "-3": { id: -3, name: "表格", url: "sheet" },
  "-4": { id: -4, name: "表格", url: "sheets" },
  "-5": { id: -5, name: "幻灯片", url: "slides" },
  "-6": { id: -6, name: "文档", url: "docx" },
  "-7": { id: -7, name: "思维导图", url: "mindmaps" },
  "-8": { id: -8, name: "表单", url: "forms" },
  "-9": { id: -9, name: "白板", url: "boards" },
};

export function getFileUrl(type: string, guid: string) {
  if (typeMap[type]) {
    return `${process.env.APP_URL!}/${typeMap[type].url}/${guid}`;
  }
}
