import React from "react";
import Navbar from "@components/nav/Navbar";

export default function IssueReportPage() {
  return (
    <>
      <div className="w-[90vw] m-auto mt-[10vh] flex flex-col">
        <div className="flex justify-end mt-5 mr-10">
          <button
            type="button"
            className="w-[5vw] focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xs px-0.5 py-1.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            수정
          </button>
        </div>
        <div className="flex flex-row mt-7">
          <p className="text-2xl font-bold text-gray-900 dark:text-white mr-7">[600&-12] 사용자 프로필 기능 수정</p>
          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-7 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300 border border-yellow-300">
            CHANGED
          </span>
          <p className="text-xs font-medium text-gray-900 dark:text-white flex items-end">2023.06.11</p>
        </div>

        <div className="w-[90vw] m-auto flex flex-col">
          {/* row1 */}
          <div className="flex flex-row w-[80vw] ml-12 mt-14">
            <p className="text-xl font-semibold text-gray-900 dark:text-white mr-14">작성자</p>
            <div className="flex items-center ml-2">
              <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 mr-3">
                  <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                  </svg>
                </div>
                정현진
              </p>
            </div>
            {/* <div className="flex flex-row">
              <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 mr-3 flex items-center">
                <svg
                  className="absolute w-12 h-12 text-gray-400 -left-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-white mr-7 mt-2">
                정현진
              </p>
            </div> */}
          </div>

          {/* row2 */}
          <div className="flex flex-row w-[80vw] ml-12">
            <p className="text-xl font-semibold text-gray-900 dark:text-white mr-10 mt-[5vh]">작업내용</p>
            <div className="bg-gray-100 rounded-lg border border-gray-300 w-[50vw] h-[50vh] mt-[5vh] flex flex-col place-items-start">
              <p className="text-sm font-medium text-gray-900 dark:text-white mr-7 flex items-center mt-5 ml-5">정현진</p>
            </div>
          </div>

          {/* row3 */}
          <div className="flex flex-row w-[80vw] ml-12">
            <p className="text-xl font-semibold text-gray-900 dark:text-white mr-10 my-5">코멘트</p>
            <div>
              <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
                <footer className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                      <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 mr-3">
                        <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                        </svg>
                      </div>
                      이승희
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mr-2">Feb. 8, 2022</p>
                    <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-green-400 border border-green-400 w-[3vw]">
                      승인
                    </span>
                  </div>
                </footer>
                <p className="text-gray-500 dark:text-gray-400 ml-12">
                  개쩌네요... 진작 이렇게 하시지... 이번엔 수고했습니다. 앞으로도 수고하세요. 두줄 작성시 어떻게 되나 볼게요. 굿
                </p>
              </article>
              <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
                <footer className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                      <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 mr-3">
                        <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                        </svg>
                      </div>
                      이승희
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mr-2">Feb. 3, 2022</p>
                    <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-red-400 border border-red-400 w-[3vw]">
                      반려
                    </span>
                  </div>
                </footer>
                <p className="text-gray-500 dark:text-gray-400 ml-12">이따구로 코딩할거면 개발자 때려치세요.. 반려!! 다시 해오세요!!!!</p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
