export type IssueType = "New" | "Changed" | "Feature" | "Fixed" | "Deprecated";

export type IssueStatus = "Todo" | "Progress" | "Review" | "Done";

export interface Manager {
  name: string;
  profileImg?: string;
}
export interface Issue {
  type: IssueType;
  title: string;
  manager?: Manager;
  team: string;
  id: number;
}

export interface DoneIssue extends Issue {
  content?: string;
}

export interface UsedIssue {
  type: IssueType;
  title: string;
  id: number;
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
