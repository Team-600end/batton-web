export type UserGrade = "LEADER" | "MEMBER";

export interface ProjectMember {
  grade: UserGrade;
  memberId: number;
  nickname: string;
  profileImage: string;
}

export interface Member {
  memberId: number;
  nickname: string;
  gradeType: UserGrade;
}
