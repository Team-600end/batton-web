import { AbsIssue } from "@src/types/Issue";
import IssueBadge from "../issue/IssueBadge";

type RnoteButtonIssueProps = {
  issue: AbsIssue;
};

export default function RnoteButtonIssue(props: RnoteButtonIssueProps) {
  return (
    <div className="flex">
      <IssueBadge issueType={props.issue.issueTag} />
      <p className="ml-[0.5vw] font-suitM text-gray-900">{props.issue.issueTitle}</p>
    </div>
  );
}
