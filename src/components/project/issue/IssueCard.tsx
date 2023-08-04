import React, { useRef, useState } from "react";
import IssueBadge from "@src/components/project/issue/IssueBadge";
import { Issue } from "@typess/Issue";
import kebap_img from "@assets/images/icons/kebap_black.svg";
import default_avatar_img from "@images/common/default_profile.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { projectNavs } from "@src/state/projectState";
import { ProjectNav } from "@src/types/project";

type IssueCardProps = {
  issue: Issue;
};

export default function IssueCard(props: IssueCardProps) {
  // 프로젝트 recoil
  const [projectNav, setProjectNav] = useRecoilState(projectNavs);
  const { projectKey } = useParams();
  const pj = projectNav.find((element: ProjectNav) => element.projectKey.toString() == projectKey);


  const outside = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const [cardDd, setCardDd] = useState(false);

  return (
    <div>
      <div className="rounded-md border border-gray-300 w-[16.5vw] h-[14vh] mb-[2vh] p-[1vw] shadow bg-white">
        <div className="flex items-center justify-between mb-[1vh]">
          <IssueBadge issueType={props.issue.issueTag} />
          <img
            src={kebap_img}
            onClick={() => setCardDd(!cardDd)}
            style={{ marginRight: "-0.3vw", cursor: "pointer" }}
          />
        </div>
        <p className="text-sm font-suitM">{props.issue.issueTitle}</p>
        <div className="flex items-center justify-between mt-[1.7vh]">
          <p className="text-xs font-suitM text-gray-400">
            {pj.projectTitle}-{props.issue.issueKey}
          </p>
          {props.issue.nickname && (
            <img
              src={props.issue.profileImage ?? default_avatar_img}
              className="w-[25px] h-[25px] rounded-full object-cover ml-[6vw]"
            />
          )}
          <p className="text-xs font-suitM text-gray-700">
            {props.issue.nickname}
          </p>
        </div>
      </div>
      {cardDd && <div className="absolute z-20 w-[5vw] mt-[-11.2vh] ml-[10.5vw] border border-gray-300 bg-white divide-y divide-gray-200 rounded-md shadow">
        <button className="text-gray-900 block py-1 px-1 w-full hover:bg-gray-100 font-suitM text-[0.9vw]" onClick={() => navigate(`/project/${projectKey}/issue/${props.issue.id}`)}>
          이슈 조회
        </button>
        <button className="text-gray-900 block py-1 px-1 w-full hover:bg-gray-100 font-suitM text-[0.9vw]" onClick={() => navigate(`/project/${projectKey}/issue/${props.issue.id}/manage`)}>
          이슈 관리
        </button>
      </div>}
    </div>
  );
}
