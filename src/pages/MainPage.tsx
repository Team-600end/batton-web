import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import type { CustomFlowbiteTheme } from "flowbite-react";
import { Carousel } from "flowbite-react";

import PjCard from "../components/PjCard";
import titleBox_img from "../assets/images/title_box.svg";
import left_control_img from "../assets/images/mainPage/left_control.svg";
import right_control_img from "../assets/images/mainPage/right_control.svg";
import chevorn_img from "../assets/images/common/chevron-down-outline.png";
import search_img from "../assets/images/common/search-outline.png";
import Navbar from "../components/Navbar";

export default function MainPage() {
  return (
    <>
      <div className="relative w-screen h-screen flex flex-col items-center justify-start overflow-hidden">
        <div className="h-10"></div>
        <div className="flex flex-row items-center justify-left w-full px-8 ml-40">
          <img className="mr-2" src={titleBox_img} />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mr-4">참여 중인 프로젝트</h1>

          <button
            type="button"
            className="focus:outline-none text-green-700 bg-white border border-green-500 hover:bg-green-100 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            + 새 프로젝트 생성
          </button>
        </div>
        <div className="flex flex-row items-center justify-center w-full h-[300px] px-10">
          {/* <Carousel theme={customCarouselTheme} leftControl={<img src={left_control_img} />} rightControl={<img src={right_control_img} />}>
            <div className="flex h-[300px] w-5/6 flex-row items-center justify-left">
              <PjCard />
              <PjCard />
              <PjCard />
            </div>
            <div className="flex h-[300px] w-5/6 flex-row items-center justify-left">
              <PjCard />
              <PjCard />
            </div>
          </Carousel> */}
          <Carousel theme={customCarouselTheme} leftControl={<img src={left_control_img} />} rightControl={<img src={right_control_img} />}>
            <div className="flex h-[300px] w-5/6 flex-row items-center justify-left">
              {Array.from({ length: Math.ceil(pjCards.length / 3) }).map((_, index) => (
                <div key={index} className="flex flex-row">
                  {pjCards.slice(index * 3, (index + 1) * 3).map((pjCard, cardIndex) => (
                    <PjCard key={cardIndex} />
                  ))}
                </div>
              ))}
            </div>
          </Carousel>
        </div>
        <div className="flex flex-row items-center justify-left w-full px-8 py-3 ml-40">
          <img className="mr-2" src={titleBox_img} />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mr-4">내 작업 이슈들</h1>
        </div>
        {/* table */}
        {/* <div className="items-center justify-center w-4/5 h-[300px] p-1"> */}
        <div className="relative w-4/5 h-[300px] shadow-[0px_3px_8px_-2px_rgba(0,0,0,0.3)] sm:rounded-lg">
          <div className="flex items-center justify-between p-2">
            <div>
              <button
                id="dropdownRadioButton"
                data-dropdown-toggle="dropdownRadio"
                className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                type="button"
              >
                전체
                <img className="w-2.5 h-2.5 ml-2.5" area-hidden="true" src={chevorn_img} />
              </button>

              {/* Dropdown menu */}
              <div
                id="dropdownRadio"
                className="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                data-popper-reference-hidden=""
                data-popper-escaped=""
                data-popper-placement="top"
                style={{ position: "absolute", inset: "auto auto 0px 0px", margin: "0px", transform: "translate3d(522.5px, 3847.5px, 0px)" }}
              >
                <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRadioButton">
                  <li>
                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                      <input
                        // checked="checked"
                        id="filter-radio-example-1"
                        type="radio"
                        value=""
                        name="filter-radio"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label htmlFor="filter-radio-example-1" className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">
                        전체
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* 검색창 */}
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <img className="w-5 h-5 text-gray-500 dark:text-gray-400" area-hidden="true" src={search_img} />
              </div>
              <input
                type="text"
                id="table-search"
                className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-[#4AA366] focus:border-[#4AA366] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="검색"
              />
            </div>
          </div>

          {/* 테이블 */}
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  프로젝트
                </th>
                <th scope="col" className="px-6 py-3">
                  이슈태그
                </th>
                <th scope="col" className="px-6 py-3">
                  이슈
                </th>
                <th scope="col" className="px-6 py-3">
                  최종 수정 날짜
                </th>
                <th scope="col" className="px-6 py-3">
                  상태
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Apple MacBook Pro 17"
                </th>
                <td className="px-6 py-4">Silver</td>
                <td className="px-6 py-4">Laptop</td>
                <td className="px-6 py-4">$2999</td>
                <td className="px-6 py-4">상태</td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Apple MacBook Pro 17"
                </th>
                <td className="px-6 py-4">Silver</td>
                <td className="px-6 py-4">Laptop</td>
                <td className="px-6 py-4">$2999</td>
                <td className="px-6 py-4">상태</td>
              </tr>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Apple MacBook Pro 17"
                </th>
                <td className="px-6 py-4">Silver</td>
                <td className="px-6 py-4">Laptop</td>
                <td className="px-6 py-4">$2999</td>
                <td className="px-6 py-4">상태</td>
              </tr>
              {/* ... */}
              {/* 나머지 테이블 내용 */}
              {/* ... */}
            </tbody>
          </table>

          <nav className="flex items-center justify-center p-2" aria-label="Table navigation">
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
      </div>
    </>
  );
}

const customCarouselTheme: CustomFlowbiteTheme["carousel"] = {
  root: {
    base: "relative h-[270px] w-full mx-4",
    leftControl: "absolute top-0 left-0 flex h-full items-center justify-center px-4 focus:outline-none",
    rightControl: "absolute top-0 right-0 flex h-full items-center justify-center px-4 focus:outline-none",
  },
  indicators: {
    active: {
      off: "bg-[#f3f4f6] hover:bg-white dark:bg-gray-800/50 dark:hover:bg-gray-800",
      on: "bg-[#d1d5db] dark:bg-gray-800",
    },
    base: "h-3 w-3 rounded-full",
    wrapper: "absolute -bottom-3 left-1/2 flex -translate-x-1/2 space-x-3",
  },
  item: {
    base: "absolute top-1/2 left-1/2 block w-full -translate-x-1/2 -translate-y-1/2",
    wrapper: "w-full flex-shrink-0 transform cursor-grab snap-center",
  },
  scrollContainer: {
    base: "flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-lg",
    snap: "snap-x",
  },
};
