import { UserGrade } from "./Users";

export type CommentType = "ACCEPTED" | "DENIED" | "COMMON";

export interface IssueComment {
  commentContent?: string;
  commentType: CommentType;
  nickname: string;
  createDate: string;
  profileImage?: string;
  memberGrade: UserGrade;
};