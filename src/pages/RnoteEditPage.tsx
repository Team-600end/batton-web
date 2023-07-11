import React from "react";
import Navbar from "../components/Navbar";
import Issue from "../types/Issue";
import RnoteIssueCard from "../components/RnoteIssueCard";
import refresh_img from "../assets/images/icons/refresh.svg";

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
];

export default function RnoteEditPage() {
  return (
    <div className="mt-[9vh] flex">
      <Navbar />
      <div className="flex flex-row w-screen">
        <div className="border border-gray-400 rounded-t-lg ml-[0.5vw]">
          <div className="border-b border-gray-400 p-[1vw] flex justify-between">
            완료 이슈 리스트
            <img src={refresh_img} />
          </div>
          <div className="p-[2vw]">
            {completedIssues.map((issue, index) => (
              <RnoteIssueCard key={index} issue={issue} />
            ))}
          </div>
        </div>
        <div className="flex flex-col mx-auto w-[76vw] mt-[2vh]">
          <div className="flex justify-end">
            <button
              type="button"
              className="focus:outline-none text-white bg-[#AAAAAA] hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-6 py-2 mr-2 mb-2"
            >
              취소하기
            </button>
            <button
              type="button"
              className="focus:outline-none text-white bg-[#5AAE8A] hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-6 py-2 mr-2 mb-2"
            >
              저장하기
            </button>
          </div>
          <div>
            <div className="border border-gray-400 rounded-lg p-[1vw] mb-[1vh]">
              <input
                type="text"
                placeholder="버전"
                className="border-none outline-none w-full h-full resize-none"
              />
            </div>
            <div className="border border-gray-400 rounded-lg p-[1vw] h-[80vh]">
              <textarea
                placeholder="내용"
                className="border-none outline-none w-full h-full resize-none"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
