import { atom } from "recoil";

// 모달은 새로고침 시 닫히는게 일반적이므로, storage를 사용하지 않습니다.

export const navbarProjectDd = atom({
    key: 'navbarProjectDd',
    default: false,
})

export const navbarNoticeDd = atom({
    key: 'navbarNoticeDd',
    default: false,
})

export const navbarProfileDd = atom({
    key: 'navbarProfileDd',
    default: false,
})
