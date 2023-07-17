export type IssueType = "New" | "Changed" | "Feature" | "Fixed" | "Deprecated";

export interface manager {
  name: string;
  profileImg?: string;
}

export default interface issue {
  type: IssueType;
  title: string;
  manager?: manager;
  team: string;
  index: number;
}
