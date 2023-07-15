import React from "react";
import DonutSection from "../components/DonutSection";
import MilestoneNavbar from "../components/MilestoneNavbar";
import ProjectNavbar from "../components/ProjectNavbar";
import ReleasePuzzle from "../components/ReleasePuzzle";
import PjMemberList from "../components/PjMemberList";
import IssueLog from "../components/IssueLog";

export default function DashBoardPage() {
  return (
    <div className="flex flex-col overflow-hidden">
      <MilestoneNavbar />
      <ProjectNavbar />
      <div className="bg-gray-100 rounded-t-lg border border-gray-300 w-[90vw] m-auto mt-[2vh] flex flex-col p-[3vw] space-y-[2vw]">
        <div className="flex space-x-[2vw]">
            <DonutSection userName="jin" />
            <ReleasePuzzle/>
        </div>
        <div className="flex space-x-[2vw]">
            <PjMemberList/>
            <IssueLog/>
        </div>
      </div>
    </div>
  );
}
