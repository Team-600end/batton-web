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

const releasesList: Release[] = [
  {
    versionChanged: "Major",
    versionMajor: 2,
    versionMinor: 0,
    versionPatch: 1,
    date: "2023.07.27",
    issueList: [
      {
        type: "Feature",
        title: "새로운 기능을 만들었습니다.",
      },
    ],
    id: 1,
  },
  {
    versionChanged: "Patch",
    versionMajor: 1,
    versionMinor: 1,
    versionPatch: 2,
    date: "2023.07.18",
    issueList: [
      {
        type: "Feature",
        title: "팀 카페인의 서베인",
      },
      {
        type: "Changed",
        title: "팀 카레의 폼베이",
      },
    ],
    id: 2,
  },
  {
    versionChanged: "Minor",
    versionMajor: 1,
    versionMinor: 1,
    versionPatch: 1,
    date: "2023.07.18",
    issueList: [
      {
        type: "Feature",
        title: "팀 카페인의 서베인",
      },
      {
        type: "Changed",
        title: "팀 카레의 폼베이",
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
        type: "Deprecated",
        title: "포트폴리오 영상 3분 이상 등록 가능",
      },
      {
        type: "Changed",
        title: "포트폴리오 영상 3분 이상 등록 가능",
      },
    ],
    id: 3,
  },
];


export default function DashBoardPage() {
  let { projectKey } = useParams();

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
            <ReleasesPuzzle releaseList={releasesList}/>
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
