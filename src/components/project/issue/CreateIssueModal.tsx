import React, { useState, useRef, useCallback, useEffect } from "react";
import "@assets/index.css";
import default_profile_img from "@images/common/default_profile.png";
import Tag from "@src/components/project/issue/IssueBadge";
import TagDisabled from "@src/components/project/issue/IssueBadgeDisabled";
import { IssueType } from "@src/types/Issue";
import { useRecoilState } from "recoil";
import { projectNavs } from "@src/state/projectState";
import { ProjectNav } from "@typess/project";
import { useParams } from "react-router-dom";
import { instanceAuth } from "@src/types/AxiosInterface";
import chevron_up from "@images/common/chevron_up.png";
import chevron_down from "@images/common/chevron_down.png";
import { IssueMember } from "@src/types/Users";
interface CreateIssueData {
  projectId: number;
  issueTag: IssueType;
  issueTitle: string;
  issueContent: string;
  belongId: number;
}

export default function CreateIssueModal({ visible, onClose }) {
  const [activeTag, setActiveTag] = useState(null);
  const [issueTitle, setIssueTitle] = useState("");
  const [issueContent, setIssueContent] = useState("");
  const [belongId, setBelongId] = useState(0);
  const [userProfileImg, setUserProfileImg] = useState("");
  // 프로젝트 멤버 모달
  const [isMemberDropdownOpen, setIsMemberDropdownOpen] = useState(false);
  const [memberDropdownValue, setMemberDropdownValue] = useState("멤버 선택");
  const dropdownRef = useRef(null); //이외의 영역 클릭 시 드롭다운 버튼 숨기기
  const [memberList, setMemberList] = useState<IssueMember[]>([]);

  // //member list
  // const [isOpenMemberList, setIsOpenMemberList] = useState(false);
  //projectId
  const [projectNav, setProjectNav] = useRecoilState(projectNavs);
  let { projectKey } = useParams();
  const pj = projectNav.find((element: ProjectNav) => element.projectKey.toString() == projectKey);

  const handleTagClick = (issueType: IssueType) => {
    setActiveTag(issueType);
  };

  const handleOnClose = () => {
    onClose();
  };

  const handleIssueTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIssueTitle(e.target.value);
  };

  const handleIssueContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIssueContent(e.target.value);
  };

  if (!visible) return null;

  const handleMemberDropdown = () => {
    setIsMemberDropdownOpen(!isMemberDropdownOpen);
    // (async () => {
    if (!isMemberDropdownOpen) {
      instanceAuth
        .get(`/belongs/list/${pj.projectId}`)
        .then((response) => {
          console.log(response.data);
          if (response.data.code === 200) {
            setMemberList(response.data.result);
          } else if (response.data.code === 707) {
            setMemberList([]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
    // })();
  };

  const handleCreateIssue = async () => {
    if (activeTag === null) {
      alert("이슈 태그를 선택해주세요.");
      return;
    }

    if (issueTitle === "") {
      alert("이슈 제목을 입력해주세요.");
      return;
    }

    if (issueContent === "") {
      alert("이슈 설명을 입력해주세요.");
      return;
    }

    const createIssueData: CreateIssueData = {
      projectId: pj.projectId,
      issueTag: activeTag,
      issueTitle: issueTitle,
      issueContent: issueContent,
      belongId: belongId,
    };

    instanceAuth
      .post(`/issues`, createIssueData)
      .then((response) => {
        console.log(response.data);
        if (response.data.code === 200) {
          handleOnClose();
        } else {
          alert("이슈 생성에 실패했습니다.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 드롭다운 외부 클릭 시 막기
  // useEffect(() => {
  //   const handleClickOutside = (e: MouseEvent) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
  //       setIsMemberDropdownOpen(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  return (
    <>
      <div
        id="defaultModal"
        aria-hidden="true"
        className="fixed justify-center flex items-center bg-black bg-opacity-30 top-0 left-0 right-0 bottom-0 z-50 p-4 backdrop-blur-sm overflow-x-hidden overflow-y-hidden md:inset-0 w-full h-full max-h-full"
      >
        <div className="flex w-full max-w-2xl max-h-full mr-auto ml-auto">
          <div className="bg-white rounded-lg shadow">
            {/* 모달 헤더 */}
            <div className="flex items-start justify-between p-10 rounded-t dark:border-gray-600">
              <h3 className="text-[24px] font-bold text-gray-900 dark:text-white">이슈 생성하기</h3>
              <button
                type="button"
                onClick={handleOnClose}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
              >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
              </button>
            </div>

            {/* 모달 내용 */}
            <div className="px-14">
              <p className="text-[16px] font-semibold leading-relaxed text-gray-900 dark:text-gray-400">이슈 태그</p>

              <div className="flex items-center space-x-3 mt-4">
                {["NEW", "FEATURE", "CHANGED", "FIXED", "DEPRECATED"].map((type: IssueType) => (
                  <div key={type} style={{ cursor: "pointer" }} onClick={() => handleTagClick(type)}>
                    {activeTag === type ? <Tag issueType={type as IssueType} /> : <TagDisabled issueType={type as IssueType} />}
                  </div>
                ))}
              </div>

              <p className="text-[16px] font-semibold leading-relaxed text-gray-900 dark:text-gray-400 mt-6">이슈 제목</p>
              <input
                type="pj_title"
                placeholder=""
                onChange={handleIssueTitle}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-4 focus:border-primary-4 block p-2.5 w-[31.0847vw]"
              />
              <p className="text-[16px] font-semibold leading-relaxed text-gray-900 dark:text-gray-400 mt-6">이슈 설명</p>
              <input
                type="pj_content"
                placeholder=""
                onChange={handleIssueContent}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-4 focus:border-primary-4 block p-2.5 w-[31.0847vw]"
              />

              <div className="flex items-center mt-6">
                <p className="text-[16px] font-semibold leading-relaxed text-gray-900 dark:text-gray-400 mr-3">담당자</p>
                <div>
                  <div className="relative">
                    <button
                      onClick={handleMemberDropdown}
                      className="flex items-center justify-between w-[140px] h-[40px] text-[#1F2A37] bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 font-suitM rounded-lg text-xs px-3 py-1.5"
                    >
                      <div className="flex items-center justify-center">
                        {memberDropdownValue === "멤버 선택" ? (
                          <div className="ml-2 text-sm text-grey-4">멤버 선택</div>
                        ) : (
                          <div className="flex flex-row items-center">
                            <img
                              className="w-6 h-6 rounded-full m-2 object-cover select-none pointer-events-none"
                              src={userProfileImg == "" || userProfileImg == null ? default_profile_img : userProfileImg}
                            />
                            <div className="ml-2 text-sm">{memberDropdownValue}</div>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-center">
                        <img className="m-1 w-[9px] h-[6px]" src={isMemberDropdownOpen ? chevron_up : chevron_down} alt="Dropdown Icon" />
                      </div>
                    </button>
                    {isMemberDropdownOpen && (
                      <div ref={dropdownRef} className="absolute z-10 top-full left-0 mt-2 w-[140px] bg-white divide-y divide-gray-100 rounded-lg shadow">
                        {/* 멤버 리스트 목록 map으로 보이기 */}
                        {memberList.length === 0 ? (
                          <div className="py-2 px-4 text-center">멤버 없음</div>
                        ) : (
                          memberList.map((member) => (
                            <div
                              key={member.memberId}
                              className="flex flex-row py-2 px-4 cursor-pointer hover:bg-gray-100"
                              onClick={() => {
                                setMemberDropdownValue(member.nickname);
                                setBelongId(member.belongId);
                                setIsMemberDropdownOpen(false);
                                setUserProfileImg(member.profileImage);
                              }}
                            >
                              <img
                                id="manager_icon"
                                src={member.profileImage == null || member.profileImage == "" ? default_profile_img : member.profileImage}
                                alt="M"
                                className="w-6 h-6 ml-4 mr-3 rounded-full"
                              />
                              <div className="ml-2 text-sm">{member.nickname}</div>
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 생성하기 버튼 푸터 */}
            <div className="flex items-center justify-end px-14 py-10 space-x-2 rounded-b ">
              <button
                type="button"
                onClick={handleCreateIssue}
                className="text-white bg-primary-4 hover:bg-primary-2 focus:ring-4 focus:outline-none focus:ring-primary-5 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                생성하기
              </button>
              <button
                type="button"
                onClick={handleOnClose}
                className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-5 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 "
              >
                취소
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
