import React from "react";
import DonutSection from "@components/project/dashboard/DonutSection";
import MilestoneNavbar from "@components/nav/MilestoneNavbar";
import ProjectNavbar from "@components/nav/ProjectNavbar";
import ReleasesPuzzle from "@src/components/project/releases/ReleasesPuzzle";
import PjMemberList from "@components/project/dashboard/PjMemberList";
import IssueLog from "@components/project/issue/IssueLog";
import { useParams } from "react-router-dom";
import releases_info from "@images/releasesPuzzle/releases_info.svg";
import { Release } from "@typess/Release";

export default function DashBoardPage() {
  let { projectKey } = useParams();

  const reverseList = [...releasesList].reverse();

  return (
    <div className="flex flex-col overflow-hidden">
      <MilestoneNavbar />
      <ProjectNavbar />
      <div className="bg-gray-100 rounded-t-lg border border-gray-300 w-[90vw] m-auto mt-[2vh] flex flex-col p-[3vw] space-y-[2vw] shadow-inner">
        <div className="flex space-x-[2vw]">
          {/* <DonutSection userName="jin" /> */}
          <DonutSection />

          <div className="relative w-[42vw] h-[320px] bg-white rounded-xl shadow-md">
            <p className="pt-[20px] ml-[20px] text-black text-base font-suitB">릴리즈 퍼즐</p>
            <div className=" flex items-center">
              <img src={releases_info} alt="releases_info" className="p-2" />
            </div>
            <ReleasesPuzzle releaseList={reverseList} />
          </div>
        </div>
        <div className="flex space-x-[2vw]">
          <PjMemberList />
          <IssueLog />
        </div>
      </div>
    </div>
  );
}

const releasesList: Release[] = [
  {
    versionChanged: "Major",
    versionMajor: 3,
    versionMinor: 0,
    versionPatch: 1,
    date: "2023.07.28",
    issueList: [
      {
        type: "New",
        title: "설문조사 배포 추가",
      },
      {
        type: "Feature",
        title: "설문조사 완료 기능",
      },
    ],
    id: 5,
  },
  {
    versionChanged: "Major",
    versionMajor: 2,
    versionMinor: 0,
    versionPatch: 1,
    date: "2023.07.27",
    issueList: [
      {
        type: "Fixed",
        title: "설문조사 삭제 이슈",
      },
    ],
    id: 4,
  },
  {
    versionChanged: "Patch",
    versionMajor: 1,
    versionMinor: 1,
    versionPatch: 2,
    date: "2023.07.18",
    issueList: [
      {
        type: "Deprecated",
        title: "리뷰식 이미지 설문조사 기능 철회",
      },
    ],
    id: 3,
  },
  {
    versionChanged: "Minor",
    versionMajor: 1,
    versionMinor: 1,
    versionPatch: 1,
    date: "2023.07.18",
    issueList: [
      {
        type: "Fixed",
        title: "설문조사 작성 버그 수정",
      },
      {
        type: "Changed",
        title: "설문조사 등록 기능 변경",
      },
    ],
    id: 2,
  },
  {
    versionChanged: "Major",
    versionMajor: 1,
    versionMinor: 0,
    versionPatch: 1,
    date: "2023.07.02",
    issueList: [
      {
        type: "New",
        title: "600& 프로젝트 출시",
      },
    ],
    id: 1,
  },
];
