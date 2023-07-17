export type GradeType = "Member" | "Leader" | "Master";

export interface projectNav {
  id: number;
  name: string;
  logo?: string;
  grade: GradeType;
}

//MainPage-PjCard
export interface projectCard {
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

export interface projectCardMember {
  img?: string;
}
