import React from "react";
import IssueBadge from "@src/components/project/issue/IssueBadge";
import { UsedIssue } from "@typess/Issue";
import kebap_img from "@assets/images/icons/kebap_black.svg";
import default_avatar_img from "@images/common/default_profile.svg";
import x_icon from "@images/icons/x_gray.svg";

type IssueUsedCardProps = {
  issue: UsedIssue;
  onDelClick: (index: number) => void;
  index: number;
};

export default function RnoteUsedIssueCard(props: IssueUsedCardProps) {
  const handleDelete = () => {
    props.onDelClick(props.index);
    console.log("===== 삭제 요청 =====> " + props.index);
  };

  return (
    <div className="rounded-md font-suitM border border-gray-400 bg-gray-100 w-[15.5vw] h-[5vh] p-[0.7vw] mb-[0.6vw] shadow-sm flex items-center mx-auto">
      <IssueBadge issueType={props.issue.issueTag} />
      <p className="font-suitL text-xs text-gray-700 mx-[1vw]">{props.issue.issueTitle.length < 8 ? props.issue.issueTitle : props.issue.issueTitle.substring(0, 7).concat("...")}</p>
      <button onClick={handleDelete} className="flex items-center justify-center ml-auto mr-[0.4vw]"><img src={x_icon}/></button>
    </div>
  );
}
