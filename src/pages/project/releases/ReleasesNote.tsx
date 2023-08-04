import React from "react";
import ProjectNavbar from "@src/components/nav/ProjectNavbar";
import releases_info from "@images/releasesPuzzle/releases_info.svg";
import MilestoneNavbar from "@components/nav/MilestoneNavbar";
import Plus_img from "@images/icons/plus.svg";
import { useNavigate, useParams } from "react-router-dom";
import { Release } from "@src/types/Release";
import RnoteButton from "@src/components/project/releases/RnoteButton";
import ReleasesPuzzle from "@src/components/project/releases/ReleasesPuzzle";

const releasesList: Release[] = [
  {
    versionChanged: "Major",
    versionMajor: 3,
    versionMinor: 0,
    versionPatch: 1,
    date: "2023.07.28",
    issueList: [
      {
        type: "NEW",
        title: "설문조사 배포 추가",
      },
      {
        type: "FEATURE",
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
        type: "FIXED",
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
        type: "DEPRECATED",
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
        type: "FIXED",
        title: "설문조사 작성 버그 수정",
      },
      {
        type: "CHANGED",
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
        type: "NEW",
        title: "600& 프로젝트 출시",
      },
    ],
    id: 1,
  },
];

export default function ReleasesNote() {
  const navigate = useNavigate();
  const { projectKey } = useParams();

  // const usedIssues: DoneIssue[] = [];
  const reverseList = [...releasesList].reverse();

  return (
    <div className="flex flex-col">
      <MilestoneNavbar />
      <ProjectNavbar />
      <div className="bg-gray-100 rounded-t-lg border border-gray-300 w-[90vw] m-auto mt-[2vh] flex flex-col shadow-inner">
        <div className="flex mx-auto p-4">
          <div className="flex-column">
            <span className="bg-green-100 text-green-400 text-xs font-suitM mr-2 px-2.5 py-0.5 rounded-full border border-green-400">Latest</span>
            <p className="text-4xl font-suitB text-black">v.3.0.1</p>
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
          onClick={() => navigate(`/project/${projectKey}/releasesnote/write`)}
          className="fixed bg-[#5AAE8A] w-[3.7vw] h-[3.7vw] bottom-[4vw] right-[8vw] rounded-full drop-shadow-xl"
        >
          <img src={Plus_img} className="mx-auto w-[2vw] h-[2vw]" />
        </button>
      </div>
    </div>
  );
}
