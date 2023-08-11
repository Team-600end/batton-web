export type IssueType = "NEW" | "CHANGED" | "FEATURE" | "FIXED" | "DEPRECATED";

export type IssueStatus = "TODO" | "PROGRESS" | "REVIEW" | "DONE" | "RELEASED";

export interface Manager {
  name: string;
  profileImg?: string;
}
export interface Issue {
  issueId: number;
  issueTitle: string;
  issueTag: IssueType;
  issueKey: number;
  nickname?: string;
  profileImage?: string;
}

export interface AbsIssue {
  type: IssueType;
  title: string;
  // id: number;
}

export interface DoneIssue extends Issue {
  issueSeq: number;
  issueStatus: IssueStatus;
}

export interface UsedIssue extends Issue {
  startPosition?: number;
  endPosition?: number;
  issueSeq: number;
  issueStatus: IssueStatus;
}

export interface EnrolledIssue {
  issueId: number;
  startPosition?: number;
  endPosition?: number;
}

export interface MyIssues {
  issueId: number;
  issueTitle: string;
  issueTag: IssueType;
  issueStatus: IssueStatus;
  updatedDate: string;
  projectTitle: string;
}

export interface BoardIssue {
  id: number;
  issueTitle: string;
  issueTag: IssueType;
  issueStatus: IssueStatus;
  nickname: string;
  profileImg: string;
}

export interface DonutData {
  toDoCnt: number;
  progressCnt: number;
  reviewCnt: number;
  completeCnt: number;
}

export interface DonutConfig {
  series: number[];
  options: any;
}
