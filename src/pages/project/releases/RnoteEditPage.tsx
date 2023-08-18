import React, { useEffect, useRef, useState } from "react";
import { DoneIssue, EnrolledIssue, IssueType, Manager, UsedIssue } from "@typess/Issue";
import RnoteIssueCard from "@components/project/releases/RnoteIssueCard";
import refresh_img from "@assets/images/icons/refresh.svg";
import "@toast-ui/editor/dist/toastui-editor.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/i18n/ko-kr";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import Modal, { CommonModalInterface } from "@src/components/CommonModal";
import RnoteUsedIssueCard from "@components/project/releases/RnoteUsedIssueCard";
import MilestoneNavbar from "@src/components/nav/MilestoneNavbar";
import { instanceAuth, instanceImageAuth } from "@src/types/AxiosInterface";
import { useRecoilState } from "recoil";
import { projectNavs } from "@src/state/projectState";
import { ProjectNav } from "@src/types/project";
import { useNavigate, useParams } from "react-router-dom";

export default function RnoteEditPage() {
  const { projectKey, releaseId } = useParams();
  const editorRef = useRef<Editor>(null);
  const navigate = useNavigate();

  // Project Recoil
  const [projectNav, setProjectNav] = useRecoilState(projectNavs);
  const pj = projectNav.find((element: ProjectNav) => element.projectKey.toString() == projectKey);

  const [editorData, setEditorData] = useState("");
  const [doneIssueList, setDoneIssueList] = useState<DoneIssue[]>([]);
  const [usedIssueList, setUsedIssueList] = useState<UsedIssue[]>([]);
  const [versionMajor, setVersionMajor] = useState<number>(0);
  const [versionMinor, setVersionMinor] = useState<number>(0);
  const [versionPatch, setVersionPatch] = useState<number>(0);

  // CommonModal 표시
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // CommonModal Data
  const [modalData, setModalData] = useState<CommonModalInterface>({
    title: "",
    description: "",
    btnTitle: "",
    closeModal: () => {},
  });

  const onChange = () => {
    setEditorData(editorRef.current?.getInstance().getHTML());
  };

  const handleChangeVerMajor = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
    setVersionMajor(Number(e.target.value));
  };
  const handleChangeVerMinor = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
    setVersionMinor(Number(e.target.value));
  };
  const handleChangeVerPatch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, "");
    setVersionPatch(Number(e.target.value));
  };

  useEffect(() => {
    rnoteEditPageRequest();
  }, []);

  /** 레포트 수정페이지 조회 요청 */
  const rnoteEditPageRequest = async () => {
    instanceAuth
      .get(`/releases/editor/${releaseId}`)
      .then((response) => {
        if (response.data.code == 200) {
          setVersionMajor(response.data.result.versionMajor as number);
          setVersionMinor(response.data.result.versionMinor as number);
          setVersionPatch(response.data.result.versionPatch as number);
          setEditorData(response.data.result.releaseContent as string);
          setUsedIssueList(response.data.result.issueList as UsedIssue[]);
          const usedIssueListRepl = response.data.result.issueList as UsedIssue[];
          instanceAuth
            .get(`/issues/${pj.projectId}/done-list`)
            .then((response) => {
              if (response.data.code == 200) {
                const usedIssueIds = usedIssueListRepl.map((issue) => issue.issueId);
                setDoneIssueList((response.data.result as DoneIssue[]).filter((issue) => !usedIssueIds.includes(issue.issueId)));
              } else {
              }
            })
            .catch((error) => {});
        } else {
        }
      })
      .catch((error) => {});
  };

  const rnotePublishRequest = async () => {
    const enrolledIssueList: EnrolledIssue[] = usedIssueList;
    const rnotePatchData = {
      projectId: pj.projectId,
      versionMajor: versionMajor,
      versionMinor: versionMinor,
      versionPatch: versionPatch,
      releaseContent: editorData,
      issueList: enrolledIssueList,
    };
    instanceAuth
      .patch(`/releases/${releaseId}`, rnotePatchData)
      .then((response) => {
        if (response.data.code == 200) {
          instanceAuth
            .patch(`/releases/${releaseId}/publish`)
            .then((response) => {
              if (response.data.code == 200) {
                setModalData({
                  title: "안내 메세지",
                  description: "릴리즈 노트가 정상적으로 발행되었습니다.",
                  btnTitle: "확인",
                  closeModal: () => {
                    setIsModalOpen(false);
                    navigate(`/project/${projectKey}/releasesnote`);
                  },
                });
              } else {
              }
            })
            .catch((error) => {})
            .finally(() => {
              setIsModalOpen(true);
            });
        }
      })
      .catch(() => {});
  };

  /** 사용 이슈 삭제 요청 */
  const handleDelete: (index: number) => void = (targetIndex) => {
    let targetStartPosition = usedIssueList[targetIndex].startPosition;
    let targetEndPosition = usedIssueList[targetIndex].endPosition;
    let targetSize = targetEndPosition - targetStartPosition;
    editorRef.current
      .getInstance()
      .setHTML(
        [
          editorRef.current.getInstance().getHTML().slice(0, targetStartPosition),
          editorRef.current.getInstance().getHTML().slice(targetEndPosition, editorRef.current.getInstance().getHTML().length),
        ].join("")
      );
    setEditorData(editorRef.current.getInstance().getHTML());
    for (let num = targetIndex + 1; num < usedIssueList.length; num++) {
      usedIssueList[num].startPosition -= targetSize;
      usedIssueList[num].endPosition -= targetSize;
    }
    const targetItem = usedIssueList[targetIndex];
    usedIssueList!.splice(targetIndex, 1);
    doneIssueList!.splice(0, 0, targetItem);
  };

  const handleDragEnd = async (result: DropResult) => {
    // 유효하지 않는 곳으로 drag를 진행했을 경우 이벤트를 종료한다.
    if (!result.destination) return;

    const { source, destination } = result;

    const sourceIndex = source.index;
    const destinationIndex = destination.index;

    // 시작지가 Done인 경우
    if (source.droppableId == "DONE") {
      // 목적지가 Done인 경우
      if (destination.droppableId == "DONE") {
        // 같은 인덱스로 드랍한 경우
        if (sourceIndex === destinationIndex) return;
        const sourceItem = doneIssueList![sourceIndex];
        doneIssueList!.splice(sourceIndex, 1); // 원래 위치에서 제거
        doneIssueList!.splice(destinationIndex, 0, sourceItem); // 새로운 위치에 삽입

        // 목적지가 Editor인 경우 - 디폴트로 제일 아래쪽에 내용을 추가한다.
      } else if ((destination.droppableId = "Editor")) {
        // let tmpPosition = editorData.length;

        await getIssueReportRequest(doneIssueList[sourceIndex].issueId, sourceIndex);
      } else return; // 이외의 목적지인 경우, 리턴

      // 시작지가 Used인 경우
    } else if (source.droppableId == "Used") {
      // 목적지가 Used인 경우
      if ((destination.droppableId = "Used")) {
        if (sourceIndex == destinationIndex) return;

        let sourceStartPosition = usedIssueList[sourceIndex].startPosition;
        let sourceEndPositon = usedIssueList[sourceIndex].endPosition;
        let targetStartPosition = usedIssueList[destinationIndex].startPosition;
        let targetEndPosition = usedIssueList[destinationIndex].endPosition;
        let sourceSize = usedIssueList[sourceIndex].endPosition - usedIssueList[sourceIndex].startPosition;
        let sourceContent = editorRef.current.getInstance().getHTML().slice(sourceStartPosition, sourceEndPositon);

        if (sourceIndex > destinationIndex) {
          // 상위로 옮길 경우
          editorRef.current
            .getInstance()
            .setHTML(
              [
                editorRef.current.getInstance().getHTML().slice(0, targetStartPosition),
                sourceContent,
                editorRef.current.getInstance().getHTML().slice(targetStartPosition, sourceStartPosition),
                editorRef.current.getInstance().getHTML().slice(sourceEndPositon, editorRef.current.getInstance().getHTML().length),
              ].join("")
            );
          setEditorData(editorRef.current.getInstance().getHTML());
          usedIssueList[sourceIndex].startPosition = targetStartPosition;
          usedIssueList[sourceIndex].endPosition = targetStartPosition + sourceSize;
          for (let num = destinationIndex; num < sourceIndex; num++) {
            usedIssueList[num].startPosition += sourceSize;
            usedIssueList[num].endPosition += sourceSize;
          }
        } else {
          // 하위로 옮길 경우
          editorRef.current
            .getInstance()
            .setHTML(
              [
                editorRef.current.getInstance().getHTML().slice(0, sourceStartPosition),
                editorRef.current.getInstance().getHTML().slice(sourceEndPositon, targetEndPosition),
                sourceContent,
                editorRef.current.getInstance().getHTML().slice(targetEndPosition, editorRef.current.getInstance().getHTML().length),
              ].join("")
            );
          setEditorData(editorRef.current.getInstance().getHTML());
          for (let num = sourceIndex + 1; num <= destinationIndex; num++) {
            usedIssueList[num].startPosition -= sourceSize;
            usedIssueList[num].endPosition -= sourceSize;
          }
          usedIssueList[sourceIndex].startPosition = usedIssueList[destinationIndex].endPosition;
          usedIssueList[sourceIndex].endPosition = usedIssueList[sourceIndex].startPosition + sourceSize;
        }

        const sourceItem = usedIssueList![sourceIndex];
        usedIssueList!.splice(sourceIndex, 1); // 원래 위치에서 제거
        usedIssueList!.splice(destinationIndex, 0, sourceItem); // 새로운 위치에 삽입
      } else return; // 이외의 목적지인 경우, 리턴
    } else return; // 이외의 시작지인 경우, 리턴
  };

  /** 완료 이슈 내용 삽입 요청 */
  const getIssueReportRequest = async (issueId: number, sourceIndex: number): Promise<any> => {
    instanceAuth
      .get(`/reports/releases/${issueId}`)
      .then((response) => {
        if (response.data.code == 200) {
          let tmpPosition = editorData.length;
          editorRef.current
            ?.getInstance()
            .setHTML(editorData + `<h2>${response.data.result.issueTitle}</h2><p>${response.data.result.reportContent ?? ""}</p><br>`);
          setEditorData(editorRef.current.getInstance().getHTML());

          usedIssueList!.splice(usedIssueList.length, 0, doneIssueList[sourceIndex]);

          usedIssueList[usedIssueList.length - 1].startPosition = tmpPosition;
          usedIssueList[usedIssueList.length - 1].endPosition = editorRef.current.getInstance().getHTML().length;

          doneIssueList!.splice(sourceIndex, 1);
        } else {
        }
      })
      .catch((error) => {});
  };

  /** 릴리즈 레포트 수정 요청 */
  const rnotePatchRequest = async () => {
    const enrolledIssueList: EnrolledIssue[] = usedIssueList;
    const rnotePatchData = {
      projectId: pj.projectId,
      versionMajor: versionMajor,
      versionMinor: versionMinor,
      versionPatch: versionPatch,
      releaseContent: editorData,
      issueList: enrolledIssueList,
    };
    instanceAuth
      .patch(`/releases/${releaseId}`, rnotePatchData)
      .then((response) => {
        if (response.data.code == 200) {
          setModalData({
            title: "안내 메세지",
            description: "릴리즈 노트가 수정되었습니다.",
            btnTitle: "확인",
            closeModal: () => setIsModalOpen(false),
          });
        } else {
        }
      })
      .catch(() => {
        setModalData({
          title: "오류",
          description: "정상적인 접근이 아닙니다.",
          btnTitle: "확인",
          closeModal: () => setIsModalOpen(false),
        });
      })
      .finally(() => {
        setIsModalOpen(true);
      });
  };

  return (
    <div className="flex flex-col overflow-hidden">
      <MilestoneNavbar />
      <div className="flex flex-row w-screen mt-[1vh]">
        {isModalOpen && (
          <Modal title={modalData.title} description={modalData.description} btnTitle={modalData.btnTitle} closeModal={() => modalData.closeModal()} />
        )}
        <div className="flex flex-row rounded-t-lg border border-gray-300 bg-gray-100 w-[95vw] mx-auto mt-[2vh] shadow-inner h-screen px-2 py-5">
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="border rounded-t-lg ml-[2vw] mr-[2vw] bg-white w-[19vw] shadow-[2px_2px_10px_2px_rgba(0,0,0,0.1)] mt-[2vh]">
              <div className="border-b font-suitSB border-gray-400 p-[1vw] flex justify-between drop-shadow-lg">완료 이슈 리스트</div>
              <Droppable droppableId="DONE" key="DONE">
                {(provided) => (
                  <div className="pt-[2vh]" ref={provided.innerRef} {...provided.droppableProps}>
                    {doneIssueList.map((issue, index) => (
                      <Draggable draggableId={issue.issueId.toString()} key={issue.issueId.toString()} index={index}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <RnoteIssueCard key={issue.issueId} issue={issue} />
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
                  <div className="flex border-gray-200 border rounded-lg bg-white shadow-[2px_2px_10px_1px_rgba(0,0,0,0.1)] w-[68.5vw]">
                    <div className="my-auto mx-[1vw]">
                      <p className="font-suitSB">릴리즈 노트 에디터</p>
                    </div>
                    <div className="ml-[2vw] flex items-center">
                      <p className="font-suitL text-base">Release Version .</p>
                      <input
                        type="text"
                        placeholder="0"
                        maxLength={3}
                        value={versionMajor}
                        onChange={handleChangeVerMajor}
                        className="border-none font-suitM outline-none resize-none w-[3.6vw] h-full focus:outline-none focus:border-none focus:ring-0"
                      />
                    </div>
                    <div className="flex items-center">
                      <p className="font-suitL text-base">.</p>
                      <input
                        type="text"
                        placeholder="0"
                        maxLength={3}
                        value={versionMinor}
                        onChange={handleChangeVerMinor}
                        className="border-none font-suitM outline-none h-full w-[3.6vw] resize-none focus:outline-none focus:border-none focus:ring-0"
                      />
                    </div>
                    <div className="flex items-center">
                      <p className="font-suitL text-base">.</p>
                      <input
                        type="text"
                        placeholder="0"
                        maxLength={3}
                        value={versionPatch}
                        onChange={handleChangeVerPatch}
                        className="border-none font-suitM outline-none h-full w-[3.6vw] resize-none focus:outline-none focus:border-none focus:ring-0"
                      />
                    </div>
                    <div className="flex ml-auto items-center">
                      <button
                        type="button"
                        onClick={() => navigate(`/project/${projectKey}/releasesnote`)}
                        className="focus:outline-none text-gray-900 bg-white hover:bg-grey-300 focus:ring-0 focus:border-none font-suitM text-[0.8vw] py-2 w-[5.3vw] ml-[1vw] h-[3.7vh] border-r-2 border-gray-200"
                      >
                        나가기
                      </button>
                      <button
                        onClick={rnotePatchRequest}
                        type="button"
                        className="focus:outline-none text-gray-900 bg-white font-suitM text-[0.8vw] py-2 w-[5.3vw] h-[3.7vh] border-r-2 border-gray-200"
                      >
                        저장하기
                      </button>
                      <button
                        type="button"
                        onClick={rnotePublishRequest}
                        className="focus:outline-none text-gray-900 bg-white font-suitM rounded-lg text-[0.8vw] py-2 mr-[0.5vw] w-[5.3vw] h-[3.7vh]"
                      >
                        발행하기
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <Droppable droppableId="Editor" key="Editor">
                    {(provided) => (
                      <div
                        className="font-suitM bg-gray-100 h-full w-[49vw] rounded-2xl shadow-[1px_2px_10px_1px_rgba(0,0,0,0.1)] mt-[2vh]"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        <div>
                          <Editor
                            previewStyle="vertical"
                            height="700px"
                            initialEditType="wysiwyg"
                            initialValue={editorData}
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
                              ["ul", "ol", "task"],
                              ["image", "link"],
                              ["code", "codeblock"],
                            ]}
                            hooks={{
                              addImageBlobHook: async (blob, callback) => {
                                const imgData = new FormData();
                                imgData.append("imgData", blob);
                                instanceImageAuth
                                  .post(`/releases/images/upload`, imgData)
                                  .then((response) => {
                                    if (response.data.code == 200) {
                                      callback(response.data.result);
                                    }
                                  })
                                  .catch(() => {
                                    callback("");
                                  });
                              },
                            }}
                          />
                        </div>
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                  <div className="border rounded-t-lg ml-[1.5vw] mr-[1vw] bg-white w-[18vw] shadow-[2px_2px_10px_2px_rgba(0,0,0,0.1)] mt-[2vh]">
                    <div className="border-b font-suitSB border-gray-400 p-[1vw] flex justify-between drop-shadow-lg">
                      등록 이슈 리스트
                      <p className="font-suitM text-lg text-grey-3 mr-[1vw]">{usedIssueList.length}</p>
                    </div>
                    <Droppable droppableId="Used" key="Used">
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps} className="flex flex-col mb-[1vh] pt-[1vw]">
                          {usedIssueList.map((issue, index) => (
                            <Draggable draggableId={issue.issueId.toString()} key={issue.issueId.toString()} index={index}>
                              {(provided) => (
                                <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                  <RnoteUsedIssueCard key={index} issue={issue} index={index} onDelClick={handleDelete} />
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
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
