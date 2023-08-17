import { IssueStatus, IssueType } from "@src/types/Issue";
import IssueStatusBadge from "@components/project/issue/IssueStatusBadge";
import IssueBadge from "@components/project/issue/IssueBadge";
import profile_img from "@images/common/default_profile.png";
import { useState } from "react";
import IssueBadgeDisabled from "./IssueBadgeDisabled";
import { instanceAuth } from "@src/types/AxiosInterface";

type IssueInfoEditorProps = {
  issueId: number;
  issueTitle: string;
  issueStatus: IssueStatus;
  issueContent: string;
  issueTag: IssueType;
  managerId?: number;
  profileImage?: string;
  nickname?: string;
  handleIssueEditForm: () => void;
  handleIssueInfoChange: () => void;
};

interface IssueInfoEditorData {
  issueTitle: string;
  issueContent: string;
  issueTag: IssueType;
  belongId: number;
}

export default function IssueInfoEditor(props: IssueInfoEditorProps) {
  const [activeTag, setActiveTag] = useState(props.issueTag);
  const [issueTitleInput, setIssueTitleInput] = useState<string>(props.issueTitle);
  const [issueContentInput, setIssueContentInput] = useState<string>(props.issueContent);
  const [managerIdInput, setManagerIdInput] = useState<number>(props.managerId);

  //member list
  const [isOpenMemberList, setIsOpenMemberList] = useState(false);
  const arrowDown = (
    <svg className="w-3 h-3 mt-2 ml-2 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1L7 7M7 7L13 1M1 1L7 7M7 7L1 1" />
    </svg>
  );
  const arrowUP = (
    <svg className="w-3 h-3 mb-1 ml-2 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 13L7 7M7 7L13 13M1 13L7 7M7 7L1 13" />
    </svg>
  );

  const handleIssueTitleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIssueTitleInput(e.target.value);
  };

  const handleIssueContentInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIssueContentInput(e.target.value);
  };

  // const handleIssue
  const handleTagClick = (issueType) => {
    setActiveTag(issueType);
  };

  const handleIssueEditForm = () => {
    props.handleIssueEditForm();
  };

  const handleIssueInfoChange = () => {
    props.handleIssueInfoChange();
  };

  const issueInfoEditRequest = async () => {
    const issueInfoEditorData: IssueInfoEditorData = {
      issueTitle: issueTitleInput,
      issueContent: issueContentInput,
      issueTag: activeTag,
      belongId: managerIdInput,
    };

    instanceAuth.patch(`/issues/${props.issueId}`, issueInfoEditorData).then((response) => {
      console.log(response.data);
      console.log(response.data.result);
      if (response.data.code == 200) {
        handleIssueInfoChange();
        handleIssueEditForm();
      } else {
        console.log("response after error");
      }
    });
  };

  return (
    <div className="flex flex-col mx-auto w-[80vw] space-y-5">
      {/* 취소 | 저장 버튼 */}
      <div className="mr-[4.5vw] flex flex-row items-end justify-end">
        <button
          type="button"
          onClick={handleIssueEditForm}
          className="h-[4vh] border border-error-3 text-error-3 bg-white hover:bg-error-4 font-suitM rounded-lg text-sm w-11 items-center mx-[0.5vw]"
        >
          취소
        </button>
        <button
          type="button"
          onClick={issueInfoEditRequest}
          className="h-[4vh] border border-primary-4 text-primary-4 bg-white hover:bg-primary-5 font-suitM rounded-lg text-sm w-11 items-center mx-[0.5vw]"
        >
          저장
        </button>
      </div>

      <div className="space-y-[1.5vh]">
        <div className="flex flex-row mx-auto mt-[1vw] w-[80vw]">
          <p className="font-suitM text-[2vw] text-gray-900 pl-[2.5vw] my-auto">제목</p>
          <input
            value={issueTitleInput}
            onChange={handleIssueTitleInput}
            type="text"
            className="bg-gray-30 border border-gray-200 text-gray-900 text-[1.7vw] rounded-lg block focus:border-primary-4 focus:ring-primary-4 w-[65vw] font-suitM ml-[3.6vw] my-auto"
          />
        </div>
        <div className=" flex flex-row mx-auto mt-[1vw] w-[80vw]">
          <p className="font-suitM text-[1.5vw] text-gray-900 pl-[3vw] my-auto">설명</p>
          <input
            value={issueContentInput}
            onChange={handleIssueContentInput}
            type="text"
            className="bg-gray-30 border border-gray-200 text-gray-900 text-[1.3vw] rounded-lg block focus:border-primary-4 focus:ring-primary-4 w-[65vw] font-suitM ml-[4vw] my-auto"
          />
        </div>
        <div className="flex flex-row mt-[1vw] w-[80vw]">
          <p className="font-suitM text-[1.5vw] text-gray-900 pl-[3vw] my-auto">태그</p>
          <div className="ml-[4vw] my-auto">
            <div className="flex items-start space-x-3 my-auto">
              {["NEW", "FEATURE", "CHANGED", "FIXED", "DEPRECATED"].map((type) => (
                <div key={type} style={{ cursor: "pointer" }} onClick={() => handleTagClick(type)}>
                  {activeTag === type ? <IssueBadge issueType={type as IssueType} /> : <IssueBadgeDisabled issueType={type as IssueType} />}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-row mt-[1vw] w-[80vw]">
          <p className="font-suitM text-[1.5vw] text-gray-900 pl-[2vw] my-auto">담당자</p>
          <div className="ml-[3.5vw] my-auto">
            <button
              id="dropdownButton"
              className="border border-gray-300 border-1 text-gray-900 bg-white focus:ring-2 focus:outline-none focus:ring-primary-4 font-suitM rounded-lg text-[12px] my-auto text-center inline-flex items-center ml-auto justify-center"
              type="button"
              style={{ height: "40px" }}
              onClick={() => setIsOpenMemberList(!isOpenMemberList)}
            >
              <img id="manager_icon" src={profile_img} className="w-6 h-6 ml-4 mr-3" />
              {props.nickname}
              {isOpenMemberList ? arrowUP : arrowDown}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
