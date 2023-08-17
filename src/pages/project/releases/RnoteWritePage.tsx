import React, { useEffect, useRef, useState } from "react";
import {
  DoneIssue,
  EnrolledIssue,
  IssueType,
  Manager,
  UsedIssue,
} from "@typess/Issue";
import RnoteIssueCard from "@components/project/releases/RnoteIssueCard";
import refresh_img from "@assets/images/icons/refresh.svg";
import "@toast-ui/editor/dist/toastui-editor.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/i18n/ko-kr";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import Modal, { CommonModalInterface } from "@src/components/CommonModal";
import RnoteUsedIssueCard from "@components/project/releases/RnoteUsedIssueCard";
import MilestoneNavbar from "@src/components/nav/MilestoneNavbar";
import { instanceAuth, instanceImageAuth } from "@src/types/AxiosInterface";
import { useRecoilState } from "recoil";
import { projectNavs } from "@src/state/projectState";
import { ProjectNav } from "@src/types/project";
import { useNavigate, useParams } from "react-router-dom";

// const doneIssues: DoneIssue[] = [
//   {
//     issueTag: "CHANGED",
//     issueKey: 1,
//     issueTitle: "일반 설문조사 종류 변경",
//     nickname: "강창훈",
//     issueContent:
//       "설문조사 문항 종류를 변경하였습니다. 기존 체크박스와 라디오 버튼에서, 중복 선택 가능 토글을 만들고 객관식으로 통일을 진행했습니다.",
//     issueId: 1,
//   },
//   {
//     issueTag: "NEW",
//     issueKey: 2,
//     issueTitle: "설문조사 GPS 배포 기능",
//     nickname: "임혜균",
//     issueContent:
//       "<strong>GPS 기반 설문조사</strong>: 이제 사용자들은 위치 기반 데이터를 설문조사에 활용할 수 있습니다. 설문조사 참가자들의 지리적 위치에 따른 응답을 분석하고 이를 바탕으로 더욱 구체적인 인사이트를 도출할 수 있습니다. <br><br><strong>지역 특성에 맞는 설문조사</strong>: GPS 기능을 활용해 특정 지역의 특성에 맞춘 설문조사를 진행할 수 있습니다. 이를 통해 지역별로 다른 문화나 관습, 선호도 등을 반영한 보다 정확한 데이터를 얻을 수 있습니다. <br><br><strong>실시간 위치</strong> 반영: 참가자의 동의 하에 실시간 위치 반영이 가능하며, 이를 통해 설문조사 결과에 대한 더욱 심층적인 분석이 가능합니다.",
//     issueId: 3,
//   },
//   {
//     issueTag: "NEW",
//     issueKey: 3,
//     issueTitle: "중복 배포 이슈",
//     nickname: "이서현",
//     issueContent:
//       "중복 배포 방지 기능은 사용자들이 동일하거나 매우 유사한 설문조사를 여러 번 배포하는 것을 방지하는 새로운 기능입니다. 이 기능은 자동으로 시스템이 사용자가 작성하고 있는 설문조사와 과거에 배포된 설문조사를 비교하며, 이러한 중복성을 탐지합니다. <br><br><strong>자동 유사성 체크</strong>: 사용자가 설문조사를 작성하는 동안, 시스템은 이전에 생성된 설문조사와 현재 작성 중인 설문조사를 비교합니다. 이는 문항 내용, 선택지, 설문조사의 목적 등 다양한 요소를 기반으로 유사성을 체크합니다. <br><br><strong>중복 알림</strong>: 만약 시스템이 중복성을 탐지하면, 사용자에게 알림을 보냅니다. 이 알림은 사용자가 중복 배포를 방지할 수 있도록 돕습니다. 사용자는 알림을 통해 중복 배포를 예방하거나, 필요하다면 설문조사의 내용을 수정하거나 개선할 수 있습니다. <br><br><strong>유사성 점수</strong>: 설문조사가 완성되면, 시스템은 설문조사의 유사성 점수를 제공합니다. 이 점수는 0에서 100까지 범위이며, 점수가 높을수록 이전에 배포된 설문조사와 유사성이 높다는 것을 의미합니다.",
//     issueId: 2,
//   }
// ];
// const usedIssues: UsedIssue[] = [];

