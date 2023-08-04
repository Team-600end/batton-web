export type UserGrade = "LEADER" | "MEMBER";

export default interface ProjectMember {
  grade: UserGrade;
  memberId: number;
  nickname: string;
  profileImage?: string;
}

export interface Member {
  memberId: number;
  nickname: string;
  gradeType: UserGrade;
}

export interface CpMember {
  grade: UserGrade;
  memberId: number;
  nickname: string;
  email: string;
  profileImage?: string;
}