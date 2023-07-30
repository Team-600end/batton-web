import React from "react";
import right_arrow from "@images/common/chevron_right.svg";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { projectNavs } from "@src/state/projectState";
import { useRecoilState } from "recoil";
import { ProjectNav } from "@typess/project";

export default function MilestoneNavbar() {
  const navagate = useNavigate();
  const [projectNav, setProjectNav] = useRecoilState(projectNavs);
  let { projectKey } = useParams();

  const pjName = projectNav.find((element: ProjectNav) => element.projectKey.toString() == projectKey);

  return (
    <div className="mt-[10vh]">
      <span className="flex ml-[5vw] m-[1vw] mb-0 font-suitM items-center">
        프로젝트
        <img src={right_arrow} />
        <button className="flex items-center font-suitM text-lg text-primary-3" onClick={() => navagate(`/project/${projectKey}/dashboard`)}>
          {pjName?.projectTitle}
        </button>
      </span>
    </div>
  );
}
