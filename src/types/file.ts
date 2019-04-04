import { User } from ".";

export interface File {
  guid: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  user: User; // CreatedUser
  updatedUser: User;
  type: string;
  parentId: number;
}
