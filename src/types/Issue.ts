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
