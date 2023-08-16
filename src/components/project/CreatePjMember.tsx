import React from "react";
import x_icon from "@images/icons/x_gray.svg";
import default_profile_img from "@images/common/default_profile.png";
import { CpMember } from "@typess/Users";

type CreatePjMemberProps = {
  pjMember: CpMember;
  onRemove: () => void;
};

function CreatePjMember(props: CreatePjMemberProps) {
  return (
    <>
      <li className="py-3 w-[30vw]">
        <div className="flex items-center space-x-7">
          <div className="flex-shrink-0">
            <img
              className="w-8 h-8 rounded-full"
              src={props.pjMember.profileImage == null || props.pjMember.profileImage == "" ? default_profile_img : props.pjMember.profileImage}
            />
          </div>
          <div className="flex flex-row">
            <p className="text-[14px] font-medium text-gray-600 truncate dark:text-white w-[4vw] overflow-hidden">{props.pjMember.nickname}</p>
            <p className="text-sm text-gray-500 truncate dark:text-gray-400 ml-[20px] w-[10vw]">{props.pjMember.email}</p>
          </div>
          <div className="text-[14px] font-medium dark:text-white">
            {props.pjMember.grade == "LEADER" ? <div className="text-primary-4">리더</div> : <div className="text-gray-400">멤버</div>}
          </div>
          <button onClick={props.onRemove}>
            <img src={x_icon} className="w-3 h-3 mr-5 flex-shrink-0" />
          </button>
        </div>
      </li>
    </>
  );
}

export default CreatePjMember;
