import React from "react";
import ProjectNavbar from "@src/components/nav/ProjectNavbar";
import block from "@images/releasesPuzzle/releasesBlockImg.svg";
import rvector from "@images/common/rightVector.svg";
import MilestoneNavbar from "@src/components/nav/MilestoneNavbar";
import Plus_img from "@images/icons/plus.svg";
import { useNavigate, useParams } from "react-router-dom";

export default function ReleasesNote() {
  const navigate = useNavigate();
  const { projectId } = useParams();

  return (
    <div className="flex flex-col overflow-hidden">
      <MilestoneNavbar />
      <ProjectNavbar />
      <div className="bg-gray-100 rounded-t-lg border border-gray-300 w-[90vw] m-auto mt-[2vh] flex flex-col">
        <div className="max-w-screen-xl flex items-start flex-wrap justify-flex-end mx-auto p-4">
          <div className="flex-column">
            <span className="bg-green-100 text-green-400 text-xs font-suitM mr-2 px-2.5 py-0.5 rounded-full border border-green-400">Latest</span>
            <p className="text-4xl font-suitB text-black dark:text-white">v.2.7.14</p>
          </div>
          <img src={block} className="w-600 h-221 mt-4 ml-10" alt="Flowbite Logo" />
        </div>
        <div className="max-w-screen-xl flex-column items-start flex-wrap justify-flex-end mx-auto p-4">
          <p className="text-2xl font-suitB text-black dark:text-white mb-3 w-[85vw]">릴리즈 히스토리</p>
          <a
            href="#"
            className="block w-auto p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 flex justify-between mb-5"
          >
            <p className="text-xl font-suitSB text-black dark:text-white">v.2.7.14</p>
            <p className="text-xl font-suitSB text-black dark:text-white">2023. 07. 05</p>
            <div className="flex">
              <span className="bg-blue-100 text-blue-800 text-xs font-suitM mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400 align-middle">
                Feature
              </span>
              <p className="text-base font-suitM text-black dark:text-white">포트폴리오 영상 3분 이상 등록 가능</p>
            </div>
            <img src={rvector} className="w-600 h-221" alt="Flowbite Logo" />
          </a>

          <a
            href="#"
            className="block w-auto p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 flex justify-between mb-5"
          >
            <p className="text-xl font-suitSB text-black dark:text-white">v.2.7.14</p>
            <p className="text-xl font-suitSB text-black dark:text-white">2023. 07. 05</p>
            <div className="flex">
              <span className="bg-blue-100 text-blue-800 text-xs font-suitM mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400 align-middle">
                Feature
              </span>
              <p className="text-base font-suitM text-black dark:text-white">포트폴리오 영상 3분 이상 등록 가능</p>
            </div>
            <img src={rvector} className="w-600 h-221" alt="Flowbite Logo" />
          </a>

          <a
            href="#"
            className="block w-auto p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 flex justify-between mb-5"
          >
            <p className="text-xl font-suitSB text-black">v.2.7.14</p>
            <p className="text-xl font-suitSB text-black">2023. 07. 05</p>
            <div className="flex">
              <span className="bg-blue-100 text-blue-800 text-xs font-suitM mr-2 px-2.5 py-0.5 rounded border border-blue-400 align-middle">
                Feature
              </span>
              <p className="text-base font-suitM text-black ">포트폴리오 영상 3분 이상 등록 가능</p>
            </div>
            <img src={rvector} className="w-600 h-221" alt="Flowbite Logo" />
          </a>
        </div>

        <button onClick={()=>navigate(`/project/${projectId}/releasesnote/write`)} className="absolute fixed bg-[#5AAE8A] w-[3.7vw] h-[3.7vw] bottom-[4vw] right-[8vw] rounded-full drop-shadow-xl">
          <img src={Plus_img} className="mx-auto w-[2vw] h-[2vw]"/>
        </button>
      </div>
    </div>
  );
}