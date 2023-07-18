import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const nickname = atom({
    key: 'nickname',
    default: '',
    effects_UNSTABLE: [persistAtom]
});


// 닉네임, 이메일, 프로필 사진