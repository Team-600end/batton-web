import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import changed_version_img from "@images/common/changed_version.svg";
import puzzle_img from "@images/puzzle.svg";

import PuzzleView from "@components/project/releases/PuzzleView";
import Puzzle from "@src/types/puzzle";

// Dummy data
const puzzles: Puzzle[] = [
  {
    version: "v1.0.0",
    index: 1,
  },
  {
    version: "v1.0.1",
    index: 2,
  },
  {
    version: "v1.0.1",
    index: 3,
  },
  {
    version: "v1.0.1",
    index: 4,
  },
  {
    version: "v1.0.0",
    index: 1,
  },
  {
    version: "v1.0.1",
    index: 2,
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
        <div className="relative flex ml-[20px]">
          {puzzles.map((puzzle, index) => (
            <PuzzleView key={index} version={puzzle.version} />
          ))}
        </div>
      </div>
    </>
  );
}
