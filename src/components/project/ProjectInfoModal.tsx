import { instanceAuth } from "@src/types/AxiosInterface";
import { CpMember, Member } from "@src/types/Users";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { nicknameState } from "@src/state/userState";
import { projectNavs } from "@src/state/projectState";
import { ProjectNav } from "@typess/project";
import { useParams } from "react-router-dom";

/**
 * 프로젝트 정보 모달
 * @param closeModal
 * @returns
 */

interface EditPjData {
  projectTitle: string;
  projectKey: string;
  projectContent?: string;
  projectImage?: string;
  projectMemberList?: Member[];
  nickname: string;
}

export default function ProjectInfoModal({ closeModal }) {
  //recoil
  const [projectNav, setProjectNav] = useRecoilState(projectNavs);
  let { projectKey } = useParams();

  const pj = projectNav.find((element: ProjectNav) => element.projectKey.toString() == projectKey);

  const [isEdit, setIsEdit] = useState(false);
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
  // 프로젝트 recoil
  const [projects, setProjects] = useRecoilState(projectNavs);
  const emailRegex = /\S+@\S+\.\S+/;

  const createPjData: EditPjData = {
    projectTitle: pjTitle,
    projectKey: pjKey,
    projectContent: pjContent,
    projectImage: pjImage,
    nickname: userNickname,
    projectMemberList: pjMemReqList,
  };

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleSave = () => {
    //TODO: patch 요청
    setIsEdit(false);
    (async () => {
      instanceAuth
        .patch(`/projects/${pj.projectId}`, createPjData)
        .then((response) => {
          console.log(response.data);
          if (response.data.code === 200) {
            setPjTitle(response.data.result.projectTitle);
            setPjKey(response.data.result.projectKey);
            setPjContent(response.data.result.projectContent);
            setPjImage(response.data.result.projectImage);
          } else if (response.data.code === 707) {
            setPjTitle("");
            setPjKey("");
            setPjContent("");
            setPjImage("");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  };

  const handleDelete = () => {
    //TODO: 프로젝트 삭제 api 요청
  };

  const onTitleChangeHandler = (e) => {
    setPjTitle(e.target.value);
    setTitleInputCount(e.target.value.length);
  };

  const onContentChangeHandler = (e) => {
    setPjContent(e.target.value);
    setContentInputCount(e.target.value.length);
  };

  useEffect(() => {
    (async () => {
      instanceAuth
        .get(`/projects/${pj.projectId}`)
        .then((response) => {
          console.log(response.data);
          if (response.data.code === 200) {
            setPjTitle(response.data.result.projectTitle);
            setPjKey(response.data.result.projectKey);
            setPjContent(response.data.result.projectContent);
            setPjImage(response.data.result.projectImage);
          } else if (response.data.code === 707) {
            setPjTitle("");
            setPjKey("");
            setPjContent("");
            setPjImage("");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, []);

  return (
    <>
      <div className="fixed flex justify-center items-center bg-black bg-opacity-30  z-50 p-20 overflow-x-hidden overflow-y-hidden md:inset-0 w-full h-full max-h-full">
        <div className="flex max-w-full max-h-full">
          <div className="bg-white rounded-lg shadow dark:bg-gray-700">
            {/* title */}
            <div className="flex items-start justify-between px-10 pt-10 rounded-t dark:border-gray-600">
              <h3 className="mr-20 text-[24px] font-bold text-gray-900 dark:text-white">프로젝트 </h3>
              <button
                type="button"
                onClick={closeModal}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
              </button>
            </div>

            {/* 내용 */}
            <div className="px-14 py-5">
              <p className="text-[16px] font-semibold leading-relaxed text-gray-900 dark:text-gray-400">프로젝트 명</p>
              {isEdit ? (
                <input
                  type="pj-title"
                  value={pjTitle}
                  onChange={onTitleChangeHandler}
                  maxLength={20}
                  className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg block p-2.5 w-[31.0847vw]  focus:ring-[#4AA366] focus:border-[#4AA366]"
                />
              ) : (
                <input
                  readOnly
                  type="pj-title"
                  value={pjTitle}
                  className="font-semibold bg-gray-200 border border-gray-300 text-gray-700 text-sm rounded-lg block p-2.5 w-[31.0847vw] cursor-default"
                />
              )}
            </div>

            <div className="px-14 pb-5">
              <p className="text-[16px] font-semibold leading-relaxed text-gray-900 dark:text-gray-400">프로젝트 키</p>
              <input
                type="pj-key"
                readOnly
                value={pjKey}
                className="bg-gray-200 border border-gray-300 text-gray-700 text-sm rounded-lg block p-2.5 w-[31.0847vw] cursor-default"
              />
            </div>

            <div className="px-14 pb-5">
              <p className="text-[16px] font-semibold leading-relaxed text-gray-900 dark:text-gray-400">프로젝트 설명</p>
              {isEdit ? (
                <input
                  type="pj-title"
                  value={pjContent}
                  maxLength={200}
                  onChange={onContentChangeHandler}
                  className="items-start bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-4 focus:border-primary-4 block p-2.5"
                  style={{
                    verticalAlign: "top",
                    width: "31.0847vw",
                    minHeight: "14.6640vh",
                  }}
                />
              ) : (
                <input
                  readOnly
                  type="pj-title"
                  value={pjContent}
                  className="items-start bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-4 focus:border-primary-4 block p-2.5"
                  style={{
                    verticalAlign: "top",
                    width: "31.0847vw",
                    minHeight: "14.6640vh",
                  }}
                />
              )}
            </div>

            <div className="flex justify-center">
              <button
                onClick={handleDelete}
                className="text-white bg-red-500 hover:bg-red-700 focus:ring-2 focus:outline-none focus:ring-red-400 font-medium rounded-lg text-sm px-4 py-2.5 text-center m-3 mb-5"
              >
                삭 제
              </button>
              {isEdit ? (
                <button
                  onClick={handleSave}
                  className="text-white bg-primary-4 hover:bg-primary-2 focus:ring-2 focus:outline-none focus:ring-primary-5 font-medium rounded-lg text-sm px-4 py-2.5 text-center m-3 mb-5"
                >
                  저 장
                </button>
              ) : (
                <button
                  onClick={handleEdit}
                  className="text-white bg-grey-3 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-5 font-medium rounded-lg text-sm px-4 py-2.5 text-center m-3 mb-5"
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
