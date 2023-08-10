import { IssueStatus, IssueType } from "@src/types/Issue";
import IssueStatusBadge from "@components/project/issue/IssueStatusBadge";
import IssueBadge from "@components/project/issue/IssueBadge";
import profile_img from "@images/common/default_profile.png";

type IssueInfoEditorProps = {
  issueId: number;
  issueStatus: IssueStatus;
  issueContent: string;
  issueTag: IssueType;
  profileImage?: string;
  nickname?: string;
};

export default function IssueInfoEditor(props: IssueInfoEditorProps) {
  return (
    <div className="flex flex-col mt-[5vh] mx-auto w-[50vw] px-[7vw] space-y-5">
      <div className="flex">
        <p className="font-suitM text-[1.4vw] text-gray-900">상태</p>
        <div className="ml-auto space-x-1">
          <IssueStatusBadge issueStatus={props.issueStatus} />
        </div>
      </div>
      <div className="flex">
        <p className="font-suitM text-[1.4vw] text-gray-900">설명</p>
        <p className="font-suitM text-[1vw] text-gray-900 ml-auto my-auto">
          {props.issueContent}
        </p>
      </div>
      <div className="flex">
        <p className="font-suitM text-[1.4vw] text-gray-900">태그</p>
        <div className="ml-auto my-auto">
          <IssueBadge issueType={props.issueTag} />
        </div>
      </div>
      <div className="flex">
        <p className="font-suitM text-[1.4vw] text-gray-900">담당자</p>
        <div className="flex flex-row ml-auto my-auto">
          <img className="w-8 h-8 mr-3.5" src={profile_img} />
          <p className="font-suitM text-[1vw] text-gray-900 mt-1">{props.nickname}</p>
        </div>
      </div>
      <div className="mx-auto w-[50vw] flex flex-row pt-[5vh]">
        <button
          type="button"
          className="h-[5vh] border border-error-3 text-error-3 bg-white hover:bg-error-4 font-suitM rounded-lg text-sm py-2.5 items-center mr-[1vw] w-[6vw] ml-auto"
        >
          이슈 그만
        </button>
        <button
          type="button"
          onClick={() => {}}
          className="h-[5vh] border border-primary-4 text-primary-4 bg-white hover:bg-primary-5 font-suitM rounded-lg text-sm py-2.5 items-center w-[6vw] mr-[10vw]"
        >
          할래요
        </button>
      </div>
    </div>
  );
};