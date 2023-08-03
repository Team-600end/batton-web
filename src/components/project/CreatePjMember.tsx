import React from "react";
import x_icon from "@images/icons/x_gray.svg";
import default_profile_img from "@images/common/default_profile.png";
import CpMember from "@typess/Users";

type CreatePjMemberProps = {
  pjMember: CpMember;
};

function CreatePjMember(props: CreatePjMemberProps) {
  return (
    <>
      <li className="py-3 sm:py-4">
        <div className="flex items-center space-x-7">
          <div className="flex-shrink-0">
            <img
              className="w-8 h-8 rounded-full"
              src={
                props.pjMember.profileImage == null ||
                props.pjMember.profileImage == ""
                  ? default_profile_img
                  : props.pjMember.profileImage
              }
            />
          </div>
          <div className="flex flex-1 flex-row min-w-0">
            <p className="text-[14px] font-medium text-gray-600 truncate dark:text-white">
              {props.pjMember.nickname}
            </p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400 ml-[20px]">
              {props.pjMember.email}
            </p>
          </div>

          {props.pjMember.grade == "LEADER" ? (
            <div className="inline-flex text-[14px] font-medium text-gray-900 dark:text-white ">
              프로젝트 리더
            </div>
          ) : (
            <div className="inline-flex text-[14px] font-medium text-primary-4 dark:text-white ">
              프로젝트 멤버
            </div>
          )}
          <button>
            <img src={x_icon} className="w-[0.8vw]" />
          </button>
        </div>
      </li>
    </>
  );
}

export default CreatePjMember;
