import React, { useState, useCallback } from "react";
import signup_hand_image from "@assets/images/signupPage/signup_hand3.svg";
import batton_logo_img from "@images/common/batton_logo_big.svg";
import { useNavigate } from "react-router-dom";
import { instanceNonAuth } from "@src/types/AxiosInterface";
import useInput from "@src/hooks/useInput";

export default function SignupPage() {
  const [email, onChangeEmail] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, , setPassword] = useInput("");
  const [checkPassword, , setCheckPassword] = useInput("");

  const navigate = useNavigate();

  interface SignupData {
    email: string;
    nickname: string;
    password: string;
    checkPassword: string;
  }

  const signupData: SignupData = {
    email: email,
    nickname: nickname,
    password: password,
    checkPassword: checkPassword,
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    // 비밀번호 재확인 관련 추가 필요.
  };

  const onChangePasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckPassword(e.target.value);
    // 비밀번호 재확인 관련 추가 필요.
  };

  const signupRequest = async () => {
    try {
      const result = instanceNonAuth.post(`/auth/signup`, signupData);
      console.log(result);

      // if (!(await result).isSuccess) throw new Error;
      // // return 값 조건 추가 필요.

      alert("회원가입이 완료되었습니다.");
      alert("로그인을 진행해주세요.");
      navigate(`/login`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden">
      <img
        className="absolute z-0"
        src={signup_hand_image}
        style={{ marginTop: "20vh", marginLeft: "-45vw" }}
      />
      <img className="relative z-10 mb-4" src={batton_logo_img} />
      <div className="flex flex-col space-y-6 relative z-10 items-center justify-center w-[38vw] p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
        <form className="space-y-6 w-[30vw]">
          <h4 className="text-2xl font-suitM text-gray-900">회원가입</h4>
          <div>
            <label className="block mb-2 text-sm font-suitM text-gray-900">
              이메일
            </label>
            <input
              type="text"
              onChange={onChangeEmail}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="이메일을 입력하세요"
            />
          </div>
          <div>
            <label
              id="nickname"
              className="block mb-2 text-sm font-suitM text-gray-900"
            >
              닉네임
            </label>
            <input
              type="nickname"
              onChange={onChangeNickname}
              placeholder="닉네임을 입력하세요"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div>
            <label
              id="password"
              className="block mb-2 text-sm font-suitM text-gray-900 dark:text-white"
            >
              비밀번호
            </label>
            <input
              type="password"
              onChange={onChangePassword}
              placeholder="비밀번호를 입력하세요"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div className="pb-[3vh]">
            <label
              className="block mb-2 text-sm font-suitM text-gray-900 dark:text-white"
            >
              비밀번호 확인
            </label>
            <input
              type="password"
              onChange={onChangePasswordCheck}
              placeholder="비밀번호를 재입력 하세요"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <button
            onClick={signupRequest}
            className="w-full text-white bg-[#5AAE8A] shadow-md hover:bg-[#285F43] focus:ring-4 focus:outline-none focus:ring-[#F9F9F9] font-suitM rounded-lg text-sm px-5 py-2.5 text-center"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}
