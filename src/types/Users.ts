export type UserGrade = "LEADER" | "MEMBER";

export interface ProjectMember {
  id: number;
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
