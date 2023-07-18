export type GradeType = "Member" | "Leader" | "Master";

export interface ProjectNav {
  id: number;
  name: string;
  logo?: string;
  grade: GradeType;
}

//MainPage-PjCard
export interface ProjectCard {
  number: number;
  name: string;
  version: string;
  index: number;
  logo?: string;
  todoissue: number;
  doingissue: number;
  myissue: number;
  doneissue: number;
  leader: string;
  membernum: number;
}

export interface ProjectCardMember {
  img?: string;
}
