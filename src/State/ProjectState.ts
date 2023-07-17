import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';
import { ProjectS } from "../types/project";

const { persistAtom } = recoilPersist();

export const projects = atom<ProjectS[]>({
    key: 'projects',
    default: [],
    effects_UNSTABLE: [persistAtom]
});