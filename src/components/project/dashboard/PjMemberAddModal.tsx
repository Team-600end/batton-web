import React, { useState, useEffect } from "react";
import { CpMember, Member, UserGrade } from "@src/types/Users";
import CreatePjMember from "../CreatePjMember";
import { instanceAuth } from "@src/types/AxiosInterface";
/**
 * 프로젝트 멤버 추가 모달
 * @returns
 */
export default function PjMemberAddModal({ projectId, onClose }) {
  // 프로젝트 멤버 리스트 화면 상태관리
  const [pjMemList, setPjMemList] = useState<CpMember[]>([]);
  // 프로젝트 멤버 리스트 요청 상태관리
  const [curPjMemList, setCurPjMemList] = useState<CpMember[]>([]);
  const [pjMemReqList, setPjMemReqList] = useState<Member[]>([]);
  const [grade, setGrade] = useState<UserGrade>("MEMBER");
  // 초대 멤버 조회용 이메일
  const [findByEmail, setFindByEmail] = useState("");
  // 이메일 유효성 검사 결과
  const [emailStatus, setEmailStatus] = useState("");
  const emailRegex = /\S+@\S+\.\S+/;
  //드롭다운
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const onGradeChangeHandler = (grade: UserGrade) => {
    setGrade(grade);
  };

  const onFindByEmailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFindByEmail(e.target.value);
  };

  useEffect(() => {
    (async () => {
      instanceAuth
        .get(`/belongs/list/${projectId}`)
        .then((response) => {
          console.log(response.data);
          if (response.data.code === 200) {
            setCurPjMemList(response.data.result);
          } else if (response.data.code === 707) {
            setCurPjMemList([]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, []);

  //이메일 형식 검증
  useEffect(() => {
    // 이메일 형식 검증
    if (findByEmail === "") {
      setEmailStatus("");
    } else if (!emailRegex.test(findByEmail)) {
      setEmailStatus("형식이 올바르지 않습니다.");
    } else {
      setEmailStatus("");
    }
  }, [findByEmail]);

  //리스트에 멤버 추가하기
  const addMemberList = async () => {
    let isMemberAdded = false;
    if (findByEmail === "") {
      // setEmailStatus("입력해주새요.");
      return;
    }
    curPjMemList.forEach((member) => {
      if (member.email === findByEmail) {
        setEmailStatus("이미 프로젝트에 존재하는 멤버입니다.");
        isMemberAdded = true;
        return;
      }
    });
    pjMemList.forEach((member) => {
      if (member.email === findByEmail) {
        setEmailStatus("이미 추가한 멤버입니다.");
        isMemberAdded = true;
        return;
      }
    });

    if (isMemberAdded) {
      return;
    }

    instanceAuth
      .get(`/members/list/${findByEmail}`)
      .then((response) => {
        console.log(response.data);

        if (response.data.code === 200) {
          const memberInfo = { ...(response.data.result as CpMember), grade: grade };
          setPjMemList((pjMemList) => [...pjMemList, memberInfo]);
          setPjMemReqList((pjMemReqList) => [
            ...pjMemReqList,
            { memberId: response.data.result.memberId, nickname: response.data.result.nickname, gradeType: grade },
          ]);
        } else if (response.data.code === 600) {
          // 해당 이메일로 가입한 회원이 없을 때
          setEmailStatus("존재하지 않는 이메일입니다.");
        } else {
          alert("정상적인 접근이 아닙니다.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 팀원 삭제
  const handleRemoveMember = (memberToRemove: CpMember) => {
    const updatedList = pjMemList.filter((member) => member.memberId !== memberToRemove.memberId);
    setPjMemList(updatedList);
  };

  return (
    <div className="m-0">
      <div className="fixed flex flex-col justify-center items-center bg-black bg-opacity-30 z-50 md:inset-0 w-full h-full">
        <div className="flex max-h-full m-auto">
          <div className="bg-white rounded-lg shadow dark:bg-gray-700 p-3">
            {/* title */}
            <div className=" flex p-4 rounded-t">
              <h3 className=" mr-20 text-[24px] font-suitB text-gray-900 dark:text-white">팀원 추가하기 </h3>
              <button
                type="button"
                onClick={onClose}
                className=" text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
              </button>
            </div>

            {/* 내용 */}
            <div className="flex flex-row mx-5 my-2 ">
              <div className="flex flex-col">
                <div className="flex flex-row w-[31.0847vw]">
                  <div className="relative z-10">
                    <input
                      onChange={onFindByEmailChangeHandler}
                      type="text"
                      id="floating_standard"
                      className={
                        emailStatus == ""
                          ? "block py-2.5 px-2 my-2 w-[15vw] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary-4 peer ml-1"
                          : "block py-2.5 px-2 my-2 w-[15vw] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-error-3 peer ml-1"
                      }
                      placeholder=" "
                    />
                    <label
                      htmlFor="floating_standard"
                      className={
                        emailStatus == ""
                          ? "absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ml-1"
                          : "absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-error-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ml-1"
                      }
                    >
                      {emailStatus == "" ? "이메일 검색하기" : emailStatus}
                    </label>
                  </div>

                  {/* 권한 드롭다운 버튼 */}
                  <button
                    id="dropdownButton"
                    data-dropdown-toggle="dropdownMenu"
                    className="ml-auto my-2 border border-gray-300 border-1 text-text-gray-900 bg-white hover:bg-grey-6 font-suitM rounded-lg text-[12px] text-center inline-flex items-center justify-center z-30"
                    type="button"
                    style={{
                      width: "86px",
                      height: "40px",
                    }}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    {grade == "LEADER" ? "리더" : "멤버"}

                    <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                  </button>

                  {/* 추가 버튼 */}
                  <button
                    id="addTeamMember"
                    onClick={addMemberList}
                    className="ml-[0.5vw] my-2 w-[86px] h-[40px] text-primary-4 border border-1 border-primary-4 bg-white hover:bg-primary-5 font-suitM rounded-lg text-[12px] mb-2 focus:outline-none"
                  >
                    추가
                  </button>
                </div>

                {/* 권한 드롭다운했을 때 */}
                {/* <div className="relative flex flex-col">
                  <div
                    id="dropdownMenu"
                    className="z-50 hidden w-[90px] bg-white divide-y divide-gray-100 rounded-lg shadow"
                    style={{
                      marginLeft: "22.1vw",
                    }}
                  >
                    <ul className="p-2 space-y-1 text-sm text-gray-700" aria-labelledby="dropdownButton">
                      <li>
                        <div className="flex items-center pl-2 rounded hover:bg-gray-100">
                          <input
                            id="default-radio-4"
                            type="radio"
                            value=""
                            name="default-radio"
                            className="w-4 h-4 text-primary-4 bg-gray-100 border-gray-300 focus:ring-primary-4 focus:ring-2"
                            onClick={() => {
                              onGradeChangeHandler("LEADER");
                            }}
                          />
                          <label htmlFor="default-radio-4" className="w-full ml-3 text-[14px] font-suitM text-gray-900 rounded">
                            리더
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="flex items-center pl-2 pt-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                          <input
                            id="default-radio-5"
                            type="radio"
                            value=""
                            name="default-radio"
                            className="w-4 h-4 text-primary-4 bg-gray-100 border-gray-300 focus:ring-primary-4 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                            onClick={() => {
                              onGradeChangeHandler("MEMBER");
                            }}
                          />
                          <label htmlFor="default-radio-5" className="w-full ml-3 text-[14px] font-suitM text-gray-900 rounded">
                            멤버
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div> */}
                {/* 권한 드롭다운했을 때 */}
                <div className="relative flex flex-col">
                  {/* Modified: Removed the 'hidden' class */}
                  {dropdownOpen && (
                    <div
                      id="dropdownMenu"
                      className="z-50 absolute w-[90px] bg-white divide-y divide-gray-100 rounded-lg shadow"
                      style={{
                        marginLeft: "22.1vw",
                      }}
                    >
                      <ul className="p-2 space-y-1 text-sm text-gray-700" aria-labelledby="dropdownButton">
                        <li>
                          <div className="flex items-center pl-2 rounded hover:bg-gray-100">
                            <input
                              id="default-radio-4"
                              type="radio"
                              value=""
                              name="default-radio"
                              className="w-4 h-4 text-primary-4 bg-gray-100 border-gray-300 focus:ring-primary-4 focus:ring-2"
                              onClick={() => {
                                onGradeChangeHandler("LEADER");
                              }}
                            />
                            <label htmlFor="default-radio-4" className="w-full ml-3 text-[14px] font-suitM text-gray-900 rounded">
                              리더
                            </label>
                          </div>
                        </li>
                        <li>
                          <div className="flex items-center pl-2 pt-1 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                            <input
                              id="default-radio-5"
                              type="radio"
                              value=""
                              name="default-radio"
                              className="w-4 h-4 text-primary-4 bg-gray-100 border-gray-300 focus:ring-primary-4 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                              onClick={() => {
                                onGradeChangeHandler("MEMBER");
                              }}
                            />
                            <label htmlFor="default-radio-5" className="w-full ml-3 text-[14px] font-suitM text-gray-900 rounded">
                              멤버
                            </label>
                          </div>
                        </li>
                      </ul>
                    </div>
                  )}

                  {/* 추가한 팀원 목록 */}
                  <div className="flex flex-col justify-center space-x-5 bg-gray-50 border border-gray-300 rounded-lg z-5 px-5 py-5 w-[31.1847vw] overflow-x-auto">
                    <ul className="max-w-md divide-y divide-gray-200">
                      {pjMemList.map((member) => (
                        <CreatePjMember key={member.memberId} pjMember={member} onRemove={() => handleRemoveMember(member)} />
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* 프로젝트 생성하기 버튼 */}
            <div className="flex justify-end">
              <button
                className="ml-auto w-[100px] h-[40px] text-white font-suitB bg-primary-4 hover:bg-primary-2 focus:ring-4 focus:ring-primary-5 rounded-lg text-sm mr-2 mb-2 dark:bg-primary-4 dark:hover:bg-primary-2 focus:outline-none dark:focus:ring-primary-5"
                // onClick={addMemberRequest}
                type="button"
              >
                초대하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
