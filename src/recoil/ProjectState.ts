import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export interface Project {
    id: number;
    name: string;
    myGrade: string;
}

export const projects = atom<Project[]>({
    key: 'projects',
    default: [],
    effects_UNSTABLE: [persistAtom]
})