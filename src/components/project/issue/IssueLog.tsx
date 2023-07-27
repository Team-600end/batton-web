import { BoardIssue } from "@src/types/Issue";
import React, { useState, useCallback, useEffect } from "react";

export default function IssueLog() {
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return boardissues.slice(startIndex, endIndex);
  };

  const totalPage = Math.ceil(boardissues.length / itemsPerPage);
  return (
    <>
      <div className="relative w-[1000px] h-[400px] bg-white rounded-xl shadow-md">
        <p className="pt-[20px] ml-[20px] text-black text-base font-suitB">이슈 로그</p>
        {/* 테이블 */}
        <div className="pt-[20px]">
          <table className="w-full text-sm text-gray-500 dark:text-gray-400 text-center">
            <thead className="text-xs font-suitL text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-3">
                  이슈태그
                </th>
                <th scope="col" className="px-16 py-3">
                  이슈 타이틀
                </th>
                <th scope="col" className="px-4 py-3">
                  상태
                </th>
                <th scope="col" className="px-4 py-3">
                  담당자
                </th>
              </tr>
            </thead>
            <tbody>
              {/* 테이블 내용 */}
              {getCurrentPageItems().map((index) => (
                <tr key={index.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-6 py-4">{index.issueTag}</td>
                  <th scope="row" className="px-6 py-4 font-suitM text-gray-900 whitespace-nowrap dark:text-white">
                    {index.issueTitle}
                  </th>
                  <td className="px-6 py-4">{index.issueStatus}</td>
                  <td className="px-6 py-4 flex justify-center items-center ">
                    <img className="w-6 h-6 rounded-full mr-[10px]" src={index.profileImg} alt="Profile" />
                    {index.nickname}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* 페이지네이션 부분 */}
          <nav className="flex items-center justify-center p-2" aria-label="Table navigation">
            <ul className="flex items-center justify-center -space-x-px text-sm h-8">
              <li>
                <a
                  className={`flex items-center justify-center px-3 h-8 ml-0 leading-tight ${
                    currentPage === 1 ? "text-gray-300 pointer-events-none" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  }`}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  {"<"}
                </a>
              </li>

              {Array.from({ length: totalPage }).map((_, index) => (
                <li key={index}>
                  <a
                    className={`flex items-center justify-center px-3 h-8 leading-tight ${
                      currentPage === index + 1 ? "text-blue-600 pointer-events-none" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                    }`}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </a>
                </li>
              ))}

              <li>
                <a
                  className={`flex items-center justify-center px-3 h-8 leading-tight ${
                    currentPage === totalPage ? "text-gray-300 pointer-events-none" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  }`}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  {">"}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}

//dummy data
const boardissues: BoardIssue[] = [
  {
    id: 1,
    issueTitle: "이슈1",
    issueTag: "New",
    issueStatus: "Todo",
    nickname: "닉네임1",
    profileImg: "https://i.pravatar.cc/300",
  },
  {
    id: 2,
    issueTitle: "이슈2",
    issueTag: "New",
    issueStatus: "Todo",
    nickname: "닉네임1",
    profileImg: "https://i.pravatar.cc/300",
  },
  {
    id: 3,
    issueTitle: "이슈3",
    issueTag: "New",
    issueStatus: "Todo",
    nickname: "닉네임1",
    profileImg: "https://i.pravatar.cc/300",
  },
  {
    id: 4,
    issueTitle: "이슈4",
    issueTag: "New",
    issueStatus: "Todo",
    nickname: "닉네임1",
    profileImg: "https://i.pravatar.cc/300",
  },
  {
    id: 5,
    issueTitle: "이슈5",
    issueTag: "New",
    issueStatus: "Todo",
    nickname: "닉네임1",
    profileImg: "https://i.pravatar.cc/300",
  },
];
