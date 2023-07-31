export type GradeType = "Member" | "Leader" | "Master";

export interface ProjectNav {
  id: number;
  projectTitle: string;
  projectKey: string;
  logo?: string;
  grade: GradeType;
}

//MainPage-PjCard
export interface ProjectCard {
  projectId: number;
  projectKey: string;
  projectTitle: string;
  projectImg?: string;
  versionMajor: number;
  versionMinor: number;
  versionPatch: number;
  todoIssue: number;
  doingIssue: number;
  myIssue: number;
  doneIssue: number;
  leaderName: string;
  leaderImg?: string;
  memberNum: number;
  bookmark: boolean;
}

export interface ProjectCardMember {
  img?: string;
}
