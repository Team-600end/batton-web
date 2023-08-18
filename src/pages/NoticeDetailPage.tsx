import React, { useState, useEffect } from "react";
import arrow_left from "@images/icons/arrow_left.png";
import { useNavigate } from "react-router-dom";
import { NoticeMessage } from "@typess/Notice";
import { instanceAuth } from "@src/types/AxiosInterface";
import default_profile from "@assets/images/common/default_profile.png";

export default function NoticeDetailPage() {
  const navigate = useNavigate();
  let uri: string;

  const [activeButton, setActiveButton] = useState<string>("전체");
  const [notices, setNotices] = useState<NoticeMessage[]>([]);

  const handleClick = (text: string) => {
    setActiveButton(text);
  };

  const getNoticeRequest = async () => {
    instanceAuth
      .get(uri)
      .then((response) => {
        if (response.data.code == 200) {
          setNotices(response.data.result);
        } else if (response.data.code == 1300) {
        }
      })
      .catch((error) => {});
  };

  useEffect(() => {
    if (activeButton == "전체") uri = "/notices/1";
    else if (activeButton == "이슈") uri = "/notices/issues/1";
    else uri = "/notices/projects/1";

    getNoticeRequest();
  }, [activeButton]);

  return (
    <div className="flex flex-col ml-[150px] mt-[100px]">
      <button className="flex flex-row" onClick={() => navigate(-1)}>
        <img src={arrow_left} />
        <div className="ml-5 text-primary-4 text-base font-suitM">이전으로 돌아가기</div>
      </button>
      <div className="flex flex-row ml-[250px] mt-[20px]">
        <div className="flex flex-col">
          <div className="text-black text-3xl font-suitB">내 알림함</div>
          <div className="mt-10 w-32 text-sm text-center font-suitM text-black bg-white border border-gray-200 rounded-lg">
            <button
              className={`block w-full px-4 py-2 bg-[#DDF1E9] border-b border-gray-200 rounded-t-lg cursor-pointer hover:bg-gray-100 ${
                activeButton === "전체" ? "bg-[#DDF1E9]" : "bg-[#FFFFFF]"
              }`}
              onClick={() => handleClick("전체")}
            >
              전체
            </button>
            <button
              className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 focus:outline-none focus:bg-[#DDF1E9]"
              onClick={() => handleClick("이슈")}
            >
              이슈
            </button>
            <button
              className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 focus:outline-none focus:bg-[#DDF1E9]"
              onClick={() => handleClick("프로젝트")}
            >
              프로젝트
            </button>
          </div>
        </div>
        <div className="ml-[50px] mt-[75px] w-[600px] bg-white rounded-xl shadow border border-gray-200">
          {notices.map((notice) => (
            <div className="pl-5 py-3 border-b border-gray-200 items-center gap-7 inline-flex">
              {notice.senderProfileImage ? (
                <img className="w-11 h-11 relative rounded-full" src={notice.senderProfileImage} />
              ) : (
                <img className="w-11 h-11 relative rounded-full" src={default_profile} />
              )}
              <div className="flex justify-start items-center gap-1.5">
                <div className="w-[430px] break-all text-[0.850rem] font-suitM">{notice.noticeContent}</div>
                <div className="w-24 text-right text-primary-4 text-xs font-suitL leading-none flex">{notice.noticeDate}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
