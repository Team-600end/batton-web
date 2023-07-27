import React, { useState, useCallback, useEffect } from "react";
import { AbsIssue } from "@src/types/Issue";
import IssueBadge from "../issue/IssueBadge";

type PuzzleItemProps = {
  version: string;
  content: {
    releaseDate: Date;
    // title: string; //title은 없음
    issues: AbsIssue[];
  };
};

export default function PuzzleHoverItem({ version, content }: PuzzleItemProps) {
  const year = content.releaseDate.getFullYear();
  const month = content.releaseDate.getMonth() + 1; // Add 1 because months are 0-indexed
  const day = content.releaseDate.getDate();

  const formattedDate = `${year}년 ${month}월 ${day}일`;

  return (
    <>
      <div
        className="bg-white border-none rounded-xl shadow-xl opacity-80 mx-[20px] my-[-20px] w-min p-1 items-center justify-center"
        style={{ position: "relative", zIndex: 1 }}
      >
        <p className="text-center">{version}</p>
        <p className="text-center text-xs">{formattedDate}</p>
        {content.issues.map((issue, index) => (
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
