import React from "react";
import Navbar from "@components/nav/Navbar";
import block from "@images/releasesPuzzle/releasesBlockImg.svg";
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
    issueType: "Changed",
    description: "포트폴리오 영상 3분 이내 등록 가능1",
  },
  {
    issueType: "Deprecated",
    description: "포트폴리오 영상 3분 이내 등록 가능2",
  },
  {
    issueType: "Deprecated",
    description: "포트폴리오 영상 3분 이내 등록 가능3",
  },
];

export default function Releases() {
  return (
    <>
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
              <p className="text-4xl font-suitB text-black dark:text-white mb-3">
                v.2.7.14
              </p>
              <p
                className="text-xl font-suitB text-black dark:text-white mb-3"
                style={{ alignSelf: "flex-end" }}
              >
                2023. 07. 05
              </p>
            </div>
            <hr className="h-1.5 mb-5 bg-green-500 border-0 dark:bg-gray-700"></hr>
            {dummyData.map((item, index) => (
              <>
                <div className="flex flex-row my-2" key={index}>
                  <div className="w-24 flex justify-center">
                    <IssueBadge issueType={item.issueType} />
                  </div>
                  <p className="text-base font-suitM text-black dark:text-white">
                    {item.description}
                  </p>
                </div>
                <hr className="h-px my-0 bg-gray-200 border-0 dark:bg-gray-700"></hr>
              </>
            ))}
            <p className="text-3xl font-suitSB text-black dark:text-white my-6">
              포트폴리오 영상 3분 이상 등록 가능
            </p>
            <p className="text-xl font-suitM text-black dark:text-white mb-5">
              포트폴리오 영상 길이 제한이 기존 3분 이하에서 3분 이상으로
              변경되었습니다.
            </p>
            <img
              src={block}
              className="w-600 h-221 mt-4 ml-10"
              alt="Flowbite Logo"
            />
          </div>
        </div>
      </div>
    </>
  );
}