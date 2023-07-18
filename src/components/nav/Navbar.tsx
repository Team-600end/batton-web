import React, { useState, useCallback, useRef } from "react";
import batton_logo_img from "@images/common/batton_logo_medium.svg";
import Notice from "@components/nav/Notice";
import { useNavigate } from "react-router-dom";
import NavPjBotton from "@components/nav/NavPjBotton";
import { ProjectNav } from "@typess/project";
import { useRecoilState } from "recoil";
import { navbarNoticeDropdown, navbarProjectDropdown } from "@src/state/modalState";

const userProjectNav: ProjectNav[] = [
  {
    id: 0,
    name: "Batton",
    grade: "Master",
  },
  {
    id: 1,
    name: "SurVeine",
    grade: "Member",
  },
  {
    id: 2,
    name: "GwangGoNuri",
    grade: "Member",
  },
];

export default function Navbar() {
  const navigate = useNavigate();
  const outside = useRef<HTMLDivElement>(null);

  const [projectDropdown, setProjectDropdown] = useRecoilState(navbarProjectDropdown);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [noticeDropdown, setNoticeDropdown] = useRecoilState(navbarNoticeDropdown);

  const handleProjectDropdown = () => {
    setProjectDropdown(!projectDropdown);
  };

  const handleProfileDropdown = () => {
    setProfileDropdown(!profileDropdown);
  };

  const handleNoticeDropdown = () => {
    setNoticeDropdown(!noticeDropdown);
  };

  return (
    <nav
      className="bg-white border-gray-200 fixed top-0 w-screen bg-white z-50 shadow-sm h-[8vh] flex justify-between px-[3vw]"
      ref={outside}
      onClick={(e) => {
        if (e.target == outside.current) setProjectDropdown(false);
        if (e.target == outside.current) setNoticeDropdown(false);
      }}
    >
      <div className="flex items-center p-4">
        <button className="flex items-center flex-1" style={{ marginLeft: "-2vw" }} onClick={() => navigate("/")}>
          <img src={batton_logo_img} className="h-8 mr-3" alt="Flowbite Logo" />
        </button>
      </div>
      <div className="items-center justify-between w-full md:flex md:w-auto">
        <ul className="flex flex-row font-suitM rounded-lg space-x-[4vw]">
          <li>
            <button className="bg-blue-700 rounded md:bg-transparent text-[#5AAE8A]" onClick={() => navigate("/main")}>
              메인
            </button>
          </li>
          <li>
            <button
              className="flex items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 hover:bg-transparent md:hover:text-[#5AAE8A] md:p-0 md:w-auto"
              onClick={handleProjectDropdown}
            >
              프로젝트{" "}
              <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
              </svg>
            </button>
          </li>
          <li>
            <button
              className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#5AAE8A] md:p-0"
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
          onClick={handleNoticeDropdown}
        >
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 20">
            <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
          </svg>
          <div className="relative flex">
            <div className="relative inline-flex w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-2 right-2.5"></div>
          </div>
        </button>
        <button
          type="button"
          className="flex text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300"
          id="user-menu-button"
          aria-expanded="false"
          data-dropdown-toggle="user-dropdown"
          data-dropdown-placement="bottom"
        >
          <span className="sr-only">Open user menu</span>
          <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/logo.svg" alt="user photo" />
        </button>
        <div className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow" id="user-dropdown">
          <div className="px-4 py-3">
            <span className="block text-sm text-gray-900">Bonnie Green</span>
            <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
          </div>
          <ul className="py-2" aria-labelledby="user-menu-button">
            <li>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Settings
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Earnings
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Sign out
              </a>
            </li>
          </ul>
        </div>
        <button
          data-collapse-toggle="navbar-user"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-user"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>
      </div>
      {projectDropdown && (
        <div className="absolute z-20 font-suitL top-[6.5vh] left-1/2 translate-x-[-50%] mr-[1.3vw] bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
          <ul className="flex flex-col py-2 text-sm text-gray-700 justify-center">
            {userProjectNav.map((project, index) => (
              <li>
                <NavPjBotton key={index} project={project} />
              </li>
            ))}
          </ul>
          <div className="py-1">
            <button className="block px-4 py-2 hover:bg-gray-100 w-full">
              <div className="flex items-center">
                <p className="font-suitL text-sm text-[#6B7280]">모든 프로젝트 보기</p>
              </div>
            </button>
            <button className="block px-4 py-2 hover:bg-gray-100 w-full">
              <div className="flex items-center">
                <p className="font-suitL text-sm text-[#6B7280]">프로젝트 생성하기</p>
              </div>
            </button>
          </div>
        </div>
      )}
      {noticeDropdown && (
        <div className="absolute right-[3vh] top-[6.5vh] w-[27vw] bg-white">
          <Notice />
        </div>
      )}
    </nav>
  );
}
