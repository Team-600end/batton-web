import React, { useState, useEffect, useCallback, useRef } from "react";
import type { CustomFlowbiteTheme } from "flowbite-react";
import IssueBadge from "@src/components/project/issue/IssueBadge";
import { IssueType } from "@src/types/Issue";
import search_img from "@images/icons/search_outline.png";
import titleBox_img from "@images/common/title_box.svg";
import chevron_up from "@images/common/chevron_up.png";
import chevron_down from "@images/common/chevron_down.png";
import { instanceAuth } from "@src/types/AxiosInterface";
import { ProjectSearch } from "@src/types/project";
import default_team_logo from "@images/common/team_default.png";

interface BoardS {
  projecttId: number;
  releaseId: number;
  projectTitle: string;
  releaseVersion: string;
  issueTags: IssueType[];
  releaseDate: Date;
}

// export interface ProjectSearch {
//   projectId: number;
//   projectTitle: string;
//   projectLogo?: string;
// }

function getFullDate(delimiter: string, year: number, month: number, date: number): string {
  return `${year}${delimiter}${month.toString().padStart(2, "0")}${delimiter}${date.toString().padStart(2, "0")}`;
}

export default function BoardPage() {
  const [cardNum, setCardNum] = useState(3);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);

  // 드롭다운
  const [searchProjects, setSearchProjects] = useState<ProjectSearch[]>([]);
  const [dropdownValue, setDropdownValue] = useState(null); //TODO: 프로젝트 목록 필터링 구현 후 지우기
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); //이외의 영역 클릭 시 드롭다운 버튼 숨기기

  //필터링
  const [searchValue, setSearchValue] = useState("");
  //TODO: 테스트 성공 후 아래 코드 주석 풀고 그 밑에꺼 지우기
  const [boards, setBoards] = useState<BoardS[]>([]);
  const [searchProject, setSearchProject] = useState("전체");
  const [searchProjectId, setSearchProjectId] = useState(null);
  const [searchProjectLogo, setSearchProjectLogo] = useState(null);

  const setIssueNumByHeight = () => {
    const screenHeight = window.innerHeight;
    if (screenHeight <= 700) {
      setItemsPerPage(8);
    } else if (screenHeight <= 800) {
      setItemsPerPage(9);
    } else if (screenHeight <= 1000) {
      setItemsPerPage(10);
    } else {
      setItemsPerPage(11);
    }
  };

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return boards.slice(startIndex, endIndex);
  };

  const handleSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const totalPage = Math.ceil(boards.length / itemsPerPage);

  // 컴포넌트가 마운트될 때와 화면 크기가 변경될 때마다 화면 너비에 따라 cardNum 값을 업데이트.
  useEffect(() => {
    setIssueNumByHeight();

    const handleResize = () => {
      setIssueNumByHeight();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 프로젝트 목록 검색 조회
  useEffect(() => {
    (async () => {
      instanceAuth.get(`/projects/list`).then((response) => {
        console.log(response.data);
        if (response.data.code == 200) {
          setSearchProjects(response.data.result);
        } else {
          setSearchProjects([]);
        }
      });
    })();
  }, [isDropdownOpen]);

  // 릴리즈 게시판 필터링
  useEffect(() => {
    (async () => {
      instanceAuth.get(`/releases`, { params: { projectId: searchProjectId, keyword: searchValue } }).then((response) => {
        console.log(response.data);
        if (response.data.code == 200) {
          setBoards(response.data.result);
          setBoards(boards);
        } else {
          setBoards([]);
        }
      });
    })();
  }, [searchProject, searchValue]);

  // // 게시판 페이지 첫 접속 시 렌더링
  // useEffect(() => {
  //   (async () => {
  //     instanceAuth.get(`/releases`, { params: { projectId: searchProjectId, keyword: searchValue } }).then((response) => {
  //       console.log(response.data);
  //       if (response.data.code == 200) {
  //         //TODO: 테스트 성공 후 아래 코드 주석 풀고 그 밑에꺼 지우기
  //         setBoards(response.data.result);
  //         setBoards(boards);
  //       } else {
  //         setBoards([]);
  //       }
  //     });
  //   })();
  // });

  return (
    <div className="relative w-screen h-screen flex flex-col items-center mt-[100px]">
      <div className="flex flex-row items-center justify-left w-full px-8 py-3 ml-40">
        <img className="mr-2 select-none pointer-events-none" src={titleBox_img} />
        <h1 className="text-2xl font-suitB text-black mr-4">릴리즈 게시판</h1>
      </div>

      {/* table */}
      <div className="relative w-4/5 shadow-[0px_3px_8px_-2px_rgba(0,0,0,0.3)] sm:rounded-l mt-[10px]">
        <div className="flex items-center justify-between p-2">
          <div className="relative flex justify-center">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between w-[160px] h-[40px] text-[#1F2A37] bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 font-suitM rounded-lg text-xs px-3 py-1.5"
            >
              <div className="flex items-center justify-center text-sm ml-2">
                {searchProject === "전체" ? (
                  <div>전체</div>
                ) : (
                  <div className="flex">
                    <img
                      className=" items-center justify-center w-5 h-5 mr-2 my-auto rounded-full"
                      src={searchProjectLogo === "" || searchProjectLogo === null ? default_team_logo : searchProjectLogo}
                    />
                    <div className="w-full overflow-auto">
                      {/* {searchProject.length > 7 ? <div className="ml-2 text-sm">{searchProject.substring(0, 7)}...</div> : <>{searchProject}</>} */}
                      {searchProject}
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-center">
                {isDropdownOpen ? (
                  <img className="m-1 w-[9px] h-[6px]" src={chevron_up} alt="chevron up" />
                ) : (
                  <img className="m-1 w-[9px] h-[6px]" src={chevron_down} alt="chevron down" />
                )}
              </div>
            </button>
            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                className="flex items-start justify-center z-10 absolute top-full left-0 mt-2 w-[160px] max-h-[230px] bg-white divide-y divide-gray-100 rounded-lg shadow overflow-auto "
              >
                <ul className="w-[160px] p-2 space-y-1 text-sm text-grey-2">
                  <li>
                    <div
                      onClick={() => {
                        setSearchProject("전체");
                        setSearchProjectId(null);
                        setIsDropdownOpen(false);
                      }}
                      className="flex items-center justify-start ml-3 p-1 rounded hover:bg-gray-50 w-full text-sm font-suitM text-gray-900 cursor-pointer"
                    >
                      전체 프로젝트
                    </div>
                  </li>
                  {searchProjects.map((project) => (
                    <li key={project.projectId}>
                      <hr className="h-px mb-1 bg-gray-200 border-0 mx-auto w-[140px] overflow-x-hidden" />
                      <div className="flex items-center justify-center p-1 rounded hover:bg-gray-50">
                        <div
                          onClick={() => {
                            setSearchProject(project.projectTitle);
                            setSearchProjectId(project.projectId);
                            setSearchProjectLogo(project.projectLogo);
                            setIsDropdownOpen(false);
                          }}
                          className="flex items-center justify-between w-full text-sm font-suitM text-gray-900 rounded cursor-pointer"
                        >
                          <div className="flex">
                            <img
                              className=" items-center justify-center w-5 h-5 mr-2 my-auto rounded-full"
                              src={project.projectLogo === "" || project.projectLogo === null ? default_team_logo : project.projectLogo}
                            />
                            <div className="w-full overflow-auto">{project.projectTitle}</div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* 검색창 */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <img className="w-5 h-5 text-gray-500" area-hidden="true" src={search_img} />
            </div>
            <input
              type="text"
              onChange={handleSearchValue}
              className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-[#4AA366] focus:border-[#4AA366]"
              placeholder="릴리즈 내용 검색"
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
          <thead className="text-center font-suitL text-base text-white uppercase bg-[#285F43]">
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
            {getCurrentPageItems().map((board) => (
              <tr className="text-center bg-white font-suitM border-b hover:bg-gray-50">
                <th scope="row" className="py-4">
                  {board.projectTitle}
                </th>
                <td className="py-4">{board.releaseVersion}</td>
                <td className="py-4 space-x-1">
                  {board.issueTags.map((issue) => (
                    <IssueBadge issueType={issue} />
                  ))}
                </td>
                <td className="py-4">{getFullDate(". ", board.releaseDate.getFullYear(), board.releaseDate.getMonth(), board.releaseDate.getDate())}</td>
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
  );
}

// const customCarouselTheme: CustomFlowbiteTheme["carousel"] = {
//   root: {
//     base: "relative h-[270px] w-full mx-4",
//     leftControl: "absolute top-0 left-0 flex h-full items-center justify-center px-4 focus:outline-none",
//     rightControl: "absolute top-0 right-0 flex h-full items-center justify-center px-4 focus:outline-none",
//   },
//   indicators: {
//     active: {
//       off: "bg-[#f3f4f6] hover:bg-white",
//       on: "bg-[#d1d5db]",
//     },
//     base: "h-3 w-3 rounded-full",
//     wrapper: "absolute -bottom-3 left-1/2 flex -translate-x-1/2 space-x-3",
//   },
//   item: {
//     base: "absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2",
//     wrapper: "w-full flex-shrink-0 transform cursor-grab snap-center",
//   },
//   scrollContainer: {
//     base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-lg",
//     snap: "snap-x",
//   },
// };

// const boards: BoardS[] = [
//   {
//     projecttId: 1,
//     releaseId: 1,
//     projectTitle: "KEA",
//     releaseVersion: "v2.3.0",
//     issueTags: ["NEW", "FEATURE"],
//     releaseDate: new Date(2023, 6, 2),
//   },
//   {
//     projecttId: 1,
//     releaseId: 1,
//     projectTitle: "dktechin",
//     releaseVersion: "v3.0.0",
//     issueTags: ["NEW", "CHANGED", "FEATURE"],
//     releaseDate: new Date(2023, 7, 28),
//   },
//   {
//     projecttId: 1,
//     releaseId: 1,
//     projectTitle: "600&",
//     releaseVersion: "v2.0.1",
//     issueTags: ["FIXED"],
//     releaseDate: new Date(2023, 7, 27),
//   },
//   {
//     projecttId: 1,
//     releaseId: 1,
//     projectTitle: "KEA",
//     releaseVersion: "v2.2.0",
//     issueTags: ["CHANGED", "FEATURE"],
//     releaseDate: new Date(2023, 6, 2),
//   },
//   {
//     projecttId: 1,
//     releaseId: 1,
//     projectTitle: "dktechin",
//     releaseVersion: "v2.1.0",
//     issueTags: ["CHANGED", "FEATURE"],
//     releaseDate: new Date(2023, 7, 22),
//   },
//   {
//     projecttId: 1,
//     releaseId: 1,
//     projectTitle: "600&",
//     releaseVersion: "v1.1.2",
//     issueTags: ["DEPRECATED"],
//     releaseDate: new Date(2023, 7, 18),
//   },
//   {
//     projecttId: 1,
//     releaseId: 1,
//     projectTitle: "KEA",
//     releaseVersion: "v2.0.1",
//     issueTags: ["FIXED", "DEPRECATED"],
//     releaseDate: new Date(2023, 6, 2),
//   },
//   {
//     projecttId: 1,
//     releaseId: 1,
//     projectTitle: "600&",
//     releaseVersion: "v1.1.1",
//     issueTags: ["CHANGED", "FIXED"],
//     releaseDate: new Date(2023, 7, 18),
//   },
//   {
//     projecttId: 1,
//     releaseId: 1,
//     projectTitle: "KEA",
//     releaseVersion: "v2.0.0",
//     issueTags: ["NEW"],
//     releaseDate: new Date(2023, 7, 17),
//   },
//   {
//     projecttId: 1,
//     releaseId: 1,
//     projectTitle: "dktechin",
//     releaseVersion: "v2.0.1",
//     issueTags: ["FIXED"],
//     releaseDate: new Date(2023, 7, 17),
//   },
//   {
//     projecttId: 1,
//     releaseId: 1,
//     projectTitle: "dktechin",
//     releaseVersion: "v2.0.0",
//     issueTags: ["NEW", "FEATURE", "DEPRECATED"],
//     releaseDate: new Date(2023, 7, 10),
//   },
//   {
//     projecttId: 1,
//     releaseId: 1,
//     projectTitle: "KEA",
//     releaseVersion: "v1.2.0",
//     issueTags: ["FEATURE", "FIXED"],
//     releaseDate: new Date(2023, 6, 2),
//   },
//   {
//     projecttId: 1,
//     releaseId: 1,
//     projectTitle: "dktechin",
//     releaseVersion: "v1.2.0",
//     issueTags: ["NEW", "CHANGED"],
//     releaseDate: new Date(2023, 7, 3),
//   },
//   {
//     projecttId: 1,
//     releaseId: 1,
//     projectTitle: "600&",
//     releaseVersion: "v1.0.1",
//     issueTags: ["NEW"],
//     releaseDate: new Date(2023, 7, 2),
//   },
//   {
//     projecttId: 1,
//     releaseId: 1,
//     projectTitle: "KEA",
//     releaseVersion: "v1.0.0",
//     issueTags: ["NEW"],
//     releaseDate: new Date(2023, 6, 22),
//   },
//   {
//     projecttId: 1,
//     releaseId: 1,
//     projectTitle: "dktechin",
//     releaseVersion: "v1.0.0",
//     issueTags: ["NEW", "FEATURE"],
//     releaseDate: new Date(2023, 6, 2),
//   },
// ];
