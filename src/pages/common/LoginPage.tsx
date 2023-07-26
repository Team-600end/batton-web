import React, { useState, useCallback } from "react";
import login_lefthand_img from "@assets/images/loginPage/login_lefthand.svg";
import login_righthand_img from "@assets/images/loginPage/login_righthand.svg";
import batton_logo_img from "@images/common/batton_logo_big.svg";
import kakao_logo_img from "@assets/images/loginPage/kakao_logo.svg";
import google_logo_img from "@assets/images/loginPage/google_logo.svg";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const data: any[] = [];
  // const response = postData("/api/auth/login", data)

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden">
      <img className="absolute z-0" src={login_lefthand_img} style={{ marginTop: "20vh", marginLeft: "-92vw" }} />
      <img className="relative z-10 mb-2" src={batton_logo_img} />
      <div className="flex flex-col space-y-6 relative z-10 items-center justify-center w-[38vw] p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
        <form className="space-y-6 w-[30vw]">
          <h4 className="text-2xl font-suitM text-[black]">로그인</h4>
          <div>
            <label id="email" className="block mb-2 text-sm font-suitM text-[black]">
              이메일
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-[black] text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="600end@kakao.com"
              required
            />
          </div>
          <div>
            <label id="password" className="block mb-2 text-sm font-suitM text-[black] dark:text-white">
              비밀번호
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder=""
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div className="flex items-start">
            <a href="#" className="ml-auto text-sm font-suitM text-[#1C64F2] hover:underline">
              비밀번호 찾기
            </a>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-[#5AAE8A] h-[5vh] text-md shadow-md hover:bg-[#285F43] focus:ring-4 focus:outline-none focus:ring-[#F9F9F9] font-suitM rounded-lg text-sm px-5 py-2.5 text-center"
          >
            로그인
          </button>
        </form>
        <hr className="w-[30vw] h-px bg-[#DBDBDB] border-0" />
        <button
          type="button"
          className="w-[30vw] h-[5vh] text-black bg-[#FEE500] shadow-md hover:bg-[#E2CC00] focus:ring-4 focus:outline-none focus:ring-[#F9F9F9] font-suitM rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center"
        >
          <img className="mr-2 w-[1.3vw]" src={kakao_logo_img} /> 카카오 로그인
        </button>
        <button
          type="button"
          className="w-[30vw] h-[5vh] text-gray-400 bg-[#FFFFFF] border border-grey-100 shadow-md hover:bg-[#E7E7E7] focus:ring-4 focus:outline-none focus:ring-[#F9F9F9] font-suitM rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center"
        >
          <img className="mr-2" src={google_logo_img} /> 구글 로그인
        </button>
        <div className="text-sm font-suitM text-gray-400">
          계정이 없으신가요?{" "}
          <button onClick={() => navigate(`/signup`)} className="text-[#1C64F2] font-suitM hover:underline ml-[1vw]">
            회원가입 하기
          </button>
        </div>
      </div>
      <img className="absolute z-0" src={login_righthand_img} style={{ marginRight: "-70vw" }} />
    </div>
  );
}
