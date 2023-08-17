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
        <p className="text-center font-suitB">
          v.{props.puzzle.versionMajor}.{props.puzzle.versionMinor}.
          {props.puzzle.versionPatch}
        </p>
        <p className="text-center text-xs font-suitL w-[10vw] mx-auto">{formattedDate}</p>
        <div className="space-y-2 mt-2 mb-1">
          {props.puzzle.issueList.map((issue, index) => (
            <div key={index} className="flex flex-row w-auto items-center pl-3 pr-1">
              <div className="w-[100px] flex justify-start items-center">
                <IssueBadge issueType={issue.issueTag} />
              </div>
              <p className="font-suitM text-xs ml-1 mr-2 whitespace-nowrap overflow-hidden overflow-ellipsis break-keep">
                {issue.issueTitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
