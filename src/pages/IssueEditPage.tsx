import React, { useState, useCallback } from "react";
import Tag from "../components/IssueBadge.tsx";
import profile_img from "../assets/images/myPage/profile_icon.png";
import Navbar from "../components/Navbar.tsx";

export default function IssueEditPage() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col">
        {/* 경로 */}
        <nav className="flex p-5" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <a
                href="#"
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3 mr-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                프로젝트
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <svg
                  className="w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <a
                  href="#"
                  className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                >
                  600&
                </a>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg
                  className="w-3 h-3 text-gray-400 mx-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="ml-1 text-md font-medium text-primary-4 md:ml-2 dark:text-gray-400">
                  이슈 관리
                </span>
              </div>
            </li>
          </ol>
        </nav>

        {/* 이슈 관리 페이지 */}
        <div
          className="flex items-center justify-between ml-auto mr-auto mt-10"
          style={{ height: "4.2770vh", width: "63.2275vw" }}
        >
          <div className="flex flex-row justify-start">
            <input
              className="px-3 font-bold text-[28px] text-gray-900 jusitfy-start"
              value={"[600&-12] 사용자 프로필 수정 기능"}
              style={{ width: "40vw" }}
            />
          </div>
          <div className="flex justify-end">
            <button
              data-modal-hide="defaultModal"
              type="button"
              className="text-white bg-primary-4 hover:bg-primary-2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-7 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              완료
            </button>
          </div>
        </div>

        <div className="flex flex-row">
          <div className="flex flex-col mt-6 items-top justify-center ml-[30.4233vw]">
            <p className="font-semibold text-[16px] mt-16">상태</p>
            <p className="font-semibold text-[16px] mt-12">설명</p>
            <p className="font-semibold text-[16px] mt-40">태그</p>
            <p className="font-semibold text-[16px] mt-16">담당자</p>
          </div>

          <div
            className="flex flex-col items-top  mt-20"
            style={{ width: "63.2275vw" }}
          >
            <button
              id="dropdownButton"
              data-dropdown-toggle="dropdownMenu"
              className="border border-gray-300 border-1 text-text-gray-900 bg-white focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-[12px] text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-16 justify-center"
              type="button"
              style={{ width: "86px", height: "40px" }}
            >
              권한
              <svg
                className="w-2.5 h-2.5 ml-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            <input
              type="pj_title"
              name="pj_title"
              id="pj_title"
              placeholder=""
              className="ml-16 mt-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 min-h-[140px]"
              style={{
                width: "24.0847vw",
              }}
              required
            />

            <div className="space-x-5 mt-10 ml-16">
              <Tag issueType="New" />
              <Tag issueType="Feature" />
              <Tag issueType="Fixed" />
              <Tag issueType="Changed" />
              <Tag issueType="Deprecated" />
            </div>

            <button
              id="dropdownButton"
              data-dropdown-toggle="dropdownMenu"
              className="mt-14 w-[8.7vw] h-[5vh] border border-gray-300 border-1 text-text-gray-900 bg-white focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-[12px] text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-16 justify-center"
              type="button"
            >
              <img
                id="manager_icon"
                src={profile_img}
                className="w-6 h-6 ml-4 mr-3"
              />
              이서현
              <svg
                className="w-2.5 h-2.5 ml-3 mr-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
