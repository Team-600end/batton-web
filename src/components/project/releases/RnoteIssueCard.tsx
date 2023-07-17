import React from "react";
import IssueBadge from "@src/components/project/issue/IssueBadge";
import Issue from "@typess/issue";
import kebap_img from "@assets/images/icons/kebap_black.svg";
import default_avatar_img from "@images/common/default_profile.svg";

type IssueCardProps = {
  issue: Issue;
};

export default function RnoteIssueCard(props: IssueCardProps) {
  return (
    <div className="rounded-md font-suitM border border-gray-300 w-[16.5vw] h-[14vh] mb-[2vh] p-[1vw] shadow">
      <div className="bg-[#FFED8F] w-[0.5vw] rounded-l-lg" />
      <div className="flex items-center justify-between mb-[1vh]">
        <IssueBadge issueType={props.issue.type} />
        <img src={kebap_img} style={{ marginRight: "-0.3vw" }} />
      </div>
      <p className="text-sm">{props.issue.title}</p>
      <div className="flex items-center justify-between mt-[1.7vh]">
        <p className="text-xs text-gray-400">
          {props.issue.team}-{props.issue.index}
        </p>
        {props.issue.manager && <img src={props.issue.manager?.profileImg ?? default_avatar_img} className="ml-[5vw]" />}
        <p className="text-xs text-gray-700">{props.issue.manager?.name}</p>
      </div>
    </div>
  );
}
