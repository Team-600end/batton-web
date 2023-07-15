import React from "react";
import DonutSection from "@components/DonutSection";
import MilestoneNavbar from "@src/components/nav/MilestoneNavbar";
import ProjectNavbar from "@src/components/nav/ProjectNavbar";
import ReleasePuzzle from "@src/components/project/release/ReleasePuzzle";
import PjMemberList from "@src/components/project/dashboard/PjMemberList";
import IssueLog from "@src/components/project/issue/IssueLog";

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
