import React, { useState, useCallback } from "react";
import signup_hand_image from "../assets/images/signupPage/signup_hand3.svg";
import batton_logo_img from "../assets/images/batton_logo_auth.svg";

export default function SignupPage() {
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
            <label
              id="email"
              className="block mb-2 text-sm font-suitM text-gray-900 dark:text-white"
            >
              이메일
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="6oo@kakao.com"
              required
            />
          </div>
          <div>
            <label
              id="nickname"
              className="block mb-2 text-sm font-suitM text-gray-900 dark:text-white"
            >
              닉네임
            </label>
            <input
              type="nickname"
              name="nickname"
              id="nickname"
              placeholder=""
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
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
              name="password"
              id="password"
              placeholder=""
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div className="pb-[3vh]">
            <label
              id="password-check"
              className="block mb-2 text-sm font-suitM text-gray-900 dark:text-white"
            >
              비밀번호 확인
            </label>
            <input
              type="password"
              name="password-check"
              id="password-check"
              placeholder=""
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-[#5AAE8A] shadow-md hover:bg-[#285F43] focus:ring-4 focus:outline-none focus:ring-[#F9F9F9] font-suitM rounded-lg text-sm px-5 py-2.5 text-center"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}
