import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { ProjectNav } from "@typess/project";

const { persistAtom } = recoilPersist();

export const projectNavs = atom<ProjectNav[]>({
  key: "projectNavs",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
