import { BoardIssue } from "@src/types/Issue";
import React, { useState, useCallback, useEffect } from "react";
import avatar_jhj from "@images/dummy/avatar_jhj.jpeg";
import IssueBadge from "./IssueBadge";
import { instanceAuth } from "@src/types/AxiosInterface";
import { useRecoilState } from "recoil";
import { projectNavs } from "@src/state/projectState";
import { ProjectNav } from "@typess/project";
import { useParams } from "react-router-dom";
import IssueStatusBadge from "./IssueStatusBadge";
import default_profile_img from "@images/common/default_profile.png";


export default function IssueLog() {
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return boardissues.slice(startIndex, endIndex);
  };

  const [totalPage, setTotalPage] = useState(0);

  const [boardissues, setBoardissues] = useState<BoardIssue[]>([]);

  const [projectNav, setProjectNav] = useRecoilState(projectNavs);
  let { projectKey } = useParams();

  const pj = projectNav.find((element: ProjectNav) => element.projectKey.toString() == projectKey);
  useEffect(() => {
    // async() => {
    instanceAuth
      .get(`/issues/projects/list/${pj.projectId}`)
      .then((response) => {
        console.log(response.data);
        if (response.data.code == 200) {
          setBoardissues(response.data.result);
          setTotalPage(Math.ceil(boardissues.length / itemsPerPage));
        } else if (response.data.code == 703 || response.data.code == 704) {
          setBoardissues([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // };
  }, []);

  return (
    <>
      <div className="w-[70vw] h-[400px] bg-white rounded-xl shadow-md">
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
                  이슈명
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
              {getCurrentPageItems().map((item, index) => (
                <tr key={index} className="bg-white border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <IssueBadge issueType={item.issueTag} />
                  </td>
                  <th scope="row" className="px-6 py-4 font-suitM text-gray-900 whitespace-nowrap dark:text-white">
                    {item.issueTitle}
                  </th>
                  <td className="px-6 py-4"><IssueStatusBadge issueStatus={item.issueStatus}/></td>
                  <td className="px-6 py-4 flex justify-center items-center ">
                    <img className="w-6 h-6 rounded-full mr-[10px] object-cover select-none pointer-events-none" src={(item.profileImage == "" || item.profileImage == null) ? default_profile_img : item.profileImage} alt="Profile" />
                    {item.nickname}
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

              {Array.from({ length: totalPage }).map((element, index) => (
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

// //dummy data
// const boardissues: BoardIssue[] = [
//   {
//     id: 1,
//     issueTitle: "작성 질문 추천 서비스",
//     issueTag: "NEW",
//     issueStatus: "TODO",
//     nickname: "정현진",
//     profileImg: avatar_jhj,
//   },
//   {
//     id: 2,
//     issueTitle: "선택지 이미지 첨부 기능",
//     issueTag: "FEATURE",
//     issueStatus: "TODO",
//     nickname: "정현진",
//     profileImg: avatar_jhj,
//   },
//   {
//     id: 3,
//     issueTitle: "리뷰 전용 설문조사 서비스",
//     issueTag: "NEW",
//     issueStatus: "TODO",
//     nickname: "정현진",
//     profileImg: avatar_jhj,
//   },
//   {
//     id: 4,
//     issueTitle: "이슈4",
//     issueTag: "NEW",
//     issueStatus: "TODO",
//     nickname: "닉네임1",
//     profileImg: "https://i.pravatar.cc/300",
//   },
//   {
//     id: 5,
//     issueTitle: "이슈5",
//     issueTag: "NEW",
//     issueStatus: "TODO",
//     nickname: "닉네임1",
//     profileImg: "https://i.pravatar.cc/300",
//   },
// ];
