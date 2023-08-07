import React, { useEffect, useState } from "react";
import ProjectNavbar from "@components/nav/ProjectNavbar";
import plus_img from "@assets/images/icons/plus.svg";
import { Issue, IssueStatus } from "@typess/Issue";
import IssueCard from "@components/project/issue/IssueCard";
import MilestoneNavbar from "@components/nav/MilestoneNavbar";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useNavigate, useParams } from "react-router-dom";
import CreateIssueModal from "@components/project/issue/CreateIssueModal";

import { instanceAuth } from "@src/types/AxiosInterface";
import { useRecoilState } from "recoil";
import { projectNavs } from "@src/state/projectState";
import { ProjectNav } from "@src/types/project";

const todoIssues: Issue[] = [
  // {
  //   issueTag: "NEW",
  //   issueTitle: "리뷰 전용 설문조사 서비스",
  //   issueId: 9,
  //   issueKey: 9,

  // },
  // {
  //   issueTag: "NEW",
  //   issueTitle: "리뷰 전용 설문조사 서비스",
  //   issueId: 8,
  //   issueKey: 8,
  // },
];

const progressIssues: Issue[] = [
  // {
  //   issueTag: "NEW",
  //   issueTitle: "리뷰 전용 설문조사 서비스",
  //   issueId: 7,
  //   issueKey: 7,
  // },
  // {
  //   issueTag: "NEW",
  //   issueTitle: "리뷰 전용 설문조사 서비스",
  //   issueId: 6,
  //   issueKey: 6,
  // },
];

const reviewIssues: Issue[] = [
  // {
  //   issueTag: "NEW",
  //   issueTitle: "리뷰 전용 설문조사 서비스",
  //   issueId: 4,
  //   issueKey: 4,
  // },
  // {
  //   issueTag: "NEW",
  //   issueTitle: "리뷰 전용 설문조사 서비스",
  //   issueId: 3,
  //   issueKey: 3,
  // },
];

const doneIssues: Issue[] = [
  // {
  //   type: "CHANGED",
  //   title: "일반 설문조사 종류 변경",
  //   manager: { name: "강창훈", profileImg: avatar_kch },
  //   team: "600&",
  //   id: 1,
  // },
  // {
  //   type: "NEW",
  //   title: "설문조사 GPS 배포 기능",
  //   team: "600&",
  //   manager: { name: "임혜균", profileImg: avatar_yhg },
  //   id: 3,
  // },
  // {
  //   type: "NEW",
  //   title: "중복 배포 이슈",
  //   manager: { name: "이서현", profileImg: avatar_lsh },
  //   team: "600&",
  //   id: 2,
  // }
];

// const checkIssueList = (locationId: string) => {
//   switch (locationId) {
//     case "TODO":
//       return todoIssues;
//     case "PROGRESS":
//       return progressIssues;
//     case "REVIEW":
//       return reviewIssues;
//     case "DONE":
//       return doneIssues;
//   }
// };

