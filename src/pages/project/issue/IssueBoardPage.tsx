import React, { useState } from "react";
import ProjectNavbar from "@components/nav/ProjectNavbar";
import plus_img from "@assets/images/icons/plus.svg";
import issue from "@src/types/issue";
import IssueCard from "@components/project/issue/IssueCard";
import MilestoneNavbar from "@components/nav/MilestoneNavbar";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import CreateIssueModal from "@components/project/issue/CreateIssueModal";

const watingIssues: issue[] = [
  {
    type: "New",
    title: "새로운 이슈",
    manager: { name: "John Doe" },
    team: "600&",
    index: 1,
  },
  {
    type: "New",
    title: "변경된 이슈",
    team: "600&",
    index: 2,
  },
];

const proceedingIssues: issue[] = [
  {
    type: "New",
    title: "새로운 이슈",
    manager: { name: "John Doe" },
    team: "600&",
    index: 1,
  },
  {
    type: "Changed",
    title: "변경된 이슈",
    team: "600&",
    index: 2,
  },
];

const reviewingIssues: issue[] = [
  {
    type: "Deprecated",
    title: "새로운 이슈",
    manager: { name: "John Doe" },
    team: "600&",
    index: 1,
  },
  {
    type: "Fixed",
    title: "변경된 이슈",
    team: "600&",
    index: 2,
  },
  {
    type: "Fixed",
    title: "변경된 이슈",
    team: "600&",
    index: 50,
  },
];

const completedIssues: issue[] = [
  {
    type: "Feature",
    title: "새로운 이슈",
    manager: { name: "John Doe" },
    team: "600&",
    index: 1,
  },
  {
    type: "New",
    title: "변경된 이슈",
    team: "600&",
    index: 2,
  },
  {
    type: "Feature",
    title: "새로운 이슈",
    manager: { name: "John Doe" },
    team: "600&",
    index: 10,
  },
  {
    type: "Feature",
    title: "새로운 이슈",
    manager: { name: "John Doe" },
    team: "600&",
    index: 14,
  },
  {
    type: "Feature",
    title: "새로운 이슈",
    manager: { name: "John Doe" },
    team: "600&",
    index: 1,
  },
  {
    type: "New",
    title: "변경된 이슈",
    team: "600&",
    index: 2,
  },
  {
    type: "Feature",
    title: "새로운 이슈",
    manager: { name: "John Doe" },
    team: "600&",
    index: 10,
  },
  {
    type: "Feature",
    title: "새로운 이슈",
    manager: { name: "John Doe" },
    team: "600&",
    index: 14,
  },
];

export default function IssueBoardPage() {
  let { projectId } = useParams();

  const handleDragEnd = async (initial: { draggableId: string }) => {};
  const handleDragStart = async (initial: { draggableId: string }) => {};

  const [showModal, setShowModal] = useState(false);
  const handleOnClose = () => setShowModal(false);

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
          <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
            <div className="flex m-[1.5vw] justify-center">
              <Droppable droppableId="wating" key="wating">
                {(provided) => (
                  <div className="w-[20vw] bg-white mx-[1.4vw] rounded-lg shadow-lg flex flex-col h-fit" ref={provided.innerRef} {...provided.droppableProps}>
                    <div className="bg-[#FFED8F] h-[0.5vw] rounded-t-lg" />
                    <div className="mx-auto">
                      <div className="flex mb-4 ml-[0.3vw] mt-[3vh] items-center">
                        <h1 className="text-lg font-suitB text-[#323232]">대기</h1>
                        <h2 className="ml-[0.8vw] font-suitB">{watingIssues.length}</h2>
                      </div>
                      {watingIssues.map((issue, index) => (
                        <Draggable draggableId="wating" key="wating" index={index}>
                          {(provided) => (
                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                              <IssueCard key={index} issue={issue} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                  </div>
                )}
              </Droppable>
              <Droppable droppableId="droppable">
                {(provided) => (
                  <div className="w-[20vw] bg-white mx-[1.4vw] rounded-lg shadow-lg flex flex-col h-fit" ref={provided.innerRef} {...provided.droppableProps}>
                    <div className="bg-[#8FB5FF] h-[0.5vw] rounded-t-lg" />
                    <div className="mx-auto">
                      <div className="flex mb-4 ml-[0.3vw] mt-[3vh] items-center">
                        <h1 className="text-lg font-suitB text-[#323232]">진행</h1>
                        <h2 className="ml-[0.8vw] font-suitB">{proceedingIssues.length}</h2>
                      </div>
                      {proceedingIssues.map((issue, index) => (
                        <Draggable draggableId="draggable" index={index}>
                          {(provided) => (
                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                              <IssueCard key={index} issue={issue} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    </div>
                  </div>
                )}
              </Droppable>
              <div className="w-[20vw] bg-white mx-[1.4vw] rounded-lg shadow-lg flex flex-col h-fit">
                <div className="bg-[#FF8F8F] h-[0.5vw] rounded-t-lg" />
                <div className="mx-auto">
                  <div className="flex mb-4 ml-[0.3vw] mt-[3vh] items-center">
                    <h1 className="text-lg font-suitB text-[#323232]">검토</h1>
                    <h2 className="ml-[0.8vw] font-suitB">{reviewingIssues.length}</h2>
                  </div>
                  {reviewingIssues.map((issue, index) => (
                    <IssueCard key={index} issue={issue} />
                  ))}
                </div>
              </div>
              <div className="w-[20vw] bg-white mx-[1.4vw] rounded-lg shadow-lg flex flex-col h-fit">
                <div className="bg-[#83CE9B] h-[0.5vw] rounded-t-lg" />
                <div className="mx-auto">
                  <div className="flex mb-4 ml-[0.3vw] mt-[3vh] items-center">
                    <h1 className="text-lg font-suitB text-[#323232]">완료</h1>
                    <h2 className="ml-[0.8vw] font-suitB">{completedIssues.length}</h2>
                  </div>
                  {completedIssues.map((issue, index) => (
                    <IssueCard key={index} issue={issue} />
                  ))}
                </div>
              </div>
            </div>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}
