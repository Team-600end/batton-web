import { useEffect, useRef, useState } from "react";
import batton_logo_img from "@images/common/batton_logo_medium.svg";
import Notice from "@components/nav/NoticeNavbar";
import { useLocation, useNavigate } from "react-router-dom";
import NavPjButton from "@components/nav/NavPjButton";
import { ProjectNav } from "@typess/project";
import { useRecoilState } from "recoil";
import {
  navbarNoticeDd,
  navbarProfileDd,
  navbarProjectDd,
} from "@src/state/modalState";
import { projectNavs } from "@src/state/projectState";
import default_profile_img from "@images/common/default_profile.svg";

import { instanceAuth } from "@src/types/AxiosInterface";
import { useCookies } from "react-cookie";
import { emailState, nicknameState, profileImgState } from "@src/state/userState";
import { ConnectRabbit } from "@src/ConnectRabbit";

export default function Navbar() {
  const [projects, setProjects] = useRecoilState(projectNavs);
  const [projectDd, setProjectDd] = useRecoilState(navbarProjectDd);
  const [profileDd, setProfileDd] = useRecoilState(navbarProfileDd);
  const [noticeDd, setNoticeDd] = useRecoilState(navbarNoticeDd);

  const [memberId, setMemberId] = useState(0);
  const [userNickname, setUserNickname] = useRecoilState(nicknameState);
  const [userProfileImg, setUserProfileImg] = useRecoilState(profileImgState);
  const [userEmail, setUserEmaiil] = useRecoilState(emailState);

  // router dom
  const navigate = useNavigate();
  const location = useLocation();

  const outside = useRef<HTMLDivElement>(null);

  const [cookies, setCookie ,removeCookie] = useCookies(['accessToken', 'refreshToken']);

  useEffect(() => {
    navPjRequest();
    getMemberId();
  }, []);

  const navPjRequest = async () => {
    console.log("navPjRequestnavPjRequestnavPjRequest");
    instanceAuth
      .get(`/projects/navbar`)
      .then((response) => {
        if (response.data.code == 200) {
          console.log(response.data.result)
          setProjects(response.data.result as ProjectNav[])
        }
        else if (response.data.code == 707) {
          setProjects([]);
        } else {
          console.log('잘못된 접근입니다.');
        }
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const getMemberId = async () => {
    console.log("getMemberIdgetMemberIdgetMemberId");
    instanceAuth
    .get(`/members/id`)
    .then((response) => {
      console.log(response.data);
      if (response.data.code == 200) {
        setMemberId(response.data.result.memberId);
      }
    })
    .catch((error) => {
      console.log(error);
    })
  }

  const handleProjectDd = () => {
    setProjectDd(!projectDd);
    setNoticeDd(false);
    setProfileDd(false);
    navPjRequest();
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
        <button
          className="flex items-center flex-1"
          style={{ marginLeft: "-2vw" }}
          onClick={() => navigate("/")}
        >
          <img src={batton_logo_img} className="h-8 mr-3 select-none pointer-events-none" alt="Flowbite Logo" />
        </button>
        {memberId !== 0 && <ConnectRabbit memberId={memberId} />}
      </div>
      <div className="items-center justify-between w-full md:flex md:w-auto">
        <ul className="flex flex-row font-suitM rounded-lg space-x-[4vw]">
          <li>
            <button
              className={
                pathArr[1] === "main"
                  ? "text-[#5AAE8A] hover:text-[#5AAE8A]"
                  : "text-gray-900 hover:text-[#5AAE8A]"
              }
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
              <svg
                className="w-2.5 h-2.5 ml-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
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
          className="inline-flex items-center text-sm font-suitM text-center text-gray-500 hover:text-gray-900 focus:outline-none mr-3"
          type="button"
          onClick={handleNoticeDd}
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 14 20"
          >
            <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
          </svg>
          <div className="relative flex">
            <div className="relative inline-flex w-3 h-3 bg-red-500 border-2 border-white rounded-full -top-2 right-2.5"></div>
          </div>
        </button>

        {/* 유저 버튼 */}
        <button
          type="button"
          className="flex text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300"
          onClick={handleProfileDd}
        >
          <span className="sr-only">Open user menu</span>
          <img className="w-8 h-8 rounded-full object-cover select-none pointer-events-none" src={(userProfileImg == '' || userProfileImg == null) ? default_profile_img : userProfileImg} />
        </button>
      </div>
      {projectDd && (
        <div className="absolute z-20 font-suitL top-[6.5vh] left-1/2 translate-x-[-50%] mr-[1.3vw] bg-white divide-y divide-gray-100 rounded-lg shadow">
          <ul className="flex flex-col py-2 text-sm text-gray-700 justify-center">
            {projects.map((project) => (
              <li key={project.projectId}>
                <NavPjButton project={project} />
              </li>
            ))}
          </ul>
          <div className="py-1">
            <button
              className="block px-4 py-2 hover:bg-gray-100 w-full"
              onClick={handleAllDdOff}
            >
              <div className="flex items-center">
                <p className="font-suitL text-sm text-[#6B7280]" onClick={() => navigate("/new-project")}>
                  프로젝트 생성하기
                </p>
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
        <div className="absolute z-20 right-[3vh] top-[6.5vh] bg-white divide-y divide-gray-100 rounded-lg shadow min-w-[11vw]">
          <div className="px-4 py-3">
            <span className="block text-sm text-gray-900 mb-1">{userNickname}</span>
            <span className="block text-sm  text-gray-500 truncate">
              {userEmail}
            </span>
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
              <button
                onClick={() => {
                  handleAllDdOff();
                  navigate("/change-pw");
                }}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                비밀번호 변경
              </button>
            </li>
          </ul>
          <button
            onClick={() => {
              handleAllDdOff();
              removeCookie('accessToken');
              removeCookie('refreshToken');
              localStorage.removeItem("recoil-persist");
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