export default function RnoteWritePage() {
  const { projectKey } = useParams();
  const navigate = useNavigate();
  const editorRef = useRef<Editor>(null);
  // Project Recoil
  const [projectNav, setProjectNav] = useRecoilState(projectNavs);
  const pj = projectNav.find(
    (element: ProjectNav) => element.projectKey.toString() == projectKey
  );
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
    rnoteWritePageRequest();
  }, []);

  /** 완료 이슈 조회 요청 */
  const rnoteWritePageRequest = async () => {
    instanceAuth
      .get(`/issues/${pj.projectId}/done-list`)
      .then((response) => {
        if (response.data.code == 200) {
          console.log("서버데이터 : " + JSON.stringify(response.data.result));
          setDoneIssueList((response.data.result as DoneIssue[]) ?? []);
          console.log("상태관리 : " + doneIssueList);
        } else {
          console.log("response after error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const rnotePublishRequest = async () => {
    const enrolledIssueList: EnrolledIssue[] = usedIssueList;
    const rnoteCreateData = {
      projectId: pj.projectId,
      versionMajor: versionMajor,
      versionMinor: versionMinor,
      versionPatch: versionPatch,
      releaseContent: editorData,
      issueList: enrolledIssueList,
    };
    instanceAuth
      .post(`/releases`, rnoteCreateData)
      .then((response) => {
        console.log(response.data);
        if (response.data.code == 200) {
          instanceAuth
            .patch(`/releases/${response.data.result}/status`)
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
                console.log("response error");
              }
            })
            .catch((error) => {
              console.log(error);
            })
            .finally(() => {
              setIsModalOpen(true);
            });
        }
      })
      .catch(() => console.log("error"));
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
          editorRef.current
            .getInstance()
            .getHTML()
            .slice(0, targetStartPosition),
          editorRef.current
            .getInstance()
            .getHTML()
            .slice(
              targetEndPosition,
              editorRef.current.getInstance().getHTML().length
            ),
        ].join("")
      );
    setEditorData(editorRef.current.getInstance().getHTML());
    for (let num = targetIndex + 1; num < usedIssueList.length; num++) {
      // console.log("=====이슈 삭제 이벤트 발생=====");
      // console.log(usedIssueList[num].startPosition + " / " + usedIssueList[num].endPosition);
      usedIssueList[num].startPosition -= targetSize;
      usedIssueList[num].endPosition -= targetSize;
      // console.log(usedIssueList[num].startPosition + " / " + usedIssueList[num].endPosition);
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

        await getIssueReportRequest(
          doneIssueList[sourceIndex].issueId,
          sourceIndex
        );

        // editorRef.current
        //   ?.getInstance()
        //   .setHTML(
        //     editorData +
        //       `<h2>${
        //         issueReportContent.sourceIssueTitle
        //       }</h2><p>${issueReportContent.sourceIssueReport ?? ""}</p><br>`
        //   );
        // setEditorDate(editorRef.current.getInstance().getHTML());

        // console.log("실 조회 : " + editorRef.current.getInstance().getHTML()); // 삭제 필요
        // usedIssueList!.splice(usedIssueList.length, 0, doneIssueList[sourceIndex]);

        // usedIssueList[usedIssueList.length - 1].startPosition = tmpPosition;
        // usedIssueList[usedIssueList.length - 1].endPosition = editorRef.current.getInstance().getHTML().length;

        // console.log("시작 위치 :" + usedIssueList[usedIssueList.length - 1].startPosition); // 삭제 필요
        // console.log("끝 위치 :" + usedIssueList[usedIssueList.length - 1].endPosition); // 삭제 필요

        // doneIssueList!.splice(sourceIndex, 1); // 원래 위치에서 제거
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
        let sourceSize =
          usedIssueList[sourceIndex].endPosition -
          usedIssueList[sourceIndex].startPosition;
        let sourceContent = editorRef.current
          .getInstance()
          .getHTML()
          .slice(sourceStartPosition, sourceEndPositon);

        if (sourceIndex > destinationIndex) {
          // 상위로 옮길 경우

          // console.log("=======상위전환=======")
          // console.log("원본 시작 : " + sourceStartPosition + " / 원본 끝 : " + sourceEndPositon);
          // console.log("@" + sourceContent + "@");
          // console.log("목적지 시작 : " + targetStartPosition + " / 목적지 끝 : " + targetEndPosition);

          // console.log("==세부사항 출력==");
          // console.log("목적지 앞 : " + "@" + editorRef.current.getInstance().getHTML().slice(0,targetStartPosition) + "@");
          // console.log("소스 : " + "@" + sourceContent + "@");
          // console.log("목적지 앞 ~ 소스 앞 : " + "@" + editorRef.current.getInstance().getHTML().slice(targetStartPosition,sourceStartPosition) + "@");
          // console.log("소스 뒤 : " + "@" + editorRef.current.getInstance().getHTML().slice(sourceEndPositon,editorRef.current.getInstance().getHTML().length) + "@");

          editorRef.current
            .getInstance()
            .setHTML(
              [
                editorRef.current
                  .getInstance()
                  .getHTML()
                  .slice(0, targetStartPosition),
                sourceContent,
                editorRef.current
                  .getInstance()
                  .getHTML()
                  .slice(targetStartPosition, sourceStartPosition),
                editorRef.current
                  .getInstance()
                  .getHTML()
                  .slice(
                    sourceEndPositon,
                    editorRef.current.getInstance().getHTML().length
                  ),
              ].join("")
            );
          setEditorData(editorRef.current.getInstance().getHTML());
          // console.log(editorRef.current.getInstance().getHTML());
          usedIssueList[sourceIndex].startPosition = targetStartPosition;
          usedIssueList[sourceIndex].endPosition =
            targetStartPosition + sourceSize;
          for (let num = destinationIndex; num < sourceIndex; num++) {
            usedIssueList[num].startPosition += sourceSize;
            usedIssueList[num].endPosition += sourceSize;
          }
        } else {
          // 하위로 옮길 경우

          // console.log("=======하위전환=======")
          // console.log("원본 시작 : " + sourceStartPosition + "/ 원본 끝 : " + sourceEndPositon);
          // console.log("@" + sourceContent + "@");
          // console.log("목적지 시작 : " + targetStartPosition + "/ 목적지 끝 : " + targetEndPosition);

          // console.log("==세부사항 출력==");
          // console.log("소스 앞 : " + "@" + editorRef.current.getInstance().getHTML().slice(0,sourceStartPosition) + "@");
          // console.log("소스 뒤 ~ 목적지 뒤 : " + "@" + editorRef.current.getInstance().getHTML().slice(sourceEndPositon,targetEndPosition) + "@");
          // console.log("소스 컨텐츠 : " + "@" + sourceContent + "@");
          // console.log("목적지 뒤 : " + "@" + editorRef.current.getInstance().getHTML().slice(targetEndPosition,editorRef.current.getInstance().getHTML().length) + "@");

          editorRef.current
            .getInstance()
            .setHTML(
              [
                editorRef.current
                  .getInstance()
                  .getHTML()
                  .slice(0, sourceStartPosition),
                editorRef.current
                  .getInstance()
                  .getHTML()
                  .slice(sourceEndPositon, targetEndPosition),
                sourceContent,
                editorRef.current
                  .getInstance()
                  .getHTML()
                  .slice(
                    targetEndPosition,
                    editorRef.current.getInstance().getHTML().length
                  ),
              ].join("")
            );
          setEditorData(editorRef.current.getInstance().getHTML());
          for (let num = sourceIndex + 1; num <= destinationIndex; num++) {
            usedIssueList[num].startPosition -= sourceSize;
            usedIssueList[num].endPosition -= sourceSize;
          }
          usedIssueList[sourceIndex].startPosition =
            usedIssueList[destinationIndex].endPosition;
          usedIssueList[sourceIndex].endPosition =
            usedIssueList[sourceIndex].startPosition + sourceSize;
        }

        const sourceItem = usedIssueList![sourceIndex];
        usedIssueList!.splice(sourceIndex, 1); // 원래 위치에서 제거
        usedIssueList!.splice(destinationIndex, 0, sourceItem); // 새로운 위치에 삽입
      } else return; // 이외의 목적지인 경우, 리턴
    } else return; // 이외의 시작지인 경우, 리턴
  };

  /** 완료 이슈 내용 삽입 요청 */
  const getIssueReportRequest = async (
    issueId: number,
    sourceIndex: number
  ): Promise<any> => {
    instanceAuth
      .get(`/reports/releases/${issueId}`)
      .then((response) => {
        if (response.data.code == 200) {
          let tmpPosition = editorData.length;
          editorRef.current
            ?.getInstance()
            .setHTML(
              editorData +
                `<h2>${response.data.result.issueTitle}</h2><p>${
                  response.data.result.reportContent ?? ""
                }</p><br>`
            );
          setEditorData(editorRef.current.getInstance().getHTML());

          usedIssueList!.splice(
            usedIssueList.length,
            0,
            doneIssueList[sourceIndex]
          );

          usedIssueList[usedIssueList.length - 1].startPosition = tmpPosition;
          usedIssueList[usedIssueList.length - 1].endPosition =
            editorRef.current.getInstance().getHTML().length;

          doneIssueList!.splice(sourceIndex, 1); // 원래 위치에서 제거
          // setEditorDate(editorRef.current.getInstance().getHTML());
          //   return {
          //     issueTitle: response.data.result.issueTitle,
          //     reportContent: response.data.result.reportContent
          // };
        } else {
          console.log("response after error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const rnoteCreateRequest = async () => {
    const enrolledIssueList: EnrolledIssue[] = usedIssueList;
    const rnoteCreateData = {
      projectId: pj.projectId,
      versionMajor: versionMajor,
      versionMinor: versionMinor,
      versionPatch: versionPatch,
      releaseContent: editorData,
      issueList: enrolledIssueList,
    };
    instanceAuth
      .post(`/releases`, rnoteCreateData)
      .then((response) => {
        console.log(response.data);
        if (response.data.code == 200) {
          console.log("==========================================");
          console.log(rnoteCreateData.releaseContent);
          setModalData({
            title: "안내 메세지",
            description: "작성하신 릴리즈 레포트가 저장되었습니다.",
            btnTitle: "확인",
            closeModal: () => {
              setIsModalOpen(false);
              navigate(`/project/${projectKey}/releasesnote`);
            },
          });
        } else {
          console.log("response error");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsModalOpen(true);
        console.log(modalData);
      });
  };

  return (
    <div className="flex flex-col overflow-hidden">
      <MilestoneNavbar />
      <div className="flex flex-row w-screen mt-[1vh]">
        {isModalOpen && (
          <Modal
            title={modalData.title}
            description={modalData.description}
            btnTitle={modalData.btnTitle}
            closeModal={() => modalData.closeModal()}
          />
        )}
        <div className="flex flex-row rounded-t-lg border border-gray-300 bg-gray-100 w-[95vw] mx-auto mt-[2vh] shadow-inner min-h-screen px-2 py-5 h-fit">
          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="border rounded-t-lg ml-[2vw] mr-[2vw] bg-white w-[19vw] shadow-[2px_2px_10px_2px_rgba(0,0,0,0.1)] mt-[2vh] min-h-screen h-fit">
              <div className="border-b font-suitSB border-gray-400 p-[1vw] flex justify-between drop-shadow-lg">
                완료 이슈 리스트
              </div>
              <Droppable droppableId="DONE" key="DONE">
                {(provided) => (
                  <div
                    className="pt-[2vh]"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {doneIssueList.map((issue, index) => (
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
                    <div className="my-auto mx-[1vw] h-[3.7vh] border-r-2 border-gray-200 flex items-center">
                      <p className="font-suitSB pl-[0.3vw] pr-[1.5vw]">
                        릴리즈 노트 에디터
                      </p>
                    </div>
                    <div className="ml-[0.5vw] flex items-center">
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
                        onClick={() =>
                          navigate(`/project/${projectKey}/releasesnote`)
                        }
                        className="focus:outline-none text-gray-900 bg-white font-suitM text-[0.8vw] py-2 w-[5.3vw] ml-[1vw] h-[3.7vh] border-r-2 border-gray-200"
                      >
                        나가기
                      </button>
                      <button
                        onClick={rnoteCreateRequest}
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
                        className="font-suitM bg-gray-100 min-h-screen w-[49vw] rounded-2xl shadow-[1px_2px_10px_1px_rgba(0,0,0,0.1)] mt-[2vh] h-fit"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        <div>
                          <Editor
                            previewStyle="vertical"
                            height="1000px"
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
                              ["ul", "ol", "task"],
                              ["image", "link"],
                              ["code", "codeblock"],
                            ]}
                            hooks={{
                              addImageBlobHook: async (blob, callback) => {
                                const imgData = new FormData();
                                imgData.append('imgData', blob);
                                instanceImageAuth
                                  .post(`/releases/images/upload`, imgData)
                                  .then((response) => {
                                    if (response.data.code == 200) {
                                      callback(response.data.result);
                                    }
                                  })
                                  .catch(() => {
                                    callback("");
                                })
                              }
                            }}
                          />
                        </div>
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                  <div className="border rounded-t-lg ml-[1.5vw] mr-[1vw] bg-white w-[18vw] shadow-[2px_2px_10px_2px_rgba(0,0,0,0.1)] mt-[2vh] min-h-screen h-fit">
                    <div className="border-b font-suitSB border-gray-400 p-[1vw] flex justify-between drop-shadow-lg">
                      등록 이슈 리스트
                      <p className="font-suitM text-lg text-grey-3 mr-[1vw]">
                        {usedIssueList.length}
                      </p>
                    </div>
                    <Droppable droppableId="Used" key="Used">
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className="flex flex-col mb-[1vh] pt-[1vw]"
                        >
                          {usedIssueList.map((issue, index) => (
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
                                    index={index}
                                    onDelClick={handleDelete}
                                  />
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
