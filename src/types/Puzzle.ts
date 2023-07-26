export type VersionChanged = "Major" | "Minor" | "Patch";

export interface PuzzleContent {
  title: string;
}

export interface Puzzle {
  versionChanged: VersionChanged;
  version: string; //Major, Minor, Patch를 합쳐서 버전을 나타냄
  content: PuzzleContent;
}
