import React, { useState } from "react";

import puzzle_major from "@images/releasesPuzzle/puzzle_major1.svg";
import puzzle_minor from "@images/releasesPuzzle/puzzle_minor.svg";
import puzzle_patch from "@images/releasesPuzzle/puzzle_patch.svg";
import PuzzleHoverItem from "./PuzzleHoverItem";
import { Release } from "@src/types/Release";

type PuzzleViewProps = {
  release: Release;
};

export default function PuzzleView(props: PuzzleViewProps) {
  const [isHovered, setIsHovered] = useState(false);
  let puzzleImage;

  if (props.release.versionChanged === "Major") {
    puzzleImage = puzzle_major;
  } else if (props.release.versionChanged === "Minor") {
    puzzleImage = puzzle_minor;
  } else if (props.release.versionChanged === "Patch") {
    puzzleImage = puzzle_patch;
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
        className={`relative w-[80px] h-[70px] mx-[-10px] my-[-13px] dark:bg-gray-800 dark:hover:bg-gray-700`}
        style={{ cursor: "pointer" }}
      >
        <img src={puzzleImage} alt="changed_version_img" className="w-full h-full object-cover" />
        <p className="absolute top-[25px] left-[18px] text-xs px-2 py-1" style={{ cursor: "pointer" }}>
          {props.release.versionMajor}{props.release.versionMinor}{props.release.versionPatch}
        </p>
        {isHovered && <PuzzleHoverItem puzzle={props.release} />}
      </div>
    </>
  );
}
