import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import profile_img from "@images/common/default_profile.png";
import { Dropdown } from "flowbite";
import type { DropdownOptions, DropdownInterface } from "flowbite";
import Member from "@src/types/Users";
import { instanceAuth } from "@src/types/AxiosInterface";
import x_icon from "@images/icons/x_gray.svg";
import CpMember from "@typess/Users";
import CreatePjMember from "@src/components/project/CreatePjMember";
import { useRecoilState } from "recoil";
import { projectNavs } from "@src/state/projectState";
import { ProjectNav } from "@src/types/project";

export default function EditPjPage() {
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

  const [projectNav, setProjectNav] = useRecoilState(projectNavs);
  let { projectKey } = useParams();

  const pj = projectNav.find((element: ProjectNav) => element.projectKey.toString() == projectKey);

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

  // const createPjData: CreatePjData = {
  //   projectTitle: pjTitle,
  //   projectKey: pjKey,
  //   projectContent: pjContent,
  //   projectImage: pjImage,
  //   projectMemberList: pjMemList,
  // };

  const createPjRequest = async () => {
    instanceAuth.post(`/projects`, null).then((response) => {
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
          <p className="text-[28px] font-bold text-gray-900">
            프로젝트 수정 : {pj.projectKey}
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex flex-row mt-[8vh]">
            <p className="w-[21vw] text-[20px] font-medium text-gray-900">
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
                className="font-medium text-[14px] text-gray-400 text-right mt-[4px]"
                style={{ width: "31.0847vw" }}
              >
                {titleInputCount}/20
              </p>
            </div>
          </div>
          <div className="flex flex-row mt-[6vh]">
            <p className="w-[21vw] text-[20px] font-medium text-gray-900">
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
                className="font-medium text-[14px] text-gray-400 text-right mt-[4px]"
                style={{ width: "31.0847vw" }}
              >
                {contentInputCount}/200
              </p>
            </div>
          </div>
        </div>
        {/* 프로젝트 생성하기 버튼 */}
        <div className="flex">
          <button
            className="ml-auto w-[128px] h-[40px] text-white bg-primary-4 hover:bg-primary-2 focus:ring-4 focus:ring-primary-5 font-medium rounded-lg text-sm mr-2 mb-2 focus:outline-none"
            style={{ marginTop: "4.8vh", marginRight: "16.3511vw" }}
            onClick={goBack}
            type="button"
          >
            생성하기
          </button>
          <button
            className="ml-auto w-[128px] h-[40px] text-white bg-primary-4 hover:bg-primary-2 focus:ring-4 focus:ring-primary-5 font-medium rounded-lg text-sm mr-2 mb-2 focus:outline-none"
            style={{ marginTop: "4.8vh", marginRight: "16.3511vw" }}
            onClick={goBack}
            type="button"
          >
            해체하기
          </button>
        </div>
      </div>
    </>
  );
}
