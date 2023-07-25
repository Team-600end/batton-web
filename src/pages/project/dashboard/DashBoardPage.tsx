import React from "react";
import DonutSection from "@components/project/dashboard/DonutSection";
import MilestoneNavbar from "@components/nav/MilestoneNavbar";
import ProjectNavbar from "@components/nav/ProjectNavbar";
import ReleasesPuzzle from "@src/components/project/releases/ReleasesPuzzle";
import PjMemberList from "@components/project/dashboard/PjMemberList";
import IssueLog from "@components/project/issue/IssueLog";
import { useParams } from "react-router-dom";

export default function DashBoardPage() {
  let { projectId } = useParams();

  return (
    <div className="flex flex-col overflow-hidden">
      <MilestoneNavbar />
      <ProjectNavbar />
      <div className="bg-gray-100 rounded-t-lg border border-gray-300 w-[90vw] m-auto mt-[2vh] flex flex-col p-[3vw] space-y-[2vw] shadow-inner">
        <div className="flex space-x-[2vw]">
          <DonutSection />
          <ReleasesPuzzle />
        </div>
        <div className="flex space-x-[2vw]">
          <PjMemberList />
          <IssueLog />
        </div>
      </div>
    </div>
  );
}
