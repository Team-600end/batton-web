import React, { useState, useCallback } from "react";
import "@assets/index.css";
import profile_img from "@images/common/default_profile.png";
import Tag from "@src/components/project/issue/IssueBadge";
import TagDisabled from "@src/components/project/issue/IssueBadgeDisabled";
import { IssueType } from "@src/types/Issue";

export default function CreateIssueModal({ visible, onClose }) {
  const [activeTag, setActiveTag] = useState(null);
  // const issueType: IssueType = "New";

  const handleTagClick = (issueType: IssueType): IssueType => {
    // setActiveTag(activeTag === issueType ? issueType : null);
    if (issueType === "New" || issueType === "Changed" || issueType === "Feature" || issueType === "Fixed" || issueType === "Deprecated") {
      setActiveTag(issueType);
      return issueType;
    } else {
      // 기본값으로 "New"를 반환합니다. 이 부분을 프로젝트에 맞게 수정할 수 있습니다.
      setActiveTag("New");
      return "New";
    }
  };

  const handleTagHover = (issueType) => {
    setActiveTag(issueType);
  };

  const handleTagLeave = () => {
    setActiveTag(null);
  };

  const handleOnClose = () => {
    onClose();
  };

  if (!visible) return null;

  return (
    <>
      <div
        id="defaultModal"
        // tabIndex={-1 as number}
        aria-hidden="true"
        className="fixed justify-center flex items-center bg-black bg-opacity-30 top-0 left-0 right-0 bottom-0 z-50 p-4 backdrop-blur-sm overflow-x-hidden overflow-y-hidden md:inset-0 w-full h-full max-h-full"
      >
        <div className="flex w-full max-w-2xl max-h-full mr-auto ml-auto">
          <div className="bg-white rounded-lg shadow dark:bg-gray-700">
            {/* 모달 헤더 */}
            <div className="flex items-start justify-between p-10 rounded-t dark:border-gray-600">
              <h3 className="text-[24px] font-bold text-gray-900 dark:text-white">이슈 생성하기</h3>
              <button
                type="button"
                onClick={handleOnClose}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
                {/* <span className="sr-only">Close modal</span> */}
              </button>
            </div>

            {/* 모달 내용 */}
            <div className="px-14">
              <p className="text-[16px] font-semibold leading-relaxed text-gray-900 dark:text-gray-400">이슈태그</p>

              <div className="flex items-center space-x-3 mt-4">
                {/* <TagDisabled issueType="New" />
                <TagDisabled issueType="Feature" />
                <TagDisabled issueType="Changed" />
                <TagDisabled issueType="Fixed" />
                <TagDisabled issueType="Deprecated" /> */}

                {/* {["New", "Feature", "Changed", "Fixed", "Deprecated"].map((type) =>
                  activeTag === type ? (
                    <div style={{ cursor: "pointer" }}>
                      <Tag key={type} issueType={type as IssueType} onClick={() => handleTagClick(type as IssueType)} />
                    </div>
                  ) : (
                    <div style={{ cursor: "pointer" }}>
                      <TagDisabled
                        key={type}
                        issueType={type as IssueType}
                        onClick={() => handleTagClick(type as IssueType)}
                        onMouseEnter={() => handleTagHover(type)}
                        onMouseLeave={handleTagLeave}
                      />
                    </div>
                  )
                )} */}

                {["New", "Feature", "Changed", "Fixed", "Deprecated"].map((type) =>
                  activeTag === type ? (
                    <div style={{ cursor: "pointer" }}>
                      <Tag key={type} issueType={type as IssueType} />
                    </div>
                  ) : (
                    <div style={{ cursor: "pointer" }} onMouseEnter={() => handleTagHover(type)} onMouseLeave={handleTagLeave}>
                      <TagDisabled key={type} issueType={type as IssueType} />
                    </div>
                  )
                )}
              </div>

              <p className="text-[16px] font-semibold leading-relaxed text-gray-900 dark:text-gray-400 mt-6">이슈 제목</p>
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
              <p className="text-[16px] font-semibold leading-relaxed text-gray-900 dark:text-gray-400 mt-6">이슈 설명</p>
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

              <div className="flex items-center mt-6">
                <p className="text-[16px] font-semibold leading-relaxed text-gray-900 dark:text-gray-400">담당자</p>
                <button
                  id="dropdownButton"
                  data-dropdown-toggle="dropdownMenu"
                  className="border border-gray-300 border-1 text-text-gray-900 bg-white focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-[12px] text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ml-[20px] justify-center"
                  type="button"
                  style={{ height: "40px" }}
                >
                  <img id="manager_icon" src={profile_img} className="w-6 h-6 ml-4 mr-3" />
                  이서현
                  <svg className="w-2.5 h-2.5 ml-3 mr-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                  </svg>
                </button>
              </div>
            </div>

            {/* 생성하기 버튼 푸터 */}
            <div className="flex items-center justify-end px-14 py-10 space-x-2 rounded-b ">
              <button
                type="button"
                onClick={handleOnClose}
                className="text-white bg-primary-4 hover:bg-primary-2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                생성하기
              </button>
              <button
                type="button"
                onClick={handleOnClose}
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
