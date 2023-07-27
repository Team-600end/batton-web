import React from "react";
import ProjectNavbar from "@src/components/nav/ProjectNavbar";
import releases_info from "@images/releasesPuzzle/releases_info.svg";
import MilestoneNavbar from "@components/nav/MilestoneNavbar";
import Plus_img from "@images/icons/plus.svg";
import { useNavigate, useParams } from "react-router-dom";
import { Release } from "@src/types/Release";
import RnoteButton from "@src/components/project/releases/RnoteButton";
import ReleasesPuzzle from "@src/components/project/releases/ReleasesPuzzle";

export default function ReleasesNote() {
  const navigate = useNavigate();
  const { projectId } = useParams();

  const releasesList: Release[] = [
    {
      vF: 2,
      vM: 70,
      vL: 999,
      date: "2023.07.05",
      issueList: [
        {
          type: "Feature",
          title: "새로운 기능을 만들었습니다.",
        },
      ],
      id: 1,
    },
    {
      vF: 20,
      vM: 70,
      vL: 20,
      date: "2023.07.05",
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
      vF: 2,
      vM: 7,
      vL: 30,
      date: "2023.07.05",
      issueList: [
        {
          type: "Deprecated",
          title: "포트폴리오 영상 3분 이상 등록 가능",
        },
        {
          type: "Changed",
          title: "포트폴리오 영상 3분 이상 등록 가능",
        },
        {
          type: "New",
          title: "포트폴리오 영상 3분 이상 등록 가능",
        },
        {
          type: "Deprecated",
          title: "포트폴리오 영상 3분 이상 등록 가능",
        },
        {
          type: "Changed",
          title: "포트폴리오 영상 3분 이상 등록 가능",
        },
        {
          type: "New",
          title: "포트폴리오 영상 3분 이상 등록 가능",
        },
      ],
      id: 3,
    },
  ];

  // const usedIssues: DoneIssue[] = [];

  return (
    <div className="flex flex-col overflow-hidden">
      <MilestoneNavbar />
      <ProjectNavbar />
      <div className="bg-gray-100 rounded-t-lg border border-gray-300 w-[90vw] m-auto mt-[2vh] flex flex-col">
        <div className="flex mx-auto p-4 pb-0">
          <div className="flex-column">
            <span className="bg-green-100 text-green-400 text-xs font-suitM mr-2 px-2.5 py-0.5 rounded-full border border-green-400">Latest</span>
            <p className="text-4xl font-suitB text-black">v.2.7.14</p>
          </div>
          <div className="flex flex-col">
            <img src={releases_info} alt="releases_info" className="p-2 w-[50vw]" />
            <ReleasesPuzzle />
          </div>
        </div>

        <div className="flex flex-col p-4 pt-0 mx-auto">
          <p className="text-2xl font-suitB text-black mx-[2vw] my-[3vh]">릴리즈 히스토리</p>
          <div>
            {releasesList.map((release) => (
              <RnoteButton release={release} />
            ))}
          </div>
        </div>

        <button
          onClick={() => navigate(`/project/${projectId}/releasesnote/write`)}
          className="fixed bg-[#5AAE8A] w-[3.7vw] h-[3.7vw] bottom-[4vw] right-[8vw] rounded-full drop-shadow-xl"
        >
          <img src={Plus_img} className="mx-auto w-[2vw] h-[2vw]" />
        </button>
      </div>
    </div>
  );
}
