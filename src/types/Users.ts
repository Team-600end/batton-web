export type UserGrade = "LEADER" | "MEMBER";

export default interface ProjectMember {
  grade: UserGrade;
  memberId: number;
  nickname: string;
  profileImage: string;
}

export default interface Member {
  memberId: number;
  nickname: string;
  gradeType: UserGrade;
}
