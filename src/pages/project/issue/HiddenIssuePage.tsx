import React from "react";
import ProjectNavbar from "@src/components/nav/ProjectNavbar";
import Navbar from "@components/nav/Navbar";
import plus_img from "@assets/images/icons/plus.svg";
import Issue from "@typess/Issue";
import IssueCard from "@src/components/project/issue/IssueCard";
import MilestoneNavbar from "@src/components/nav/MilestoneNavbar";

const hiddenIssues: Issue[] = [
  {
    type: "Feature",
    title: "새로운 이슈",
    manager: { name: "John Doe" },
    team: "600&",
    index: 1,
  },
  {
    type: "New",
    title: "변경된 이슈",
    team: "600&",
    index: 2,
  },
  {
    type: "Feature",
    title: "새로운 이슈",
    manager: { name: "John Doe" },
    team: "600&",
    index: 10,
  },
  {
    type: "Feature",
    title: "새로운 이슈",
    manager: { name: "John Doe" },
    team: "600&",
    index: 14,
  },
  {
    type: "Feature",
    title: "새로운 이슈",
    manager: { name: "John Doe" },
    team: "600&",
    index: 1,
  },
  {
    type: "New",
    title: "변경된 이슈",
    team: "600&",
    index: 2,
  },
  {
    type: "Feature",
    title: "새로운 이슈",
    manager: { name: "John Doe" },
    team: "600&",
    index: 10,
  },
  {
    type: "Feature",
    title: "새로운 이슈",
    manager: { name: "John Doe" },
    team: "600&",
    index: 14,
  },
  {
    type: "Fixed",
    title: "새로운 이슈",
    manager: { name: "John Doe" },
    team: "600&",
    index: 14,
  },
];

export default function HiddenIssuePage() {
  return (
    <div className="flex flex-col overflow-hidden">
      <Navbar />
      <MilestoneNavbar />
      <ProjectNavbar />
      <div>
        <div className="bg-gray-100 rounded-t-lg border border-gray-300 w-[90vw] m-auto mt-[2vh] flex flex-col h-screen pt-[2vh]">
          <div className="flex m-[1.5vw] justify-center">
            <div className="w-[80vw] bg-white mx-[1.4vw] rounded-lg shadow-lg px-[3vw]">
              <div className="flex mb-4 ml-[0.3vw] mt-[3vh] items-center">
                <h1 className="text-lg font-bold text-[#323232]">대기</h1>
                <h2 className="ml-[0.8vw]">{hiddenIssues.length}</h2>
              </div>
              <div className="mx-auto grid grid-cols-4 mb-[3vh]">
                {hiddenIssues.map((issue, index) => (
                  <IssueCard key={index} issue={issue}/>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
