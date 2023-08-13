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
import profile_img from "@images/common/default_profile.png";
import IssueCommentBadge from "@src/components/project/issue/IssueCommentBadge";
import default_avatar_img from "@images/common/default_profile.svg";
import { CommentType, IssueComment } from "@src/types/comment";
import CommentCard from "@src/components/project/issue/CommentCard";

interface CommentPostData {
  commentContent?: string;
  commentType: CommentType;
};

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
  const pj = projectNav.find(
    (element: ProjectNav) => element.projectKey.toString() == projectKey
  );

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
      commentType: "COMMON"
    };
    instanceAuth
      .post(`/reports/comments/${issueId}`, commentPostData)
      .then((response) => {
        if (response.data.code == 200) {
          alert("댓글을 등록하였습니다.");
          setCommentInputText('');
          issueReportRequest(); // fetch
        } else {
          console.log("response after error")
        }
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const viewer = new Viewer({
    el: document.querySelector("#viewer"),
    height: "600px",
    initialValue: editorData,
  });

  return (
    <div className="flex flex-col overflow-hidden">
      <MilestoneNavbar />
      <div className="flex items-center justify-between ml-auto mr-auto mt-[6vh] h-[5vh] w-[60vw]">
        <div className="flex justify-start">
          <p className="font-suitB text-[2vw] text-gray-900 jusitfy-start">
            [{pj.projectTitle}-{issueId}] {issueTitle}
          </p>
        </div>
      </div>

      <div className="flex flex-col mr-auto ml-auto w-[50vw] mt-[5vh]">
        <p className="font-bold text-[1.6vw] text-gray-900 ml-10 mt-1">
          이슈 정보
        </p>
      </div>

      <div className="flex flex-col mt-[5vh] mx-auto w-[50vw] px-[7vw] space-y-5">
        <div className="flex">
          <p className="font-suitM text-[1.4vw] text-gray-900">상태</p>
          <div className="ml-auto space-x-1">
            <IssueStatusBadge issueStatus={issueStatus} />
          </div>
        </div>
        <div className="flex">
          <p className="font-suitM text-[1.4vw] text-gray-900">설명</p>
          <p className="font-suitM text-[1vw] text-gray-900 ml-auto my-auto">
            {issueContent}
          </p>
        </div>
        <div className="flex">
          <p className="font-suitM text-[1.4vw] text-gray-900">태그</p>
          <div className="ml-auto my-auto">
            <IssueBadge issueType={issueTag} />
          </div>
        </div>
        <div className="flex">
          <p className="font-suitM text-[1.4vw] text-gray-900">담당자</p>
          <div className="flex flex-row ml-auto my-auto">
            <img className="w-8 h-8 mr-3.5" src={profile_img} />
            <p className="font-suitM text-[1vw] text-gray-900 mt-1">
              {nickname}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col mx-auto w-[50vw] mt-[2vh]">
        <hr className="h-px my-8 bg-gray-200 border-0" />
        <p className="font-bold text-[1.6vw] text-gray-900 ml-10 mt-1">
          이슈 레포트
        </p>
      </div>
      <div className="mb-4 border border-gray-300 rounded-lg bg-gray-100 p-[2vw] h-full w-[48vw] font-suitM mt-[5vh] mx-auto">
        <div>{editorData && <Viewer initialValue={editorData}/>}</div>
      </div>

      <div className="flex flex-col mx-auto w-[50vw] mt-[2vh]">
        <hr className="h-px my-8 bg-gray-200 border-0" />
        <p className="font-bold text-[1.6vw] text-gray-900 ml-10 mt-1">
          코멘트
        </p>
      </div>
      <div className="flex flex-col w-[48vw] mx-auto divide-y divide-gray-100 mt-[3vh] border border-gray-300 rounded-lg shadow-inner pt-3 pb-5 mb-[7vh]">
        {commentList && commentList.map((comment, index) => (
          <div key={index}>
            <CommentCard issueComment={comment}/>
          </div>
        ))}
        <div className="flex flex-col">
          <p className="font-suitM text-lg pt-4 px-7 pb-3">일반 코멘트 작성</p>
          <div className="flex items-end">
            <textarea
              onChange={handleChangeCommentInput}
              value={commentInputText}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 focus:border-gray-300 focus:ring-0 mx-[1.3vw] w-[40vw] resize-none"
            />
            <button
              type="button"
              onClick={issueCommentRequest}
              className="h-[4vh] border border-primary-4 text-primary-4 bg-white hover:bg-primary-5 font-suitM rounded-lg text-sm items-center w-[4vw] mr-[2vw] mb-[0.1vh]"
            >
              작성하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
