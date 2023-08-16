import { getCookie, setCookie } from "@src/state/tokenState";
import {
  emailState,
  nicknameState,
  profileImgState,
} from "@src/state/userState";
import { instanceAuth, instanceNonAuth } from "@src/types/AxiosInterface";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";

export default function KakaoRedirectHandler() {
  const navigate = useNavigate();
  const [userNickname, setUserNickname] = useRecoilState(nicknameState);
  const [userProfileImg, setUserProfileImg] = useRecoilState(profileImgState);
  const [userEmail, setUserEmail] = useRecoilState(emailState);

  let code = new URL(window.location.href).searchParams.get("code");

  //엑세스 토큰 발급 받기
  const kakaoTokenLogin = async () => {
    instanceNonAuth.get(`/auth/kakao/key`).then((response) => {
      if (response.data.code == 200) {
        let grant_type = "authorization_code";
        let client_id = response.data.result.key;
        let redirect_uri = response.data.result.redirect;

        instanceNonAuth
          .post(
            `https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${redirect_uri}&code=${code}`,
            {},
            {
              headers: {
                "Content-type":
                  "application/x-www-form-urlencoded;charset=utf-8",
              },
            }
          )
          .then((response) => {
            instanceNonAuth
              .post(`/auth/kakao/${response.data.access_token}`)
              .then((response) => {
                if (response.data.code == 200) {
                  setCookie("accessToken", response.data.result.accessToken, {
                    path: `/`,
                  });
                  setCookie("refreshToken", response.data.result.refreshToken, {
                    path: `/`,
                  });
                  instanceAuth
                    .get(`/members`)
                    .then((response) => {
                      if (response.data.code == 200) {
                        setUserEmail(response.data.result.email);
                        setUserNickname(response.data.result.nickname);
                        setUserProfileImg(response.data.result.profileImage);
                      }
                    })
                    .catch(() => {
                      alert(`정상적인 접근이 아닙니다`);
                    })
                    .finally(() => navigate("/main"));
                }
              })
              .catch(() => {
                navigate("/login");
              });
          })
          .catch(() => navigate("/login"));
      }
    });
  };

  useEffect(() => {
    kakaoTokenLogin();
  }, []);

  return null;
}
