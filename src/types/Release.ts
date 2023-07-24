import { AbsIssue } from "./Issue";

export interface Release {
    vF: number;
    vM: number;
    vL: number;
    date: string;
    issueList?: AbsIssue[];
    id: number;
}