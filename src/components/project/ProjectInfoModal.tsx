import { instanceAuth, instanceImageAuth } from "@src/types/AxiosInterface";
import { CpMember, Member } from "@src/types/Users";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { nicknameState } from "@src/state/userState";
import { projectNavs } from "@src/state/projectState";
import { ProjectNav } from "@typess/project";
import { useParams } from "react-router-dom";
import CommonModal from "@src/components/CommonModal";
import default_team_logo from "@images/common/team_default.png";

/**
 * 프로젝트 정보 모달
 * @param closeModal
 * @returns
 */

export default function ProjectInfoModal({ closeModal }) {
  //recoil
  const [projectNav, setProjectNav] = useRecoilState(projectNavs);
  let { projectKey } = useParams();

  const pj = projectNav.find(
    (element: ProjectNav) => element.projectKey.toString() == projectKey
  );

  const [isEdit, setIsEdit] = useState(false);
  // 프로젝트의 이름
  const [pjTitle, setPjTitle] = useState("");
  // 프로젝트의 고유 키
  const [pjKey, setPjKey] = useState("");
  // 프로젝트 설명
  const [pjContent, setPjContent] = useState("");
  // 프로젝트 멤버 리스트 화면 상태관리
  const [pjMemList, setPjMemList] = useState<CpMember[]>([]);
  // 프로젝트 멤버 리스트 요청 상태관리
  const [pjMemReqList, setPjMemReqList] = useState<Member[]>([]);
  // pjTitle 길이 상태관리
  const [titleInputCount, setTitleInputCount] = useState(0);
  // pjKey 길이 상태관리
  const [keyInputCount, setKeyInputCount] = useState(0);
  // pjContent 길이 상태관리
  const [contentInputCount, setContentInputCount] = useState(0);
  // 초대 멤버 조회용 이메일
  const [findByEmail, setFindByEmail] = useState("");
  // 이메일 유효성 검사 결과
  const [emailStatus, setEmailStatus] = useState("");
  // 현재 사용자 닉네임 recoil
  const [userNickname, setUserNickname] = useRecoilState(nicknameState);
  // 프로젝트 recoil
  const [projects, setProjects] = useRecoilState(projectNavs);
  const emailRegex = /\S+@\S+\.\S+/;

  const [viewImg, setViewImg] = useState<string>("");
  const [imgFile, setImgFile] = useState<any>();

  // 저장 확인 모달
  const [isSaveModal, setIsSaveModal] = useState(false);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleSave = () => {
    setIsSaveModal(true);
    setIsEdit(false);
    saveProject();
    getProjectInfo();
  };

  /** 프로젝트  */
  const saveProject = async () => {
    const formData = new FormData();
    formData.append("projectTitle", pjTitle);
    formData.append("projectKey", pjKey);
    formData.append("projectContent", pjContent);
    formData.append("projectImage", imgFile);

    console.log("=========수정요청==========");
    console.log(formData);
    instanceImageAuth
      .patch(`/projects/${pj.projectId}`, formData)
      .then((response) => {
        if (response.data.code === 200) {
          setPjTitle(pjTitle);
          setPjKey(pjKey);
          setPjContent(pjContent);
        } else if (response.data.code === 707) {
          setPjTitle("");
          setPjKey("");
          setPjContent("");
          setViewImg("");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = async () => {
    //TODO: 프로젝트 삭제 api 요청
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setViewImg(reader.result.toString());
      };
      reader.readAsDataURL(file);
    }
    setImgFile(file);
  };

  const onTitleChangeHandler = (e) => {
    setPjTitle(e.target.value);
    setTitleInputCount(e.target.value.length);
  };

  const onContentChangeHandler = (e) => {
    setPjContent(e.target.value);
    setContentInputCount(e.target.value.length);
  };

  /** 프로젝트 정보 조회 요청 */
  const getProjectInfo = () => {
    console.log("keykeykey" + pj.projectKey);
    (async () => {
      instanceAuth
        .get(`/projects/${pj.projectId}`)
        .then((response) => {
          //   console.log(response.data);
          if (response.data.code === 200) {
            setPjTitle(response.data.result.projectTitle);
            setPjKey(response.data.result.projectKey);
            setPjContent(response.data.result.projectContent);
            setViewImg(response.data.result.projectLogo);
            setImgFile(response.data.result.projectLogo);
          } else if (response.data.code === 707) {
            setPjTitle("");
            setPjKey("");
            setPjContent("");
            setViewImg("");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  };

  useEffect(() => {
    getProjectInfo();
  }, [isSaveModal]);

  return (
    <>
      <div className="fixed flex justify-center items-center bg-black bg-opacity-30  z-50 p-20 overflow-x-hidden overflow-y-hidden md:inset-0 w-full h-full max-h-full">
        <div className="flex max-w-full max-h-full">
          <div className="bg-white rounded-lg shadow dark:bg-gray-700">
            {/* title */}
            <div className="flex items-start justify-between px-10 pt-10 rounded-t dark:border-gray-600">
              <h3 className="mr-20 text-[24px] font-suitB text-gray-900 dark:text-white">
                프로젝트{" "}
              </h3>
              <button
                type="button"
                onClick={closeModal}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>

            <div className="flex">
              {/** 프로젝트 로고 */}
              <div className="flex flex-col px-14 py-5">
                <p className="text-[16px] font-suitSB leading-relaxed text-gray-900">
                  프로젝트 로고
                </p>
                <label className="my-auto mx-auto">
                  <img
                    className="w-[18vw] h-[18vw] rounded-full object-cover cursor-pointer border border-gray-700 ml-[2.5vw] mr-[-2.5vw]"
                    src={
                      viewImg == null || viewImg == ""
                        ? default_team_logo
                        : viewImg
                    }
                  />
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              <div className="flex flex-col">
                {/* 내용 */}
                <div className="px-14 py-5">
                  <p className="text-[16px] font-suitSB leading-relaxed text-gray-900">
                    프로젝트 명
                  </p>
                  {isEdit ? (
                    <input
                      value={pjTitle}
                      onChange={onTitleChangeHandler}
                      maxLength={20}
                      className="bg-gray-50 border-gray-300 text-gray-700 text-sm rounded-lg block p-2.5 w-[31.0847vw] focus:outline-primary-4 focus:ring-primary-4 focus:border-primary-4 border"
                    />
                  ) : (
                    <input
                      readOnly
                      value={pjTitle}
                      className="font-suitSB bg-gray-100 border-gray-300 text-gray-400 text-sm rounded-lg block p-2.5 w-[31.0847vw] cursor-default focus:outline-none border"
                    />
                  )}
                </div>

                <div className="px-14 pb-5">
                  <p className="text-[16px] font-suitSB leading-relaxed text-gray-900">
                    프로젝트 키
                  </p>
                  <input
                    type="pj-key"
                    readOnly
                    value={pjKey}
                    className="bg-gray-100 border border-gray-300 text-gray-400 text-sm rounded-lg block p-2.5 w-[31.0847vw]  focus:outline-none cursor-default"
                  />
                </div>

                <div className="px-14 pb-5">
                  <p className="text-[16px] font-suitSB leading-relaxed text-gray-900">
                    프로젝트 설명
                  </p>
                  {isEdit ? (
                    <div>
                      <input
                        type="pj-title"
                        value={pjContent}
                        maxLength={200}
                        onChange={onContentChangeHandler}
                        className="items-start bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l focus:outline-primary-4 focus:ring-primary-4 focus:border-primary-4 block p-2.5"
                        style={{
                          verticalAlign: "top",
                          width: "31.0847vw",
                          minHeight: "14.6640vh",
                        }}
                      />
                    </div>
                  ) : (
                    <div>
                      <input
                        readOnly
                        type="pj-title"
                        value={pjContent}
                        className="items-start bg-gray-100 border border-gray-300 text-gray-400 text-sm rounded-lg  focus:outline-none block p-2.5"
                        style={{
                          verticalAlign: "top",
                          width: "31.0847vw",
                          minHeight: "14.6640vh",
                        }}
                      />

                      {isSaveModal && (
                        <CommonModal
                          title="저장 완료"
                          description="프로젝트 정보가 저장되었습니다."
                          btnTitle="확인"
                          closeModal={() => {
                            setIsSaveModal(false);
                          }}
                        />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              {!isEdit ? (
                <button
                  onClick={handleDelete}
                  className="text-white bg-error-3 hover:bg-error-2 focus:ring-2 focus:outline-none focus:ring-red-400 font-suitM rounded-lg text-sm px-4 py-2.5 text-center m-3 mb-5"
                >
                  삭 제
                </button>
              ) : (
                <button
                  onClick={closeModal}
                  className="text-white bg-grey-4 hover:bg-grey-3 focus:ring-2 focus:outline-none focus:ring-grey-5 font-suitM rounded-lg text-sm px-4 py-2.5 text-center m-3 mb-5"
                >
                  취 소
                </button>
              )}
              {isEdit ? (
                <button
                  onClick={handleSave}
                  className="text-white bg-primary-4 hover:bg-primary-2 focus:ring-2 focus:outline-none focus:ring-primary-5 font-suitM rounded-lg text-sm px-4 py-2.5 text-center m-3 mb-5"
                >
                  저 장
                </button>
              ) : (
                <button
                  onClick={handleEdit}
                  className="text-white bg-grey-4 hover:bg-grey-3 focus:ring-2 focus:outline-none focus:ring-grey-5 font-suitM rounded-lg text-sm px-4 py-2.5 text-center m-3 mb-5"
                >
                  수 정
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
