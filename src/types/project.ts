export type GradeType = "Member" | "Leader" | "Master";

export interface ProjectS {
    id: number;
    name: string;
    logo?: string;
    grade: GradeType;
}