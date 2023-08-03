export type IssueType = "New" | "Changed" | "Feature" | "Fixed" | "Deprecated";

export type IssueStatus = "Todo" | "Progress" | "Review" | "Done";

export interface Manager {
  name: string;
  profileImg?: string;
}
export interface Issue {
  issueTag: IssueType;
  issueTitle: string;
  issueId: number;
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
  issueContent?: string;
}

export interface UsedIssue {
  issueTag: IssueType;
  issueTitle: string;
  issueId: number;
}
export interface MyIssues {
  issueId: number;
  issueTitle: string;
  issueTag: IssueType;
  issueStatus: IssueStatus;
  updateDate: string;
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
