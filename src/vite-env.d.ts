/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_KAKAO_KEY: string;
    readonly VITE_KAKAO_REDIRECT: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}