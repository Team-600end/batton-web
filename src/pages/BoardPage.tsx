import React, { useState, useCallback } from "react";
import IssueBadge from "../components/IssueBadge";

export default function BoardPage() {
    return (
            <div className="flex flex-col items-center mx-[200px] my-[100px] shadow-[2px_6px_10px_-2px_rgba(0,0,0,0.3)] border-[0.3px] bg-white rounded-lg shadow mx-2">
                {/* 테이블 */}
                <table className="w-full text-smtext-left text-gray-500">
                    <thead className="text-center font-suitL text-xs text-white uppercase bg-[#285F43]">
                        <tr>
                            <th scope="col" className="py-3">
                                프로젝트
                            </th>
                            <th scope="col" className="py-3">
                                버전
                            </th>
                            <th scope="col" className="py-3">
                                이슈 태그
                            </th>
                            <th scope="col" className="py-3">
                                최종 수정 날짜
                            </th>
                            <th scope="col" className="py-3">
                                작성자
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="text-center bg-white font-suitM border-b hover:bg-gray-50">
                            <th scope="row" className="py-4">
                                600&
                            </th>
                            <td className="py-4">v1.0.1</td>
                            <td className="py-4">
                                <IssueBadge issueType="New"/>
                                <IssueBadge issueType="Feature"/>
                                <IssueBadge issueType="Changed"/></td>
                            <td className="py-4">2023.07.10</td>
                            <td className="py-4">harry</td>
                        </tr>
                        <tr className="text-center bg-white font-suitM border-b hover:bg-gray-50">
                            <th scope="row" className="py-4">
                                밴드의 시대
                            </th>
                            <td className="py-4">v1.0.1</td>
                            <td className="py-4">
                                <IssueBadge issueType="Feature"/>
                            </td>
                            <td className="py-4">2023.07.10</td>
                            <td className="py-4">harry</td>
                        </tr>
                        <tr className="text-center bg-white font-suitM border-b hover:bg-gray-50">
                            <th scope="row" className="py-4">
                                Survein
                            </th>
                            <td className="py-4">v1.0.1</td>
                            <td className="py-4">
                                <IssueBadge issueType="Deprecated"/>
                                <IssueBadge issueType="Deprecated"/>
                                <IssueBadge issueType="Deprecated"/>
                                <IssueBadge issueType="Deprecated"/>
                            </td>
                            <td className="py-4">2023.07.10</td>
                            <td className="py-4">harry</td>
                        </tr>
                        {/* ... */}
                        {/* 나머지 테이블 내용 */}
                        {/* ... */}
                    </tbody>
                </table>

                <nav className="flex items-center font-suitM justify-center p-2" aria-label="Table navigation">
                    <ul className="flex items-center justify-center -space-x-px text-sm h-8">
                        <li>
                            <a
                                href="#"
                                className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                {"<"}
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                1
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                2
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                aria-current="page"
                                className="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                            >
                                3
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            >
                                {">"}
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
    );
}