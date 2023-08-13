import React from "react";
import { IssueStatus } from "@typess/Issue";

type IssueStatusBadgeProps = {
  issueStatus: IssueStatus;
};

export default function IssueStatusBadge(props: IssueStatusBadgeProps) {
  let backgroundColor = "";
  let textColor = "";
  let borderColor = "";
  let text = "";

  switch (props.issueStatus) {
    case "TODO":
      backgroundColor = "#FFFFFF";
      textColor = "#5AAE8A";
      borderColor = "#5AAE8A";
      text = "대기";
      break;
    case "PROGRESS":
      backgroundColor = "#FFFFFF";
      textColor = "#41A05F";
      borderColor = "#41A05F";
      text = "진행";
      break;
    case "REVIEW":
      backgroundColor = "#FFFFFF";
      textColor = "#285F43";
      borderColor = "#285F43";
      text = "검토";
      break;
    case "DONE":
      backgroundColor = "#FFFFFF";
      textColor = "#2E2D38";
      borderColor = "#2E2D38";
      text = "완료";
      break;
    case "RELEASED":
      backgroundColor = "#FFFFFF";
      textColor = "#4D5661";
      borderColor = "#4D5661";
      text = "발행됨";
      break;
  }

//   switch (props.issueStatus) {
//     case "TODO":
//       backgroundColor = "#FFFFFF";
//       textColor = "#99D8BF";
//       borderColor = "#99D8BF";
//       text = "대기";
//       break;
//     case "PROGRESS":
//       backgroundColor = "#FFFFFF";
//       textColor = "#5AAE8A";
//       borderColor = "#5AAE8A";
//       text = "진행";
//       break;
//     case "REVIEW":
//       backgroundColor = "#FFFFFF";
//       textColor = "#41A05F";
//       borderColor = "#41A05F";
//       text = "검토";
//       break;
//     case "DONE":
//       backgroundColor = "#FFFFFF";
//       textColor = "#285F43";
//       borderColor = "#285F43";
//       text = "완료";
//       break;
//     case "RELEASED":
//       backgroundColor = "#FFFFFF";
//       textColor = "#2E2D38";
//       borderColor = "#2E2D38";
//       text = "발행됨";
//       break;
//   }

  return (
    <span
      style={{ background:backgroundColor, color: textColor, borderColor: borderColor }}
      className="text-xs font-suitM px-2.5 py-0.5 rounded-2xl border-[0.3vh]"
    >
      {text}
    </span>
  );
};