import { useEffect, useState } from "react";
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

export default function PublishedReleasesPage() {
  const navigate = useNavigate();
  const { releaseId } = useParams();
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
        if (response.data.code == 200) {
          setReleasesData(response.data.result as ReleasesData);
          setEditorData(response.data.result.releaseContent as string);
        } else {
        }
      })
      .catch((error) => {});
  };

  return (
    <div className="flex flex-col mt-[10vh]">
      <div className="bg-gray-100 rounded-t-lg border border-gray-300 w-[90vw] m-auto mt-[2vh] flex flex-col min-h-screen h-fit">
        {isModalOpen && (
          <Modal title={modalData.title} description={modalData.description} btnTitle={modalData.btnTitle} closeModal={() => modalData.closeModal()} />
        )}
        <div className="bg-gray-50 rounded-t-lg border border-gray-300 w-[70vw] m-auto mt-[5vh] flex flex-col min-h-screen h-fit">
          <div className="max-w-screen-xl flex items-start flex-wrap mx-auto p-4 justify-end mt-5 mb-3 w-[65vw]"></div>
          <div className="max-w-screen-xl flex-column items-start flex-wrap mx-auto p-4 mt-3 mb-3 w-[50vw]">
            <div className="flex flex-row mb-0 justify-between">
              <p className="text-4xl font-suitB text-black mb-3">
                v.{releasesData.versionMajor}.{releasesData.versionMinor}.{releasesData.versionPatch}
              </p>
              <p className="text-xl font-suitB text-black mb-3" style={{ alignSelf: "flex-end" }}>
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
                  <p className="text-base font-suitM text-black">{issue.issueTitle}</p>
                </div>
                <hr className="h-px my-0 bg-gray-200 border-0"></hr>
              </>
            ))}
            <div className="my-[5vh]">{editorData && <Viewer initialValue={editorData} />}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
