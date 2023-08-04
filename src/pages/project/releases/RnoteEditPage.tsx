import React, { useRef, useState } from "react";
import { DoneIssue, Issue, IssueType, Manager } from "@typess/Issue";
import RnoteIssueCard from "@components/project/releases/RnoteIssueCard";
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
import RnoteUsedIssueCard from "@components/project/releases/RnoteUsedIssueCard";

const doneIssues: DoneIssue[] = [
  {
    issueTag: "Changed",
    issueKey: 1,
    issueTitle: "일반 설문조사 종류 변경",
    nickname: "강창훈",
    issueContent:
      "설문조사 문항 종류를 변경하였습니다. 기존 체크박스와 라디오 버튼에서, 중복 선택 가능 토글을 만들고 객관식으로 통일을 진행했습니다.",
    issueId: 1,
  },
  {
    issueTag: "New",
    issueKey: 2,
    issueTitle: "설문조사 GPS 배포 기능",
    nickname: "임혜균",
    issueContent:
      "<strong>GPS 기반 설문조사</strong>: 이제 사용자들은 위치 기반 데이터를 설문조사에 활용할 수 있습니다. 설문조사 참가자들의 지리적 위치에 따른 응답을 분석하고 이를 바탕으로 더욱 구체적인 인사이트를 도출할 수 있습니다. <br><br><strong>지역 특성에 맞는 설문조사</strong>: GPS 기능을 활용해 특정 지역의 특성에 맞춘 설문조사를 진행할 수 있습니다. 이를 통해 지역별로 다른 문화나 관습, 선호도 등을 반영한 보다 정확한 데이터를 얻을 수 있습니다. <br><br><strong>실시간 위치</strong> 반영: 참가자의 동의 하에 실시간 위치 반영이 가능하며, 이를 통해 설문조사 결과에 대한 더욱 심층적인 분석이 가능합니다.",
    issueId: 3,
  },
  {
    issueTag: "New",
    issueKey: 3,
    issueTitle: "중복 배포 이슈",
    nickname: "이서현",
    issueContent:
      "중복 배포 방지 기능은 사용자들이 동일하거나 매우 유사한 설문조사를 여러 번 배포하는 것을 방지하는 새로운 기능입니다. 이 기능은 자동으로 시스템이 사용자가 작성하고 있는 설문조사와 과거에 배포된 설문조사를 비교하며, 이러한 중복성을 탐지합니다. <br><br><strong>자동 유사성 체크</strong>: 사용자가 설문조사를 작성하는 동안, 시스템은 이전에 생성된 설문조사와 현재 작성 중인 설문조사를 비교합니다. 이는 문항 내용, 선택지, 설문조사의 목적 등 다양한 요소를 기반으로 유사성을 체크합니다. <br><br><strong>중복 알림</strong>: 만약 시스템이 중복성을 탐지하면, 사용자에게 알림을 보냅니다. 이 알림은 사용자가 중복 배포를 방지할 수 있도록 돕습니다. 사용자는 알림을 통해 중복 배포를 예방하거나, 필요하다면 설문조사의 내용을 수정하거나 개선할 수 있습니다. <br><br><strong>유사성 점수</strong>: 설문조사가 완성되면, 시스템은 설문조사의 유사성 점수를 제공합니다. 이 점수는 0에서 100까지 범위이며, 점수가 높을수록 이전에 배포된 설문조사와 유사성이 높다는 것을 의미합니다.",
    issueId: 2,
  },
];

const usedIssues: DoneIssue[] = [];

