import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import profile_img from "@images/common/default_profile.png";
import { Dropdown } from "flowbite";
import type { DropdownOptions, DropdownInterface } from "flowbite";
import Navbar from "@components/nav/Navbar";

export default function CreatePjPage() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  useEffect(() => {
    // set the dropdown menu element
    const $targetEl = document.getElementById("dropdownMenu") as HTMLDivElement;

    // set the element that trigger the dropdown menu on click
    const $triggerEl = document.getElementById("dropdownButton") as HTMLButtonElement | null;

    // options with default values
    const options: DropdownOptions = {
      placement: "bottom",
      triggerType: "click",
      offsetSkidding: 0,
      offsetDistance: 10,
      delay: 300,
      onHide: () => {
        console.log("dropdown has been hidden");
      },
      onShow: () => {
        console.log("dropdown has been shown");
      },
      onToggle: () => {
        console.log("dropdown has been toggled");
      },
    };

    /*
     * targetEl: required
     * triggerEl: required
     * options: optional
     */
    const dropdown: DropdownInterface = new Dropdown($targetEl, $triggerEl, options);

    // show the dropdown
    dropdown.show();
  }, []);

  return (
    <>
      <div className="relative w-screen h-screen flex flex-col mt-12">
        {/* 프로젝트 생성하기 타이틀 */}
        <div className="flex flex-row items-center mt-12" style={{ marginLeft: "16.9312vw" }}>
          <div className="w-[10px] h-[27px] bg-primary-5 mr-[10px]"></div>
          <p className="text-[28px] font-bold text-gray-900">프로젝트 생성하기</p>
        </div>

        <div className="flex flex-row w-screen">
          {/* 프로젝트 생성하기 왼쪽 컨테이너 */}
          {/* 소제목 모음 */}
          <div
            className="flex flex-col"
            style={{
              width: "15vw",
              marginLeft: "24.2159vw",
              marginTop: "4.9613vh",
            }}
          >
            <p className="text-[20px] font-medium text-gray-900">프로젝트명</p>
            <p className="text-[20px] font-medium text-gray-900" style={{ marginTop: "9.7760vh" }}>
              프로젝트 설명
            </p>
            <p className="text-[20px] font-medium text-gray-900" style={{ marginTop: "18.3299vh" }}>
              팀원 추가하기
            </p>
          </div>

          {/* 프로젝트 생성하기 오른쪽 컨테이너 */}
          {/* 인풋들 모음 */}
          <div className="flex flex-col  w-screen" style={{ marginLeft: "10.2159vw", marginTop: "4.9613vh" }}>
            {/* 제목 입력 */}
            <input
              type="pj_title"
              name="pj_title"
              id="pj_title"
              placeholder=""
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              style={{
                width: "31.0847vw",
              }}
              required
            />
            <p className="font-medium text-[14px] text-gray-400 text-right mt-[4px]" style={{ width: "31.0847vw" }}>
              0/20
            </p>

            {/* 설명 입력 */}
            <textarea
              name="pj_title"
              id="pj_title"
              placeholder=""
              className="items-start bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
              style={{
                verticalAlign: "top",
                width: "31.0847vw",
                marginTop: "5.7026vh",
                minHeight: "14.6640vh",
              }}
              required
            />

            <p className="font-medium text-[14px] text-gray-400 text-right mt-[4px]" style={{ width: "31.0847vw" }}>
              0/200
            </p>

            {/* 팀원 추가하기 */}
            <div className="flex flex-row">
              <div className="relative z-0" style={{ marginTop: "4.0733vh", width: "24.8vw" }}>
                <input
                  type="text"
                  id="floating_standard"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  htmlFor="floating_standard"
                  className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  이메일 검색하기
                </label>
              </div>

              {/* 권한 드롭다운 버튼 */}
              <button
                id="dropdownButton"
                data-dropdown-toggle="dropdownMenu"
                className="border border-gray-300 border-1 text-text-gray-900 bg-white focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-[12px] text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-[20px] justify-center"
                type="button"
                style={{ width: "86px", height: "40px", marginTop: "4.0733vh" }}
              >
                권한
                <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>

              {/* 추가 버튼 */}
              <button
                id="addTeamMember"
                className="text-primary-4 border border-1 border-primary-4 bg-white hover:bg-primary-5 focus:ring-4 focus:ring-primary-5 font-medium rounded-lg text-[12px]  mr-2 mb-2 dark:bg-primary-4 dark:hover:bg-primary-2 focus:outline-none dark:focus:ring-primary-5 ml-[10px]"
                style={{ width: "86px", height: "40px", marginTop: "4.0733vh" }}
              >
                추가
              </button>
            </div>

            {/* 권한 드롭다운했을 때 */}
            {/*  */}
            <div className="relative flex flex-col">
              <div
                id="dropdownMenu"
                className="z-20 hidden w-[150px] bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                style={{
                  marginLeft: "22.1vw",
                }}
              >
                <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownButton">
                  <li>
                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                      <input
                        id="default-radio-4"
                        type="radio"
                        value=""
                        name="default-radio"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label htmlFor="default-radio-4" className="w-full ml-2 text-[14px] font-medium text-gray-900 rounded dark:text-gray-300">
                        프로젝트 리더
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                      <input
                        checked
                        id="default-radio-5"
                        type="radio"
                        value=""
                        name="default-radio"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label htmlFor="default-radio-5" className="w-full ml-2 text-[14px] font-medium text-gray-900 rounded dark:text-gray-300">
                        프로젝트 팀원
                      </label>
                    </div>
                  </li>
                </ul>
              </div>

              {/* 추가한 팀원 목록 */}
              {/* 더미데이터 */}
              <div
                className="flex flex-col justify-center space-x-5 bg-gray-50 border border-gray-300 rounded-lg z-5 px-5 py-5"
                style={{
                  width: "31.1847vw",
                }}
              >
                <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                  <li className="pb-3 sm:pb-4">
                    <div className="flex items-center space-x-7">
                      <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src={profile_img} alt="Neil image" />
                      </div>
                      <div className="flex flex-1 flex-row min-w-0">
                        <p className="text-[14px] font-medium text-gray-600 truncate dark:text-white">이서현</p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400 ml-[20px]">email@flowbite.com</p>
                      </div>
                      <div className="inline-flex text-[14px] font-medium text-gray-900 dark:text-white ">프로젝트 팀원</div>
                    </div>
                  </li>

                  <li className="py-3 sm:py-4">
                    <div className="flex items-center space-x-7">
                      <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src={profile_img} alt="Neil image" />
                      </div>
                      <div className="flex flex-1 flex-row min-w-0">
                        <p className="text-[14px] font-medium text-gray-600 truncate dark:text-white">정현진</p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400 ml-[20px]">email@flowbite.com</p>
                      </div>
                      <div className="inline-flex text-[14px] font-medium text-gray-900 dark:text-white ">프로젝트 팀원</div>
                    </div>
                  </li>

                  <li className="py-3 sm:py-4">
                    <div className="flex items-center space-x-7">
                      <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src={profile_img} alt="Neil image" />
                      </div>
                      <div className="flex flex-1 flex-row min-w-0">
                        <p className="text-[14px] font-medium text-gray-600 truncate dark:text-white">이승희</p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400 ml-[20px]">email@flowbite.com</p>
                      </div>
                      <div className="inline-flex text-[14px] font-medium text-primary-4 dark:text-white ">프로젝트 리더</div>
                    </div>
                  </li>
                  <li className="py-3 sm:py-4">
                    <div className="flex items-center space-x-7">
                      <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-full" src={profile_img} alt="Neil image" />
                      </div>
                      <div className="flex flex-1 flex-row min-w-0">
                        <p className="text-[14px] font-medium text-gray-600 truncate dark:text-white">임혜균</p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400 ml-[20px]">email@flowbite.com</p>
                      </div>
                      <div className="inline-flex text-[14px] font-medium text-gray-900 dark:text-white ">프로젝트 팀원</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* 프로젝트 생성하기 버튼 */}
            <div className="flex justify-end">
              <button
                className="ml-auto w-[128px] h-[40px] text-white bg-primary-4 hover:bg-primary-2 focus:ring-4 focus:ring-primary-5 font-medium rounded-lg text-sm mr-2 mb-2 dark:bg-primary-4 dark:hover:bg-primary-2 focus:outline-none dark:focus:ring-primary-5"
                style={{ marginTop: "4.8vh", marginRight: "16.3511vw" }}
                onClick={goBack}
              >
                생성하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
