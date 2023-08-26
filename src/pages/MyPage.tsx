import React, { useState } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import {
  emailState,
  nicknameState,
  profileImgState,
} from "@src/state/userState";
import { instanceAuth, instanceImageAuth } from "@src/types/AxiosInterface";
import { useNavigate } from "react-router-dom";
import default_profile from "@images/common/default_profile.png";
import CommonModal from "@src/components/CommonModal";

export default function MyPage() {
  const navigate = useNavigate();

  //Recoil
  const [userNickname, setUserNickname] = useRecoilState(nicknameState);
  const [userProfileImg, setUserProfileImg] = useRecoilState(profileImgState);
  const userEmail = useRecoilValue(emailState);

  const [nickname, setNickname] = useState(userNickname);
  const [profileImg, setProfileImg] = useState(userProfileImg);

  const [viewImg, setViewImg] = useState(userProfileImg);

  const [isEditSuccess, setIsEditSuccess] = useState(false);
  const [alert, setAlert] = useState(false);

  const nicknameChange = (event) => {
    setNickname(event.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setViewImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
    setProfileImg(file);
  };

  // 유저 정보 수정 API
  // const modifyMemberRequest = async () => {
  //   const formData = new FormData();
  //   formData.append('profileImg', profileImg);
  //   formData.append('nickname', nickname)

  //   instanceImageAuth
  //     .patch(`/members`, formData)
  //     .then((response) => {
  //       console.log(response.data);
  //       if (response.data.code == 200) {
  //         setUserNickname(nickname)
  //         setUserProfileImg(response.data.result)
  //         setIsEditSuccess(true);
  //       }
  //       else if (response.data.code == 600) {
  //         console.log("존재하지 않는 유저입니다.");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  return (
    <>
      <div className="relative w-screen h-screen flex flex-col mt-12">
        <div
          className="flex flex-row items-center mt-[40px]"
          style={{ marginLeft: "16.9312vw" }}
        >
          <div className="w-[10px] h-[27px] bg-primary-5 mr-[10px]"></div>
          <p className="text-[28px] font-suitB text-gray-900">내 정보 수정</p>
        </div>
        <div className="flex flex-row w-screen " style={{}}>
          <div className="flex flex-col w-screen mt-[40px] items-center" style={{ width: "13.8889vw", marginLeft: "24.2540vw" }}>
            <img className="w-[20vw] h-[14vw] rounded-full object-cover" src={viewImg == "" || viewImg == null ? default_profile : viewImg}></img>
            <p className="text-[16px] font-suitM text-gray-900 mt-[20px]">계정</p>
            <p className="text-[20px] font-suitSB text-gray-900 mt-[4px]">{userEmail}</p>
          </div>
          <div
            className="flex flex-col mt-[40px] ml-[64px]"
            style={{ width: "28.3730vw" }}
          >
            <div>
              <label
                id="nickname"
                className="block mb-2 text-sm font-suitM text-gray-900"
              >
                닉네임
              </label>
              <input
                type="nickname"
                name="nickname"
                id="nickname"
                value={nickname}
                onChange={nicknameChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-primary-4 focus:ring-primary-4 focus:outline-primary-4 block w-full p-2.5"
                required
              />
            </div>
            <div className=" mt-[16px]">
              <label
                id="dropzone"
                className="block mb-2 text-sm font-suitM text-gray-900 dark:text-white"
              >
                프로필 사진 수정
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-60 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-suitSB"></span>이미지를 클릭하거나
                      드래그하여 업로드하세요
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center space-x-5 mt-[6.2vh] ml-[5vw]">
          <button
            type="button"
            className="text-white bg-error-3 hover:bg-error-2 focus:ring-4 focus:ring-error-2 font-suitM rounded-lg text-sm px-9 py-3.5 mr-2 mb-2 focus:outline-none"
          >
            탈퇴하기
          </button>
          <button
            type="button"
            className="text-white bg-primary-4 hover:bg-primary-2 focus:ring-4 focus:ring-primary-5 font-suitM rounded-lg text-sm px-9 py-3.5 mr-2 mb-2 focus:outline-none"
            onClick={() => setAlert(true)}
          >
            수정하기
          </button>
        </div>
      </div>
      {isEditSuccess && (
        <CommonModal title="안내메세지" description="사용자 정보가 정상적으로 수정되었습니다." btnTitle="확인" closeModal={() => setIsEditSuccess(false)} />
      )}
      {alert && (
        <CommonModal
          title="안내메시지"
          description="해커톤 기간에는 이 기능을 제공하지 않습니다."
          btnTitle="확인"
          closeModal={() => setAlert(false)}
        />
      )}
    </>
  );
}
