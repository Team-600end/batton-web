import React, { useState, useCallback } from "react";
import Tag from "@src/components/project/issue/IssueBadge";
import profile_img from "@assets/images/myPage/profile_icon.png";
import Navbar from "@components/nav/Navbar.tsx";

export default function IssueManagePage() {
  return (
    <>
      <Navbar/>
      <div className="flex flex-col mb-20">
        {/* 경로 */}
        <nav className="flex p-5" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3 mt-14">
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
          className="flex items-center justify-between ml-auto mr-auto mt-6"
          style={{ height: "4.2770vh", width: "63.2275vw" }}
        >
          <div className="flex justify-start">
            <p className="font-bold text-[28px] text-gray-900 jusitfy-start">
              [600&-12] 사용자 프로필 수정 기능
            </p>
          </div>
          <div className="flex justify-end">
            <button
              data-modal-hide="defaultModal"
              type="button"
              className="text-error-3 border border-error-3 bg-white hover:bg-primary-2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-7 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              style={{ marginRight: "20px" }}
            >
              삭제
            </button>
            <button
              data-modal-hide="defaultModal"
              type="button"
              className="text-white bg-primary-4 hover:bg-primary-2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-7 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              수정
            </button>
          </div>
        </div>

        <div
          className="flex flex-row mt-4 ml-auto mr-auto"
          style={{ width: "54.3651vw" }}
        >
          <div
            className="flex flex-col w-full justify-center items-start"
            style={{ width: "18.8175vw", marginLeft: "11vw" }}
          >
            <p className="font-semibold text-[18px] text-gray-900 mt-10">
              상태
            </p>
            <p className="font-semibold text-[18px] text-gray-900 mt-10">
              설명
            </p>
            <p className="font-semibold text-[18px] text-gray-900 mt-10">
              태그
            </p>
            <p className="font-semibold text-[18px] text-gray-900 mt-12">
              담당자
            </p>
          </div>

          {/* style={{width: "75.1825vw"}} */}
          <div
            className="flex flex-col items-start mt-10 space-y-12"
            style={{ width: "75.1825vw" }}
          >
            <Tag issueType="New" />
            <p className="font-medium text-[14px] text-gray-900">
              사용자는 내 정보 수정을 눌러 프로필을 수정할 수 있다
            </p>
            <Tag issueType="Feature" />
            <div className="flex flex-row justify-center">
              <img className="w-8 h-8 mr-3.5" src={profile_img} />
              <p className="font-medium text-[14px] text-gray-900 mt-1">
                이서현
              </p>
            </div>
          </div>
        </div>

        <div
          className="flex flex-col mr-auto ml-auto"
          style={{ width: "54.3651vw" }}
        >
          <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700 mt-5" />
          <p className="font-bold text-[20px] text-gray-900 ml-10 mt-1">
            바톤 넘겨주기
          </p>
        </div>

        <div className="flex mr-auto ml-auto" style={{ width: "54.3651vw" }}>
          <div
            className="flex flex-col w-full  items-start"
            style={{ width: "8.8175vw", marginLeft: "11vw" }}
          >
            <p className="font-semibold text-[18px] text-gray-900 mt-10">
              다음 이슈
            </p>
            <p className="font-semibold text-[18px] text-gray-900 mt-10">
              알림받을 팀원
            </p>
          </div>

          <div className="flex flex-col justify-start mt-10 space-y-7">
            <div className="flex">
              <button
                id="dropdownDefaultButton"
                data-dropdown-toggle="dropdown"
                className="w-full text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-7 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 justify-between"
                type="button"
                style={{ width: "26.3139vw", height:"6vh"}}
              >
                [BTFP-3]대시보드 퍼블리싱
                <svg
                  className="w-2.5 h-2.5"
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
              <button className="h-[5vh] w-[8.3vw] text-primary-4 bg-white border border-primary-4 hover:bg-primary-2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-4">
                새로 만들기
              </button>
            </div>

            <div className="flex">
              <div
                id="dropdownSearch"
                className="z-10 bg-white rounded-lg shadow w-60 dark:bg-gray-700"
                style={{ width: "26.3139vw" }}
              >
                <div className="p-3">
                  <label className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="input-group-search"
                      className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Search user"
                    />
                  </div>
                </div>
                <ul
                  className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownSearchButton"
                >
                  <li>
                    <div className="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                      <input
                        id="checkbox-item-11"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        className="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                      >
                        Bonnie Green
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                      <input
                        checked
                        id="checkbox-item-12"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        className="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                      >
                        Jese Leos
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                      <input
                        id="checkbox-item-13"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        className="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                      >
                        Michael Gough
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                      <input
                        id="checkbox-item-14"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        className="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                      >
                        Robert Wall
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                      <input
                        id="checkbox-item-15"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        className="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                      >
                        Joseph Mcfall
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                      <input
                        id="checkbox-item-16"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        className="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                      >
                        Leslie Livingston
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                      <input
                        id="checkbox-item-17"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        className="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                      >
                        Roberta Casas
                      </label>
                    </div>
                  </li>
                </ul>
                <a
                  href="#"
                  className="flex items-center p-3 text-sm font-medium text-red-600 border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-red-500 hover:underline"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 18"
                  >
                    <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-6a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2Z" />
                  </svg>
                  Delete user
                </a>
              </div>
              <button className="w-20 h-13 text-white bg-primary-4 hover:bg-primary-2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-4"
               style={{width:"8vw", height:"5vh"}}>
                설정
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
