import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import PuzzleView from "@components/project/releases/PuzzleView";
import { Release } from "@src/types/Release";
import { instanceAuth } from "@src/types/AxiosInterface";
import { useRecoilState } from "recoil";
import { projectNavs } from "@src/state/projectState";
import { ProjectNav } from "@src/types/project";

// type ReleasesPuzzleProps = {
//   releaseList: Release[];
// };

// export default function ReleasesPuzzle(props: ReleasesPuzzleProps) {
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
        } else if (response.data.code == 404) {
          //TODO: 에러코드 확인 필요
          alert("존재하지 않는 프로젝트입니다.");
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

// const releasesList: Release[] = [
//   {
//     versionChanged: "Major",
//     versionMajor: 3,
//     versionMinor: 0,
//     versionPatch: 1,
//     date: "2023.07.28",
//     issueList: [
//       {
//         type: "NEW",
//         title: "설문조사 배포 추가",
//       },
//       {
//         type: "FEATURE",
//         title: "설문조사 완료 기능",
//       },
//     ],
//     id: 5,
//   },
//   {
//     versionChanged: "Major",
//     versionMajor: 2,
//     versionMinor: 0,
//     versionPatch: 1,
//     date: "2023.07.27",
//     issueList: [
//       {
//         type: "FIXED",
//         title: "설문조사 삭제 이슈",
//       },
//     ],
//     id: 4,
//   },
//   {
//     versionChanged: "Patch",
//     versionMajor: 1,
//     versionMinor: 1,
//     versionPatch: 2,
//     date: "2023.07.18",
//     issueList: [
//       {
//         type: "DEPRECATED",
//         title: "리뷰식 이미지 설문조사 기능 철회",
//       },
//     ],
//     id: 3,
//   },
//   {
//     versionChanged: "Minor",
//     versionMajor: 1,
//     versionMinor: 1,
//     versionPatch: 1,
//     date: "2023.07.18",
//     issueList: [
//       {
//         type: "FIXED",
//         title: "설문조사 작성 버그 수정",
//       },
//       {
//         type: "CHANGED",
//         title: "설문조사 등록 기능 변경",
//       },
//     ],
//     id: 2,
//   },
//   {
//     versionChanged: "Major",
//     versionMajor: 1,
//     versionMinor: 0,
//     versionPatch: 1,
//     date: "2023.07.02",
//     issueList: [
//       {
//         type: "NEW",
//         title: "600& 프로젝트 출시",
//       },
//     ],
//     id: 1,
//   },
// ];

// import React, { useState, useCallback, useEffect } from "react";

// import PuzzleView from "@components/project/releases/PuzzleView";
// import { Release } from "@src/types/Release";

// type ReleasesPuzzleProps = {
//   releaseList: Release[];
// };

// export default function ReleasesPuzzle(props: ReleasesPuzzleProps) {
//   const [puzzle, setPuzzle] = useState<Release[][]>([]);
//   const reverseList = [...releasesList].reverse();

//   useEffect(() => {
//     let puzzleState: Release[][] = [];
//     let temp: Release[] = [];

//     props.releaseList.forEach((release, idx) => {
//       if ((release.versionChanged === "Major" && idx !== 0) || idx === props.releaseList.length - 1) {
//         puzzleState.unshift(temp);
//         temp = [];
//       }
//       temp.push(release);
//     });

//     setPuzzle(puzzleState);
//   }, []);

//   return (
//     <>
//       <div
//         className="items-center justify-center ml-1"
//         style={{
//           width: "98%", // 컨테이너의 가로 크기
//           height: "65%", // 컨테이너의 세로 크기
//           overflowX: "auto", // 가로 스크롤 표시
//           overflowY: "auto", // 세로 스크롤 표시
//         }}
//       >
//         <div
//           className="relative flex p-[15px]"
//           style={{
//             width: "auto", // 내용의 가로 크기 (가로 스크롤을 표시하기 위함)
//             height: "auto", // 내용의 세로 크기 (세로 스크롤을 표시하기 위함)
//             minHeight: "200px",
//           }}
//         >
//           <section>
//             <table>
//               <tbody>
//                 {puzzle.map((arrayPuzzle, rowIndex) => (
//                   <tr key={rowIndex}>
//                     {arrayPuzzle.map((element, colIndex) => (
//                       <td>
//                         <PuzzleView key={colIndex} release={element} />
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </section>
//         </div>
//       </div>
//     </>
//   );
// }

// const releasesList: Release[] = [
//   {
//     versionChanged: "Major",
//     versionMajor: 3,
//     versionMinor: 0,
//     versionPatch: 1,
//     date: "2023.07.28",
//     issueList: [
//       {
//         type: "NEW",
//         title: "설문조사 배포 추가",
//       },
//       {
//         type: "FEATURE",
//         title: "설문조사 완료 기능",
//       },
//     ],
//     id: 5,
//   },
//   {
//     versionChanged: "Major",
//     versionMajor: 2,
//     versionMinor: 0,
//     versionPatch: 1,
//     date: "2023.07.27",
//     issueList: [
//       {
//         type: "FIXED",
//         title: "설문조사 삭제 이슈",
//       },
//     ],
//     id: 4,
//   },
//   {
//     versionChanged: "Patch",
//     versionMajor: 1,
//     versionMinor: 1,
//     versionPatch: 2,
//     date: "2023.07.18",
//     issueList: [
//       {
//         type: "DEPRECATED",
//         title: "리뷰식 이미지 설문조사 기능 철회",
//       },
//     ],
//     id: 3,
//   },
//   {
//     versionChanged: "Minor",
//     versionMajor: 1,
//     versionMinor: 1,
//     versionPatch: 1,
//     date: "2023.07.18",
//     issueList: [
//       {
//         type: "FIXED",
//         title: "설문조사 작성 버그 수정",
//       },
//       {
//         type: "CHANGED",
//         title: "설문조사 등록 기능 변경",
//       },
//     ],
//     id: 2,
//   },
//   {
//     versionChanged: "Major",
//     versionMajor: 1,
//     versionMinor: 0,
//     versionPatch: 1,
//     date: "2023.07.02",
//     issueList: [
//       {
//         type: "NEW",
//         title: "600& 프로젝트 출시",
//       },
//     ],
//     id: 1,
//   },
// ];
