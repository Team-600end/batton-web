import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import PuzzleView from "@components/project/releases/PuzzleView";
import { Release } from "@src/types/Release";
import { instanceAuth } from "@src/types/AxiosInterface";
import { useRecoilState } from "recoil";
import { projectNavs } from "@src/state/projectState";
import { ProjectNav } from "@src/types/project";

export default function ReleasesPuzzle() {
  const [puzzle, setPuzzle] = useState<Release[][]>([]);
  const [releasesList, setReleasesList] = useState<Release[]>([]);
  const reverseList = [...releasesList].reverse();

  const [projectNav, setProjectNav] = useRecoilState(projectNavs);
  let { projectKey } = useParams();
  const pj = projectNav.find((element: ProjectNav) => element.projectKey.toString() == projectKey);

  useEffect(() => {
    // async () => {
    instanceAuth
      .get(`/releases/project/${pj.projectId}`)
      .then((response) => {
        console.log(response.data);
        if (response.data.code == 200) {
          setReleasesList(response.data.data);
        } else if (response.data.code == 710) {
          //TODO: 에러코드 확인 필요
          alert("릴리즈가 없습니다.");
          setReleasesList([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // };
  }, []);

  useEffect(() => {
    let puzzleState: Release[][] = [];
    let temp: Release[] = [];

    reverseList.forEach((release, idx) => {
      if ((release.versionChanged === "Major" && idx !== 0) || idx === reverseList.length - 1) {
        puzzleState.unshift(temp);
        temp = [];
      }
      temp.push(release);
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
            minHeight: "200px",
          }}
        >
          <section>
            <table>
              <tbody>
                {puzzle.map((arrayPuzzle, rowIndex) => (
                  <tr key={rowIndex}>
                    {arrayPuzzle.map((element, colIndex) => (
                      <td>
                        <PuzzleView key={colIndex} release={element} />
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
