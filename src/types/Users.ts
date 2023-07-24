export type UserGrade = "LEADER" | "MEMBER";

export default interface ProjectMember {
  id: number;
  grade: UserGrade;
  memberId: number;
  nickname: string;
  profileImage: string;
}
