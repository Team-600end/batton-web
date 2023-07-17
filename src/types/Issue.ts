export type IssueType = "New" | "Changed" | "Feature" | "Fixed" | "Deprecated";

export interface Manager {
    name: string;
    profileImg?: string;
}

export default interface Issue {
    type: IssueType;
    title: string;
    manager?: Manager;
    team: string;
    index: number;
};