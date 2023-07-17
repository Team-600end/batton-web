import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { projectNav } from "@typess/project";

const { persistAtom } = recoilPersist();

export const projectNavs = atom<projectNav[]>({
  key: "projectNavs",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
