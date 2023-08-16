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
  progress: number; //진행중
  todo: number; //진행 전
  done: number; //완료
  mine: number; //내 이슈
  percentage: number; //진행률
  memberNum: number;
  leaderNickname: string;
  leaderProfileImg?: string;
}

export interface ProjectCardMember {
  img?: string;
}

//프로젝트 목록 검색 조회
export interface ProjectSearch {
  projectId: number;
  projectTitle: string;
  projectLogo?: string;
}
