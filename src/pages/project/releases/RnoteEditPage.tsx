import React from "react";
import Navbar from "@components/nav/Navbar";
import { DoneIssue, Issue, IssueType, Manager } from "@typess/Issue";
import RnoteIssueCard from "@src/components/project/releases/RnoteIssueCard";
import refresh_img from "@assets/images/icons/refresh.svg";
import ContentEditable from "react-contenteditable";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";


const doneIssues: DoneIssue[] = [
  {
    type: "Deprecated",
    title: "새로운 이슈",
    manager: { name: "John Doe" },
    team: "600&",
    id: 7,
    isUsed: false,
  },
  {
    type: "Fixed",
    title: "변경된 이슈",
    team: "600&",
    id: 8,
    isUsed: false,
  },
  {
    type: "Changed",
    title: "새로운 이슈",
    manager: { name: "John Doe" },
    team: "600&",
    id: 9,
    isUsed: false,
  },
  {
    type: "Feature",
    title: "새로운 이슈",
    manager: { name: "John Doe" },
    team: "600&",
    id: 10,
    isUsed: false,
  },
  {
    type: "New",
    title: "새로운 이슈",
    manager: { name: "John Doe" },
    team: "600&",
    id: 11,
    isUsed: false,
  },
  {
    type: "New",
    title: "변경된 이슈",
    team: "600&",
    id: 12,
    isUsed: false,
  },
  {
    type: "Fixed",
    title: "새로운 이슈",
    manager: { name: "John Doe" },
    team: "600&",
    id: 13,
    isUsed: false,
  },
  {
    type: "Changed",
    title: "새로운 이슈",
    manager: { name: "John Doe" },
    team: "600&",
    id: 14,
    isUsed: false,
  },
];

export default function RnoteEditPage() {
  const handleDragEnd = (result: DropResult) => {
    // 유효하지 않는 곳으로 drag하거나, 이미 작성중인 Issue를 이동시켰을 경우 이벤트를 종료한다.
    if (!result.destination || result.source.droppableId != "Done") return;

    const { source, destination } = result;

    if (destination.droppableId == "Done") {
      // 미작성 이슈들을 움직였을 경우

      const sourceIndex = source.index;
      const destinationIndex = destination.index;

      // 순서 변경을 하지 않은 경우
      if (sourceIndex === destinationIndex) return;

      const sourceItem = doneIssues![sourceIndex];
      doneIssues!.splice(sourceIndex, 1); // 원래 위치에서 제거
      doneIssues!.splice(destinationIndex, 0, sourceItem); // 새로운 위치에 삽입

    } else {
      // 이슈 작성을 시도할 경우
      doneIssues![source.index].isUsed = true;
    }

    // 이외에도, 작성중인 이슈에 대해서 조건 논리를 추가해야한다.
    // 저장 axios 추가해야됨!
  };

  return (
    <div className="mt-[9vh] flex">
      <div className="flex flex-row w-screen">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="border border-gray-400 rounded-t-lg ml-[0.5vw]">
            <div className="border-b font-suitSB border-gray-400 p-[1vw] flex justify-between">
              완료 이슈 리스트
              <img src={refresh_img} />
            </div>
            <Droppable droppableId="Done" key="Done">
              {(provided) => (
                <div
                  className="p-[2vw]"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
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
                          <RnoteIssueCard key={index} issue={issue} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
          <div className="flex flex-col mx-auto w-[76vw] mt-[2vh]">
            <div className="flex justify-end">
              <button
                type="button"
                className="focus:outline-none text-white bg-[#AAAAAA] hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-suitM rounded-lg text-sm px-6 py-2 mr-2 mb-2"
              >
                취소하기
              </button>
              <button
                type="button"
                className="focus:outline-none text-white bg-[#5AAE8A] hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-suitM rounded-lg text-sm px-6 py-2 mr-2 mb-2"
              >
                저장하기
              </button>
            </div>
            <div>
              <div className="border border-gray-400 rounded-lg p-[1vw] mb-[1vh]">
                <input
                  type="text"
                  placeholder="버전"
                  className="border-none font-suitM outline-none w-full h-full resize-none"
                />
              </div>
              <div className="border font-suitM border-gray-400 rounded-lg p-[1vw] h-[80vh]">
                <Droppable droppableId="Editor" key="Editor">
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                      <textarea
                        placeholder="내용"
                        className="border-none outline-none w-full h-full resize-none"
                      />
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}
