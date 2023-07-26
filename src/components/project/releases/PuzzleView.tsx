import React from "react";
import styled from "styled-components";

import puzzleMajor from "@images/releasesPuzzle/puzzleMajor.svg";
import puzzleMinor from "@images/releasesPuzzle/puzzleMinor.svg";
import puzzlePatch from "@images/releasesPuzzle/puzzlePatch.svg";

type PuzzleProps = {
  versionChanged: String;
  version: String;
  style?: React.CSSProperties;
};

export default function PuzzleView(props: PuzzleProps) {
  let puzzleImage;
  let puzzleMarginClass;
  let puzzleStyle: React.CSSProperties = {};

  if (props.versionChanged === "Major") {
    puzzleImage = puzzleMajor;
    puzzleMarginClass = true;
    puzzleStyle.marginTop = "-8px";
  } else {
    puzzleMarginClass = false;
    puzzleStyle.marginLeft = "-8px";
    if (props.versionChanged === "Minor") {
      puzzleImage = puzzleMinor;
    } else if (props.versionChanged === "Patch") {
      puzzleImage = puzzlePatch;
    }
  }

  return (
    <>
      {/* <div className={"relative w-[80px] h-[70px] dark:bg-gray-800 dark:hover:bg-gray-700" + (puzzleMarginClass ? "-my-[8.8px]" : "-mx-[18.8px]")}> */}

      <div className={`relative w-[80px] h-[70px] ${puzzleMarginClass ? "-ml-[4px]" : "-mb-[px]"} dark:bg-gray-800 dark:hover:bg-gray-700`} style={puzzleStyle}>
        <img src={puzzleImage} alt="changed_version_img" className="w-full h-full object-cover" />
        <p className="absolute top-[25px] left-[18px] text-xs px-2 py-1">{props.version}</p>
      </div>
    </>
  );
}
