import React, { useState, useCallback, useEffect, useRef } from "react";
import type { CustomFlowbiteTheme } from "flowbite-react";
import { Carousel } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import PjCard from "@components/main/PjCard";
import titleBox_img from "@images/common/title_box.svg";
import left_control_img from "@images/icons/left_control.svg";
import right_control_img from "@images/icons/right_control.svg";
import chevron_up from "@images/common/chevron_up.png";
import chevron_down from "@images/common/chevron_down.png";
import search_img from "@images/icons/search_outline.png";
import { ProjectCard } from "@typess/project";
import { IssueStatus, IssueType, MyIssues } from "@typess/Issue";
import IssueBadge from "@components/project/issue/IssueBadge";
import { instanceAuth } from "@src/types/AxiosInterface";
import IssueStatusBadge from "@src/components/project/issue/IssueStatusBadge";

export default function MainPage() {
  const navigate = useNavigate();
  const [cardNum, setCardNum] = useState(3);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [pjCards, setPjcards] = useState<ProjectCard[]>([]);
  const [myIssues, setMyissues] = useState<MyIssues[]>([]);
  // 드롭다운
  const [dropdownValue, setDropdownValue] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); //이외의 영역 클릭 시 드롭다운 버튼 숨기기

  // 검색 필터링
  const [searchValue, setSearchValue] = useState("");

  const chunkArray = (arr, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  };

  // 배열을 cardNum만큼씩 자르기
  const chunkedPjCards = chunkArray(pjCards, cardNum);

  // 화면 너비에 따라 cardNum 값을 설정하는 함수
  const setCardNumByWidth = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 900) {
      setCardNum(1);
    } else if (screenWidth <= 1300) {
      setCardNum(2);
    } else if (screenWidth <= 1669) {
      setCardNum(3);
    } else {
      setCardNum(4);
    }
  };

  const setIssueNumByHeight = () => {
    const screenHeight = window.innerHeight;
    if (screenHeight <= 700) {
      setItemsPerPage(2);
    } else if (screenHeight <= 800) {
      setItemsPerPage(3);
    } else {
      setItemsPerPage(4);
    }
  };

  const getCurrentPageItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return myIssues.slice(startIndex, endIndex);
  };

  const totalPage = Math.ceil(myIssues.length / itemsPerPage);

  const handleSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  // 컴포넌트가 마운트될 때와 화면 크기가 변경될 때마다 화면 너비에 따라 cardNum 값을 업데이트.
  useEffect(() => {
    setCardNumByWidth();
    setIssueNumByHeight();

    const handleResize = () => {
      setCardNumByWidth();
      setIssueNumByHeight();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window]);

  // 드롭다운
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    //메인페이지 접속 시. 모든 프로젝트를 가져옴
    (async () => {
      instanceAuth
        .get(`/projects/joinedList`)
        .then((response) => {
          console.log(response.data);
          if (response.data.code == 200) {
            setPjcards(response.data.result);
          } else if (response.data.code == 707) {
            setPjcards([]);
          }
        })
        .catch((error) => {
          console.log(error);
        });

      //메인페이지 접속 시, 내 이슈들을 가져옴
      instanceAuth.get(`/issues/list/`, { params: { status: dropdownValue, keyword: searchValue } }).then((response) => {
        console.log(response.data);
        if (response.data.code == 200) {
          setMyissues(response.data.result);
        } else if (response.data.code == 704) {
          setMyissues([]);
        }
      });
    })();
  }, []);

  // 내 이슈 목록 필터링
  useEffect(() => {
    (async () => {
      instanceAuth.get(`issues/list`, { params: { status: dropdownValue, keyword: searchValue } }).then((response) => {
        console.log(response.data);
        if (response.data.code == 200) {
          setMyissues(response.data.result);
        } else if (response.data.code == 704) {
          setMyissues([]);
        }
      });
    })();
  }, [dropdownValue, searchValue]);

  return (
    <div className="mt-[7vh]" style={{ overflowY: "auto" }}>
      <div className="relative w-screen h-screen flex flex-col items-center justify-start overflow-hidden">
        <div className="h-10"></div>
        <div className="flex flex-row items-center justify-left w-full px-8 ml-[15vw]">
          <img className="mr-2 select-none pointer-events-none" src={titleBox_img} />
          <h1 className="text-2xl font-suitB text-black mr-4">참여 중인 프로젝트</h1>

          <button
            type="button"
            className="focus:outline-none text-primary-4 bg-white border border-primary-4 hover:bg-green-100 font-suitM rounded-lg text-sm px-5 py-2.5"
            onClick={() => navigate("/new-project")}
          >
            + 새 프로젝트 생성
          </button>
        </div>
        <div className="flex flex-row items-center justify-center w-full h-[300px] px-10 cursor-pointer">
          {pjCards.length === 0 ? (
            // 프로젝트가 없을 때
            <div onClick={() => navigate("/new-project")}>
              <div className="flex w-[350px] h-[250px] p-[10px] shadow-[2px_6px_6px_-2px_rgba(0,0,0,0.3)] bg-white border border-gray-200 rounded-lg hover:bg-gray-100 mx-2 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <div className="m-auto flex flex-col justify-center items-center text-primary-4 text-[20px] font-suitSB">
                  <p>+</p>
                  <p>참여중인 프로젝트가 없습니다.</p>
                  <p>첫 프로젝트를 생성해 보세요!</p>
                </div>
              </div>
            </div>
          ) : (
            <Carousel
              theme={customCarouselTheme}
              slide={false}
              leftControl={pjCards.length > cardNum ? <img src={left_control_img} /> : <div />}
              rightControl={pjCards.length > cardNum ? <img src={right_control_img} /> : <div />}
            >
              {chunkedPjCards.map((chunk, index) => (
                <div key={index} className="flex h-[300px] w-5/6 flex-row items-center justify-center">
                  {chunk.map((pjCard, cardIndex) => (
                    <PjCard key={cardIndex} pjCard={pjCard} />
                  ))}
                </div>
              ))}
            </Carousel>
          )}
        </div>
        <div className="flex flex-row items-center justify-left w-full px-8 py-3 ml-[15vw]">
          <img className="mr-2 select-none pointer-events-none" src={titleBox_img} />
          <h1 className="text-2xl font-suitB text-black mr-4">내 작업 이슈들</h1>
        </div>
        {/* table */}
        <div className="relative w-4/5 shadow-[0px_3px_8px_-2px_rgba(0,0,0,0.3)] sm:rounded-lg">
          <div className="flex items-center justify-between p-2">
            {/* 드롭다운 */}
            <div className="relative flex justify-center">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center justify-between w-[110px] h-[40px] text-[#1F2A37] bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 font-suitM rounded-lg text-xs px-3 py-1.5"
              >
                <div className="flex items-center justify-center">
                  {dropdownValue === null ? <div className="ml-2 text-sm">전체</div> : <IssueStatusBadge issueStatus={dropdownValue as IssueStatus} />}
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
                  className="flex justify-center z-10 absolute top-full left-0 mt-2 w-[90px] bg-white divide-y divide-gray-100 rounded-lg shadow"
                >
                  <ul className="p-1 space-y-1 text-sm text-grey-2">
                    {[null, "TODO", "PROGRESS", "REVIEW", "DONE", "RELEASED"].map((value) => (
                      <li key={value}>
                        <div className="flex items-center justify-center p-1 rounded hover:bg-gray-100">
                          <div
                            onClick={() => {
                              setDropdownValue(value);
                              setIsDropdownOpen(false);
                            }}
                            className="flex items-center justify-center w-full  text-xs font-suitM text-gray-900 rounded"
                          >
                            {value === null ? <div className="text-sm">전체</div> : <IssueStatusBadge issueStatus={value as IssueStatus} />}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* 검색창 */}
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <img className="w-5 h-5 text-gray-500" area-hidden="true" src={search_img} />
              </div>
              <input
                type="text"
                id="table-search"
                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-[#4AA366] focus:border-[#4AA366]"
                placeholder="이슈 검색"
                onChange={handleSearchValue}
              />
            </div>
          </div>

          {/* 테이블 */}
          <table className="w-full text-sm text-gray-500 text-center">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  프로젝트명
                </th>
                <th scope="col" className="px-6 py-3">
                  이슈 태그
                </th>
                <th scope="col" className="px-6 py-3">
                  이슈 제목
                </th>
                <th scope="col" className="px-6 py-3">
                  최종 수정 날짜
                </th>
                <th scope="col" className="px-6 py-3">
                  이슈 상태
                </th>
              </tr>
            </thead>
            <tbody>
              {getCurrentPageItems().map((issueId) => (
                <tr key={issueId.issueId} className="bg-white border-b hover:bg-gray-50">
                  <th scope="row" className="px-6 py-4 font-suitM text-gray-900 whitespace-nowrap">
                    {issueId.projectTitle}
                  </th>
                  <td className="px-6 py-4">
                    <IssueBadge issueType={issueId.issueTag} />
                  </td>
                  <td className="px-6 py-4">{issueId.issueTitle}</td>
                  <td className="px-6 py-4">{issueId.updatedDate}</td>
                  <td className="px-6 py-4">
                    <IssueStatusBadge issueStatus={issueId.issueStatus} />
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
    </div>
  );
}

const customCarouselTheme: CustomFlowbiteTheme["carousel"] = {
  // interval: 50000,
  root: {
    base: "relative h-[270px] w-full mx-4",
    leftControl: "absolute top-0 left-0 flex h-full items-center justify-center px-4 focus:outline-none",
    rightControl: "absolute top-0 right-0 flex h-full items-center justify-center px-4 focus:outline-none",
  },
  indicators: {
    active: {
      off: "bg-[#f3f4f6] hover:bg-white",
      on: "bg-[#d1d5db]",
    },
    base: "h-3 w-3                                                                    rounded-full",
    wrapper: "absolute -bottom-3 left-1/2 flex -translate-x-1/2 space-x-3",
  },
  item: {
    base: "absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2",
    wrapper: "w-full flex-shrink-0 transform cursor-grab snap-center",
  },
  scrollContainer: {
    base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-lg",
    snap: "snap-x",
  },
};
