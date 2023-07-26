import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import changed_version_img from "@images/common/changed_version.svg";

import PuzzleView from "@components/project/releases/PuzzleView";
import { Puzzle } from "@src/types/Puzzle";

// Dummy data
const puzzles: Puzzle[] = [
  {
    versionChanged: "Major",
    version: "v1.0.0",
    content: { title: "퍼즐1" },
  },
  {
    versionChanged: "Minor",
    version: "v1.1.0",
    content: { title: "퍼즐2" },
  },
  {
    versionChanged: "Patch",
    version: "v1.1.1",
    content: { title: "퍼즐3" },
  },
  {
    versionChanged: "Patch",
    version: "v1.1.2",
    content: { title: "퍼즐3" },
  },
  {
    versionChanged: "Patch",
    version: "v1.1.3",
    content: { title: "퍼즐3" },
  },
  {
    versionChanged: "Major",
    version: "v2.0.0",
    content: { title: "퍼즐3" },
  },
  {
    versionChanged: "Major",
    version: "v3.0.0",
    content: { title: "퍼즐3" },
  },
  {
    versionChanged: "Minor",
    version: "v1.1.0",
    content: { title: "퍼즐2" },
  },
  {
    versionChanged: "Patch",
    version: "v1.1.1",
    content: { title: "퍼즐3" },
  },
];

export default function ReleasesPuzzle() {
  return (
    <>
      <div className="w-[690px] h-[320px] relative bg-white rounded-xl shadow-md">
        <p className="pt-[20px] ml-[20px] text-black text-base font-suitB">릴리즈 퍼즐</p>
        {/* <div className="w-[600px] h-[322px] p-[10px] shadow-[2px_6px_10px_-2px_rgba(0,0,0,0.3)] border-[0.3px] bg-white rounded-lg shadow dark:bg-gray-800 dark:hover:bg-gray-700"> */}
        <div className=" flex items-center">
          <img src={changed_version_img} alt="changed_version_img" className="p-2 mb-1 mt-1" />
        </div>
        <div
          style={{
            // width: "300px", // 컨테이너의 가로 크기
            // height: "200px", // 컨테이너의 세로 크기
            overflowX: "auto", // 가로 스크롤 표시
            overflowY: "auto", // 세로 스크롤 표시
          }}
        >
          <div
            style={
              {
                // width: "800", // 내용의 가로 크기 (가로 스크롤을 표시하기 위함)
                // height: "500px", // 내용의 세로 크기 (세로 스크롤을 표시하기 위함)
              }
            }
          >
            <div className="absolute flex ml-[20px]">
              {puzzles.map((puzzle, index) => (
                <PuzzleView key={index} versionChanged={puzzle.versionChanged} version={puzzle.version} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
