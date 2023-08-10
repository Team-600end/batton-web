import React, { useState, useCallback, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import type { CustomFlowbiteTheme } from "flowbite-react";
import { Carousel } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import PjCard from "@components/main/PjCard";
import titleBox_img from "@images/common/title_box.svg";
import left_control_img from "@images/icons/left_control.svg";
import right_control_img from "@images/icons/right_control.svg";
import chevorn_img from "@images/common/chevron_down.png";
import search_img from "@images/icons/search_outline.png";
import { ProjectCard } from "@typess/project";
import { MyIssues } from "@typess/Issue";
import IssueBadge from "@components/project/issue/IssueBadge";
//dummy
import avatar_yhg from "@images/dummy/avatar_yhg.jpg";
import avatar_lsh from "@images/dummy/avatar_lsh.jpeg";
import avatar_kch from "@images/dummy/avatar_kch.jpeg";
import logo_600end from "@images/dummy/600end_logo.svg";
import logo_dktechin from "@images/dummy/dktechin_logo.png";
import { instanceAuth } from "@src/types/AxiosInterface";

export default function MainPage() {
  const navigate = useNavigate();
  const [cardNum, setCardNum] = useState(3);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [pjCards, setPjcards] = useState<ProjectCard[]>([]);
  const [myIssues, setMyissues] = useState<MyIssues[]>([]);
  //TODO: belongId 어떻게 받을지? useParams?
  let { belongId } = useParams();
  // 드롭다운
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); //이외의 영역 클릭 시 드롭다운 버튼 숨기기

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

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    //메인페이지 접속 시. 모든 프로젝트를 가져옴
    (async () => {
      instanceAuth
        .get(`/projects/joinedList`)
        .then((response) => {
          console.log("pjcards");
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
      instanceAuth.get(`/issues/list/${belongId}`).then((response) => {
        console.log(response.data);
        if (response.data.code == 200) {
          setMyissues(response.data.data);
        } else if (response.data.code == 704) {
          setMyissues([]);
        }
      });
    })();
  }, []);

  return (
    <div className="mt-[7vh]" style={{ overflowY: "auto" }}>
      <div className="relative w-screen h-screen flex flex-col items-center justify-start overflow-hidden">
        <div className="h-10"></div>
        <div className="flex flex-row items-center justify-left w-full px-8 ml-40">
          <img className="mr-2" src={titleBox_img} />
          <h1 className="text-2xl font-suitB text-black mr-4">참여 중인 프로젝트</h1>

          <button
            type="button"
            className="focus:outline-none text-primary-4 bg-white border border-primary-4 hover:bg-green-100 font-suitM rounded-lg text-sm px-5 py-2.5"
            onClick={() => navigate("/new-project")}
          >
            + 새 프로젝트 생성
          </button>
        </div>
        <div className="flex flex-row items-center justify-center w-full h-[300px] px-10">
          <Carousel theme={customCarouselTheme} leftControl={<img src={left_control_img} />} rightControl={<img src={right_control_img} />}>
            {chunkedPjCards.map((chunk, index) => (
              <div key={index} className="flex h-[300px] w-5/6 flex-row items-center justify-center">
                {chunk.map((pjCard, cardIndex) => (
                  <PjCard key={cardIndex} pjCard={pjCard} />
                ))}
              </div>
            ))}
          </Carousel>
        </div>
        <div className="flex flex-row items-center justify-left w-full px-8 py-3 ml-40">
          <img className="mr-2" src={titleBox_img} />
          <h1 className="text-2xl font-suitB text-black mr-4">내 작업 이슈들</h1>
        </div>
        {/* table */}
        <div className="relative w-4/5 shadow-[0px_3px_8px_-2px_rgba(0,0,0,0.3)] sm:rounded-lg">
          <div className="flex items-center justify-between p-2">
            <div>
              <button
                id="dropdownRadioButton"
                data-dropdown-toggle="dropdownRadio"
                className="inline-flex items-center text-[#1F2A37] bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-suitM rounded-lg text-sm px-3 py-1.5"
                type="button"
              >
                전체
                <img className="w-2.5 h-2.5 ml-2.5" area-hidden="true" src={chevorn_img} />
              </button>

              {/* 드롭다운 */}
              <div
                id="myIssueDropdown"
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
                <ul className="p-3 space-y-1 text-sm text-gray-700" aria-labelledby="dropdownRadioButton">
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
                      <label htmlFor="filter-radio-example-1" className="w-full ml-2 text-sm font-suitM text-gray-900 rounded">
                        전체
                      </label>
                    </div>
                  </li>
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
                      <label htmlFor="filter-radio-example-1" className="w-full ml-2 text-sm font-suitM text-gray-900 rounded">
                        New
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
                <img className="w-5 h-5 text-gray-500" area-hidden="true" src={search_img} />
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
          <table className="w-full text-sm text-gray-500 text-center">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  프로젝트
                </th>
                <th scope="col" className="px-6 py-3">
                  이슈태그
                </th>
                <th scope="col" className="px-6 py-3">
                  이슈
                </th>
                <th scope="col" className="px-6 py-3">
                  최종 수정 날짜
                </th>
                <th scope="col" className="px-6 py-3">
                  상태
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
                  <td className="px-6 py-4">{issueId.updateDate}</td>
                  <td className="px-6 py-4">{issueId.issueStatus}</td>
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
    base: "h-3 w-3 rounded-full",
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

// Dummy data

// //참여 중인 프로젝트
// const pjCards: ProjectCard[] = [
//   {
//     projectId: 1,
//     projectKey: "dktechin",
//     projectTitle: "dktechin",
//     projectImg: logo_dktechin,
//     versionMajor: 5,
//     versionMinor: 2,
//     versionPatch: 3,
//     todoIssue: 70,
//     doingIssue: 10,
//     myIssue: 4,
//     doneIssue: 50,
//     leaderName: "강창훈",
//     leaderImg: avatar_kch,
//     memberNum: 42,
//     bookmark: true,
//   },
//   {
//     projectId: 2,
//     projectKey: "kea",
//     projectTitle: "KEA",
//     projectImg: "https://logo-resources.thevc.kr/organizations/banners/cfd721742233e04a0f656f7b2b2cbf7260888fb269caff651761367c5e4876e5_1599533486309745.jpg",
//     versionMajor: 2,
//     versionMinor: 0,
//     versionPatch: 1,
//     todoIssue: 20,
//     doingIssue: 6,
//     myIssue: 4,
//     doneIssue: 24,
//     leaderName: "임혜균",
//     leaderImg: avatar_yhg,
//     memberNum: 8,
//     bookmark: true,
//   },
//   {
//     projectId: 3,
//     projectKey: "600end",
//     projectTitle: "600&",
//     projectImg: logo_600end,
//     versionMajor: 2,
//     versionMinor: 0,
//     versionPatch: 1,
//     todoIssue: 2,
//     doingIssue: 4,
//     myIssue: 2,
//     doneIssue: 3,
//     leaderName: "이승희",
//     leaderImg: avatar_lsh,
//     memberNum: 6,
//     bookmark: false,
//   },
// ];

// //내 작업 이슈들
// const myIssues: MyIssues[] = [
//   {
//     issueId: 1,
//     issueTitle: "사용자 활동에 대한 통계 정보 제공 기능",
//     issueTag: "CHANGED",
//     issueStatus: "TODO",
//     updateDate: "2023-10-20",
//     projectTitle: "dktechin",
//   },
//   {
//     issueId: 2,
//     issueTitle: "반응형 웹 지원 모바일 뷰 개선",
//     issueTag: "FEATURE",
//     issueStatus: "REVIEW",
//     updateDate: "2023-09-03",
//     projectTitle: "dktechin",
//   },
//   {
//     issueId: 3,
//     issueTitle: "인증 기능 강화 및 취약점 보완",
//     issueTag: "FIXED",
//     issueStatus: "DONE",
//     updateDate: "2023-08-15",
//     projectTitle: "dktechin",
//   },
//   {
//     issueId: 4,
//     issueTitle: "알림 기능 업데이트 푸시 알림 디자인 변경",
//     issueTag: "CHANGED",
//     issueStatus: "REVIEW",
//     updateDate: "2023-07-02",
//     projectTitle: "KEA",
//   },
//   {
//     issueId: 5,
//     issueTitle: "로그 저장 기능 추가",
//     issueTag: "NEW",
//     issueStatus: "TODO",
//     updateDate: "2023-06-10",
//     projectTitle: "KEA",
//   },
//   {
//     issueId: 6,
//     issueTitle: "새로운 로그인 방식 생체 인증 기능 추가",
//     issueTag: "NEW",
//     issueStatus: "TODO",
//     updateDate: "2021-09-01",
//     projectTitle: "KEA",
//   },
//   {
//     issueId: 7,
//     issueTitle: "데이터 로딩 시간 개선",
//     issueTag: "FEATURE",
//     issueStatus: "REVIEW",
//     updateDate: "2023-02-10",
//     projectTitle: "KEA",
//   },
//   {
//     issueId: 8,
//     issueTitle: "일반 설문조사 종류 변경",
//     issueTag: "NEW",
//     issueStatus: "TODO",
//     updateDate: "2021-09-01",
//     projectTitle: "600&",
//   },
//   {
//     issueId: 9,
//     issueTitle: "설문조사 GPS 배포 기능",
//     issueTag: "NEW",
//     issueStatus: "TODO",
//     updateDate: "2021-09-01",
//     projectTitle: "600&",
//   },
// ];
