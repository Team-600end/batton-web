import React from "react";
import IssueBadge from "@src/components/project/issue/IssueBadge";
import { DoneIssue, Issue } from "@typess/Issue";
import kebap_img from "@assets/images/icons/kebap_black.svg";
import default_avatar_img from "@images/common/default_profile.svg";
import { useRecoilState } from "recoil";
import { projectNavs } from "@src/state/projectState";
import { useParams } from "react-router-dom";
import { ProjectNav } from "@src/types/project";

type IssueCardProps = {
  issue: DoneIssue;
};

export default function RnoteIssueCard(props: IssueCardProps) {
  const [projectNav, setProjectNav] = useRecoilState(projectNavs);
  let { projectKey } = useParams();

  const pj = projectNav.find((element: ProjectNav) => element.projectKey.toString() == projectKey);

  return (
    <div
      className="rounded-md font-suitM border border-gray-300 w-[16.5vw] h-[14vh] mb-[2vh] p-[1vw] shadow bg-white mx-auto"
    >
      <div className="bg-[#FFED8F] w-[0.5vw] rounded-l-lg" />
      <div className="flex items-center justify-between mb-[1vh]">
        <IssueBadge issueType={props.issue.issueTag} />
        <img src={kebap_img} style={{ marginRight: "-0.3vw" }} />
      </div>
      <p className="text-sm">{props.issue.issueTitle}</p>
      <div className="flex items-center justify-between mt-[1.7vh]">
        <p className="text-xs text-gray-400">
          {pj.projectTitle}-{props.issue.issueId}
        </p>
        {props.issue.nickname && (
          <img
            // src={props.issue.manager?.profileImg ?? default_avatar_img}
            src={default_avatar_img}
            className="ml-[5vw]"
          />
        )}
        <p className="text-xs text-gray-700">{props.issue?.nickname}</p>
      </div>
    </div>
  );
}
