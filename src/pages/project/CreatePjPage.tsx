import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import profile_img from "@images/common/default_profile.png";
import { Dropdown } from "flowbite";
import type { DropdownOptions, DropdownInterface } from "flowbite";
import Member from "@src/types/Users";
import { instanceAuth } from "@src/types/AxiosInterface";
import x_icon from "@images/icons/x_gray.svg";
import CpMember from "@typess/Users";
import CreatePjMember from "@src/components/project/CreatePjMember";

interface CreatePjData {
  projectTitle: string;
  projectKey: string;
  projectContent?: string;
  projectImage?: string;
  projectMemberList?: CpMember[];
}

export default function CreatePjPage() {
  const [pjTitle, setPjTitle] = useState("");
  const [pjKey, setPjKey] = useState("");
  const [pjContent, setPjContent] = useState("");
  const [pjImage, setPjImage] = useState("");
  const [pjMemList, setPjMemList] = useState<CpMember[]>([]);
  const [titleInputCount, setTitleInputCount] = useState(0);
  const [keyInputCount, setKeyInputCount] = useState(0);
  const [contentInputCount, setContentInputCount] = useState(0);
  const [findByEmail, setFindByEmail] = useState('');
  const emailRegex = /\S+@\S+\.\S+/;
  const [emailStatus, setEmailStatus] = useState("");

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  const onTitleChangeHandler = (e) => {
    setPjTitle(e.target.value);
    setTitleInputCount(e.target.value.length);
  };

  const onKeyChangeHandler = (e) => {
    e.target.value = e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '');
    setPjKey(e.target.value);
    setKeyInputCount(e.target.value.length);
  };

  const onContentChangeHandler = (e) => {
    setPjContent(e.target.value);
    setContentInputCount(e.target.value.length);
  };

  const onFindByEmailChangeHandler = (e) => {
    setFindByEmail(e.target.value);
  }

  useEffect(() => {
    // 이메일 형식 검증
    if (findByEmail === "") {
      setEmailStatus("");
    } else if (!emailRegex.test(findByEmail)) {
      setEmailStatus("이메일 형식이 올바르지 않습니다.");
    } else {
      setEmailStatus("");
    }
  }, [findByEmail])

  const createPjData: CreatePjData = {
    projectTitle: pjTitle,
    projectKey: pjKey,
    projectContent: pjContent,
    projectImage: pjImage,
    projectMemberList: pjMemList,
  };

  const pjMemberRequest = async () => {
    pjMemList.forEach((member) => {
      if (member.email === findByEmail) {
        // 특정 값이 있는 경우 원하는 동작 수행
        setEmailStatus("이미 추가한 멤버입니다.")
        return; 
      }
    })
    instanceAuth.get(`/members/list/${findByEmail}`).then((response) => {
      if (response.data.code == 200) {
        setPjMemList(pjMemList => [...pjMemList, response.data.result as CpMember]);
      } else {
        // 해당 이메일로 가입한 회원이 없을 때의 처리가 있어야 함!
        alert("정상적인 접근이 아닙니다.")
      }
    }).catch(() => alert("error"));
  };

  const createPjRequest = async () => {
    instanceAuth.post(`/projects`, createPjData).then((response) => {
      console.log(response.data);
      if (response.data.code == 200) {
        navigate(`/project/${response.data.result}/dashboard`);
      } else {
        alert("오류")
      }
    })
    .catch(() => alert("정상적인 접근이 아닙니다."));
  };

  useEffect(() => {
    // set the dropdown menu element
    const $targetEl = document.getElementById("dropdownMenu") as HTMLDivElement;

    // set the element that trigger the dropdown menu on click
    const $triggerEl = document.getElementById(
      "dropdownButton"
    ) as HTMLButtonElement | null;

    // options with default values
    const options: DropdownOptions = {
      placement: "bottom",
      triggerType: "click",
      offsetSkidding: 0,
      offsetDistance: 10,
      delay: 300,
    };

    /*
     * targetEl: required
     * triggerEl: required
     * options: optional
     */
    const dropdown: DropdownInterface = new Dropdown(
      $targetEl,
      $triggerEl,
      options
    );

    // show the dropdown
    // dropdown.show();
  }, []);

  return (
    <>
      <div className="relative w-screen h-screen flex flex-col mt-[100px]">
        {/* 프로젝트 생성하기 타이틀 */}
        <div
          className="flex flex-row items-center"
          style={{ marginLeft: "16.9312vw" }}
        >
          <div className="w-[10px] h-[27px] bg-primary-5 mr-[10px]"></div>
          <p className="text-[28px] font-suitB text-gray-900">
            프로젝트 생성하기
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex flex-row mt-[8vh]">
            <p className="w-[21vw] text-[20px] font-suitM text-gray-900">
              프로젝트명
            </p>
            <div>
              <input
                type="text"
                placeholder=""
                maxLength={20}
                onChange={onTitleChangeHandler}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-4 focus:border-primary-4 block p-2.5 w-[31.0847vw]"
              />
              <p
                className="font-suitM text-[14px] text-gray-400 text-right mt-[4px]"
                style={{ width: "31.0847vw" }}
              >
                {titleInputCount}/20
              </p>
            </div>
          </div>
          <div className="flex flex-row mt-[6vh]">
            <div className="flex flex-col">
              <p className="w-[21vw] text-[20px] font-suitM text-gray-900">
                프로젝트 키
              </p>
              <p className="text-[1.6vh] font-suitL text-gray-400 mt-[0.5vh]">
                * 변경 불가능한 고유 주소입니다.<br/>&nbsp;&nbsp;&nbsp;영문, 숫자만 입력 가능합니다.
              </p>
            </div>
            <div>
              <div className="flex">
                <input
                  type="text"
                  placeholder=""
                  maxLength={20}
                  onChange={onKeyChangeHandler}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-4 focus:border-primary-4 block p-2.5 w-[27.0847vw]"
                />
                <button className="w-[3.3vw] ml-[0.7vw] fonrt-suitL text-[1vh] text-primary-4 border border-1 border-primary-4 bg-white hover:bg-primary-5 rounded-lg">중복 체크</button>
              </div>
              <p
                className="font-suitM text-[14px] text-gray-400 text-right mt-[4px]
                w-[31.0847vw] pr-[4.2vw]"
              >
                {keyInputCount}/20
              </p>
            </div>
          </div>
          <div className="flex flex-row mt-[6vh]">
            <p className="w-[21vw] text-[20px] font-suitM text-gray-900">
              프로젝트 설명
            </p>
            <div>
              <textarea
                placeholder=""
                maxLength={200}
                onChange={onContentChangeHandler}
                className="items-start bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-4 focus:border-primary-4 block p-2.5"
                style={{
                  verticalAlign: "top",
                  width: "31.0847vw",
                  minHeight: "14.6640vh",
                }}
              />

              <p
                className="font-suitM text-[14px] text-gray-400 text-right mt-[4px]"
                style={{ width: "31.0847vw" }}
              >
                {contentInputCount}/200
              </p>
            </div>
          </div>
          <div className="flex flex-row mt-[8vh]">
            <p className="w-[21vw] text-[20px] font-suitM text-gray-900">
              팀원 추가하기
            </p>
            <div className="flex flex-col">
              <div className="flex flex-row w-[31.0847vw]">
                <div className="relative z-0">
                  <input
                    onChange={onFindByEmailChangeHandler}
                    type="text"
                    id="floating_standard"
                    className={emailStatus == "" ? "block py-2.5 px-0 w-[15vw] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary-4 peer ml-1" : "block py-2.5 px-0 w-[15vw] text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-error-3 peer ml-1"}
                    placeholder=" "
                  />
                  <label
                    htmlFor="floating_standard"
                    className={emailStatus == "" ? "absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ml-1" : "absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-error-3 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ml-1"}
                  >
                    {emailStatus == "" ? "이메일 검색하기" : emailStatus}
                  </label>
                </div>

                {/* 권한 드롭다운 버튼 */}
                <button
                  id="dropdownButton"
                  data-dropdown-toggle="dropdownMenu"
                  className="ml-auto border border-gray-300 border-1 text-text-gray-900 bg-white hover:bg-grey-6 font-suitM rounded-lg text-[12px] text-center inline-flex items-center justify-center"
                  type="button"
                  style={{
                    width: "86px",
                    height: "40px",
                  }}
                >
                  권한
                  <svg
                    className="w-2.5 h-2.5 ml-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                {/* 추가 버튼 */}
                <button
                  id="addTeamMember"
                  onClick={pjMemberRequest}
                  className="ml-[0.5vw] w-[86px] h-[40px] text-primary-4 border border-1 border-primary-4 bg-white hover:bg-primary-5 font-suitM rounded-lg text-[12px] mb-2 focus:outline-none">
                  추가
                </button>
              </div>

              {/* 권한 드롭다운했을 때 */}
              {/*  */}
              <div className="relative flex flex-col">
                <div
                  id="dropdownMenu"
                  className="z-20 hidden w-[150px] bg-white divide-y divide-gray-100 rounded-lg shadow"
                  style={{
                    marginLeft: "22.1vw",
                  }}
                >
                  <ul
                    className="p-3 space-y-1 text-sm text-gray-700"
                    aria-labelledby="dropdownButton"
                  >
                    <li>
                      <div className="flex items-center p-2 rounded hover:bg-gray-100">
                        <input
                          id="default-radio-4"
                          type="radio"
                          value=""
                          name="default-radio"
                          className="w-4 h-4 text-primary-4 bg-gray-100 border-gray-300 focus:ring-primary-4 focus:ring-2"
                        />
                        <label
                          htmlFor="default-radio-4"
                          className="w-full ml-2 text-[14px] font-suitM text-gray-900 rounded"
                        >
                          프로젝트 리더
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                        <input
                          checked
                          id="default-radio-5"
                          type="radio"
                          value=""
                          name="default-radio"
                          className="w-4 h-4 text-primary-4 bg-gray-100 border-gray-300 focus:ring-primary-4 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          htmlFor="default-radio-5"
                          className="w-full ml-2 text-[14px] font-suitM text-gray-900 rounded"
                        >
                          프로젝트 팀원
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* 추가한 팀원 목록 */}
                {/* 더미데이터 */}
                <div className="flex flex-col justify-center space-x-5 bg-gray-50 border border-gray-300 rounded-lg z-5 px-5 py-5 w-[31.1847vw]">
                  <ul className="max-w-md divide-y divide-gray-200">
                    {pjMemList.map((member) => (
                      <CreatePjMember pjMember={member} />
                    ))}

                    <li className="py-3 sm:py-4">
                      <div className="flex items-center space-x-7">
                        <div className="flex-shrink-0">
                          <img
                            className="w-8 h-8 rounded-full"
                            src={profile_img}
                            alt="Neil image"
                          />
                        </div>
                        <div className="flex flex-1 flex-row min-w-0">
                          <p className="text-[14px] font-suitM text-gray-600 truncate dark:text-white">
                            정현진
                          </p>
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400 ml-[20px]">
                            email@flowbite.com
                          </p>
                        </div>
                        <div className="inline-flex text-[14px] font-suitM text-gray-900 dark:text-white ">
                          프로젝트 팀원
                        </div>
                        <button>
                          <img src={x_icon} className="w-[0.8vw]" />
                        </button>
                      </div>
                    </li>

                    <li className="py-3 sm:py-4">
                      <div className="flex items-center space-x-7">
                        <div className="flex-shrink-0">
                          <img
                            className="w-8 h-8 rounded-full"
                            src={profile_img}
                            alt="Neil image"
                          />
                        </div>
                        <div className="flex flex-1 flex-row min-w-0">
                          <p className="text-[14px] font-suitM text-gray-600 truncate dark:text-white">
                            이승희
                          </p>
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400 ml-[20px]">
                            email@flowbite.com
                          </p>
                        </div>
                        <div className="inline-flex text-[14px] font-suitM dark:text-white ">
                          프로젝트 리더
                        </div>
                        <button>
                          <img src={x_icon} className="w-[0.8vw]" />
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 프로젝트 생성하기 버튼 */}
        <div className="flex justify-end">
          <button
            className="ml-auto w-[128px] h-[40px] text-white bg-primary-4 hover:bg-primary-2 focus:ring-4 focus:ring-primary-5 font-suitM rounded-lg text-sm mr-2 mb-2 dark:bg-primary-4 dark:hover:bg-primary-2 focus:outline-none dark:focus:ring-primary-5"
            style={{ marginTop: "4.8vh", marginRight: "16.3511vw" }}
            onClick={goBack}
            type="button"
          >
            생성하기
          </button>
        </div>
      </div>
    </>
  );
}
