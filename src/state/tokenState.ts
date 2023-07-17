import { atom, selector } from "recoil";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export interface Tokens {
    accessToken: string;
    refreshToken: string;
};

export const setTokens = (name: string, value: Tokens, options: any) => {
  return cookies.set(name, value, {...options});
};

export const getTokens = (name: string) => {
  return cookies.get(name);
};

export const removeTokens = (name: string) => {
  return cookies.remove(name);
};
