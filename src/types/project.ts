import { UserGrade } from "./Users";

export interface ProjectNav {
  projectId: number;
  projectTitle: string;
  projectKey: string;
  projectLogo?: string;
  memberGrade: UserGrade;
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
