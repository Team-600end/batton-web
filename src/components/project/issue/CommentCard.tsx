import React from "react";
import IssueCommentBadge from "./IssueCommentBadge";
import default_avatar_img from "@images/common/default_profile.svg";
import { IssueComment } from "@src/types/comment";
import grade_master_logo from "@images/common/crown.svg";

type CommentCardProps = {
  issueComment: IssueComment;
};

export default function CommentCard(props: CommentCardProps) {
  return (
    <div className="flex flex-col px-9 py-4">
      <div className="flex flex-row items-center">
        <img
          src={
            props.issueComment.profileImage == null ||
            props.issueComment.profileImage == ""
              ? default_avatar_img
              : props.issueComment.profileImage
          }
          className="h-[1.7vw] mr-3"
        />
        {props.issueComment.memberGrade == "LEADER" && <img className="w-[1vw] h-[1vw]" src={grade_master_logo} />}
        <p className="items-center mr-3 text-sm font-suitM text-gray-900">
          {props.issueComment.nickname}
        </p>
        <p className="text-sm text-gray-400 mr-3 font-suitL">
          {props.issueComment.createDate}
        </p>
        <div>
          {props.issueComment.commentType != "COMMON" && (
            <IssueCommentBadge commentType={props.issueComment.commentType} />
          )}
        </div>
      </div>
      <p className="text-gray-500 font-suitL text-xs break-all pl-10 pr-2 mt-2">
        {props.issueComment.commentContent}
      </p>
    </div>
  );
}
