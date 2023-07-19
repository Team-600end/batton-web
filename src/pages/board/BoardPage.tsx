import React, { useState, useCallback } from "react";
import IssueBadge from "@src/components/project/issue/IssueBadge";
import { IssueType } from "@src/types/Issue";
import chevorn_img from "@images/common/chevron_down.png";
import search_img from "@images/icons/search_outline.png";

interface BoardS {
  projecttId: number;
  releaseId: number;
  projectTitle: string;
  releaseVersion: string;
  issueTags: IssueType[];
  releaseDate: Date;
}

const boards: BoardS[] = [
  {
    projecttId: 1,
    releaseId: 1,
    projectTitle: "600& 프로젝트",
    releaseVersion: "v1.0.0",
    issueTags: ["New", "Feature"],
    releaseDate: new Date(2023, 7, 18),
  },
  {
    projecttId: 1,
    releaseId: 1,
    projectTitle: "600& 프로젝트",
    releaseVersion: "v1.0.0",
    issueTags: ["New", "Feature"],
    releaseDate: new Date(2023, 7, 18),
  },
  {
    projecttId: 1,
    releaseId: 1,
    projectTitle: "600& 프로젝트",
    releaseVersion: "v1.0.0",
    issueTags: ["New", "Feature"],
    releaseDate: new Date(2023, 7, 18),
  },
];

function getFullDate(
  delimiter: string,
  year: number,
  month: number,
  date: number
): string {
  return `${year}${delimiter}${month
    .toString()
    .padStart(2, "0")}${delimiter}${date.toString().padStart(2, "0")}`;
}

export default function BoardPage() {
  return (
    <div className="relative h-screen flex flex-col mt-12">
      <div className="mx-auto w-3/5 mt-[8vh]">
        {/* 프로젝트 생성하기 타이틀 */}
        <div
          className="flex flex-row items-center mt-12"
        >
          <div className="w-[10px] h-[27px] bg-primary-5 mr-[10px]"></div>
          <p className="text-[28px] font-bold text-gray-900">게시판</p>
        </div>

        <div className="h-[300px] shadow-[0px_3px_8px_-2px_rgba(0,0,0,0.3)] sm:rounded-lg flex flex-col mx-auto mt-[4vh]">
          <div className="flex items-center justify-between p-2">
            <div>
              <button
                id="dropdownRadioButton"
                data-dropdown-toggle="dropdownRadio"
                className="inline-flex items-center text-[#1F2A37] bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-suitM rounded-lg text-sm px-3 py-1.5"
                type="button"
              >
                전체
                <img
                  className="w-2.5 h-2.5 ml-2.5"
                  area-hidden="true"
                  src={chevorn_img}
                />
              </button>

              {/* Dropdown menu */}
              <div
                id="dropdownRadio"
                className="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow"
                data-popper-reference-hidden=""
                data-popper-escaped=""
                data-popper-placement="top"
                style={{
                  position: "absolute",
                  inset: "auto auto 0px 0px",
                  margin: "0px",
                  transform: "translate3d(522.5px, 3847.5px, 0px)",
                }}
              >
                <ul
                  className="p-3 space-y-1 text-sm text-gray-700"
                  aria-labelledby="dropdownRadioButton"
                >
                  <li>
                    <div className="flex items-center p-2 rounded hover:bg-gray-100">
                      <input
                        // checked="checked"
                        id="filter-radio-example-1"
                        type="radio"
                        value=""
                        name="filter-radio"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                      />
                      <label
                        htmlFor="filter-radio-example-1"
                        className="w-full ml-2 text-sm font-suitM text-gray-900 rounded"
                      >
                        전체
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* 검색창 */}
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <img
                  className="w-5 h-5 text-gray-500"
                  area-hidden="true"
                  src={search_img}
                />
              </div>
              <input
                type="text"
                id="table-search"
                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-[#4AA366] focus:border-[#4AA366]"
                placeholder="검색"
              />
            </div>
          </div>

          {/* 테이블 */}
          <table className="w-full text-sm text-left text-gray-500">
            <colgroup>
              <col className="w-1/6" /> {/* 첫 번째 열 너비를 1/6로 지정 */}
              <col className="w-1/6" /> {/* 두 번째 열 너비를 1/6로 지정 */}
              <col className="w-1/3" /> {/* 세 번째 열 너비를 1/3로 지정 */}
              <col className="w-1/6" /> {/* 네 번째 열 너비를 1/6로 지정 */}
            </colgroup>
            <thead className="text-center font-suitL text-xs text-white uppercase bg-[#285F43]">
              <tr>
                <th scope="col" className="w-1/7 py-3">
                  프로젝트
                </th>
                <th scope="col" className="w-1/7 py-3">
                  버전
                </th>
                <th scope="col" className="w-3/7 py-3">
                  이슈 태그
                </th>
                <th scope="col" className="w-2/7  py-3">
                  최종 수정 날짜
                </th>
              </tr>
            </thead>
            <tbody>
              {boards.map((board) => (
                <tr className="text-center bg-white font-suitM border-b hover:bg-gray-50">
                  <th scope="row" className="py-4">
                    {board.projectTitle}
                  </th>
                  <td className="py-4">{board.releaseVersion}</td>
                  <td className="py-4">
                    {board.issueTags.map((issue) => (
                      <IssueBadge issueType={issue} />
                    ))}
                  </td>
                  <td className="py-4">
                    {getFullDate(
                      ". ",
                      board.releaseDate.getFullYear(),
                      board.releaseDate.getMonth(),
                      board.releaseDate.getDate()
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* 페이지 네비바 */}
          <nav
            className="flex items-center justify-center p-2"
            aria-label="Table navigation"
          >
            <ul className="flex items-center justify-center -space-x-px text-sm h-8">
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
                >
                  {"<"}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                >
                  1
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                >
                  2
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-current="page"
                  className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                >
                  3
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
                >
                  {">"}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
