import React, { useState, useCallback, useEffect } from "react";
import vertical_dots_img from "@images/icons/kebap_grey.png";
import ProjectMember from "@src/types/Users";
import PjMemberModal from "./PjMemberModal";
import default_profile from "@images/common/default_profile.png";

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
      <div className="flex flex-row h-[38px] w-[15vw] m-auto items-center justify-center text-green-700 bg-white border border-green-500 font-suitM rounded-lg hover:bg-gray-50 text-sm px-5 py-2.5 mt-2">
        <div className="flex flex-row items-center">
          <img
            className="w-6 h-6 rounded-full object-cover select-none pointer-events-none mr-6"
            src={
              props.member.profileImage == null ||
              props.member.profileImage == ""
                ? default_profile
                : props.member.profileImage
            }
            alt="avatar"
          />
          <div className="w-auto text-sm text-gray-500 font-suitM break-keep select-none pointer-events-none">
            {props.member.nickname}
          </div>
        </div>
        {isLeader && (
          <button
            id="dropdownMenuIconButton"
            data-dropdown-toggle="dropdownDots"
            type="button"
            onClick={showModal}
            className="ml-auto mr-1"
          >
            <img
              className="w-[16px] h-[16px] rounded-full object-cover"
              src={vertical_dots_img}
              alt="vertical_dots"
            />
          </button>
        )}
      </div>
      {modalOpen && <PjMemberModal />}
    </>
  );
}
