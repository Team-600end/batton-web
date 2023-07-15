import React from "react";
import styled from "styled-components";

import puzzle_img from "../assets/images/puzzle.svg";

type PuzzleProps = {
  version: String;
};

export default function Puzzle(props: PuzzleProps) {
  return (
    <>
      <div className="relative w-[80px] h-[70px] -mx-[8.5px] dark:bg-gray-800 dark:hover:bg-gray-700">
        <img src={puzzle_img} alt="changed_version_img" className="w-full h-full object-cover" />
        <p className="absolute top-[22px] left-[18px] text-xs px-2 py-1">{props.version}</p>
      </div>
    </>
  );
}
