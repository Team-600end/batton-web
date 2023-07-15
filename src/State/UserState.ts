import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const nickname = atom({
    key: 'nickname',
    default: '',
    effects_UNSTABLE: [persistAtom]
});