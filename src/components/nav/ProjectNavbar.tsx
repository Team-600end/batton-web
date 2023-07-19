import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function ProjectNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const pathArr = location.pathname.split("/", 4);

  return (
    <div className="">
      <div className="items-center justify-center ml-[3vw] w-full md:flex md:w-auto md:order-1" id="navbar-user">
        <ul className="flex flex-col font-suitM text-lg p-4 mr-[5vw] md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
          <li>
            <button
              onClick={() => navigate("/project/0/dashboard")}
              className={pathArr[3] === "dashboard" ? "block text-[#5AAE8A] hover:text-[#5AAE8A]" : "block text-gray-900 hover:text-[#5AAE8A]"}
            >
              대시보드
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/project/0/issueboard")}
              className={pathArr[3] === "issueboard" ? "block text-[#5AAE8A] hover:text-[#5AAE8A]" : "block text-gray-900 hover:text-[#5AAE8A]"}
            >
              이슈 보드
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/project/0/releasesnote")}
              className={pathArr[3] === "releasesnote" ? "block text-[#5AAE8A] hover:text-[#5AAE8A]" : "block text-gray-900 hover:text-[#5AAE8A]"}
            >
              릴리즈 노트
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
