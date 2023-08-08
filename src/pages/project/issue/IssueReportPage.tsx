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
  const [editorData, setEditorDate] = useState<string>("");

  // Project Recoil
  const [projectNav, setProjectNav] = useRecoilState(projectNavs);
  const pj = projectNav.find(
    (element: ProjectNav) => element.projectKey.toString() == projectKey
  );

  useEffect(() => {
    issueReportRequest();
    setEditorDate(
      "<strong>GPS 기반 설문조사</strong>: 이제 사용자들은 위치 기반 데이터를 설문조사에 활용할 수 있습니다. 설문조사 참가자들의 지리적 위치에 따른 응답을 분석하고 이를 바탕으로 더욱 구체적인 인사이트를 도출할 수 있습니다. <br><br><strong>지역 특성에 맞는 설문조사</strong>: GPS 기능을 활용해 특정 지역의 특성에 맞춘 설문조사를 진행할 수 있습니다. 이를 통해 지역별로 다른 문화나 관습, 선호도 등을 반영한 보다 정확한 데이터를 얻을 수 있습니다. <br><br><strong>실시간 위치</strong> 반영: 참가자의 동의 하에 실시간 위치 반영이 가능하며, 이를 통해 설문조사 결과에 대한 더욱 심층적인 분석이 가능합니다."
    );
  }, []);

  const issueReportRequest = async () => {
    instanceAuth
      .get(`/reports/${issueId}`)
      .then((response) => {
        if (response.data.code == 200) {
          setIssueTitle(response.data.result.issueTitle as string);
          setIssueContent(response.data.result.issueContent as string);
          setNickname(response.data.result.nickname as string);
          setProfileImage(response.data.result.profileImage as string);
          setIssueTag(response.data.result.issueTag as IssueType);
          setIssueStatus(response.data.result.issueStatus as IssueStatus);
          // setEditorDate(editorRef.current.getInstance().getHTML());
        } else {
          console.log("response after error");
          console.log(response.data);
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
      <div className="flex items-center justify-between ml-auto mr-auto mt-[6vh] h-[5vh] w-[60vw]">
        <div className="flex justify-start">
          <p className="font-bold text-[2vw] text-gray-900 jusitfy-start">
            {/* [{pj.projectTitle}-{issueId}] {issueTitle} */}
            프로젝트, 키 , 이슈 타이틀
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
        <div>{editorData && <Viewer initialValue={editorData} />}</div>
      </div>

      <div className="flex flex-col mx-auto w-[50vw] mt-[2vh]">
        <hr className="h-px my-8 bg-gray-200 border-0" />
        <p className="font-bold text-[1.6vw] text-gray-900 ml-10 mt-1">
          코멘트
        </p>
      </div>
      <div className="flex flex-col w-[50vw] mx-auto">
        <div>
          <div className="flex items-center">
            <p className="inline-flex items-center mr-3 text-sm text-gray-900">
              <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full mr-3">
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
              이승희
            </p>
            <p className="text-sm text-gray-600 mr-2">Feb. 8, 2022</p>
            <IssueCommentBadge commentType="ACCEPTED" />
          </div>
          <p className="text-gray-500 ml-12 break-all">
            개쩌네요... 진작 이렇게 하시지... 이번엔 수고했습니다. 앞으로도
            수고하세요. 두줄 작성시 어떻게 되나 볼게요. 굿
          </p>
        </div>
        <div>
          <div className="flex items-center">
            <p className="inline-flex items-center mr-3 text-sm text-gray-900">
              <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full mr-3">
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
              이승희
            </p>
            <p className="text-sm text-gray-600 mr-2">Feb. 3, 2022</p>
            <IssueCommentBadge commentType="DENIED" />
          </div>
          <p className="text-gray-500 ml-12">
            이따구로 코딩할거면 개발자 때려치세요.. 반려!! 다시 해오세요!!!!
          </p>
        </div>
      </div>
    </div>
  );
}
