import React, { useState, useCallback, useRef } from "react";
import Tag from "@src/components/project/issue/IssueBadge";
import profile_img from "@images/common/default_profile.png";
import Navbar from "@components/nav/Navbar.tsx";
import { useParams } from "react-router-dom";
import { Editor } from "@toast-ui/react-editor";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import IssueBadge from "@src/components/project/issue/IssueBadge";
import MilestoneNavbar from "@src/components/nav/MilestoneNavbar";
import IssueStatusBadge from "@src/components/project/issue/IssueStatusBadge";

export default function IssueManagePage() {
  // const { projectKey, issueId } = useParams();
  const editorRef = useRef<Editor>(null);

  return (
    <div className="flex flex-col overflow-hidden">
      <MilestoneNavbar />
      <div className="flex items-center justify-between ml-auto mr-auto mt-[6vh] h-[5vh] w-[65vw]">
        <div className="flex justify-start">
          <p className="font-bold text-[28px] text-gray-900 jusitfy-start">[600&-12] 사용자 프로필 수정 기능</p>
        </div>
        <div className="flex justify-end">
          <button
            data-modal-hide="defaultModal"
            type="button"
            className="h-[5vh] border border-error-3 text-error-3 bg-white hover:bg-error-4 font-suitM rounded-lg text-sm py-2.5 items-center mr-[1vw] w-[6vw]"
          >
            삭제
          </button>
          <button
            data-modal-hide="defaultModal"
            type="button"
            className="h-[5vh] border border-primary-4 text-primary-4 bg-white hover:bg-primary-5 font-suitM rounded-lg text-sm py-2.5 items-center w-[6vw]"
          >
            수정
          </button>
        </div>
      </div>

      <div className="flex flex-col mt-[7vh] mx-auto w-[50vw] px-[7vw] space-y-5">
        <div className="flex">
          <p className="font-suitM text-[1.4vw] text-gray-900">상태</p>
          <div className="ml-auto space-x-1">
            <IssueStatusBadge issueStatus="TODO" />
            <IssueStatusBadge issueStatus="PROGRESS" />
            <IssueStatusBadge issueStatus="REVIEW" />
            <IssueStatusBadge issueStatus="DONE" />
            <IssueStatusBadge issueStatus="RELEASED" />
          </div>
        </div>
        <div className="flex">
          <p className="font-suitM text-[1.4vw] text-gray-900">설명</p>
          <p className="font-suitM text-[1vw] text-gray-900 ml-auto my-auto">사용자는 내 정보 수정을 눌러 프로필을 수정할 수 있다</p>
        </div>
        <div className="flex">
          <p className="font-suitM text-[1.4vw] text-gray-900">태그</p>
          <div className="ml-auto my-auto">
            <IssueBadge issueType="FEATURE" />
          </div>
        </div>
        <div className="flex">
          <p className="font-suitM text-[1.4vw] text-gray-900">담당자</p>
          <div className="flex flex-row ml-auto my-auto">
            <img className="w-8 h-8 mr-3.5" src={profile_img} />
            <p className="font-suitM text-[1vw] text-gray-900 mt-1">홍길동</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col mx-auto w-[50vw] mt-[2vh]">
        <hr className="h-px my-8 bg-gray-200 border-0" />
        <p className="font-bold text-[20px] text-gray-900 ml-10 mt-1">이슈 레포트</p>
      </div>
      <div className="mb-4 border border-gray-300 rounded-lg bg-white p-[0.2vw] h-full w-[40vw] font-suitM mt-[4vh] mx-auto">
        <div>
          <Editor
            previewStyle="vertical"
            height="500px"
            initialEditType="wysiwyg"
            useCommandShortcut={true}
            hideModeSwitch={true}
            language="ko-KR"
            ref={editorRef}
            plugins={[colorSyntax]}
            toolbarItems={[
              // 툴바 옵션 설정
              ["heading", "bold", "italic", "strike"],
              ["hr", "quote"],
              ["ul", "ol", "task", "indent", "outdent"],
              ["table", "image", "link"],
              ["code", "codeblock"],
            ]}
          />
        </div>
      </div>

      <div className="flex flex-col mr-auto ml-auto w-[50vw]">
        <hr className="h-px my-8 bg-gray-200 border-0 mt-5" />
        <p className="font-bold text-[20px] text-gray-900 ml-10 mt-1">바톤 넘겨주기</p>
      </div>

      <div className="flex mr-auto ml-auto w-[50vw]">
        <div className="flex flex-col items-start w-[9vw] ml-[11vw]">
          <p className="font-semibold text-[18px] text-gray-900 mt-10">알림받을 팀원</p>
        </div>

        <div className="flex flex-col justify-start mt-10 space-y-7">
          <div className="flex">
            <div id="dropdownSearch" className="z-10 bg-white rounded-lg shadow w-60 dark:bg-gray-700" style={{ width: "26.3139vw" }}>
              <div className="p-3">
                <label htmlFor="input-group-search" className="sr-only">
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
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
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
              <ul className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownSearchButton">
                <li>
                  <div className="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <input
                      id="checkbox-item-11"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label htmlFor="checkbox-item-11" className="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
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
                    <label htmlFor="checkbox-item-12" className="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
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
                    <label htmlFor="checkbox-item-13" className="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
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
                    <label htmlFor="checkbox-item-14" className="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
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
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <label htmlFor="checkbox-item-15" className="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
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
                    <label htmlFor="checkbox-item-16" className="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
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
                    <label htmlFor="checkbox-item-17" className="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                      Roberta Casas
                    </label>
                  </div>
                </li>
              </ul>
              <a
                href="#"
                className="flex items-center p-3 text-sm font-medium text-red-600 border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-red-500 hover:underline"
              >
                <svg className="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                  <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-6a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2Z" />
                </svg>
                Delete user
              </a>
            </div>
            <button className="h-[5vh] border border-primary-4 text-primary-4 bg-white hover:bg-primary-5 font-suitM rounded-lg text-sm py-2.5 items-center ml-4 w-[6vw]">
              설정
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
