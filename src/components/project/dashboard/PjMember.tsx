import React, { useState, useCallback, useEffect } from "react";
import vertical_dots_img from "@images/icons/kebap_grey.png";
import ProjectMember from "@src/types/Users";
import PjMemberModal from "./PjMemberModal";

type PjMemberProps = {
  member: ProjectMember;
};

export default function PjMember(props: PjMemberProps) {
  const [isLeader, setIsLeader] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const showModal = (event: React.MouseEvent<HTMLButtonElement>) => {
    setModalOpen(!modalOpen);
  };
  //나의 권한은 어디서 받아오지?

  return (
    <>
      <div className="flex flex-row h-[38px] min-w-[170px] m-[13px] my-[16] items-center justify-center text-green-700 bg-white border border-green-500 font-suitM rounded-lg hover:bg-gray-50 text-sm px-5 py-2.5 dark:bg-green-600">
        <img className="w-[25px] h-[25px] rounded-full object-cover" src={props.member.profileImage} alt="avatar" />
        <div className="w-full px-[20px] text-sm text-gray-500 font-suitM dark:text-gray-400">{props.member.nickname}</div>
        {isLeader && (
          <button id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" type="button" onClick={showModal}>
            <img className="w-[16px] h-[16px] rounded-full object-cover" src={vertical_dots_img} alt="vertical_dots" />
          </button>
        )}
      </div>

      {modalOpen && <PjMemberModal />}
    </>
  );
}
