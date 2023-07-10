import React from "react";
import MainNavbar from "../components/MainNavbar";
import Navbar from "../components/Navbar";
import plus_img from "../assets/images/icons/plus.svg";
import Issue from "../types/Issue";
import IssueCard from "../components/IssueCard";

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

const completeIssues: Issue[] = [
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
      <MainNavbar />
      <div>
        <div className="bg-gray-100 rounded-t-lg border border-gray-300 w-[90vw] m-auto mt-[2vh] flex flex-col">
          <div className="flex justify-end mr-[2vw] mt-[2vw]">
            <button className="rounded-lg bg-[#5AAE8A] text-white flex p-[0.8vh] items-center">
              <img src={plus_img} className="mr-[0.2vw]" />
              이슈 생성
            </button>
          </div>
          <div className="flex m-[1.5vw] justify-center">
            <div className="w-[20vw] bg-white mx-[1.4vw] rounded-lg shadow-lg flex">
              <div className="bg-[#FFED8F] w-[0.5vw] rounded-l-lg" />
              <div className="mx-auto">
                <div className="flex mb-4 ml-[0.3vw] mt-[3vh] items-center">
                  <h1 className="text-lg font-bold text-[#323232]">대기</h1>
                  <h2 className="ml-[0.8vw]">{watingIssues.length}</h2>
                </div>
                {watingIssues.map((issue, index) => (
                  <IssueCard key={index} issue={issue} />
                ))}
              </div>
            </div>
            <div className="w-[20vw] bg-white mx-[1.4vw] rounded-lg shadow-lg flex">
              <div className="bg-[#8FB5FF] w-[0.5vw] rounded-l-lg" />
              <div className="mx-auto">
                <div className="flex mb-4 ml-[0.3vw] mt-[3vh] items-center">
                  <h1 className="text-lg font-bold text-[#323232]">진행</h1>
                  <h2 className="ml-[0.8vw]">{proceedingIssues.length}</h2>
                </div>
                {proceedingIssues.map((issue, index) => (
                  <IssueCard key={index} issue={issue} />
                ))}
              </div>
            </div>
            <div className="w-[20vw] bg-white mx-[1.4vw] rounded-lg shadow-lg flex">
              <div className="bg-[#FF8F8F] w-[0.5vw] rounded-l-lg" />
              <div className="mx-auto">
                <div className="flex mb-4 ml-[0.3vw] mt-[3vh] items-center">
                  <h1 className="text-lg font-bold text-[#323232]">검토</h1>
                  <h2 className="ml-[0.8vw]">{reviewingIssues.length}</h2>
                </div>
                {reviewingIssues.map((issue, index) => (
                  <IssueCard key={index} issue={issue} />
                ))}
              </div>
            </div>
            <div className="w-[20vw] bg-white mx-[1.4vw] rounded-lg shadow-lg flex">
              <div className="bg-[#83CE9B] w-[0.5vw] rounded-l-lg" />
              <div className="mx-auto">
                <div className="flex mb-4 ml-[0.3vw] mt-[3vh] items-center">
                  <h1 className="text-lg font-bold text-[#323232]">완료</h1>
                  <h2 className="ml-[0.8vw]">{completeIssues.length}</h2>
                </div>
                {completeIssues.map((issue, index) => (
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
