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

  const pj = projectNav.find(
    (element: ProjectNav) => element.projectKey.toString() == projectKey
  );

  return (
    <div className="rounded-md font-suitM border border-gray-300 w-[16.5vw] h-[14vh] mb-[2vh] p-[1vw] shadow bg-white mx-auto">
      <div className="bg-[#FFED8F] w-[0.5vw] rounded-l-lg" />
      <div className="flex items-center justify-between mb-[1vh]">
        <IssueBadge issueType={props.issue.issueTag} />
      </div>
      <p className="text-sm">{props.issue.issueTitle}</p>
      <div className="flex items-center justify-between mt-[1.7vh]">
        <p className="text-xs font-suitM text-gray-400 break-keep">
          {pj.projectTitle}-{props.issue.issueKey}
        </p>
        <div className="flex items-center ml-auto">
          {props.issue.nickname && (
            <img
              src={
                props.issue.profileImage == "" ||
                props.issue.profileImage == null
                  ? default_avatar_img
                  : props.issue.profileImage
              }
              className="w-[25px] h-[25px] rounded-full object-cover"
            />
          )}
          <p className="text-xs font-suitM text-gray-700 break-keep ml-1">
            {props.issue.nickname}
          </p>
        </div>
      </div>
    </div>
  );
}
