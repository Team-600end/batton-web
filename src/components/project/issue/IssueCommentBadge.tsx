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
      textColor = "#31C48D";
      borderColor = "#DEF7EC";
      text = "승인 코멘트";
      break;
    case "DENIED":
      backgroundColor = "#FDE8E8";
      textColor = "#F98080";
      borderColor = "#FDE8E8";
      text = "반려 코멘트";
      break;
  }

  return (
    <span
      style={{ background:backgroundColor, color: textColor, borderColor: borderColor }}
      className="text-xs font-suitM px-2 py-0.5 rounded-lg border-[0.3vh]"
    >
      {text}
    </span>
  );
};