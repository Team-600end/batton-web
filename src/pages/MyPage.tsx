import React from "react";
import profile_img from "../assets/images/myPage/profile_icon.png";
import Navbar from "../components/Navbar";

export default function MyPage() {
  return (
    <>
      <Navbar />
      <div className="relative w-screen h-screen flex flex-col mt-12">
        <div
          className="flex flex-row items-center mt-[40px]"
          style={{ marginLeft: "16.9312vw" }}
        >
          <div className="w-[10px] h-[27px] bg-primary-5 mr-[10px]"></div>
          <p className="text-[28px] font-bold text-gray-900">내 정보 수정</p>
        </div>
        <div className="flex flex-row w-screen " style={{}}>
          <div
            className="flex flex-col w-screen mt-[40px] items-center"
            style={{ width: "13.8889vw", marginLeft: "24.2540vw" }}
          >
            <img className="w-[106px] h-auto" src={profile_img}></img>
            <p className="text-[16px] font-medium text-gray-900 mt-[20px]">
              계정
            </p>
            <p className="text-[20px] font-semibold text-gray-900 mt-[16px]">
              batton@gachon.ac.kr
            </p>
          </div>
          <div
            className="flex flex-col mt-[40px] ml-[64px]"
            style={{ width: "28.3730vw" }}
          >
            <div>
              <label
                id="nickname"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
            <div className="mt-[16px]">
              <label
                id="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
            <div className="mt-[16px]">
              <label
                id="password-check"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
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
            <div className=" mt-[16px]">
              <label
                id="dropzone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                프로필 사진 수정
              </label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-60 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold"></span>이미지를 클릭하거나
                      드래그하여 업로드하세요
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div
          className="flex flex-row justify-center space-x-5"
          style={{ marginTop: "6.2159vh" }}
        >
          <button
            type="button"
            className="text-white bg-error-3 hover:bg-error-2 focus:ring-4 focus:ring-error-2 font-medium rounded-lg text-sm px-9 py-3.5 mr-2 mb-2 dark:bg-error-3 dark:hover:bg-error-2 focus:outline-none dark:focus:ring-error-2"
          >
            탈퇴하기
          </button>
          <button
            type="button"
            className="text-white bg-primary-4 hover:bg-primary-2 focus:ring-4 focus:ring-primary-5 font-medium rounded-lg text-sm px-9 py-3.5 mr-2 mb-2 dark:bg-primary-4 dark:hover:bg-primary-2 focus:outline-none dark:focus:ring-primary-5"
          >
            수정하기
          </button>
        </div>
      </div>
    </>
  );
}
