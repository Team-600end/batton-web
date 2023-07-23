import { IssueType } from "@typess/Issue";

type IssueBadgeProps = {
  issueType: IssueType;
};

export default function IssueBadgeDisabled(props: IssueBadgeProps) {
  return (
    <span style={{ backgroundColor: '#F4F4F4', color: '#C4C4C4', borderColor: '#C4C4C4' }} className="text-xs font-suitM mr-2 px-2.5 py-0.5 rounded-md border">
      {props.issueType}
    </span>
  );
};
