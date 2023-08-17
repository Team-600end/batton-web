import React, { useState, useCallback, useEffect } from "react";
import IssueBadge from "@components/project/issue/IssueBadge";
import { Puzzle } from "@typess/Release";

type PuzzleHoverProps = {
  puzzle: Puzzle;
};

export default function PuzzleHoverItem(props: PuzzleHoverProps) {
  const formattedDate = props.puzzle.createdDate;

  return (
    <>
      <div
        className="bg-white border-none rounded-xl shadow-xl opacity-80 mx-[20px] my-[-20px] w-min p-1 items-center justify-center"
        style={{ position: "relative", zIndex: 1 }}
      >
        <p className="text-center">
          v.{props.puzzle.versionMajor}.{props.puzzle.versionMinor}.{props.puzzle.versionPatch}
        </p>
        <p className="text-center text-xs">{formattedDate}</p>
        {props.puzzle.issueList.map((issue, index) => (
          <div key={index} className="flex flex-row w-auto my-1">
            <div className="w-[100px] flex justify-center items-center">
              <IssueBadge issueType={issue.issueTag} />
            </div>
            <p className="text-xs ml-1 mr-2 whitespace-nowrap overflow-hidden overflow-ellipsis">{issue.issueTitle}</p>
          </div>
        ))}
      </div>
    </>
  );
}
