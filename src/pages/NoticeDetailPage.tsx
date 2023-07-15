import React, { useState } from "react";
import arrow_left from "@assets/images/arrow_left.png";
import jindol from "@assets/images/jindol.jpg";

export default function NoticeDetailPage() {
    return (
        <div className="flex flex-col ml-40 my-10">
                <div className="flex flex-row">
                <img src={arrow_left} />
                <div className="ml-5 text-primary-4 text-base font-suitM">이전으로 돌아가기</div>
            </div>
              <div className="flex flex-row ml-52">
                <div className="flex flex-col">
                    <div className="text-black text-3xl font-suitB">내 알림함</div>
                    <div className="mt-10 w-32 text-sm text-center font-suitM text-black bg-white border border-gray-200 rounded-lg">
                        <a href="#" aria-current="true" className="block w-full px-4 py-2 bg-[#DDF1E9] border-b border-gray-200 rounded-t-lg cursor-pointer">
                            전체
                        </a>
                        <a href="#" className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 focus:outline-none focus:bg-[#DDF1E9]">
                            이슈
                        </a>
                        <a href="#" className="block w-full px-4 py-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 focus:outline-none focus:bg-[#DDF1E9]">
                            프로젝트
                        </a>
                    </div>
                </div>
                <div className="ml-[50px] mt-[75px] w-[600px] bg-white rounded-xl shadow border border-gray-200">
                    <div className="h-16 pl-5 pr-8 py-3 border-b border-gray-200 justify-start items-center gap-7 inline-flex">
                        <img className="w-11 h-11 relative rounded-full" src={jindol} />
                        <div className="flex justify-start items-center gap-1.5 flex">
                            <div className="w-96 text-[0.850rem] font-suitM">@이서현 님이 이슈를 끝냈습니다. @임혜균 님 이제 다음이슈를 바톤터치받아 진행해 주세요!</div>
                            <div className="w-24 text-right text-primary-4 text-xs font-suitL leading-none flex items-center">10 minutes ago</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}