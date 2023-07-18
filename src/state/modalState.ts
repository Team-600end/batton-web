import { atom } from "recoil";

// 모달은 새로고침 시 닫히는게 일반적이므로, storage를 사용하지 않습니다.

export const navbarProjectDropdown = atom({
    key: 'navbarProjectDropdown',
    default: false,
})

export const navbarNoticeDropdown = atom({
    key: 'navbarNoticeDropdown',
    default: false,
})
