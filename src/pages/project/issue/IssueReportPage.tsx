import React, { useEffect, useRef, useState } from "react";
import Navbar from "@components/nav/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import IssueBadge from "@src/components/project/issue/IssueBadge";
import { instanceAuth } from "@src/types/AxiosInterface";
import { IssueStatus, IssueType } from "@src/types/Issue";
import { Editor } from "@toast-ui/react-editor";
import { useRecoilState } from "recoil";
import { projectNavs } from "@src/state/projectState";
import { ProjectNav } from "@src/types/project";
import { Viewer } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import MilestoneNavbar from "@src/components/nav/MilestoneNavbar";
import IssueStatusBadge from "@src/components/project/issue/IssueStatusBadge";
import default_profile from "@images/common/default_profile.png";
import IssueCommentBadge from "@src/components/project/issue/IssueCommentBadge";
import default_avatar_img from "@images/common/default_profile.svg";
import { CommentType, IssueComment } from "@src/types/comment";
import CommentCard from "@src/components/project/issue/CommentCard";
import titleBox_img from "@images/common/title_box.svg";

interface CommentPostData {
  commentContent?: string;
  commentType: CommentType;
}

export default function IssueReportPage() {
  const navigate = useNavigate();
  const { projectKey, issueId } = useParams();
  const editorRef = useRef<Editor>(null);
  const [issueTitle, setIssueTitle] = useState<string>("");
  const [issueContent, setIssueContent] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");
  const [issueTag, setIssueTag] = useState<IssueType>(null);
  const [issueStatus, setIssueStatus] = useState<IssueStatus>(null);
  const [editorData, setEditorData] = useState<string>("");
  const [commentList, setCommentList] = useState<IssueComment[]>([]);
  const [commentInputText, setCommentInputText] = useState<string>("");

  // Project Recoil
  const [projectNav, setProjectNav] = useRecoilState(projectNavs);
  const pj = projectNav.find((element: ProjectNav) => element.projectKey.toString() == projectKey);

  useEffect(() => {
    issueReportRequest();
  }, []);

  const handleChangeCommentInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentInputText(e.target.value);
  };

  const issueReportRequest = async () => {
    instanceAuth
      .get(`/issues/reports/${issueId}`)
      .then((response) => {
        console.log(response.data.result);
        if (response.data.code == 200) {
          setIssueTitle(response.data.result.issueTitle as string);
          setIssueContent(response.data.result.issueContent as string);
          setNickname(response.data.result.nickname as string);
          setProfileImage(response.data.result.profileImage as string);
          setIssueTag(response.data.result.issueTag as IssueType);
          setIssueStatus(response.data.result.issueStatus as IssueStatus);
          setEditorData(response.data.result.reportContent);
          setCommentList(response.data.result.commentList as IssueComment[]);
        } else {
          console.log("response after error");
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const issueCommentRequest = async () => {
    const commentPostData: CommentPostData = {
      commentContent: commentInputText,
      commentType: "COMMON",
    };
    instanceAuth
      .post(`/reports/comments/${issueId}`, commentPostData)
      .then((response) => {
        if (response.data.code == 200) {
          setCommentInputText("");
          issueReportRequest(); // fetch
        } else {
          console.log("response after error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const viewer = new Viewer({
    el: document.querySelector("#viewer"),
    height: "600px",
    initialValue: editorData,
  });

  return (
    <div className="flex flex-col overflow-hidden">
      <MilestoneNavbar />
      {/* 이슈 정보 */}
      <div className="flex items-center justify-start ml-auto mr-auto mt-[5vh] h-[5vh] w-[90vw]">
        <p className="font-bold text-[1.6vw] text-gray-900 ml-[2vw]">이슈 조회</p>
      </div>

      {/* [프로젝트명-이슈키] 이슈타이틀 */}
      <div className="flex flex-row mr-auto ml-[10vw] w-[80vw] my-[1.5vh] font-suitB text-[2vw] text-gray-900 jusitfy-start">
        <p className="text-primary-3">
          [{pj.projectTitle}-{issueId}]
        </p>
        <p className="text-black ml-[1vw]">{issueTitle}</p>
      </div>

      <div className="space-y-[1.5vh]">
        <div className="flex flex-row mx-auto mt-[1vw] w-[80vw] ">
          <p className="font-suitB text-[2vw] text-gray-900 pl-[2.5vw]">제목</p>
          <p className="font-suitM text-[1.7vw] text-gray-900 ml-[3.6vw] my-auto">{issueTitle}</p>
        </div>

        <div className="flex flex-row mx-auto mt-[1vw] w-[80vw] ">
          <p className="font-suitM text-[1.5vw] text-gray-900 pl-[3vw]">설명</p>
          <p className="font-suitM text-[1.3vw] text-gray-900 ml-[4vw] my-auto">{issueContent}</p>
        </div>

        <div className="flex flex-row mx-auto mt-[1vw] w-[80vw] ">
          <p className="font-suitM text-[1.5vw] text-gray-900 pl-[3vw]">상태</p>
          <div className="ml-[4vw] my-auto">
            <IssueStatusBadge issueStatus={issueStatus} />
          </div>
        </div>

        <div className="flex flex-row mx-auto mt-[1vw] w-[80vw]">
          <p className="font-suitM text-[1.5vw] text-gray-900 pl-[3vw]">태그</p>
          <div className="ml-[4vw] my-auto">
            <IssueBadge issueType={issueTag} />
          </div>
        </div>

        <div className="flex flex-row mx-auto mt-[1vw] w-[80vw]">
          <p className="font-suitM text-[1.5vw] text-gray-900 pl-[1.8vw]">담당자</p>
          <div className="flex flex-row ml-[3.7vw] my-auto">
            <img className="w-6 h-6 m-auto mr-3 rounded-full" src={profileImage == null || profileImage == "" ? default_profile : profileImage} />
            <p className="font-suitM text-[1.3vw] text-gray-900 m-auto">{nickname}</p>
          </div>
        </div>
      </div>

      <hr className="h-px my-[1vw] mt-[2vw] bg-gray-200 border-0 w-[80vw] mx-auto" />

      <div className="flex flex-col mx-auto w-[70vw] mt-[3vh]">
        <div className="flex my-auto">
          <img className="mr-2 select-none pointer-events-none" src={titleBox_img} />
          <p className="font-bold text-[1.6vw] text-gray-900 my-auto">이슈 레포트</p>
        </div>
      </div>
      <div className="border border-gray-100 rounded-lg p-[2vw] h-full w-[65vw] font-suitM mt-[3vh] shadow-inner mx-auto">
        <div>
          {editorData ? <Viewer initialValue={editorData} /> : <p className="font-suitM text-[2vw] text-gray-300 text-center">작성된 이슈 레포트가 없어요!</p>}
        </div>
      </div>

      <hr className="h-px my-[3vw] bg-gray-100 border-0 w-[70vw] mx-auto" />

      <div className="flex flex-col mx-auto w-[70vw] mt-[2vh]">
        <div className="flex my-auto">
          <img className="mr-2 select-none pointer-events-none" src={titleBox_img} />
          <p className="font-bold text-[1.6vw] text-gray-900 my-auto">이슈 코멘트</p>
        </div>
      </div>
      <div className="flex flex-col w-[65vw] mx-auto divide-gray-100 mt-[3vh] border border-gray-300 rounded-lg shadow-inner pt-3 pb-5 mb-[7vh]">
        {commentList &&
          commentList.map((comment, index) => (
            <div key={index}>
              <CommentCard issueComment={comment} />
              {index !== commentList.length - 1 && <hr className="h-[2px] bg-gray-50 border-0 w-[60vw] mx-auto" />}
            </div>
          ))}
        {commentList.length > 0 && <hr className="h-[2px] my-[1vw] bg-gray-100 border-0 w-[64vw] mx-auto" />}
        <div className="flex flex-col">
          <p className="font-suitM text-[1.5vw] my-[1vw] px-[2vw]">일반 코멘트 작성</p>
          <div className="flex items-end">
            <textarea
              onChange={handleChangeCommentInput}
              value={commentInputText}
              className="border border-gray-100 text-gray-800 text-sm rounded-lg block p-2.5 focus:border-primary-5 focus:ring-0 mx-[1.3vw] w-[60vw] shadow-inner resize-none"
            />
            <button
              type="button"
              onClick={issueCommentRequest}
              className="border border-primary-4 text-primary-4 bg-white hover:bg-primary-5 font-suitM rounded-lg text-sm items-center mr-[1.5vw] my-auto p-2 w-[50px]"
            >
              작성
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
