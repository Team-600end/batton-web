import React from "react";
import DonutSection from "@components/project/dashboard/DonutSection";
import MilestoneNavbar from "@components/nav/MilestoneNavbar";
import ProjectNavbar from "@components/nav/ProjectNavbar";
import ReleasesPuzzle from "@src/components/project/releases/ReleasesPuzzle";
import PjMemberList from "@components/project/dashboard/PjMemberList";
import IssueLog from "@components/project/issue/IssueLog";
import { useParams } from "react-router-dom";
import releases_info from "@images/releasesPuzzle/releases_info.svg";

export default function DashBoardPage() {
  let { projectId } = useParams();

  return (
    <div className="flex flex-col overflow-hidden">
      <MilestoneNavbar />
      <ProjectNavbar />
      <div className="bg-gray-100 rounded-t-lg border border-gray-300 w-[90vw] m-auto mt-[2vh] flex flex-col p-[3vw] space-y-[2vw]">
        <div className="flex space-x-[2vw]">
          {/* <DonutSection userName="jin" /> */}
          <DonutSection />

          <div className="relative w-[42vw] h-[320px] bg-white rounded-xl shadow-md">
            <p className="pt-[20px] ml-[20px] text-black text-base font-suitB">릴리즈 퍼즐</p>
            <div className=" flex items-center">
              <img src={releases_info} alt="releases_info" className="p-2" />
            </div>
            <ReleasesPuzzle />
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
