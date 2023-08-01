import React, { useState, useCallback, useEffect } from "react";
import latest_img from "@images/common/latest.png";
import grayStarImg from "@images/icons/grayStar.png";
import yellowStarImg from "@images/icons/yellowStar.png";
import { ProjectCard } from "@typess/project";
import { useNavigate } from "react-router-dom";

type PjCardProps = {
  pjCard: ProjectCard;
};

export default function PjCard(props: PjCardProps) {
  const percent = ((props.pjCard.doneIssue / (props.pjCard.todoIssue + props.pjCard.doingIssue + props.pjCard.doneIssue)) * 100).toFixed(1);
  const navigate = useNavigate();
  const [bookmark, setBookmark] = useState(false);
  const clickStar = () => {
    setBookmark(!bookmark);
  };

  return (
    <div onClick={() => navigate(`/project/${props.pjCard.projectKey}/dashboard`)}>
      <div className="flex w-[350px] h-[250px] p-[10px] shadow-[2px_6px_6px_-2px_rgba(0,0,0,0.3)] bg-white border border-gray-200 rounded-lg hover:bg-gray-100 mx-2 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div className="relative w-[350px] h-[250px] flex flex-col items-center justify-start">
          {/* 최상단 아이콘과 팀이름 */}
          <div className="relative w-[300px] h-[70px] mt-[10px] flex flex-row">
            <div className="rounded-full overflow-hidden ring-1 w-[70px] h-[70px] ring-[#285F43] justify-center">
              <img className="ring-1 w-[70px] h-[70px] ring-[#285F43] rounded-full object-cover" src={props.pjCard.projectImg} alt="pj_img" />
            </div>
            <div className="flex-col ml-[20px] mt-[5px]">
              <div className="flex flex-row">
                <p className="text-[#5AAE8A] text-2xl font-suitB">{props.pjCard.projectTitle}</p>
                <img
                  src={props.pjCard.bookmark ? yellowStarImg : grayStarImg}
                  alt="star_img"
                  className="w-[23px] h-[23px] mt-[5px] ml-[5px]"
                  onClick={clickStar}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <div className="flex flex-row items-center mt-[2px]">
                <img className="w-[50px] h-[18px] mt-[2px]" src={latest_img} alt="pj_latest_img" />
                <p className="ml-[5px] text-[#707070] font-suitSB">
                  v{props.pjCard.versionMajor}.{props.pjCard.versionMinor}.{props.pjCard.versionPatch}
                </p>
              </div>
            </div>
          </div>

          {/* 프로젝트 개수 모음 */}
          <div className="relative font-suitM w-[300px] h-[50px] mt-[10px] pl-[15px] flex flex-col">
            <div className="flex flex-row">
              <span className="w-1/2 flex flex-row">
                <p>진행 전 이슈</p>
                <p className="text-[#5AAE8A] ml-[20px]">{props.pjCard.todoIssue}</p>
              </span>
              <span className="w-1/2 flex flex-row">
                <p>진행 중 이슈</p>
                <p className="text-[#5AAE8A] ml-[20px]">{props.pjCard.doingIssue}</p>
              </span>
            </div>
            <div className="flex flex-row">
              <span className=" w-1/2 flex flex-row">
                <p>내 할당 이슈</p>
                <p className="text-[#5AAE8A] ml-[20px]">{props.pjCard.myIssue}</p>
              </span>
              <span className="w-1/2 flex flex-row">
                <p>완료 이슈</p>
                <p className="text-[#5AAE8A] ml-[37px]">{props.pjCard.doneIssue}</p>
              </span>
            </div>
          </div>

          {/* 사람들 */}
          <div className="relative w-[300px] h-[30px] mt-[10px]">
            <div className="flex -space-x-4">
              <img className="w-[30px] h-[30px] border-[1px] border-white rounded-full dark:border-gray-800 object-cover" src={props.pjCard.leaderImg} alt="" />
              <a
                className="flex items-center justify-center w-[30px] h-[30px] text-xs font-suitM text-white bg-gray-700 border-[1px] border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
                href="#"
              >
                +{props.pjCard.memberNum - 1}
              </a>
              <p className="text-sm font-suitL text-[#C4C4C4] mt-[5px] pl-[30px] ">
                {props.pjCard.leaderName}님 외 {props.pjCard.memberNum - 1}명
              </p>
            </div>
          </div>

          {/* progress bar */}
          <div className="relative w-[300px] h-[30px]">
            <div className="flex justify-between mb-1">
              <span className="text-base font-suitM text-blue-700 dark:text-white"></span>
              <span className="text-sm font-suitM text-[#6B7280] dark:text-white">{percent}%</span>
            </div>
            <div className="w-full bg-[#F4F4F4] rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-[#5AAE8A] h-2.5 rounded-full"
                style={{
                  width: `${percent}%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
