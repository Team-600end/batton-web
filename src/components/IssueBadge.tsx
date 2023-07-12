import React from "react";
import { IssueType } from "../types/Issue";

type IssueBadgeProps = {
  issueType: IssueType;
};

function IssueBadge(props: IssueBadgeProps) {
  let backgroundColor = "";
  let textColor = "";
  let borderColor = "";

  switch (props.issueType) {
    case "New":
      backgroundColor = "#DEF7EC";
      textColor = "#03543F";
      borderColor = "#31C48D";
      break;
    case "Changed":
      backgroundColor = "#FDF6B2";
      textColor = "#723B13";
      borderColor = "#FACA15";
      break;
    case "Feature":
      backgroundColor = "#E1EFFE";
      textColor = "#1E429F";
      borderColor = "#76A9FA";
      break;
    case "Fixed":
      backgroundColor = "#FDE8E8";
      textColor = "#9B1C1C";
      borderColor = "#F98080";
      break;
    case "Deprecated":
      backgroundColor = "#F3F4F6";
      textColor = "#111928";
      borderColor = "#111928";
      break;
  }

  return (
    <span
      style={{ backgroundColor, color: textColor, borderColor: borderColor }}
      className="text-xs font-suitM mr-2 px-2.5 py-0.5 rounded-md border"
    >
      {props.issueType}
    </span>
  );
}

export default IssueBadge;
