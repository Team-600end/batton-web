import React from "react";
import IssueBadge from "@src/components/project/issue/IssueBadge";
import Issue from "@typess/Issue";
import kebap_img from "@assets/images/icons/kebap_black.svg";
import default_avatar_img from "@images/common/default_profile.svg";

type IssueCardProps = {
  issue: Issue;
};

export default function IssueCard(props: IssueCardProps) {
  return (
    <div className="rounded-md border border-gray-300 w-[16.5vw] h-[14vh] mb-[2vh] p-[1vw] shadow bg-white">
      <div className="flex items-center justify-between mb-[1vh]">
        <IssueBadge issueType={props.issue.type} />
        <img src={kebap_img} style={{ marginRight: "-0.3vw", cursor: "pointer" }} />
      </div>
      <p className="text-sm font-suitM">{props.issue.title}</p>
      <div className="flex items-center justify-between mt-[1.7vh]">
        <p className="text-xs font-suitM text-gray-400">
          {props.issue.team}-{props.issue.id}
        </p>
        {props.issue.manager && <img src={props.issue.manager?.profileImg ?? default_avatar_img} className="ml-[5vw]" />}
        <p className="text-xs font-suitM text-gray-700">{props.issue.manager?.name}</p>
      </div>
    </div>
  );
}
