import React from "react";
import Navbar from "../components/Navbar";
import block from "../assets/images/releaseBlockImg.svg";
import ProjectNavbar from "../components/ProjectNavbar";
import MilestoneNavbar from "../components/MilestoneNavbar";

export default function Release() {
  return (
    <>
      <Navbar />
      <MilestoneNavbar />
      <ProjectNavbar />
      <div className="bg-gray-100 rounded-t-lg border border-gray-300 w-[90vw] m-auto mt-[2vh] flex flex-col">
        <div className="bg-gray-50 rounded-t-lg border border-gray-300 w-[70vw] m-auto mt-[5vh] flex flex-col ">
          <div className="max-w-screen-xl flex items-start flex-wrap mx-auto p-4 justify-end mt-5 mb-3 w-[65vw]">
            <button
              type="button"
              className="focus:outline-none text-white bg-primary-4 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-base px-5 py-1.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              수정
            </button>
            <button
              type="button"
              className="focus:outline-none text-white bg-error-3 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base px-5 py-1.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              삭제
            </button>
          </div>
          <div className="max-w-screen-xl flex-column items-start flex-wrap mx-auto p-4 mt-3 mb-3 w-[50vw]">
            <div className="flex flex-row mb-0 justify-between">
              <p className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
                v.2.7.14
              </p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                2023. 07. 05
              </p>
            </div>
            <hr className="h-1.5 my-5 bg-green-500 border-0 dark:bg-gray-700"></hr>
            <div className="flex flex-row my-2">
              <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300 border border-yellow-300">
                Changed
              </span>
              <p className="text-base font-medium text-gray-900 dark:text-white">
                포트폴리오 영상 3분 이내 등록 가능
              </p>
            </div>
            <hr className="h-px my-0 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <div className="flex flex-row my-2">
              <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 border border-gray-300">
                Deprecated
              </span>
              <p className="text-base font-medium text-gray-900 dark:text-white">
                포트폴리오 영상 3분 이내 등록 가능
              </p>
            </div>
            <hr className="h-px my-0 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <div className="flex flex-row my-2">
              <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300 border border-gray-300">
                Deprecated
              </span>
              <p className="text-base font-medium text-gray-900 dark:text-white">
                포트폴리오 영상 3분 이내 등록 가능
              </p>
            </div>
            <hr className="h-px my-0 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            <p className="text-3xl font-medium text-gray-900 dark:text-white my-6">
              포트폴리오 영상 3분 이상 등록 가능
            </p>
            <p className="text-xl font-medium text-gray-900 dark:text-white mb-5">
              포트폴리오 영상 길이 제한이 기존 3분 이하에서 3분 이상으로
              변경되었습니다.
            </p>
            <img
              src={block}
              className="w-600 h-221 mt-4 ml-10"
              alt="Flowbite Logo"
            />
          </div>
        </div>
      </div>
    </>
  );
}
