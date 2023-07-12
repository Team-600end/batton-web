import React from "react";
import ProjectNavbar from "../components/ProjectNavbar";
import Navbar from "../components/Navbar";
import plus_img from "../assets/images/icons/plus.svg";
import Issue from "../types/Issue";
import IssueCard from "../components/IssueCard";
import MilestoneNavbar from "../components/MilestoneNavbar";

const watingIssues: Issue[] = [
  {
    type: "New",
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
];

const proceedingIssues: Issue[] = [
  {
    type: "New",
    title: "새로운 이슈",
    manager: { name: "John Doe" },
    team: "600&",
    index: 1,
  },
  {
    type: "Changed",
    title: "변경된 이슈",
    team: "600&",
    index: 2,
  },
];

const reviewingIssues: Issue[] = [
  {
    type: "Deprecated",
    title: "새로운 이슈",
    manager: { name: "John Doe" },
    team: "600&",
    index: 1,
  },
  {
    type: "Fixed",
    title: "변경된 이슈",
    team: "600&",
    index: 2,
  },
  {
    type: "Fixed",
    title: "변경된 이슈",
    team: "600&",
    index: 50,
  },
];

const completedIssues: Issue[] = [
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
];

export default function IssueBoardPage() {
  return (
    <div className="flex flex-col overflow-hidden">
      <Navbar />
      <MilestoneNavbar />
      <ProjectNavbar />
      <div>
        <div className="bg-gray-100 rounded-t-lg border border-gray-300 w-[90vw] m-auto mt-[2vh] flex flex-col">
          <div className="flex justify-end mr-[2.5vw] mt-[2vw]"> {/*here*/}
            <button className="rounded-lg bg-[#5AAE8A] text-white flex py-[0.8vh] px-[0.8vw] items-center shadow-md font-suitL">
              <img src={plus_img} className="mr-[0.2vw]" />
              이슈 생성
            </button>
          </div>
          <div className="flex m-[1.5vw] justify-center">
            <div className="w-[20vw] bg-white mx-[1.4vw] rounded-lg shadow-lg flex flex-col h-fit">
              <div className="bg-[#FFED8F] h-[0.5vw] rounded-t-lg" />
              <div className="mx-auto">
                <div className="flex mb-4 ml-[0.3vw] mt-[3vh] items-center">
                  <h1 className="text-lg font-suitB text-[#323232]">대기</h1>
                  <h2 className="ml-[0.8vw] font-suitB">{watingIssues.length}</h2>
                </div>
                {watingIssues.map((issue, index) => (
                  <IssueCard key={index} issue={issue} />
                ))}
              </div>
            </div>
            <div className="w-[20vw] bg-white mx-[1.4vw] rounded-lg shadow-lg flex flex-col h-fit">
              <div className="bg-[#8FB5FF] h-[0.5vw] rounded-t-lg" />
              <div className="mx-auto">
                <div className="flex mb-4 ml-[0.3vw] mt-[3vh] items-center">
                  <h1 className="text-lg font-suitB text-[#323232]">진행</h1>
                  <h2 className="ml-[0.8vw] font-suitB">{proceedingIssues.length}</h2>
                </div>
                {proceedingIssues.map((issue, index) => (
                  <IssueCard key={index} issue={issue} />
                ))}
              </div>
            </div>
            <div className="w-[20vw] bg-white mx-[1.4vw] rounded-lg shadow-lg flex flex-col h-fit">
              <div className="bg-[#FF8F8F] h-[0.5vw] rounded-t-lg" />
              <div className="mx-auto">
                <div className="flex mb-4 ml-[0.3vw] mt-[3vh] items-center">
                  <h1 className="text-lg font-suitB text-[#323232]">검토</h1>
                  <h2 className="ml-[0.8vw] font-suitB">{reviewingIssues.length}</h2>
                </div>
                {reviewingIssues.map((issue, index) => (
                  <IssueCard key={index} issue={issue} />
                ))}
              </div>
            </div>
            <div className="w-[20vw] bg-white mx-[1.4vw] rounded-lg shadow-lg flex flex-col h-fit">
              <div className="bg-[#83CE9B] h-[0.5vw] rounded-t-lg" />
              <div className="mx-auto">
                <div className="flex mb-4 ml-[0.3vw] mt-[3vh] items-center">
                  <h1 className="text-lg font-suitB text-[#323232]">완료</h1>
                  <h2 className="ml-[0.8vw] font-suitB">{completedIssues.length}</h2>
                </div>
                {completedIssues.map((issue, index) => (
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
