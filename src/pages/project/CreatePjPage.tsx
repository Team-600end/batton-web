import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "flowbite";
import type { DropdownOptions, DropdownInterface } from "flowbite";
import { instanceAuth } from "@src/types/AxiosInterface";
import { CpMember, Member, UserGrade } from "@typess/Users";
import CreatePjMember from "@src/components/project/CreatePjMember";
import g_check_icon from "@images/icons/grey-check.svg";
import w_check_icon from "@images/icons/white_check.svg";
import { useRecoilState } from "recoil";
import { emailState, nicknameState } from "@src/state/userState";
import { projectNavs } from "@src/state/projectState";
import { ProjectNav } from "@src/types/project";

interface CreatePjData {
  projectTitle: string;
  projectKey: string;
  projectContent?: string;
  projectImage?: string;
  projectMemberList?: Member[];
  nickname: string;
}

export default function CreatePjPage() {
  // 프로젝트의 이름
  const [pjTitle, setPjTitle] = useState("");
  // 프로젝트의 고유 키
  const [pjKey, setPjKey] = useState("");
  // 프로젝트 설명
  const [pjContent, setPjContent] = useState("");
  // 프로젝트 이미지 - 현재 사용 안함
  const [pjImage, setPjImage] = useState("");
  // 프로젝트 멤버 리스트 화면 상태관리
  const [pjMemList, setPjMemList] = useState<CpMember[]>([]);
  // 프로젝트 멤버 리스트 요청 상태관리
  const [pjMemReqList, setPjMemReqList] = useState<Member[]>([]);
  const [grade, setGrade] = useState<UserGrade>("MEMBER");
  // pjTitle 길이 상태관리
  const [titleInputCount, setTitleInputCount] = useState(0);
  // pjKey 길이 상태관리
  const [keyInputCount, setKeyInputCount] = useState(0);
  // pjContent 길이 상태관리
  const [contentInputCount, setContentInputCount] = useState(0);
  // pjKey 가용 여부 상태관리
  const [keyChecked, setKeyChecked] = useState(-1); // 작성중 0, 성공 1, 공백 -1, 실패 -2
  // 초대 멤버 조회용 이메일
  const [findByEmail, setFindByEmail] = useState("");
  // 이메일 유효성 검사 결과
  const [emailStatus, setEmailStatus] = useState("");
  // 현재 사용자 닉네임 recoil
  const [userNickname, setUserNickname] = useRecoilState(nicknameState);
  const [userEmail, setUserEmail] = useRecoilState(emailState);
  // 프로젝트 recoil
  const [projects, setProjects] = useRecoilState(projectNavs);
  const emailRegex = /\S+@\S+\.\S+/;

  // router-dom
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // 이전 페이지로 이동
  };

  const onTitleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPjTitle(e.target.value);
    setTitleInputCount(e.target.value.length);
  };

  const onKeyChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.toLowerCase().replace(/[^a-z0-9]/g, "");
    setPjKey(e.target.value);
    setKeyInputCount(e.target.value.length);
    setKeyChecked(0);
    if (e.target.value == "") setKeyChecked(-1);
  };

  const onContentChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPjContent(e.target.value);
    setContentInputCount(e.target.value.length);
  };

  const onFindByEmailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFindByEmail(e.target.value);
  };

  //처음 내 정보 받아오기
  useEffect(() => {
    (async () => {
      instanceAuth.get(`/members/list/${userEmail}`).then((response) => {
        const myInfo = { ...(response.data.result as CpMember), grade: "LEADER" as UserGrade };
        setPjMemList((pjMemList) => [...pjMemList, myInfo]);
      });
    })();
  }, []);

  // 팀원 삭제
  const handleRemoveMember = (memberToRemove: CpMember) => {
    const updatedList = pjMemList.filter((member) => member.memberId !== memberToRemove.memberId);
    setPjMemList(updatedList);
  };

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

  // 팀원 추가하기
  const pjMemberRequest = async () => {
    let isMemberAdded = false;
    if (findByEmail === "") {
      // setEmailStatus("입력해주새요.");
      return;
    }
    pjMemList.forEach((member) => {
      if (member.email === findByEmail) {
        // 특정 값이 있는 경우 원하는 동작 수행
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

  // 프로젝트 키 중복 체크 요청
  const checkPjKeyRequest = async () => {
    if (keyChecked) return;
    if (pjKey == "") {
      alert("키 값을 입력해주세요.");
      return;
    }
    await instanceAuth
      .get(`/projects/project-key/${pjKey}`)
      .then((response) => {
        console.log(response.data);
        if (response.data.isSuccess == true) {
          setKeyChecked(1);
        } else {
          setKeyChecked(-2);
        }
      })
      .catch((error) => {
        console.log(error);
        alert("정상적인 접근이 아닙니다.");
      });
  };

  const onGradeChangeHandler = (grade: UserGrade) => {
    setGrade(grade);
  };

  useEffect(() => {
    // set the dropdown menu element
    const $targetEl = document.getElementById("dropdownMenu") as HTMLDivElement;

    // set the element that trigger the dropdown menu on click
    const $triggerEl = document.getElementById("dropdownButton") as HTMLButtonElement | null;

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
    const dropdown: DropdownInterface = new Dropdown($targetEl, $triggerEl, options);

    // show the dropdown
    // dropdown.show();
  }, []);

  // 프로젝트 생성 요청
  const createPjRequest = async () => {
    if (pjTitle == "") {
      alert("프로젝트명을 입력해주세요.");
      return;
    }

    if (!(keyChecked == 1)) {
      alert("프로젝트 키 중복 검사를 진행해주세요.");
      return;
    }

    const createPjData: CreatePjData = {
      projectTitle: pjTitle,
      projectKey: pjKey,
      projectContent: pjContent,
      projectImage: pjImage,
      nickname: userNickname,
      projectMemberList: pjMemReqList,
    };

    instanceAuth
      .post(`/projects`, createPjData)
      .then(async (response) => {
        console.log("프로젝트 생성 요청");
        console.log(response.data);
        if (response.data.code == 200) {
          await instanceAuth
            .get(`/projects/navbar`)
            .then((response) => {
              console.log(response.data);
              if (response.data.code == 200) {
                setProjects(response.data.result as ProjectNav[]);
              } else if (response.data.code == 707) {
                setProjects([]);
              } else {
                console.log("잘못된 접근입니다.");
              }
            })
            .catch((error) => {
              console.log(error);
            });
          navigate(`/project/${response.data.result.projectKey}/dashboard`);
        } else {
          alert("요청 실패");
        }
      })
      .catch(() => alert("정상적인 접근이 아닙니다."));
  };

  return (
    <>
      <div className="relative w-screen h-screen flex flex-col mt-[100px]">
        {/* 프로젝트 생성하기 타이틀 */}
        <div className="flex flex-row items-center" style={{ marginLeft: "16.9312vw" }}>
          <div className="w-[10px] h-[27px] bg-primary-5 mr-[10px]"></div>
          <p className="text-[28px] font-suitB text-gray-900">프로젝트 생성하기</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex flex-row mt-[8vh]">
            <p className="w-[21vw] text-[20px] font-suitM text-gray-900">프로젝트명</p>
            <div>
              <input
                type="text"
                placeholder=""
                maxLength={20}
                onChange={onTitleChangeHandler}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-4 focus:border-primary-4 block p-2.5 w-[31.0847vw]"
              />
              <p className="font-suitM text-[14px] text-gray-400 text-right mt-[4px] w-[31.0847vw]">{titleInputCount}/20</p>
            </div>
          </div>
          <div className="flex flex-row mt-[6vh]">
            <div className="flex flex-col">
              <p className="w-[21vw] text-[20px] font-suitM text-gray-900">프로젝트 키</p>
              <p className="text-[1.6vh] font-suitL text-gray-400 mt-[0.5vh]">
                * 생성 후 변경 불가능한 고유 주소입니다.
                <br />
                &nbsp;&nbsp;&nbsp;영문 소문자와 숫자만 입력 가능합니다.
              </p>
            </div>
            <div>
              <div className="flex">
                <input
                  type="text"
                  placeholder=""
                  maxLength={20}
                  onChange={onKeyChangeHandler}
                  className={
                    keyChecked == 1 || keyChecked == -1
                      ? "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-4 focus:border-primary-4 block p-2.5 w-[27.0847vw]"
                      : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-error-4 focus:border-error-3 block p-2.5 w-[27.0847vw]"
                  }
                />
                <button
                  onClick={checkPjKeyRequest}
                  className={
                    !(keyChecked == 1)
                      ? "w-[3.3vw] ml-[0.7vw] fonrt-suitL text-[1vh] border-2 border-grey-3 bg-white hover:bg-grey-4 rounded-lg"
                      : "w-[3.3vw] ml-[0.7vw] fonrt-suitL text-[1vh] border border-1 border-primary-4 bg-primary-3 rounded-lg"
                  }
                >
                  {!(keyChecked == 1) ? <img src={g_check_icon} className="m-auto" /> : <img src={w_check_icon} className="m-auto" />}
                </button>
              </div>
              <div className="flex w-[31.0847vw]">
                <p
                  className={
                    keyChecked == 1 ? "text-primary-4 pl-[0.4vw] font-suitL text-[13px] mt-[4px]" : "text-error-3 pl-[0.4vw] font-suitL text-[13px] mt-[4px]"
                  }
                >
                  {keyChecked == 1
                    ? "사용 가능한 키입니다"
                    : keyChecked == 0
                    ? "키 중복 검사를 진행해주세요"
                    : keyChecked == -1
                    ? ""
                    : "사용 불가능한 키입니다."}
                </p>
                <p className="font-suitM text-[14px] text-gray-400 text-right mt-[4px] ml-auto pr-[4.2vw]">{keyInputCount}/20</p>
              </div>
            </div>
          </div>
          <div className="flex flex-row mt-[6vh]">
            <p className="w-[21vw] text-[20px] font-suitM text-gray-900">프로젝트 설명</p>
            <div>
              <textarea
                placeholder=""
                maxLength={200}
                onChange={onContentChangeHandler}
                className="resize-none items-start bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-4 focus:border-primary-4 block p-2.5"
                style={{
                  verticalAlign: "top",
                  width: "31.0847vw",
                  minHeight: "14.6640vh",
                }}
              />

              <p className="font-suitM text-[14px] text-gray-400 text-right mt-[4px]" style={{ width: "31.0847vw" }}>
                {contentInputCount}/200
              </p>
            </div>
          </div>
          <div className="flex flex-row mt-[8vh]">
            <p className="w-[21vw] text-[20px] font-suitM text-gray-900">팀원 추가하기</p>
            <div className="flex flex-col">
              <div className="flex flex-row w-[31.0847vw]">
                <div className="relative z-0">
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
                  className="ml-auto my-2 border border-gray-300 border-1 text-text-gray-900 bg-white hover:bg-grey-6 font-suitM rounded-lg text-[12px] text-center inline-flex items-center justify-center"
                  type="button"
                  style={{
                    width: "86px",
                    height: "40px",
                  }}
                >
                  {grade == "LEADER" ? "리더" : "멤버"}

                  <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                  </svg>
                </button>

                {/* 추가 버튼 */}
                <button
                  id="addTeamMember"
                  onClick={pjMemberRequest}
                  className="ml-[0.5vw] my-2 w-[86px] h-[40px] text-primary-4 border border-1 border-primary-4 bg-white hover:bg-primary-5 font-suitM rounded-lg text-[12px] mb-2 focus:outline-none"
                >
                  추가
                </button>
              </div>

              {/* 권한 드롭다운했을 때 */}
              <div className="relative flex flex-col">
                <div
                  id="dropdownMenu"
                  className="z-20 hidden w-[90px] bg-white divide-y divide-gray-100 rounded-lg shadow"
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

                {/* 추가한 팀원 목록 */}
                {/* <div className="flex flex-col justify-center space-x-5 bg-gray-50 border border-gray-300 rounded-lg z-5 px-5 py-5 w-[31.1847vw] overflow-auto">
                  <ul className="max-w-md divide-y divide-gray-200">
                    {pjMemList.map((member) => (
                      <CreatePjMember key={member.memberId} pjMember={member} onRemove={() => handleRemoveMember(member)} />
                    ))}
                  </ul>
                </div> */}
                <div className="flex flex-col justify-center space-x-5 bg-gray-50 border border-gray-300 rounded-lg z-5 px-5 py-5 w-[31.1847vw] overflow-x-auto">
                  <ul className="max-w-md divide-y divide-gray-200">
                    {/* <CreatePjMember pjMember={grade:"LEADER", memberId: memberId} onRemove={null} /> */}
                    {pjMemList.map((member) => (
                      <CreatePjMember key={member.memberId} pjMember={member} onRemove={() => handleRemoveMember(member)} />
                    ))}
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
            onClick={createPjRequest}
            type="button"
          >
            생성하기
          </button>
        </div>
      </div>
    </>
  );
}
