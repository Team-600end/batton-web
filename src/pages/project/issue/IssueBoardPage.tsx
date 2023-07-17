import React, { useState } from "react";
import ProjectNavbar from "@components/nav/ProjectNavbar";
import plus_img from "@assets/images/icons/plus.svg";
import Issue from "@typess/issue";
import IssueCard from "@components/project/issue/IssueCard";
import MilestoneNavbar from "@components/nav/MilestoneNavbar";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import CreateIssueModal from "@components/project/issue/CreateIssueModal";

const watingIssues: Issue[] = [
  {
    type: "New",
    title: "새로운 이슈",
    manager: { name: "John Doe" },
    team: "600&",
    index: 1,
    id: 0,
  },
  {
    type: "New",
    title: "변경된 이슈",
    team: "600&",
    index: 2,
    id: 1,
  },
];

const proceedingIssues: Issue[] = [
  {
    type: "New",
    title: "새로운 이슈",
    manager: { name: "John Doe" },
    team: "600&",
    index: 1,
    id: 2,
  },
  {
    type: "Changed",
    title: "변경된 이슈",
    team: "600&",
    index: 2,
    id: 3,
  },
];

const reviewingIssues: Issue[] = [
  {
    type: "Deprecated",
    title: "새로운 이슈",
    manager: { name: "John Doe" },
    team: "600&",
    index: 1,
    id: 4,
  },
  {
    type: "Fixed",
    title: "변경된 이슈",
    team: "600&",
    index: 2,
    id: 5,
  },
  {
    type: "Fixed",
    title: "변경된 이슈",
    team: "600&",
    index: 50,
    id: 6,
  },
];

const completedIssues: Issue[] = [
  {
    type: "Feature",
    title: "새로운 이슈",
    manager: { name: "John Doe" },
    team: "600&",
    index: 1,
    id: 7,
  },
  {
    type: "New",
    title: "변경된 이슈",
    team: "600&",
    index: 2,
    id: 8,
  },
  {
    type: "Feature",
    title: "새로운 이슈",
    manager: { name: "John Doe" },
    team: "600&",
    index: 10,
    id: 9,
  },
  {
    type: "Feature",
    title: "새로운 이슈",
    manager: { name: "John Doe" },
    team: "600&",
    index: 14,
    id: 10,
  },
  {
    type: "Feature",
    title: "새로운 이슈",
    manager: { name: "John Doe" },
    team: "600&",
    index: 1,
    id: 11,
  },
  {
    type: "New",
    title: "변경된 이슈",
    team: "600&",
    index: 2,
    id: 12,
  },
  {
    type: "Feature",
    title: "새로운 이슈",
    manager: { name: "John Doe" },
    team: "600&",
    index: 10,
    id: 13,
  },
  {
    type: "Feature",
    title: "새로운 이슈",
    manager: { name: "John Doe" },
    team: "600&",
    index: 14,
    id: 14,
  },
];

export default function IssueBoardPage() {
  let { projectId } = useParams();

  const handleDragEnd = async (initial: { draggableId: string }) => {};
  const handleDragStart = async (initial: { draggableId: string }) => {};
  const handleDragUpdate = async (initial: { draggableId: string }) => {};

  const [showModal, setShowModal] = useState(false);
  const handleOnClose = () => setShowModal(false);

  // const handleListDragStyle = (isDraggingOver: boolean, listSize: number) => {
  //   if (isDraggingOver) {
  //     const adjustedHeight = `${(listSize + 1) * 16.2 + 7.5}vh`;
  //     const style = {
  //       height: adjustedHeight,
  //     };
  //     return style;
  //   } else return {};
  // };

  return (
    <div className="flex flex-col overflow-hidden">
      <MilestoneNavbar />
      <ProjectNavbar />
      <div>
        <div className="bg-gray-100 rounded-t-lg border border-gray-300 w-[90vw] m-auto mt-[2vh] flex flex-col">
          <div className="flex justify-end mr-[2.5vw] mt-[2vw]">
            {" "}
            {/*here*/}
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
            onDragStart={handleDragStart}
            onDragUpdate={handleDragUpdate}
          >
            <div className="flex m-[1.5vw] justify-center">
              <Droppable droppableId="wating" key="wating">
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
                          {watingIssues.length}
                        </h2>
                      </div>
                      {watingIssues.map((issue, index) => (
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
              <Droppable droppableId="Proceeding">
                {(provided, snapshot) => (
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
                          {proceedingIssues.length}
                        </h2>
                      </div>
                      {proceedingIssues.map((issue, index) => (
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
              <Droppable droppableId="Reviewing">
                {(provided, snapshot) => (
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
                          {reviewingIssues.length}
                        </h2>
                      </div>
                      {reviewingIssues.map((issue, index) => (
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
              <Droppable droppableId="Completed">
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
                          {completedIssues.length}
                        </h2>
                      </div>
                      {completedIssues.map((issue, index) => (
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
