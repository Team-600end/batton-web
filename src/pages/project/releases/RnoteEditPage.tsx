import React, { useRef, useState } from "react";
import { DoneIssue, Issue, IssueType, Manager } from "@typess/Issue";
import RnoteIssueCard from "@src/components/project/releases/RnoteIssueCard";
import refresh_img from "@assets/images/icons/refresh.svg";
// import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import "@toast-ui/editor/dist/toastui-editor.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
// import 'tui-color-picker/dist/tui-color-picker.css';
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/i18n/ko-kr";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import RnoteUsedIssueCard from "@src/components/project/releases/RnoteUsedIssueCard";

const doneIssues: DoneIssue[] = [
  {
    type: "Deprecated",
    title: "검정색 이슈",
    manager: { name: "John Doe" },
    team: "600&",
    id: 7,
    content: "검정색 이슈야 아저씨랑 행복하게 살아야 한다~",
  },
  {
    type: "Fixed",
    title: "빨간색 이슈",
    team: "600&",
    id: 8,
    content: "빨간색 이슈야 무럭무럭 자라야 한다~",
  },
  {
    type: "Changed",
    title: "청량리행 열차",
    manager: { name: "John Doe" },
    team: "600&",
    id: 9,
    content: "청량리행 열차를 안타면 하루가 불행해요",
  },
  {
    type: "Feature",
    title: "엘렐레레렐레레레렐레레레레",
    manager: { name: "John Doe" },
    team: "600&",
    id: 10,
  },
  {
    type: "New",
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
    type: "Fixed",
    title: "새로운 이슈",
    manager: { name: "John Doe" },
    team: "600&",
    id: 13,
  },
  {
    type: "Changed",
    title: "새로운 이슈",
    manager: { name: "John Doe" },
    team: "600&",
    id: 14,
  },
];

const usedIssues: DoneIssue[] = [];

export default function RnoteEditPage() {
  const [editorData, setEditorDate] = useState("");
  const editorRef = useRef<Editor>(null);

  const onChange = () => {
    setEditorDate(editorRef.current?.getInstance().getHTML());
    console.log(editorData);
  };

  const handleDragEnd = (result: DropResult) => {
    // 유효하지 않는 곳으로 drag를 진행했을 경우 이벤트를 종료한다.
    if (!result.destination) return;

    const { source, destination } = result;

    const sourceIndex = source.index;
    const destinationIndex = destination.index;

    
    // 시작지가 Done인 경우
    if (source.droppableId == "Done") {
      if (destination.droppableId == "Done") {
        if (sourceIndex === destinationIndex) return;
        const sourceItem = doneIssues![sourceIndex];
        doneIssues!.splice(sourceIndex, 1); // 원래 위치에서 제거
        doneIssues!.splice(destinationIndex, 0, sourceItem); // 새로운 위치에 삽입  
      }
      else if (destination.droppableId = "Editor") { // 작성을 시도할 경우
        editorRef.current?.getInstance().setHTML(
          editorData +
            `<h2 id=${source.index}>${doneIssues![source.index].title}</h2><p>${
              doneIssues![source.index].content ?? ""
            }</p>`
        );
        usedIssues!.splice(usedIssues.length, 0, doneIssues[sourceIndex]);
        doneIssues!.splice(sourceIndex, 1); // 원래 위치에서 제거
      } else return;
    } else if (source.droppableId == "Used") {
      const sourceItem = usedIssues![sourceIndex];
      usedIssues!.splice(sourceIndex, 1); // 원래 위치에서 제거
      usedIssues!.splice(destinationIndex, 0, sourceItem); // 새로운 위치에 삽입
    } else return;


  //  (destination.droppableId == "Done") {

  //     // 순서 변경을 하지 않은 경우
  //     if (sourceIndex === destinationIndex) return;

  //     const sourceItem = doneIssues![sourceIndex];
  //     doneIssues!.splice(sourceIndex, 1); // 원래 위치에서 제거
  //     doneIssues!.splice(destinationIndex, 0, sourceItem); // 새로운 위치에 삽입
  //   } else {
  //     // 이슈 작성을 시도할 경우
  //     doneIssues![sourceIndex].isUsed = true;

  //     const sourceItem = doneIssues![sourceIndex];
  //     doneIssues!.splice(sourceIndex, 1);
  //     usedIssues!.splice(destinationIndex, 0, sourceItem);

  //     editorRef.current?.getInstance().setHTML(
  //         editorData +
  //           `<h2 id=${source.index}>${doneIssues![source.index].title}</h2><p>${
  //             doneIssues![source.index].content ?? ""
  //           }</p>`
  //       );
  //   }

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
                className="focus:outline-none border border-grey-4 text-grey-900 bg-white hover:bg-grey-300 focus:ring-4 focus:ring-grey-900 font-suitM rounded-lg text-sm px-6 py-2 mr-2 mb-2"
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
              <Droppable droppableId="Used" key="Used" direction="horizontal">
                {(provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps} className="flex mb-[1vh] ml-[0.3vw] overflow-scroll scrollbar-hide">
                    {usedIssues.map((issue, index) => (
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
                            <RnoteUsedIssueCard key={index} issue={issue} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                )}
              </Droppable>
              <Droppable droppableId="Editor" key="Editor">
                {(provided) => (
                  <div
                    className="border font-suitM border-gray-400 rounded-lg p-[1vw] h-[80vh]"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <div>
                      <Editor
                        previewStyle="vertical"
                        height="625px"
                        initialEditType="wysiwyg"
                        useCommandShortcut={true}
                        hideModeSwitch={true}
                        language="ko-KR"
                        onChange={onChange}
                        ref={editorRef}
                        plugins={[colorSyntax]}
                        toolbarItems={[
                          // 툴바 옵션 설정
                          ["heading", "bold", "italic", "strike"],
                          ["hr", "quote"],
                          ["ul", "ol", "task", "indent", "outdent"],
                          ["table", "image", "link"],
                          ["code", "codeblock"],
                        ]}
                      />
                    </div>
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}
