import { instanceAuth } from "@src/types/AxiosInterface";
import React, { useState } from "react";

export default function IssueComment({
  issueStatusChanged,
  closeModal,
  issueId,
}) {
  const [commentContent, setCommentContent] = useState("");
  const handleIssueComment = (e) => {
    setCommentContent(e.target.value);
  };

  const commentType = issueStatusChanged === "승인" ? "ACCEPTED" : "DENIED";

  const issueCommentData = {
    commentContent,
    commentType,
  };

  const createIssueComment = async () => {
    //TODO: 이슈 코멘트 생성 api
    console.log(issueCommentData);
    instanceAuth
      .post(`/reports/comments/${issueId}`, issueCommentData)
      .then((response) => {
        if (response.data.code === 200) {
          closeModal();
        } else {
          alert("이슈 코멘트 생성에 실패했습니다.");
        }
      });
  };

  return (
    <>
      <>
        <div className="fixed flex justify-center items-center z-50 p-20 overflow-x-hidden overflow-y-hidden md:inset-0 w-full h-full max-h-full">
          <div className="flex max-w-full max-h-full">
            <div className="bg-white rounded-lg shadow dark:bg-gray-700 px-7">
              {/* title */}
              <div className="flex items-start justify-between pt-10 rounded-t dark:border-gray-600">
                <h3 className="text-[20px] font-suitB text-gray-900 dark:text-white">
                  이슈 코멘트
                </h3>
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                </button>
              </div>

              {/* description */}
              <div className="flex items-center justify-start">
                <p
                  className={
                    issueStatusChanged == "승인"
                      ? "text-lg font-suitSB leading-relaxed text-primary-3 mt-6 mb-2 ml-1"
                      : "text-lg font-suitSB leading-relaxed text-error-3 mt-6 mb-2 ml-1"
                  }
                >
                  {issueStatusChanged}
                </p>
                <p className="text-base font-suitSB leading-relaxed text-gray-900 mt-6 mb-2 ml-1">
                  {" "}
                  코멘트를 작성해 주세요.
                </p>
              </div>

              {/* 코멘트 */}
              <div className="flex items-center justify-center">
                <input
                  type="issue"
                  placeholder=""
                  onChange={handleIssueComment}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-primary-4 focus:ring-primary-4 focus:border-primary-4 block p-2.5 w-[31.0847vw]"
                />
              </div>
              {/* btnTitle */}
              <div className="flex items-center justify-center px-10 py-7 space-x-2 rounded-b ">
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-white bg-grey-4 hover:bg-grey-3 focus:ring-2 focus:outline-none focus:ring-grey-5 font-suitM rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={createIssueComment}
                  className="text-white bg-primary-4 hover:bg-primary-2 focus:ring-2 focus:outline-none focus:ring-primary-5 font-suitM rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
