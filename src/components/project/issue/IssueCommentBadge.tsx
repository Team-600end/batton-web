import { CommentType } from "@src/types/comment";

type IssueCommentBadgeProps = {
  commentType: CommentType;
};

export default function IssueCommentBadge(props: IssueCommentBadgeProps) {
  let backgroundColor = "";
  let textColor = "";
  let borderColor = "";
  let text = "";

  switch (props.commentType) {
    case "ACCEPTED":
      backgroundColor = "#DEF7EC";
      textColor = "#03543F";
      borderColor = "#31C48D";
      text = "승인";
      break;
    case "DENIED":
      backgroundColor = "#FDE8E8";
      textColor = "#9B1C1C";
      borderColor = "#F98080";
      text = "반려";
      break;
  }

  return (
    <span
      style={{ background:backgroundColor, color: textColor, borderColor: borderColor }}
      className="text-xs font-suitM px-2.5 py-0.5 rounded-lg border-[0.3vh]"
    >
      {text}
    </span>
  );
};