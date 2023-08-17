import { AbsIssue } from "@typess/Issue";

export type VersionChanged = "Major" | "Minor" | "Patch";

export type PublishType = "PUBLISH" | "UNPUBLISH";

export interface Release {
  versionChanged: VersionChanged;
  versionMajor: number;
  versionMinor: number;
  versionPatch: number;
  createdDate: string;
  issueList?: AbsIssue[];
  releasesId: number;
  isPublished: string;
}

export interface Puzzle {
  versionMajor: number;
  versionMinor: number;
  versionPatch: number;
  createdDate: string;
  issueList?: AbsIssue[];
}
