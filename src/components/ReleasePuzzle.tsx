import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import changed_version_img from "../assets/images/changed_version.svg";
import puzzle_img from "../assets/images/puzzle.svg";
import Puzzle from "./Puzzle";

export default function ReleasePuzzle() {
  return (
    <>
      <div className="w-[600px] h-[322px] p-[10px] mx-[100px] my-[100px] shadow-[2px_6px_10px_-2px_rgba(0,0,0,0.3)] border-[0.3px] bg-white rounded-lg shadow dark:bg-gray-800 dark:hover:bg-gray-700">
        <div className=" flex items-center">
          <p className="p-3 mb-1 font-semibold">릴리즈 퍼즐</p>
          <img src={changed_version_img} alt="changed_version_img" className="p-2 mb-1 mt-1" />
        </div>
        <div className="relative flex ml-[20px]">
          <Puzzle />
          <Puzzle />
        </div>
      </div>
    </>
  );
}
