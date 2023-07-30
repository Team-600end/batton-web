import React from "react";
import Navbar from "@components/nav/Navbar";
import block from "@images/releasesPuzzle/releases_info.svg";
import ProjectNavbar from "@src/components/nav/ProjectNavbar";
import MilestoneNavbar from "@src/components/nav/MilestoneNavbar";
import IssueBadge from "@src/components/project/issue/IssueBadge";
import { IssueType } from "@src/types/Issue";

interface DummyData {
  issueType: IssueType;
  description: string;
}

const dummyData: DummyData[] = [
  {
    issueType: "New",
    description: "설문조사 배포 추가",
  },
  {
    issueType: "Feature",
    description: "설문조사 완료 기능",
  },
];

export default function Releases() {
  return (
    <div className="flex flex-col">
      <MilestoneNavbar />
      <ProjectNavbar />
      <div className="bg-gray-100 rounded-t-lg border border-gray-300 w-[90vw] m-auto mt-[2vh] flex flex-col">
        <div className="bg-gray-50 rounded-t-lg border border-gray-300 w-[70vw] m-auto mt-[5vh] flex flex-col ">
          <div className="max-w-screen-xl flex items-start flex-wrap mx-auto p-4 justify-end mt-5 mb-3 w-[65vw]">
            <button
              type="button"
              className="focus:outline-none text-white bg-primary-4 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-suitM rounded-lg text-base px-5 py-1.5 mr-2 mb-2"
            >
              수정
            </button>
            <button
              type="button"
              className="focus:outline-none text-white bg-error-3 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-suitM rounded-lg text-base px-5 py-1.5 mr-2 mb-2"
            >
              삭제
            </button>
          </div>
          <div className="max-w-screen-xl flex-column items-start flex-wrap mx-auto p-4 mt-3 mb-3 w-[50vw]">
            <div className="flex flex-row mb-0 justify-between">
              <p className="text-4xl font-suitB text-black dark:text-white mb-3">v.2.7.14</p>
              <p className="text-xl font-suitB text-black dark:text-white mb-3" style={{ alignSelf: "flex-end" }}>
                2023. 07. 27
              </p>
            </div>
            <hr className="h-1.5 mb-5 bg-green-500 border-0 dark:bg-gray-700"></hr>
            {dummyData.map((item, index) => (
              <>
                <div className="flex flex-row my-2" key={index}>
                  <div className="w-24 flex justify-center">
                    <IssueBadge issueType={item.issueType} />
                  </div>
                  <p className="text-base font-suitM text-black dark:text-white">{item.description}</p>
                </div>
                <hr className="h-px my-0 bg-gray-200 border-0 dark:bg-gray-700"></hr>
              </>
            ))}
            <p className="text-3xl font-suitSB text-black dark:text-white my-6">설문조사 배포 기능 추가</p>
            <p className="text-xl font-suitM text-black dark:text-white mb-5">설문조사 배포 기능이 추가되었습니다. 기존의 단순 등록 방식에서 배포 기능이 추가됨에 따라, 사용자들은 더욱 설문조사에 가까운 기능을 이용하실 수 있을 것입니다...</p>
            <img src={block} className="w-600 h-221 mt-4 ml-10" alt="Flowbite Logo" />
          </div>
        </div>
      </div>
    </div>
  );
}
