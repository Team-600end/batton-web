import React from "react";
import ProjectNavbar from "@src/components/nav/ProjectNavbar";
import Navbar from "@components/nav/Navbar";
import plus_img from "@assets/images/icons/plus.svg";
import { Issue } from "@typess/Issue";
import IssueCard from "@src/components/project/issue/IssueCard";
import MilestoneNavbar from "@src/components/nav/MilestoneNavbar";
import { useNavigate, useParams } from "react-router-dom";

const releasedIssues: Issue[] = [
  {
    type: "NEW",
    title: "새로운 이슈",
    manager: { name: "John Doe" },
    team: "600&",
    id: 0,
  },
  {
    type: "NEW",
    title: "변경된 이슈",
    team: "600&",
    id: 1,
  },
];

export default function IssueHistoryPage() {
  let { projectKey } = useParams();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col overflow-hidden">
      <MilestoneNavbar />
      <ProjectNavbar />
      <div>
        <div className="bg-gray-100 rounded-t-lg border border-gray-300 w-[90vw] m-auto mt-[2vh] flex flex-col h-screen pt-[2vh]">
          <div className="flex justify-end mr-[2.5vw] mt-[2vw] space-x-2">
            <button className="rounded-lg bg-[#5AAE8A] text-white flex py-[0.8vh] px-[0.8vw] items-center shadow-md font-suitL">
              <img src={plus_img} className="mr-[0.2vw]" />
              저장하기
            </button>
            <button
              onClick={() => navigate(`/project/${projectKey}/issueboard`)}
              className="rounded-lg bg-[#5AAE8A] text-white flex py-[0.8vh] px-[0.8vw] items-center shadow-md font-suitL"
            >
              나가기
            </button>
          </div>
          <div className="flex m-[1.5vw] justify-center">
            <div className="w-[80vw] bg-white mx-[1.4vw] rounded-lg shadow-lg px-[3vw]">
              <div className="flex mb-4 ml-[0.3vw] mt-[3vh] items-center">
                <h1 className="text-lg font-bold text-[#323232]">이슈 히스토리</h1>
                <h2 className="ml-[0.8vw]">{releasedIssues.length}</h2>
              </div>
              <div className="mx-auto grid grid-cols-4 mb-[3vh]">
                {releasedIssues.map((issue, index) => (
                  <IssueCard key={index} issue={issue} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