export default function RnoteEditPage() {
  const [editorData, setEditorDate] = useState("");
  // const [currentIssue, setIssue] = 
  const editorRef = useRef<Editor>(null);

  const onChange = () => {
    setEditorDate(editorRef.current?.getInstance().getHTML());
    console.log(editorData);
    console.log(editorRef.current.getInstance().getSelection());
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
      } else if ((destination.droppableId = "Editor")) {
        // 작성을 시도할 경우
        editorRef.current
          ?.getInstance()
          .setHTML(
            editorData +
              `<h2 id=${source.index}>${
                doneIssues![source.index].issueTitle
              }</h2><p>${doneIssues![source.index].issueContent ?? ""}</p><br>`
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
        <div className="flex flex-row rounded-t-lg border border-gray-300 bg-gray-100 w-[95vw] mx-auto mt-[2vh] shadow-inner h-screen px-2 py-5">
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="border rounded-t-lg ml-[2vw] mr-[2vw] bg-white w-[19vw] shadow-[2px_2px_10px_2px_rgba(0,0,0,0.3)] mt-[2vh]">
              <div className="border-b font-suitSB border-gray-400 p-[1vw] flex justify-between drop-shadow-lg">
                완료 이슈 리스트
                <img src={refresh_img} />
              </div>
              <Droppable droppableId="Done" key="Done">
                {(provided) => (
                  <div
                    className="pt-[2vh]"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
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
            <div className="mt-[2vh]">
              <div>
                <div className="flex mb-[1vh] h-[6vh]">
                  <div className="flex border-gray-200 border rounded-lg bg-white shadow-[2px_2px_10px_1px_rgba(0,0,0,0.3)] w-[50vw]">
                    <div className="my-auto mx-[1vw]">
                      <p className="font-suitSB">릴리즈 노트 에디터</p>
                    </div>
                    <div className="ml-[2vw] flex items-center">
                      <p className="font-suitL text-base">v .</p>
                      <input
                        type="text"
                        placeholder="0"
                        className="border-none font-suitM outline-none resize-none w-[3.5vw] h-full"
                      />
                    </div>
                    <div className="flex items-center">
                      <p className="font-suitL text-base">.</p>
                      <input
                        type="text"
                        placeholder="0"
                        className="border-none font-suitM outline-none h-full w-[3.5vw] resize-none"
                      />
                    </div>
                    <div className="flex items-center">
                      <p className="font-suitL text-base">.</p>
                      <input
                        type="text"
                        placeholder="0"
                        className="border-none font-suitM outline-none h-full w-[3.5vw] resize-none"
                      />
                    </div>
                    <div className="ml-[4vw] flex items-center">
                      <p className="font-suitL text-base">포함 이슈</p>
                      <p className="font-suitM text-lg text-grey-3 ml-[1vw]">
                        2
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => console.log(editorRef.current.getInstance().getSelection())}
                      className="focus:outline-none border border-grey-5 text-gray-900 bg-white hover:bg-grey-300 focus:ring-4 focus:ring-grey-900 font-suitM rounded-lg text-[0.8vw] py-2 mr-[1vw] w-[5vw] ml-[1.5vw] shadow-[2px_2px_10px_1px_rgba(0,0,0,0.3)]"
                    >
                      취소하기
                      getSelection
                    </button>
                    <button
                      onClick={() => console.log(editorRef.current.getInstance().getMarkdown())}
                      type="button"
                      className="focus:outline-none border border-grey-5 text-gray-900 bg-white font-suitM rounded-lg text-[0.8vw] py-2 mr-[1vw] w-[5vw] shadow-[1px_2px_10px_1px_rgba(0,0,0,0.3)]"
                    >
                      저장하기
                    </button>
                    <button
                      type="button"
                      className="focus:outline-none border border-grey-5 text-gray-900 bg-white font-suitM rounded-lg text-[0.8vw] py-2 mr-[1vw] w-[5vw] shadow-[1px_2px_10px_1px_rgba(0,0,0,0.3)]"
                    >
                      발행하기
                    </button>
                  </div>
                </div>
                <div className="flex">
                  <Droppable droppableId="Editor" key="Editor">
                    {(provided) => (
                      <div
                        className="border font-suitM border-gray-300 bg-white rounded-lg p-[0.2vw] h-full w-[50vw] shadow-[1px_2px_10px_1px_rgba(0,0,0,0.3)]"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        <div>
                          <Editor
                            previewStyle="vertical"
                            height="700px"
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
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                  <div className="border rounded-t-lg ml-[1.5vw] mr-[1vw] bg-white w-[16.6vw] shadow-[2px_2px_10px_2px_rgba(0,0,0,0.3)] mt-[2vh]">
                    <div className="border-b font-suitSB border-gray-400 p-[1vw] flex justify-between drop-shadow-lg">
                      등록 이슈 리스트
                      <img src={refresh_img} />
                    </div>
                    <Droppable
                      droppableId="Used"
                      key="Used"
                      // direction="horizontal"
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className="flex flex-col mb-[1vh] pt-[1vw]"
                          // overflow-scroll scrollbar-hide
                        >
                          {usedIssues.map((issue, index) => (
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
                                  <RnoteUsedIssueCard
                                    key={index}
                                    issue={issue}
                                  />
                                </div>
                              )}
                            </Draggable>
                          ))}
                        </div>
                      )}
                    </Droppable>
                  </div>
                </div>
              </div>
            </div>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}
