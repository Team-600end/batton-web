import React, { useState } from "react";
import jindol from "../assets/images/jindol.jpg";
import eye from "../assets/images/eye.png";

function Notice() {
    return (
        <div className="flex justify-end sticky top-0">
            <div id="dropdownNotification" className="z-20 w-full max-w-sm bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-800" aria-labelledby="dropdownNotificationButton">
                <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-50 dark:bg-gray-800">
                    알림
                </div>
                <div className="mb-4 border-b border-gray-700">
                    <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="myTab" data-tabs-toggle="#myTabContent" role="tablist">
                        <li className="ml-14" role="presentation">
                            <button className="inline-block p-4 border-b-2 rounded-t-lg" id="total" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">전체</button>
                        </li>
                        <li className="ml-9" role="presentation">
                            <button className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300" id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false">이슈</button>
                        </li>
                        <li className="ml-9" role="presentation">
                            <button className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300" id="settings-tab" data-tabs-target="#settings" type="button" role="tab" aria-controls="settings" aria-selected="false">프로젝트</button>
                        </li>
                    </ul>
                </div>
                <div className="divide-y divide-gray-100">
                    <a href="#" className="flex px-4 py-3 hover:bg-gray-100">
                        <div className="flex-shrink-0">
                            <img className="rounded-full w-11 h-11" src={jindol} alt="Jese image" />
                        </div>
                        <div className="w-full pl-3">
                            <div className="text-gray-500 text-sm mb-1.5"><span className="font-semibold text-gray-900">@이서현</span>님이 이슈를 끝냈습니다. <span className="font-semibold text-gray-900">@임혜균</span>님 이제 다음 이슈를 바톤 터치 받아 진행해주세요!</div>
                            <div className="text-green-500 text-xs">10분 전</div>
                        </div>
                    </a>
                    <a href="#" className="flex px-4 py-3 hover:bg-gray-100">
                        <div className="flex-shrink-0">
                            <img className="rounded-full w-11 h-11" src={jindol} alt="Jese image" />
                        </div>
                        <div className="w-full pl-3">
                            <div className="text-gray-500 text-sm mb-1.5"><span className="font-semibold text-gray-900">@이서현</span>님이 이슈를 끝냈습니다. <span className="font-semibold text-gray-900">@임혜균</span>님 이제 다음 이슈를 바톤 터치 받아 진행해주세요!</div>
                            <div className="text-green-500 text-xs">10분 전</div>
                        </div>
                    </a>
                    <a href="#" className="flex px-4 py-3 hover:bg-gray-100">
                        <div className="flex-shrink-0">
                            <img className="rounded-full w-11 h-11" src={jindol} alt="Jese image" />
                        </div>
                        <div className="w-full pl-3">
                            <div className="text-gray-500 text-sm mb-1.5"><span className="font-semibold text-gray-900">@이서현</span>님이 이슈를 끝냈습니다. <span className="font-semibold text-gray-900">@임혜균</span>님 이제 다음 이슈를 바톤 터치 받아 진행해주세요!</div>
                            <div className="text-green-500 text-xs">44분 전</div>
                        </div>
                    </a>
                    <a href="#" className="flex px-4 py-3 hover:bg-gray-100">
                        <div className="flex-shrink-0">
                            <img className="rounded-full w-11 h-11" src={jindol} alt="Jese image" />
                        </div>
                        <div className="w-full pl-3">
                            <div className="text-gray-500 text-sm mb-1.5"><span className="font-semibold text-gray-900">@이서현</span>님이 이슈를 끝냈습니다. <span className="font-semibold text-gray-900">@임혜균</span>님 이제 다음 이슈를 바톤 터치 받아 진행해주세요!</div>
                            <div className="text-green-500 text-xs">3시간 전</div>
                        </div>
                    </a>
                </div>
                <a href="#" className="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-50 hover:bg-gray-100">
                    <div className="inline-flex items-center ">
                        <svg className="w-4 h-4 mr-2 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                            <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                        </svg>
                        전체 보기
                    </div>
                </a>
            </div>
        </div>
    );
}

export default Notice;