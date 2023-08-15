import React, { useEffect, useState } from "react";
import Navbar from "@components/nav/Navbar";
import block from "@images/releasesPuzzle/releases_info.svg";
import ProjectNavbar from "@src/components/nav/ProjectNavbar";
import MilestoneNavbar from "@src/components/nav/MilestoneNavbar";
import IssueBadge from "@src/components/project/issue/IssueBadge";
import { AbsIssue } from "@src/types/Issue";
import { useNavigate, useParams } from "react-router-dom";
import { instanceAuth } from "@src/types/AxiosInterface";
import { Viewer } from "@toast-ui/react-editor";
import { PublishType } from "@src/types/Release";
import Modal, { CommonModalInterface } from "@src/components/CommonModal";

interface ReleasesData {
  id: number;
  versionMajor: number;
  versionMinor: number;
  versionPatch: number;
  publishedData: string;
  releaseContent: string;
  isPublished: PublishType;
  issueList?: AbsIssue[];
}

export default function ReleasesPage() {
  const navigate = useNavigate();
  const { projectKey, releaseId } = useParams();
  const [editorData, setEditorData] = useState<string>("");
  const [releasesData, setReleasesData] = useState<ReleasesData>({
    id: null,
    versionMajor: null,
    versionMinor: null,
    versionPatch: null,
    publishedData: "",
    releaseContent: "",
    isPublished: null,
    issueList: [],
  });
  // CommonModal 표시
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // CommonModal Data
  const [modalData, setModalData] = useState<CommonModalInterface>({
    title: "",
    description: "",
    btnTitle: "",
    closeModal: () => {},
  });

  const viewer = new Viewer({
    el: document.querySelector("#viewer"),
    height: "600px",
    initialValue: editorData,
  });

  useEffect(() => {
    releasesPageRequest();
  }, []);

  const releasesPageRequest = async () => {
    instanceAuth
      .get(`/releases/${releaseId}`)
      .then((response) => {
        console.log(response.data);
        if (response.data.code == 200) {
          setReleasesData(response.data.result as ReleasesData);
          setEditorData(response.data.result.releaseContent as string);
        } else {
          console.log("response error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const releasesDeleteRequest = async () => {
    instanceAuth
      .delete(`/releases/${releaseId}`)
      .then((response) => {
        if (response.data.code == 200) {
          navigate(`/project/${projectKey}/releasesnote`);
        } else {
          console.log("response error");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const releasesEditRequest = async () => {
    navigate(`/project/${projectKey}/releasesnote/${releaseId}/edit`);
  };

  const releasesPublishRequest = async () => {
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
            },
          });
        } else {
          console.log("response error");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {setIsModalOpen(true); releasesPageRequest()});
  };

  return (
    <div className="flex flex-col">
      <MilestoneNavbar />
      <ProjectNavbar />
      <div className="bg-gray-100 rounded-t-lg border border-gray-300 w-[90vw] m-auto mt-[2vh] flex flex-col h-screen">
        {isModalOpen && (
          <Modal
            title={modalData.title}
            description={modalData.description}
            btnTitle={modalData.btnTitle}
            closeModal={() => modalData.closeModal()}
          />
        )}
        <div className="bg-gray-50 rounded-t-lg border border-gray-300 w-[70vw] m-auto mt-[5vh] flex flex-col h-screen">
          <div className="max-w-screen-xl flex items-start flex-wrap mx-auto p-4 justify-end mt-5 mb-3 w-[65vw]">
            {releasesData.isPublished == "UNPUBLISH" && (
              <div>
                <button
                  type="button"
                  onClick={releasesEditRequest}
                  className="focus:outline-none text-primary-4 border border-primary-4 bg-white hover:bg-primary-5 focus:ring-4 focus:ring-green-300 font-suitM rounded-lg text-base px-5 py-1.5 mr-2 mb-2"
                >
                  수정
                </button>
                <button
                  type="button"
                  onClick={releasesDeleteRequest}
                  className="focus:outline-none text-error-3 bg-white border border-error-3 hover:bg-error-4 focus:ring-4 focus:ring-red-300 font-suitM rounded-lg text-base px-5 py-1.5 mr-2 mb-2"
                >
                  삭제
                </button>
                <button
                  type="button"
                  onClick={releasesPublishRequest}
                  className="focus:outline-none text-white bg-primary-4 hover:bg-primary-2 focus:ring-4 focus:ring-primary-5 font-suitM rounded-lg text-base px-5 py-1.5 mr-2 mb-2"
                >
                  발행
                </button>
              </div>
            )}
          </div>
          <div className="max-w-screen-xl flex-column items-start flex-wrap mx-auto p-4 mt-3 mb-3 w-[50vw]">
            <div className="flex flex-row mb-0 justify-between">
              <p className="text-4xl font-suitB text-black mb-3">
                v.{releasesData.versionMajor}.{releasesData.versionMinor}.
                {releasesData.versionPatch}
              </p>
              <p
                className="text-xl font-suitB text-black mb-3"
                style={{ alignSelf: "flex-end" }}
              >
                {releasesData.publishedData}
              </p>
            </div>
            <hr className="h-1.5 mb-5 bg-primary-4 border-0"></hr>
            {releasesData.issueList.map((issue, index) => (
              <>
                <div className="flex flex-row my-2" key={index}>
                  <div className="w-24 flex justify-start">
                    <IssueBadge issueType={issue.issueTag} />
                  </div>
                  <p className="text-base font-suitM text-black">
                    {issue.issueTitle}
                  </p>
                </div>
                <hr className="h-px my-0 bg-gray-200 border-0"></hr>
              </>
            ))}
            <div className="my-[5vh]">
              {editorData && <Viewer initialValue={editorData} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
