import React, { useState, useCallback, useRef, useEffect } from "react";
import batton_logo_img from "@images/common/batton_logo_medium.svg";
import default_proflie_img from "@images/common/default_profile.svg";
import { useLocation, useNavigate } from "react-router-dom";
import NavPjBotton from "@components/nav/NavPjBotton";
import { ProjectNav } from "@typess/project";
import { useRecoilState } from "recoil";
import { navbarNoticeDd, navbarProfileDd, navbarProjectDd } from "@src/state/modalState";
import { projectNavs } from "@src/state/projectState";
import NoticeConnector from "@src/NoticeConnector";

import avatar_lsh from "@images/dummy/avatar_pmsc.jpeg";
import dk_logo from "@images/dummy/dktechin_logo.png";
import logo_600 from "@images/dummy/600end_logo.svg";
import ke_logo from "@images/dummy/ke_logo.png";
import Notice from "./NoticeNavbar";

const userProjectNav: ProjectNav[] = [
  {
    id: 1,
    projectKey: "dktechin",
    projectTitle: "dktechin",
    grade: "Member",
    logo: dk_logo
  },
  {
    id: 2,
    projectKey: "kea",
    projectTitle: "KEA",
    grade: "Member",
    logo: ke_logo
  },
  {
    id: 3,
    projectKey: "600end",
    projectTitle: "600&",
    grade: "Master",
    logo: logo_600
  },
];

export default function Navbar() {
  const navigate = useNavigate();
  const outside = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const [projects, setProjects] = useRecoilState(projectNavs);
  const [projectDd, setProjectDd] = useRecoilState(navbarProjectDd);
  const [profileDd, setProfileDd] = useRecoilState(navbarProfileDd);
  const [noticeDd, setNoticeDd] = useRecoilState(navbarNoticeDd);

  const memberId: number = 1; 

  const handleProjectDd = () => {
    setProjectDd(!projectDd);
    setNoticeDd(false);
    setProfileDd(false);
  };

  const handleProfileDd = () => {
    setProfileDd(!profileDd);
    setNoticeDd(false);
    setProjectDd(false);
  };

  const handleNoticeDd = () => {
    setNoticeDd(!noticeDd);
    setProjectDd(false);
    setProfileDd(false);
  };

  const handleAllDdOff = () => {
    setNoticeDd(false);
    setProjectDd(false);
    setProfileDd(false);
  };

  const pathArr = location.pathname.split("/", 2);

  useEffect(() => {
    setProjects(userProjectNav);
  },);

  return (
    <nav
      className="bg-white border-gray-200 fixed top-0 w-screen z-50 shadow-sm h-[8vh] flex justify-between px-[3vw]"
      ref={outside}
      onClick={(e) => {
        if (e.target !== outside.current) {
        }
      }}
    >
      <div className="flex items-center p-4">
      <NoticeConnector memberId={memberId}/>
        <button
          className="flex items-center flex-1"
          style={{ marginLeft: "-2vw" }}
          onClick={() => navigate("/")}
        >
          <img src={batton_logo_img} className="h-8 mr-3" alt="Flowbite Logo" />
        </button>
      </div>
      <div className="items-center justify-between w-full md:flex md:w-auto">
        <ul className="flex flex-row font-suitM rounded-lg space-x-[4vw]">
          <li>
            <button
              className={pathArr[1] === "main" ? "text-[#5AAE8A] hover:text-[#5AAE8A]" : "text-gray-900 hover:text-[#5AAE8A]"}
              onClick={() => navigate("/main")}
            >
              메인
            </button>
          </li>
          <li>
            <button
              className={
                pathArr[1] === "project"
                  ? "flex items-center justify-between text-[#5AAE8A] hover:text-[#5AAE8A]"
                  : "flex items-center justify-between text-gray-900 hover:text-[#5AAE8A]"
              }
              onClick={handleProjectDd}
            >
              프로젝트{" "}
              <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>
          </li>
          <li>
            <button
              className={
                pathArr[1] === "board"
                  ? "rounded bg-transparent text-[#5AAE8A] hover:text-[#5AAE8A]"
                  : "rounded bg-transparent text-gray-900 hover:text-[#5AAE8A]"
              }
              onClick={() => navigate("/board")}
            >
              게시판
            </button>
          </li>
        </ul>
      </div>
      <div className="flex items-center mr-3">
        {/*알람 버튼*/}
        <button
          id="dropdownNotificationButton"
          data-dropdown-toggle="dropdownNotification"
          className="inline-flex items-center text-sm font-suitM text-center text-gray-500 hover:text-gray-900 focus:outline-none mr-3"
          type="button"
          onClick={handleNoticeDd}
        >
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 20">
            <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
          </svg>
          <div className="relative flex">
            <div className="relative inline-flex w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-2 right-2.5"></div>
          </div>
        </button>

        {/* 유저 버튼 */}
        <button type="button" className="flex text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300" onClick={handleProfileDd}>
          <span className="sr-only">Open user menu</span>
          <img className="w-8 h-8 rounded-full object-cover" src={avatar_lsh} />
        </button>
      </div>
      {projectDd && (
        <div className="absolute z-20 font-suitL top-[6.5vh] left-1/2 translate-x-[-50%] mr-[1.3vw] bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
          <ul className="flex flex-col py-2 text-sm text-gray-700 justify-center">
            {userProjectNav.map((project, index) => (
              <li>
                <NavPjBotton key={index} project={project} />
              </li>
            ))}
          </ul>
          <div className="py-1">
            <button className="block px-4 py-2 hover:bg-gray-100 w-full" onClick={handleAllDdOff}>
              <div className="flex items-center">
                <p className="font-suitL text-sm text-[#6B7280]">모든 프로젝트 보기</p>
              </div>
            </button>
            <button className="block px-4 py-2 hover:bg-gray-100 w-full" onClick={handleAllDdOff}>
              <div className="flex items-center">
                <p className="font-suitL text-sm text-[#6B7280]">프로젝트 생성하기</p>
              </div>
            </button>
          </div>
        </div>
      )}
      {noticeDd && (
        <div className="absolute right-[3vh] top-[6.5vh] w-[27vw] bg-white">
          <Notice />
        </div>
      )}
      {profileDd && (
        <div className="absolute z-20 right-[3vh] top-[6.5vh] bg-white divide-y divide-gray-100 rounded-lg shadow">
          <div className="px-4 py-3">
            <span className="block text-sm text-gray-900 mb-1">이승희</span>
            <span className="block text-sm  text-gray-500 truncate">lshdk@batton.com</span>
          </div>
          <ul className="py-2">
            <li>
              <button
                onClick={() => {
                  handleAllDdOff();
                  navigate("/myinfo-edit");
                }}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                내 정보 수정
              </button>
            </li>
            <li>
              <button onClick={handleAllDdOff} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                프로젝트 관리
              </button>
            </li>
            <li>
              <button onClick={handleAllDdOff} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                이용약관
              </button>
            </li>
          </ul>
          <button
            onClick={() => {
              handleAllDdOff();
              navigate("/login");
            }}
            className="block text-sm text-error-2 w-full text-left px-4 py-3 hover:bg-gray-100"
          >
            로그아웃
          </button>
        </div>
      )}
    </nav>
  );
}
