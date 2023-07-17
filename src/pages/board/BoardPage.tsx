import React, { useState, useCallback } from "react";
import IssueBadge from "@src/components/project/issue/IssueBadge";
import { IssueType } from "@src/types/issue";

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
    issueTags: [
      "New", "Feature"
    ],
    releaseDate: new Date(2023, 7, 18)
  },
  {
    projecttId: 1,
    releaseId: 1,
    projectTitle: "600& 프로젝트",
    releaseVersion: "v1.0.0",
    issueTags: [
      "New", "Feature"
    ],
    releaseDate: new Date(2023, 7, 18)
  },
  {
    projecttId: 1,
    releaseId: 1,
    projectTitle: "600& 프로젝트",
    releaseVersion: "v1.0.0",
    issueTags: [
      "New", "Feature"
    ],
    releaseDate: new Date(2023, 7, 18)
  },
]

function getFullDate(delimiter: string, year: number, month: number, date: number): string {
  return  `${year}${delimiter}${month.toString().padStart(2, '0')}${delimiter}${date.toString().padStart(2, '0')}`
}


export default function BoardPage() {
  return (
    <>
      <div className="flex flex-col items-center mx-[300px] my-[100px] shadow-[2px_6px_10px_-2px_rgba(0,0,0,0.3)] border-[0.3px] bg-white rounded-lg shadow mx-2">
        {/* 테이블 */}
        <table className="w-full text-sm text-gray-500">
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
                <th scope="row" className="py-4">{board.projectTitle}</th>
                <td className="py-4">{board.releaseVersion}</td>
                <td className="py-4">
                  {board.issueTags.map((issue) => (
                    <IssueBadge issueType={issue} />
                  ))}
                </td>
                <td className="py-4">{getFullDate(". ", board.releaseDate.getFullYear(), board.releaseDate.getMonth(), board.releaseDate.getDate() )}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <nav
          className="flex items-center font-suitM justify-center p-2"
          aria-label="Table navigation"
        >
          <ul className="flex items-center justify-center -space-x-px text-sm h-8">
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                {"<"}
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                2
              </a>
            </li>
            <li>
              <a
                href="#"
                aria-current="page"
                className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
              >
                3
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                {">"}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
