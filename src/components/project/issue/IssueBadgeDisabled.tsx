import { IssueType } from "@typess/Issue";

type IssueBadgeProps = {
  issueType: IssueType;
};

export default function IssueBadgeDisabled(props: IssueBadgeProps) {
  let text = "";

  switch (props.issueType) {
    case "NEW":
      text = "New";
      break;
    case "CHANGED":
      text = "Changed";
      break;
    case "FEATURE":
      text = "Feature";
      break;
    case "FIXED":
      text = "Fixed";
      break;
    case "DEPRECATED":
      text = "Deprecated";
      break;
  }

  return (
    <span style={{ backgroundColor: "#F4F4F4", color: "#C4C4C4", borderColor: "#C4C4C4" }} className="text-xs font-suitM px-2.5 py-0.5 rounded-md border">
      {text}
    </span>
  );
}
