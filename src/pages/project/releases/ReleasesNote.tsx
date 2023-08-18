import React, { useState, useEffect } from "react";
import ProjectNavbar from "@src/components/nav/ProjectNavbar";
import releases_info from "@images/releasesPuzzle/releases_info.svg";
import MilestoneNavbar from "@components/nav/MilestoneNavbar";
import Plus_img from "@images/icons/plus.svg";
import { useNavigate, useParams } from "react-router-dom";
import { Release } from "@src/types/Release";
import RnoteButton from "@src/components/project/releases/RnoteButton";
import ReleasesPuzzle from "@src/components/project/releases/ReleasesPuzzle";
import { useRecoilState } from "recoil";
import { projectNavs } from "@src/state/projectState";
import { ProjectNav } from "@src/types/project";
import { instanceAuth } from "@src/types/AxiosInterface";

export default function ReleasesNote() {
  const navigate = useNavigate();
  const [releasesList, setReleasesList] = useState<Release[]>([]);
  const [vMj, setVMj] = useState(0);
  const [vMi, setVMi] = useState(0);
  const [vPt, setVPt] = useState(0);

  const [projectNav, setProjectNav] = useRecoilState(projectNavs);
  let { projectKey } = useParams();
  const pj = projectNav.find((element: ProjectNav) => element.projectKey.toString() == projectKey);

  useEffect(() => {
    ReleasesNoteRequest();
  }, []);

  const ReleasesNoteRequest = () => {
    instanceAuth
      .get(`/releases/project/${pj.projectId}`)
      .then((response) => {
        if (response.data.code == 200) {
          setReleasesList(response.data.result && [...response.data.result.releasesList].reverse());
          setVMj(response.data.result.latestVersionMajor);
          setVMi(response.data.result.latestVersionMinor);
          setVPt(response.data.result.latestVersionPatch);
        } else if (response.data.code == 710) {
          setReleasesList([]);
        }
      })
      .catch((error) => {});
  };

  return (
    <div className="flex flex-col">
      <MilestoneNavbar />
      <ProjectNavbar />
      <div className="bg-gray-100 rounded-t-lg border border-gray-300 w-[90vw] m-auto mt-[2vh] flex flex-col shadow-inner min-h-[100vh]">
        <div className="flex mx-auto p-4">
          <div className="flex-column">
            <span className="bg-green-100 text-green-400 text-xs font-suitM mr-2 px-2.5 py-0.5 rounded-full border border-green-400">Latest</span>
            {releasesList && (
              <p className="text-4xl font-suitB text-black">
                v.{vMj}.{vMi}.{vPt}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <img src={releases_info} alt="releases_info" className="p-2 w-[50vw] select-none pointer-events-none" />
            <ReleasesPuzzle />
          </div>
        </div>

        <div className="flex flex-col p-4 pt-0 mx-auto">
          <div className="flex w-[70vw]">
            <p className="text-2xl font-suitB text-black mx-[2vw] my-[3vh]">릴리즈 히스토리</p>
            <button
              className="rounded-md bg-white text-primary-4 px-3 border border-primary-4 flex items-center hover:bg-primary-5 font-suitM text-base my-7"
              onClick={() => navigate(`/project/${projectKey}/releasesnote/write`)}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-[0.3vw]">
                <path d="M5.66667 5.99967H1H5.66667Z" fill="#5AAE8A" />
                <path
                  d="M5.66667 1.33301V5.99967M5.66667 5.99967V10.6663M5.66667 5.99967H10.3333M5.66667 5.99967H1"
                  stroke="#5AAE8A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              릴리즈 노트 생성
            </button>
          </div>
          <div>
            {releasesList.map((release) => (
              <RnoteButton release={release} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
