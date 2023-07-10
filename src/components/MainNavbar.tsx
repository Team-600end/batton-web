import React from "react";
import right_arrow from "../assets/images/nav/right.svg";

export default function MainNavbar() {
  return (
    <div>
      <span className="flex ml-[5vw] m-[1vw]">
        프로젝트
        <img src={right_arrow} />
        <a
          href="#####"
          className="flex items-center"
          style={{ cursor: "pointer" }}
        >
          600&
        </a>
      </span>
      <div
        className="items-center justify-center ml-[3vw] w-full md:flex md:w-auto md:order-1"
        id="navbar-user"
      >
        <ul className="flex flex-col font-medium text-lg p-4 mr-[5vw] md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
          <li>
            <a
              href="#"
              className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-[#5AAE8A] md:p-0"
              aria-current="page"
            >
              대시보드
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#5AAE8A] md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            >
              이슈 보드
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#5AAE8A] md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
            >
              릴리즈 노트
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
