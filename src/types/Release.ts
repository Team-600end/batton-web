import { AbsIssue } from "@typess/Issue";

export type VersionChanged = "Major" | "Minor" | "Patch";

export interface Release {
    versionChanged: VersionChanged;
    versionMajor: number;
    versionMinor: number;
    versionPatch: number;
    date: string;
    issueList?: AbsIssue[];
    id: number;
}

export interface Puzzle {
    versionMajor: number;
    versionMinor: number;
    versionPatch: number;
    date: string;
    issueList?: AbsIssue[];
}