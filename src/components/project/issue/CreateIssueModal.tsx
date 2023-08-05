import React, { useState, useCallback } from "react";
import "@assets/index.css";
import profile_img from "@images/common/default_profile.png";
import Tag from "@src/components/project/issue/IssueBadge";
import TagDisabled from "@src/components/project/issue/IssueBadgeDisabled";
import { IssueType } from "@src/types/Issue";
import { useRecoilState } from "recoil";
import { projectNavs } from "@src/state/projectState";
import { ProjectNav } from "@typess/project";
import { useParams } from "react-router-dom";
import { instanceAuth } from "@src/types/AxiosInterface";

interface CreateIssueData {
  projectId: number;
  issueTag: IssueType;
  issueTitle: string;
  issueContent: string;
  issueManager?: string;
}

export default function CreateIssueModal({ visible, onClose }) {
  const [activeTag, setActiveTag] = useState(null);
  const [issueTitle, setIssueTitle] = useState("");
  const [issueContent, setIssueContent] = useState("");
  const [issueManager, setIssueManager] = useState("");

  //projectId
  const [projectNav, setProjectNav] = useRecoilState(projectNavs);
  let { projectKey } = useParams();
  const pj = projectNav.find((element: ProjectNav) => element.projectKey.toString() == projectKey);

  const handleTagClick = (issueType) => {
    setActiveTag(issueType);
  };

  const handleOnClose = () => {
    onClose();
  };

  const handleIssueTitle = (e) => {
    setIssueTitle(e.target.value);
  };

  const handleIssueContent = (e) => {
    setIssueContent(e.target.value);
  };

  if (!visible) return null;

  const createIssueData: CreateIssueData = {
    projectId: pj.projectId,
    issueTag: activeTag,
    issueTitle: issueTitle,
    issueContent: issueContent,
    // belongId: issueManager,
  };

  const handleCreateIssue = async () => {
    if (activeTag === null) {
      alert("이슈 태그를 선택해주세요.");
      return;
    }

    if (issueTitle === "") {
      alert("이슈 제목을 입력해주세요.");
      return;
    }

    if (issueContent === "") {
      alert("이슈 설명을 입력해주세요.");
      return;
    }

    instanceAuth
      .post(`/issues`, createIssueData)
      .then((response) => {
        console.log(response.data);
        if (response.data.code === 200) {
          alert("이슈가 생성되었습니다.");
          handleOnClose();
        } else {
          alert("이슈 생성에 실패했습니다.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div
        id="defaultModal"
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
              </button>
            </div>

            {/* 모달 내용 */}
            <div className="px-14">
              <p className="text-[16px] font-semibold leading-relaxed text-gray-900 dark:text-gray-400">이슈태그</p>

              <div className="flex items-center space-x-3 mt-4">
                {["NEW", "FEATURE", "CHANGED", "FIXED", "DEPRECATED"].map((type) => (
                  <div key={type} style={{ cursor: "pointer" }} onClick={() => handleTagClick(type)}>
                    {activeTag === type ? <Tag issueType={type as IssueType} /> : <TagDisabled issueType={type as IssueType} />}
                  </div>
                ))}
              </div>

              <p className="text-[16px] font-semibold leading-relaxed text-gray-900 dark:text-gray-400 mt-6">이슈 제목</p>
              <input
                type="pj_title"
                placeholder=""
                onChange={handleIssueTitle}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-4 focus:border-primary-4 block p-2.5 w-[31.0847vw]"
              />
              <p className="text-[16px] font-semibold leading-relaxed text-gray-900 dark:text-gray-400 mt-6">이슈 설명</p>
              <input
                type="pj_content"
                placeholder=""
                onChange={handleIssueContent}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-4 focus:border-primary-4 block p-2.5 w-[31.0847vw]"
              />

              <div className="flex items-center mt-6">
                <p className="text-[16px] font-semibold leading-relaxed text-gray-900 dark:text-gray-400">담당자</p>
                <button
                  id="dropdownButton"
                  data-dropdown-toggle="dropdownMenu"
                  className="border border-gray-300 border-1 text-text-gray-900 bg-white focus:ring-2 focus:outline-none focus:ring-primary-4 font-medium rounded-lg text-[12px] text-center inline-flex items-center ml-[20px] justify-center"
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
                onClick={handleCreateIssue}
                className="text-white bg-primary-4 hover:bg-primary-2 focus:ring-4 focus:outline-none focus:ring-primary-5 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                생성하기
              </button>
              <button
                type="button"
                onClick={handleOnClose}
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-5 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
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
