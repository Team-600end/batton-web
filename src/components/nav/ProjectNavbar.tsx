import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ProjectInfoModal from "@components/project/ProjectInfoModal";
import setting_icon from "@images/icons/setting.png";

export default function ProjectNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  let { projectKey } = useParams();

  //프로젝트 정보 보기 모달
  const [pjModal, setPjModal] = useState(false);

  const pathArr = location.pathname.split("/", 4);

  return (
    <div>
      <div
        className="items-center justify-center w-full md:flex md:w-auto md:order-1"
        id="navbar-user"
      >
        <ul className="flex flex-col font-suitM text-lg p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
          <li>
            <button
              onClick={() => navigate(`/project/${projectKey}/dashboard`)}
              className={
                pathArr[3] === "dashboard"
                  ? "block text-[#5AAE8A] hover:text-[#5AAE8A]"
                  : "block text-gray-900 hover:text-[#5AAE8A]"
              }
            >
              대시보드
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate(`/project/${projectKey}/issueboard`)}
              className={
                pathArr[3] === "issueboard"
                  ? "block text-[#5AAE8A] hover:text-[#5AAE8A]"
                  : "block text-gray-900 hover:text-[#5AAE8A]"
              }
            >
              이슈보드
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate(`/project/${projectKey}/releasesnote`)}
              className={
                pathArr[3] === "releasesnote"
                  ? "block text-[#5AAE8A] hover:text-[#5AAE8A]"
                  : "block text-gray-900 hover:text-[#5AAE8A]"
              }
            >
              릴리즈 노트
            </button>
          </li>
        </ul>
      </div>
      {pathArr[3] === "dashboard" && (
        <div>
          <button
            className="rounded-md bg-white text-primary-4 p-4 border border-primary-4 flex py-[0.4vh] px-[0.8vw] items-center hover:bg-primary-5 font-suitM text-base justify-end ml-auto mr-[5vw] mt-[-3.5vh]"
            onClick={() => setPjModal(true)}
          >
            <img src={setting_icon} className="w-[0.8vw] mr-[0.4vw] select-none pointer-events-none"/>
            프로젝트 정보
          </button>
          {pjModal && <ProjectInfoModal closeModal={() => setPjModal(false)} />}
        </div>
      )}
    </div>
  );
}
