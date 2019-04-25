import { User } from ".";

export interface File {
  guid: string;
  url: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  user: User; // CreatedUser
  updatedUser: User;
  type: string;
  parentId: number;
}

export interface FileWithContentUrl extends File {
  contentUrl: string;
}
