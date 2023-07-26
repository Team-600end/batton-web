import React, { useState } from "react";
import styled from "styled-components";

import puzzleMajor from "@images/releasesPuzzle/puzzleMajor1.svg";
import puzzleMinor from "@images/releasesPuzzle/puzzleMinor.svg";
import puzzlePatch from "@images/releasesPuzzle/puzzlePatch.svg";
import PuzzleHoverItem from "./PuzzleHoverItem";
import { AbsIssue } from "@src/types/Issue";

type PuzzleProps = {
  versionChanged: string;
  version: string;
  content: {
    releaseDate: Date;
    // title: string;
    issues: AbsIssue[];
  };
};

export default function PuzzleView(props: PuzzleProps) {
  const [isHovered, setIsHovered] = useState(false);
  let puzzleImage;

  if (props.versionChanged === "Major") {
    puzzleImage = puzzleMajor;
  } else if (props.versionChanged === "Minor") {
    puzzleImage = puzzleMinor;
  } else if (props.versionChanged === "Patch") {
    puzzleImage = puzzlePatch;
  }
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`relative w-[80px] h-[70px] mx-[-10px] my-[-13.4px] dark:bg-gray-800 dark:hover:bg-gray-700`}
        style={{ cursor: "pointer" }}
      >
        <img src={puzzleImage} alt="changed_version_img" className="w-full h-full object-cover" />
        <p className="absolute top-[25px] left-[18px] text-xs px-2 py-1" style={{ cursor: "pointer" }}>
          {props.version}
        </p>
        {isHovered && <PuzzleHoverItem version={props.version} content={props.content} />}
      </div>
    </>
  );
}
