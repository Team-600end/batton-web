import React, { useState, useCallback, useEffect } from "react";
import IssueBadge from "@components/project/issue/IssueBadge";
import { Puzzle } from "@typess/Release";

type PuzzleHoverProps = {
  puzzle: Puzzle;
}

export default function PuzzleHoverItem(props: PuzzleHoverProps) {
  // const year = content.releaseDate.getFullYear();
  // const month = content.releaseDate.getMonth() + 1; // Add 1 because months are 0-indexed
  // const day = content.releaseDate.getDate();

  // const formattedDate = `${year}년 ${month}월 ${day}일`;
  const formattedDate = props.puzzle.date;

  return (
    <>
      <div
        className="bg-white border-none rounded-xl shadow-xl opacity-80 mx-[20px] my-[-20px] w-min p-1 items-center justify-center"
        style={{ position: "relative", zIndex: 1 }}
      >
        <p className="text-center">v.{props.puzzle.versionMajor}.{props.puzzle.versionMinor}.{props.puzzle.versionPatch}</p>
        <p className="text-center text-xs">{formattedDate}</p>
        {props.puzzle.issueList.map((issue, index) => (
          <div key={index} className="flex flex-row w-auto my-1">
            <div className="w-[100px] flex justify-center items-center">
              <IssueBadge issueType={issue.type} />
            </div>
            <p className="text-xs ml-1 mr-2 whitespace-nowrap overflow-hidden overflow-ellipsis">{issue.title}</p>
          </div>
        ))}
      </div>
    </>
  );
}
