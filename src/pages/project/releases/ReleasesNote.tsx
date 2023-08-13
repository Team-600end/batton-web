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
        console.log("====releasesList====");
        console.log(response.data);
        if (response.data.code == 200) {
          setReleasesList(response.data.result && [...response.data.result].reverse());
        } else if (response.data.code == 710) {
          // alert("릴리즈가 없습니다.");
          setReleasesList([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex flex-col">
      <MilestoneNavbar />
      <ProjectNavbar />
      <div className="bg-gray-100 rounded-t-lg border border-gray-300 w-[90vw] m-auto mt-[2vh] flex flex-col shadow-inner h-screen">
        <div className="flex mx-auto p-4">
          <div className="flex-column">
            <span className="bg-green-100 text-green-400 text-xs font-suitM mr-2 px-2.5 py-0.5 rounded-full border border-green-400">Latest</span>
            <p className="text-4xl font-suitB text-black">v.3.0.1</p>
          </div>
          <div className="flex flex-col">
            <img src={releases_info} alt="releases_info" className="p-2 w-[50vw]" />
            <ReleasesPuzzle />
          </div>
        </div>

        <div className="flex flex-col p-4 pt-0 mx-auto">
          <p className="text-2xl font-suitB text-black mx-[2vw] my-[3vh]">{releasesList && "릴리즈 히스토리"}</p>
          <div>
            {releasesList.map((release) => (
              <RnoteButton release={release} />
            ))}
          </div>
        </div>

        <button
          onClick={() => navigate(`/project/${projectKey}/releasesnote/write`)}
          className="fixed bg-[#5AAE8A] w-[3.7vw] h-[3.7vw] bottom-[4vw] right-[8vw] rounded-full drop-shadow-xl"
        >
          <img src={Plus_img} className="mx-auto w-[2vw] h-[2vw]" />
        </button>
      </div>
    </div>
  );
}
