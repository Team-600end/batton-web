import { IssueType } from "@typess/Issue";

type IssueBadgeProps = {
  issueType: IssueType;
};

export default function IssueBadge(props: IssueBadgeProps) {
  let backgroundColor = "";
  let textColor = "";
  let borderColor = "";
  let text = "";

  switch (props.issueType) {
    case "NEW":
      backgroundColor = "#DEF7EC";
      textColor = "#03543F";
      borderColor = "#31C48D";
      text = "New";
      break;
    case "CHANGED":
      backgroundColor = "#FDF6B2";
      textColor = "#723B13";
      borderColor = "#FACA15";
      text = "Changed";
      break;
    case "FEATURE":
      backgroundColor = "#E1EFFE";
      textColor = "#1E429F";
      borderColor = "#76A9FA";
      text = "Feature";
      break;
    case "FIXED":
      backgroundColor = "#FDE8E8";
      textColor = "#9B1C1C";
      borderColor = "#F98080";
      text = "Fixed";
      break;
    case "DEPRECATED":
      backgroundColor = "#F3F4F6";
      textColor = "#111928";
      borderColor = "#111928";
      text = "Deprecated";
      break;
  }

  return (
    <span
      style={{ backgroundColor, color: textColor, borderColor: borderColor }}
      className="text-xs font-suitM px-2.5 py-0.5 rounded-md border"
    >
      {text}
    </span>
  );
};