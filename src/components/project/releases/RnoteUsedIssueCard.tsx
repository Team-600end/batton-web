import React from "react";
import IssueBadge from "@src/components/project/issue/IssueBadge";
import { UsedIssue } from "@typess/Issue";
import kebap_img from "@assets/images/icons/kebap_black.svg";
import default_avatar_img from "@images/common/default_profile.svg";

type IssueUsedCardProps = {
  issue: UsedIssue;
};

export default function RnoteUsedIssueCard(props: IssueUsedCardProps) {
  return (
    <div className="rounded-md font-suitM border border-gray-400 bg-grey-6 w-[14vw] h-[5vh] mr-[1vw] p-[0.7vw] shadow-sm flex items-center">
      <IssueBadge issueType={props.issue.issueTag} />
      <p className="font-suitL text-xs text-gray-700 mx-[1vw]">{props.issue.issueTitle.length < 8 ? props.issue.issueTitle : props.issue.issueTitle.substring(0, 7).concat("...")}</p>
      <button className="flex items-center justify-center ml-[1vw]">X</button>
    </div>
  );
}
