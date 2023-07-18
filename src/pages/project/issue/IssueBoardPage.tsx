import React, { useState } from "react";
import ProjectNavbar from "@components/nav/ProjectNavbar";
import plus_img from "@assets/images/icons/plus.svg";
import Issue, { IssueStatus } from "@typess/Issue";
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

const todoIssues: Issue[] = [
  {
    type: "New",
    title: "새로운 이슈",
    manager: { name: "John Doe" },
    team: "600&",
    id: 0,
  },
  {
    type: "New",
    title: "변경된 이슈",
    team: "600&",
    id: 1,
  },
];

const progressIssues: Issue[] = [
  {
    type: "New",
    title: "새로운 이슈",
    manager: { name: "John Doe" },
    team: "600&",
    id: 2,
  },
  {
    type: "Changed",
    title: "변경된 이슈",
    team: "600&",
    id: 3,
  },
];

const reviewIssues: Issue[] = [
  {
    type: "Deprecated",
    title: "새로운 이슈",
    manager: { name: "John Doe" },
    team: "600&",
    id: 4,
  },
  {
    type: "Fixed",
    title: "변경된 이슈",
    team: "600&",
    id: 5,
  },
  {
    type: "Fixed",
    title: "변경된 이슈",
    team: "600&",
    id: 6,
  },
];

const doneIssues: Issue[] = [
  {
    type: "Feature",
    title: "새로운 이슈",
    manager: { name: "John Doe" },
    team: "600&",
    id: 7,
  },
  {
    type: "New",
    title: "변경된 이슈",
    team: "600&",
    id: 8,
  },
  {
    type: "Feature",
    title: "새로운 이슈",
    manager: { name: "John Doe" },
    team: "600&",
    id: 9,
  },
  {
    type: "Feature",
    title: "새로운 이슈",
    manager: { name: "John Doe" },
    team: "600&",
    id: 10,
  },
  {
    type: "Feature",
    title: "새로운 이슈",
    manager: { name: "John Doe" },
    team: "600&",
    id: 11,
  },
  {
    type: "New",
    title: "변경된 이슈",
    team: "600&",
    id: 12,
  },
  {
    type: "Feature",
    title: "새로운 이슈",
    manager: { name: "John Doe" },
    team: "600&",
    id: 13,
  },
  {
    type: "Feature",
    title: "새로운 이슈",
    manager: { name: "John Doe" },
    team: "600&",
    id: 14,
  },
];

const checkIssueList = (locationId: string) => {
  switch (locationId) {
    case "Todo":
      return todoIssues;
    case "Progress":
      return progressIssues;
    case "Review":
      return reviewIssues;
    case "Done":
      return doneIssues;
  }
};

