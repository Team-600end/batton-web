import { AbsIssue } from "./Issue";

export type VersionChanged = "Major" | "Minor" | "Patch";

export interface PuzzleContent {
  releaseDate: Date;
  // title: string; //title은 없음
  issues: AbsIssue[];
}

export interface Puzzle {
  versionChanged: VersionChanged;
  version: string; //Major, Minor, Patch를 합쳐서 버전을 나타냄
  content: PuzzleContent;
}