export default function IssueBoardPage() {
  // TODO 이슈 리스트 상태관리
  const [todoIssues, setTodoIssues] = useState<Issue[]>([]);
  // PROGRESS 이슈 리스트 상태관리
  const [progressIssues, setProgressIssues] = useState<Issue[]>([]);
  // REVIEW 이슈 리스트 상태관리
  const [reviewIssues, setReviewIssues] = useState<Issue[]>([]);
  // DONE 이슈 리스트 상태관리
  const [doneIssues, setDoneIssues] = useState<Issue[]>([]);

  const checkIssueList = (locationId: string) => {
    switch (locationId) {
      case "TODO":
        return todoIssues;
      case "PROGRESS":
        return progressIssues;
      case "REVIEW":
        return reviewIssues;
      case "DONE":
        return doneIssues;
    }
  };

  // router-dom
  const { projectKey } = useParams();
  const navigate = useNavigate();

  // Project Recoil
  const [projectNav, setProjectNav] = useRecoilState(projectNavs);
  const pj = projectNav.find(
    (element: ProjectNav) => element.projectKey.toString() == projectKey
  );

  //request
  type IssueCase = "SPECIFIC" | "COMMON";

  useEffect(() => {
    patchIssueBoard();
  }, []);

  const patchIssueBoard = async () => {
    instanceAuth
      .get(`/issues/board/list/${pj.projectId}`)
      .then((response) => {
        if (response.data.code == 200) {
          setTodoIssues((response.data.result.todoList as Issue[]) ?? []);
          setProgressIssues(
            (response.data.result.progressList as Issue[]) ?? []
          );
          setReviewIssues((response.data.result.reviewList as Issue[]) ?? []);
          setDoneIssues((response.data.result.doneList as Issue[]) ?? []);
        } else {
          console.log("response after error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDragEnd = async ({ source, destination }: DropResult) => {
    // 유효하지 않는 곳으로 drag시 이벤트를 종료한다.
    if (!destination) return;

    const sourceList = [...checkIssueList(source.droppableId)];
    const destinationList = [...checkIssueList(destination.droppableId)];
    const sourceIndex = source.index;
    const destinationIndex = destination.index;
    const issueId = sourceList[sourceIndex].issueId;

    const afterStatus = destination.droppableId as IssueStatus;
    const seqNum = destinationIndex;
    let issueCase: IssueCase;

    if (source.droppableId !== destination.droppableId) {
      // 드래그한 요소의 droppableId와 드롭 대상의 droppableId가 다른 경우
      issueCase = "COMMON" as IssueCase;
      const sourceItem = sourceList![sourceIndex];
      sourceList!.splice(sourceIndex, 1);
      destinationList!.splice(destinationIndex, 0, sourceItem);
    } else {
      // 드래그한 요소의 droppableId와 드롭 대상의 droppableId가 동일한 경우
      if (sourceIndex !== destinationIndex) {
        sourceIndex < destinationIndex ? (issueCase = "SPECIFIC") : (issueCase = "COMMON");
        // issueCase = "SPECIFIC" as IssueCase;
        const sourceItem = sourceList![sourceIndex];
        sourceList!.splice(sourceIndex, 1); // 원래 위치에서 제거
        sourceList!.splice(destinationIndex, 0, sourceItem); // 새로운 위치에 삽입
      } else return;
    }

    const modifyIssueBoardBody = {
      afterStatus,
      seqNum,
      issueCase,
    };

    try {
      const response = await instanceAuth.patch(`/issues/board/status/${issueId}`, modifyIssueBoardBody);
      console.log("issudId: " + issueId); //TODO: 해결 후 삭제
      console.log(modifyIssueBoardBody); //TODO: 해결 후 삭제

      if (response.data.code === 200) {
        await patchIssueBoard();
      } else {
        console.log("잘못된 접근입니다.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [showModal, setShowModal] = useState(false);
  const handleOnClose = () => {
    patchIssueBoard();
    setShowModal(false);
  };

  return (
    <div className="flex flex-col overflow-hidden">
      <MilestoneNavbar />
      <ProjectNavbar />
      <div>
        <div className="bg-gray-100 rounded-t-lg border border-gray-300 w-[90vw] m-auto mt-[2vh] flex flex-col shadow-inner h-screen">
          <div className="flex justify-end mr-[2.5vw] mt-[2vw] space-x-2">
            <button
              onClick={() => navigate(`/project/${projectKey}/issue-history`)}
              className="rounded-md bg-white text-primary-4 p-4 border border-primary-4 flex py-[0.8vh] px-[1vw] items-center font-suitM text-[1vw] hover:bg-primary-5"
            >
              히스토리
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="rounded-md bg-white text-primary-4 p-4 border border-primary-4 flex py-[0.8vh] px-[1vw] items-center hover:bg-primary-5 font-suitM text-[1vw]"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-[0.3vw]"
              >
                <path d="M5.66667 5.99967H1H5.66667Z" fill="#5AAE8A" />
                <path
                  d="M5.66667 1.33301V5.99967M5.66667 5.99967V10.6663M5.66667 5.99967H10.3333M5.66667 5.99967H1"
                  stroke="#5AAE8A"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              이슈 생성
            </button>
            <CreateIssueModal onClose={handleOnClose} visible={showModal} />
          </div>
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex m-[1.5vw] justify-center">
              <Droppable droppableId="TODO" key="TODO">
                {(provided) => (
                  <div
                    className="w-[20vw] bg-white mx-[1.4vw] rounded-lg shadow-lg flex flex-col h-fit"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {/* FFED8F */}
                    <div className="bg-[#D0F6E0] h-[0.5vw] rounded-t-lg" />
                    <div className="mx-auto">
                      <div className="flex mb-4 ml-[0.5vw] mt-[3vh] items-center w-[16vw]">
                        <h1 className="text-lg font-suitB text-[#323232]">
                          대기
                        </h1>
                        <h2 className="ml-[0.8vw] font-suitB">
                          {todoIssues.length}
                        </h2>
                      </div>
                      {todoIssues.map((issue, index) => (
                        <Draggable
                          draggableId={issue.issueId.toString()}
                          key={issue.issueId.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <IssueCard key={index} issue={issue} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <Droppable droppableId="PROGRESS" key="PROGRESS">
                {(provided) => (
                  <div
                    className="w-[20vw] bg-white mx-[1.4vw] rounded-lg shadow-lg flex flex-col h-fit"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {/* 8FB5FF */}
                    <div className="bg-[#99D8BF] h-[0.5vw] rounded-t-lg" />
                    <div className="mx-auto">
                      <div className="flex mb-4 ml-[0.5vw] mt-[3vh] items-center w-[16vw]">
                        <h1 className="text-lg font-suitB text-[#323232]">
                          진행
                        </h1>
                        <h2 className="ml-[0.8vw] font-suitB">
                          {progressIssues.length}
                        </h2>
                      </div>
                      {progressIssues.map((issue, index) => (
                        <Draggable
                          draggableId={issue.issueId.toString()}
                          key={issue.issueId.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <IssueCard key={index} issue={issue} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <Droppable droppableId="REVIEW" key="REVIEW">
                {(provided) => (
                  <div
                    className="w-[20vw] bg-white mx-[1.4vw] rounded-lg shadow-lg flex flex-col h-fit"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {/* FF8F8F */}
                    <div className="bg-[#41A05F] h-[0.5vw] rounded-t-lg" />
                    <div className="mx-auto">
                      <div className="flex mb-4 ml-[0.5vw] mt-[3vh] items-center w-[16vw]">
                        <h1 className="text-lg font-suitB text-[#323232]">
                          검토
                        </h1>
                        <h2 className="ml-[0.8vw] font-suitB">
                          {reviewIssues.length}
                        </h2>
                      </div>
                      {reviewIssues.map((issue, index) => (
                        <Draggable
                          draggableId={issue.issueId.toString()}
                          key={issue.issueId.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <IssueCard key={index} issue={issue} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <Droppable droppableId="DONE" key="DONE">
                {(provided) => (
                  <div
                    className="w-[20vw] bg-white mx-[1.4vw] rounded-lg shadow-lg flex flex-col h-fit"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {/* 83CE9B */}
                    <div className="bg-[#285F43] h-[0.5vw] rounded-t-lg" />
                    <div className="mx-auto">
                      <div className="flex mb-4 ml-[0.5vw] mt-[3vh] items-center w-[16vw]">
                        <h1 className="text-lg font-suitB text-[#323232]">
                          완료
                        </h1>
                        <h2 className="ml-[0.8vw] font-suitB">
                          {doneIssues.length}
                        </h2>
                      </div>
                      {doneIssues.map((issue, index) => (
                        <Draggable
                          draggableId={issue.issueId.toString()}
                          key={issue.issueId.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <IssueCard key={index} issue={issue} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}
