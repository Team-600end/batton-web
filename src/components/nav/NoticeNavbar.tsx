import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { navbarNoticeDd } from "@src/state/modalState";
import { NoticeMessage } from "@typess/Notice";
import { instanceAuth } from "@src/types/AxiosInterface";
import default_profile from "@assets/images/common/default_profile.png"

function Notice() {
  const [activeButton, setActiveButton] = useState<string>("전체");
  const [noticeDropdown, setNoticeDropdown] = useRecoilState(navbarNoticeDd);
  const [notices, setNotices] = useState<NoticeMessage[]>([]);
  let uri : string;

  const handleClick = (text: string) => {
    setActiveButton(text);
  };
  const handleNoticeDropdown = () => {
    setNoticeDropdown(!noticeDropdown);
  };

  const getNoticeRequest = async () => {
    instanceAuth
      .get(uri)
      .then((response) => {
        console.log(response.data);
        if (response.data.code == 200) {
          setNotices(response.data.result)
        }
        else if (response.data.code == 1300) {
          console.log("유저 아이디 값을 확인해주세요.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (activeButton == "전체")
      uri = "/notices/all/0";
    else if (activeButton == "이슈")
      uri = "/notices/issues/0"
    else
      uri = "/notices/projects/0"
    
    getNoticeRequest();
  }, [activeButton]);

  return (
    <div className="flex">
      <div id="dropdownNotification" className="z-20 w-[400px] bg-white divide-y divide-gray-100 rounded-lg shadow-lg">
        <div className="block px-4 py-2 font-suitM text-center text-gray-700 rounded-t-lg bg-gray-50">알림</div>
        <div className="flex items-center justify-center">
          <ul className="flex flex-wrap -mb-px text-sm font-suitM">
            <li className="ml-3">
              <button
                className={`inline-block p-4 border-b-2 rounded-t-lg hover:text-[#5AAE8A] hover:border-[#5AAE8A] ${
                  activeButton === "전체" ? "text-[#5AAE8A] border-[#5AAE8A]" : "border-[#FFFFFF]"
                }`}
                onClick={() => handleClick("전체")}
              >
                전체
              </button>
            </li>
            <li className="ml-12">
              <button
                className={`inline-block p-4 border-b-2 rounded-t-lg hover:text-[#5AAE8A] hover:border-[#5AAE8A] ${
                  activeButton === "이슈" ? "text-[#5AAE8A] border-[#5AAE8A]" : "border-[#FFFFFF]"
                }`}
                onClick={() => handleClick("이슈")}
              >
                이슈
              </button>
            </li>
            <li className="ml-9">
              <button
                className={`inline-block p-4 border-b-2 rounded-t-lg hover:text-[#5AAE8A] hover:border-[#5AAE8A] ${
                  activeButton === "프로젝트" ? "text-[#5AAE8A] border-[#5AAE8A]" : "border-[#FFFFFF]"
                }`}
                onClick={() => handleClick("프로젝트")}
              >
                프로젝트
              </button>
            </li>
          </ul>
        </div>
        <div className="divide-y divide-gray-100">
          {notices.map((notice) => (
            <div className="flex px-4 py-3 hover:bg-gray-100">
              <div className="flex-shrink-0">
                {notice.senderProfileImage ? (
                  <img className="rounded-full w-11 h-11 object-cover select-none pointer-events-none" src={notice.senderProfileImage} alt="Profile" />
                ) : (
                  <img className="rounded-full w-11 h-11 object-cover select-none pointer-events-none" src={default_profile} alt="Default Profile" />
                )}
              </div>
              <div className="w-full pl-3">
                <div className="text-gray-500 break-all font-suitM text-sm mb-1.5">{notice.noticeContent}</div>
                <div className="text-green-500 font-suitL text-xs">{notice.noticeDate}</div>
              </div>
            </div>
          ))}
        </div>
        <Link
          to="/notifications"
          className="block py-2 text-sm font-suitM text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100"
          onClick={handleNoticeDropdown}
        >
          <div className="inline-flex items-center ">
            <svg className="w-4 h-4 mr-2 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
              <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
            </svg>
            전체 보기
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Notice;
