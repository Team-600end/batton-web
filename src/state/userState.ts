import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const nicknameState = atom({
    key: 'nickname',
    default: '',
    effects_UNSTABLE: [persistAtom]
});

export const profileImgState = atom({
    key: 'profileImg',
    default: '',
    effects_UNSTABLE: [persistAtom]
});

export const emailState = atom({
    key: 'email',
    default: '',
    effects_UNSTABLE: [persistAtom]
})

// rabbitMQ Connection
export const noticeConnectionState = atom({
    key: 'noticeConnection',
    default: false,
    effects_UNSTABLE: [persistAtom]
})

// 닉네임, 이메일, 프로필 사진 필요