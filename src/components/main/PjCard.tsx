import React, { useState, useCallback, useEffect } from "react";
import pj_img from "@assets/images/mainPage/kea_pj_img.png";
import pj_latest_img from "@assets/images/mainPage/pj_card_latest.png";
import avatar from "@assets/images/common/avatar.png";

export default function PjCard() {
  return (
    <>
      <div className="flex w-[350px] h-[250px] p-[10px] shadow-[2px_6px_6px_-2px_rgba(0,0,0,0.3)] bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 mx-2 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div className="relative w-[350px] h-[250px] flex flex-col items-center justify-start">
          {/* 최상단 아이콘과 팀이름 */}
          <div className="relative w-[300px] h-[70px] mt-[10px] flex flex-row">
            <div className="relative w-[70px] h-[70px]">
              <img className="rounded-full ring-1 ring-[#285F43] dark:ring-gray-500" src={pj_img} alt="pj_img" />
            </div>
            <div className="flex-col ml-[20px] mt-[5px]">
              <p className="text-[#5AAE8A] text-2xl font-suitB">600&</p>
              <div className="flex flex-row items-center justify-center mt-[2px]">
                <img className="w-[50px] h-[18px] mt-[2px]" src={pj_latest_img} alt="pj_latest_img" />
                <p className="ml-[5px] text-[#707070] font-suitSB">v 3.0.6</p>
              </div>
            </div>
          </div>

          {/* 프로젝트 개수 모음 */}
          <div className="relative font-suitM w-[300px] h-[50px] mt-[10px] pl-[15px] flex flex-col">
            <div className="flex flex-row">
              <span className="w-1/2 flex flex-row">
                <p>진행 전 이슈</p>
                <p className="text-[#5AAE8A] ml-[20px]">12</p>
              </span>
              <span className="w-1/2 flex flex-row">
                <p>진행 중 이슈</p>
                <p className="text-[#5AAE8A] ml-[20px]">6</p>
              </span>
            </div>
            <div className="flex flex-row">
              <span className=" w-1/2 flex flex-row">
                <p>내 할당 이슈</p>
                <p className="text-[#5AAE8A] ml-[20px]">2</p>
              </span>
              <span className="w-1/2 flex flex-row">
                <p>완료 이슈</p>
                <p className="text-[#5AAE8A] ml-[37px]">20</p>
              </span>
            </div>
          </div>

          {/* 사람들 */}
          <div className="relative w-[300px] h-[30px] mt-[10px]">
            <div className="flex -space-x-4">
              <img className="w-[30px] h-[30px] border-[1px] border-white rounded-full dark:border-gray-800" src={avatar} alt="" />
              <img className="w-[30px] h-[30px] border-[1px] border-white rounded-full dark:border-gray-800" src={avatar} alt="" />
              <img className="w-[30px] h-[30px] border-[1px] border-white rounded-full dark:border-gray-800" src={avatar} alt="" />
              <a
                className="flex items-center justify-center w-[30px] h-[30px] text-xs font-suitM text-white bg-gray-700 border-[1px] border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
                href="#"
              >
                +2
              </a>
              <p className="text-sm font-suitL text-[#C4C4C4] mt-[5px] pl-[30px] ">이승희님 외 2명</p>
            </div>
          </div>

          {/* progress bar */}
          <div className="relative w-[300px] h-[30px]">
            <div className="flex justify-between mb-1">
              <span className="text-base font-suitM text-blue-700 dark:text-white"></span>
              <span className="text-sm font-suitM text-[#6B7280] dark:text-white">45%</span>
            </div>
            <div className="w-full bg-[#F4F4F4] rounded-full h-2.5 dark:bg-gray-700">
              <div className="bg-[#5AAE8A] h-2.5 rounded-full" style={{ width: "45%" }}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
