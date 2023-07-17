import React, { useState } from "react";
import arrow_left from "@assets/images/arrow_left.png";
import jindol from "@assets/images/jindol.jpg";
import { useNavigate } from 'react-router-dom';

interface NoticeS {
    contentId: number;
    noticeType: string;
    noticeContent: string;
    noticeDate: string;
    senderProfileImage: string;
}

const notices: NoticeS[] = [
    {
        contentId: 1,
        noticeType: "INVITE",
        noticeContent: "hidddddddddddddddddddddddddddddddddddddddddddddddd",
        noticeDate: "10분 전",
        senderProfileImage: jindol
    },
    {
        contentId: 2,
        noticeType: "NEW",
        noticeContent: "byedddddddddddddddddddddddddddddddddddddsddddddddddddddddddddddddddddddddddddddddddd",
        noticeDate: "20분 전",
        senderProfileImage: jindol
    },
    {
        contentId: 1,
        noticeType: "APPROVE",
        noticeContent: "agree",
        noticeDate: "1시간 전",
        senderProfileImage: jindol,
    },
    {
        contentId: 1,
        noticeType: "REVIEW",
        noticeContent: "review please..",
        noticeDate: "3일 전",
        senderProfileImage: jindol,
    }
]

export default function NoticeDetailPage() {
    const navigate = useNavigate();

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
                    {notices.map((notice) => (
                        <div className="pl-5 py-3 border-b border-gray-200 items-center gap-7 inline-flex">
                            <img className="w-11 h-11 relative rounded-full" src={notice.senderProfileImage} />
                            <div className="flex justify-start items-center gap-1.5">
                                <div className="w-[430px] text-[0.850rem] font-suitM">{notice.noticeContent}</div>
                                <div className="w-24 text-right text-primary-4 text-xs font-suitL leading-none flex">{notice.noticeDate}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}