export default function IssueBoardPage() {
  let { projectId } = useParams();
  const navigate = useNavigate();

  const handleDragEnd = ({ source, destination }: DropResult) => {
    // 유효하지 않는 곳으로 drag시 이벤트를 종료한다.
    if (!destination) return;

    const sourceList = checkIssueList(source.droppableId);
    const destinationList = checkIssueList(destination.droppableId);
    const sourceIndex = source.index;
    const destinationIndex = destination.index;

      if (source.droppableId !== destination.droppableId) {
        // 드래그한 요소의 droppableId와 드롭 대상의 droppableId가 다른 경우
        const sourceItem = sourceList![sourceIndex];
        sourceList!.splice(sourceIndex, 1);
        destinationList!.splice(destinationIndex, 0, sourceItem);
      } else {
        // 드래그한 요소의 droppableId와 드롭 대상의 droppableId가 동일한 경우
        if (sourceIndex !== destinationIndex) {
          const sourceItem = sourceList![sourceIndex];
          sourceList!.splice(sourceIndex, 1); // 원래 위치에서 제거
          sourceList!.splice(destinationIndex, 0, sourceItem); // 새로운 위치에 삽입
        }
      }

      // 저장 axios
  };

  const [showModal, setShowModal] = useState(false);
  const handleOnClose = () => setShowModal(false);

  return (
    <div className="flex flex-col overflow-hidden">
      <MilestoneNavbar />
      <ProjectNavbar />
      <div>
        <div className="bg-gray-100 rounded-t-lg border border-gray-300 w-[90vw] m-auto mt-[2vh] flex flex-col">
          <div className="flex justify-end mr-[2.5vw] mt-[2vw] space-x-2">
            <button
              onClick={() => navigate(`/project/${projectId}/issue-history`)}
              className="rounded-lg bg-[#5AAE8A] text-white flex py-[0.8vh] px-[0.8vw] items-center shadow-md font-suitL"
            >
              히스토리
            </button>
            <button
              onClick={() => navigate(`/project/${projectId}/hidden-issue`)}
              className="rounded-lg bg-[#5AAE8A] text-white flex py-[0.8vh] px-[0.8vw] items-center shadow-md font-suitL"
            >
              숨긴 이슈
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="rounded-lg bg-[#5AAE8A] text-white flex py-[0.8vh] px-[0.8vw] items-center shadow-md font-suitL"
            >
              <img src={plus_img} className="mr-[0.2vw]" />
              이슈 생성
            </button>
            <CreateIssueModal onClose={handleOnClose} visible={showModal} />
          </div>
          <DragDropContext
            onDragEnd={handleDragEnd}
          >
            <div className="flex m-[1.5vw] justify-center">
              <Droppable droppableId="Todo" key="Todo">
                {(provided) => (
                  <div
                    className="w-[20vw] bg-white mx-[1.4vw] rounded-lg shadow-lg flex flex-col h-fit"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <div className="bg-[#FFED8F] h-[0.5vw] rounded-t-lg" />
                    <div className="mx-auto">
                      <div className="flex mb-4 ml-[0.3vw] mt-[3vh] items-center">
                        <h1 className="text-lg font-suitB text-[#323232]">
                          대기
                        </h1>
                        <h2 className="ml-[0.8vw] font-suitB">
                          {todoIssues.length}
                        </h2>
                      </div>
                      {todoIssues.map((issue, index) => (
                        <Draggable
                          draggableId={issue.id.toString()}
                          key={issue.id.toString()}
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
              <Droppable droppableId="Progress" key="Progress">
                {(provided) => (
                  <div
                    className="w-[20vw] bg-white mx-[1.4vw] rounded-lg shadow-lg flex flex-col h-fit"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <div className="bg-[#8FB5FF] h-[0.5vw] rounded-t-lg" />
                    <div className="mx-auto">
                      <div className="flex mb-4 ml-[0.3vw] mt-[3vh] items-center">
                        <h1 className="text-lg font-suitB text-[#323232]">
                          진행
                        </h1>
                        <h2 className="ml-[0.8vw] font-suitB">
                          {progressIssues.length}
                        </h2>
                      </div>
                      {progressIssues.map((issue, index) => (
                        <Draggable
                          draggableId={issue.id.toString()}
                          key={issue.id.toString()}
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
              <Droppable droppableId="Review" key="Review">
                {(provided) => (
                  <div
                    className="w-[20vw] bg-white mx-[1.4vw] rounded-lg shadow-lg flex flex-col h-fit"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <div className="bg-[#FF8F8F] h-[0.5vw] rounded-t-lg" />
                    <div className="mx-auto">
                      <div className="flex mb-4 ml-[0.3vw] mt-[3vh] items-center">
                        <h1 className="text-lg font-suitB text-[#323232]">
                          검토
                        </h1>
                        <h2 className="ml-[0.8vw] font-suitB">
                          {reviewIssues.length}
                        </h2>
                      </div>
                      {reviewIssues.map((issue, index) => (
                        <Draggable
                          draggableId={issue.id.toString()}
                          key={issue.id.toString()}
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
              <Droppable droppableId="Done" key="Done">
                {(provided) => (
                  <div
                    className="w-[20vw] bg-white mx-[1.4vw] rounded-lg shadow-lg flex flex-col h-fit"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <div className="bg-[#83CE9B] h-[0.5vw] rounded-t-lg" />
                    <div className="mx-auto">
                      <div className="flex mb-4 ml-[0.3vw] mt-[3vh] items-center">
                        <h1 className="text-lg font-suitB text-[#323232]">
                          완료
                        </h1>
                        <h2 className="ml-[0.8vw] font-suitB">
                          {doneIssues.length}
                        </h2>
                      </div>
                      {doneIssues.map((issue, index) => (
                        <Draggable
                          draggableId={issue.id.toString()}
                          key={issue.id.toString()}
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
