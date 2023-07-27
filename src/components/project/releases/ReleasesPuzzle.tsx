import React, { useState, useCallback, useEffect } from "react";

import PuzzleView from "@components/project/releases/PuzzleView";
import { Puzzle } from "@src/types/Puzzle";

// Dummy data
const puzzles: Puzzle[] = [
  {
    versionChanged: "Major",
    version: "v1.0.0",
    content: {
      releaseDate: new Date("2021-09-01"),
      issues: [
        {
          type: "New",
          title: "이슈1 dlqsldkf;s",
        },
        {
          type: "Deprecated",
          title: "이슈2 djso일;냐ㅐㅇㄹ;",
        },
        {
          type: "Changed",
          title: "이슈3",
        },
      ],
    },
  },
  {
    versionChanged: "Minor",
    version: "v1.1.0",
    content: {
      releaseDate: new Date("2021-09-01"),
      issues: [
        {
          type: "New",
          title: "이슈1",
        },
        {
          type: "New",
          title: "이슈2",
        },
        {
          type: "Changed",
          title: "이슈3",
        },
      ],
    },
  },
];

export default function ReleasesPuzzle() {
  const [puzzle, setPuzzle] = useState<Puzzle[][]>([]);
  useEffect(() => {
    let puzzleState: Puzzle[][] = [];
    let temp: Puzzle[] = [];

    puzzles.forEach((currentPuzzle, idx) => {
      if ((currentPuzzle.versionChanged === "Major" && idx !== 0) || idx === puzzles.length - 1) {
        puzzleState.unshift(temp);
        temp = [];
      }
      temp.push(currentPuzzle);
    });

    setPuzzle(puzzleState);
  }, []);

  return (
    <>
      <div
        className="items-center justify-center ml-1"
        style={{
          width: "98%", // 컨테이너의 가로 크기
          height: "65%", // 컨테이너의 세로 크기
          overflowX: "auto", // 가로 스크롤 표시
          overflowY: "auto", // 세로 스크롤 표시
        }}
      >
        <div
          className="relative flex p-[15px]"
          style={{
            width: "auto", // 내용의 가로 크기 (가로 스크롤을 표시하기 위함)
            height: "auto", // 내용의 세로 크기 (세로 스크롤을 표시하기 위함)
          }}
        >
          <section>
            <table>
              <tbody>
                {puzzle.map((arrayPuzzle, rowIndex) => (
                  <tr key={rowIndex}>
                    {arrayPuzzle.map((element, colIndex) => (
                      <td>
                        <PuzzleView key={colIndex} versionChanged={element.versionChanged} version={element.version} content={element.content} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </>
  );
}
