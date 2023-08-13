import React, { useState, useEffect, useCallback } from "react";
import login_lefthand_img from "@assets/images/loginPage/login_lefthand.svg";
import login_righthand_img from "@assets/images/loginPage/login_righthand.svg";
import batton_logo_img from "@images/common/batton_logo_big.svg";
import kakao_logo_img from "@assets/images/loginPage/kakao_logo.svg";
import google_logo_img from "@assets/images/loginPage/google_logo.svg";
import { useNavigate } from "react-router-dom";
import useInput from "@src/hooks/useInput";
import { instanceAuth, instanceNonAuth } from "@typess/AxiosInterface";
import { useCookies } from "react-cookie";
import { emailState, nicknameState, profileImgState } from "@src/state/userState";
import { useRecoilState } from "recoil";
import CommonModal from "@src/components/CommonModal";

interface LoginData {
  email: string;
  password: string;
}

type ValidNOProps = {
  text: string;
};

type ValidOKProps = {
  text: string;
};

const ValidNO: React.FC<ValidNOProps> = ({ text }) => {
  return <p style={{ color: "red", margin: "3px", padding: "0", fontSize: "10pt" }}>{text}</p>;
};

const ValidOK: React.FC<ValidOKProps> = ({ text }) => {
  return <p style={{ color: "green", margin: "3px", padding: "0", fontSize: "10pt" }}>{text}</p>;
};

export default function LoginPage() {
  const navigate = useNavigate();
  const emailRegex = /\S+@\S+\.\S+/;
  const [email, setEmail] = useState(``);
  const [emailStatus, setEmailStatus] = useState("");
  const [password, setPassword] = useState(``);
  const [cookies, setCookie, removeCookie] = useCookies(["accessToken", "refreshToken"]);
  const [userNickname, setUserNickname] = useRecoilState(nicknameState);
  const [userProfileImg, setUserProfileImg] = useRecoilState(profileImgState);
  const [userEmail, setUserEmaiil] = useRecoilState(emailState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      loginRequest(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };

  useEffect(() => {
    // 이메일 형식 검증
    if (email === "") {
      setEmailStatus("");
    } else if (!emailRegex.test(email)) {
      setEmailStatus("이메일 형식이 올바르지 않습니다.");
    } else {
      setEmailStatus("사용 가능한 이메일입니다.");
    }
  }, [email]);

  const loginRequest = async () => {
    // 이메일 필드 검증
    if (!emailRegex.test(email)) {
      alert("이메일 형식이 올바르지 않습니다.");
      return;
    }

    const loginData: LoginData = {
      email: email,
      password: password,
    };

    instanceNonAuth
      .post(`/auth/login`, loginData)
      .then((response) => {
        console.log(response.data);
        if (response.data.accessToken && response.data.accessTokenExpiredDate) {
          setCookie("accessToken", response.data.accessToken, {
            path: `/`,
          });
          setCookie("refreshToken", response.data.refreshToken, {
            path: `/`,
          });
          instanceAuth
            .get(`/members`)
            .then((response) => {
              console.log("=====");
              setUserEmaiil(response.data.result.email);
              setUserNickname(response.data.result.nickname);
              setUserProfileImg(response.data.result.profileImage);
            })
            .catch((error) => {
              console.log(error);
              alert(`정상적인 접근이 아닙니다`);
            });
          navigate(`/main`);
        }
      })
      .catch((error) => {
        console.log(error);
        setIsModalOpen(true);
      });
  };

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden">
      <img className="absolute z-0" src={login_lefthand_img} style={{ marginTop: "20vh", marginLeft: "-92vw" }} />
      <img className="relative z-10 mb-2" src={batton_logo_img} />
      <div className="flex flex-col space-y-6 relative z-10 items-center justify-center w-[38vw] p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
        <form className="space-y-6 w-[30vw]">
          <h4 className="text-2xl font-suitM text-[black]">로그인</h4>
          <div>
            <label className="block mb-2 text-sm font-suitM text-[black]">이메일</label>
            <input
              type="text"
              onChange={onChangeEmail}
              onKeyDown={handleEnterPress}
              className="bg-gray-50 border border-gray-300 text-[black] text-sm rounded-lg focus:outline-none focus:border-gray-300 focus:ring-0 block w-full p-2.5"
            />
            <div>{emailStatus == "사용 가능한 이메일입니다." ? <ValidOK text="" /> : <ValidNO text={emailStatus} />}</div>
          </div>
          <div>
            <label className="block mb-2 text-sm font-suitM text-[black] dark:text-white">비밀번호</label>
            <input
              type="password"
              onChange={onChangePassword}
              onKeyDown={handleEnterPress}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-gray-300 focus:ring-0 block w-full p-2.5"
            />
          </div>
          <div className="flex items-start">
            <button type="button" className="ml-auto text-sm font-suitM text-[#1C64F2] hover:underline" onClick={() => navigate(`/forget-pw`)}>
              비밀번호 찾기
            </button>
          </div>
          <button
            onClick={loginRequest}
            type="button"
            className="w-full text-white bg-[#5AAE8A] h-[5vh] text-md shadow-md hover:bg-[#285F43] focus:ring-4 focus:outline-none focus:ring-[#F9F9F9] font-suitM rounded-lg text-sm px-5 py-2.5 text-center"
          >
            로그인
          </button>
        </form>
        {isModalOpen && (
          <CommonModal title="로그인 실패" description="이메일 혹은 비밀번호가 일치하지 않습니다." btnTitle="확인" closeModal={() => setIsModalOpen(false)} />
        )}
        <hr className="w-[30vw] h-px bg-[#DBDBDB] border-0" />
        <button
          type="button"
          className="w-[30vw] h-[5vh] text-black bg-[#FEE500] shadow-md hover:bg-[#E2CC00] focus:ring-4 focus:outline-none focus:ring-[#F9F9F9] font-suitM rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center"
        >
          <img className="mr-2 w-[1.3vw]" src={kakao_logo_img} /> 카카오 로그인
        </button>
        {/* <button
          type="button"
          className="w-[30vw] h-[5vh] text-gray-400 bg-[#FFFFFF] border border-grey-100 shadow-md hover:bg-[#E7E7E7] focus:ring-4 focus:outline-none focus:ring-[#F9F9F9] font-suitM rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center"
        >
          <img className="mr-2" src={google_logo_img} /> 구글 로그인
        </button> */}
        <div className="text-sm font-suitM text-gray-400">
          계정이 없으신가요?{" "}
          <button onClick={() => navigate(`/signup`)} type="button" className="text-[#1C64F2] font-suitM hover:underline ml-[1vw]">
            회원가입 하기
          </button>
        </div>
      </div>
      <img className="absolute z-0" src={login_righthand_img} style={{ marginRight: "-70vw" }} />
    </div>
  );
}
