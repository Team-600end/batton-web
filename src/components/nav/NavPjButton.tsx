import React, { useState } from "react";
import { ProjectNav } from "@typess/project";
import { useNavigate } from "react-router-dom";
import default_team_logo from "@images/common/team_default.png";
import grade_master_logo from "@images/common/crown.svg";
import { useRecoilState } from "recoil";
import { navbarNoticeDd, navbarProjectDd } from "@src/state/modalState";

type NavPjButtonProps = {
  project: ProjectNav;
};

export default function NavPjButton(props: NavPjButtonProps) {
  const navigate = useNavigate();
  const [projectDropdown, setProjectDropdown] = useRecoilState(navbarProjectDd);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [noticeDropdown, setNoticeDropdown] = useRecoilState(navbarNoticeDd);

  const handleAllDropdownOff = () => {
    setNoticeDropdown(false);
    setProjectDropdown(false);
    setProfileDropdown(false);
  };

  return (
    <button
      className="block px-4 py-2 hover:bg-gray-100 w-full"
      onClick={() => {
        navigate(`/project/${props.project.projectKey}/dashboard`);
        handleAllDropdownOff();
      }}
    >
      <div className="flex items-center">
        <img className="w-[2vw] h-[2vw] border object-cover rounded-full mr-[1vw]" src={(props.project.projectLogo == null || props.project.projectLogo == "") ? default_team_logo : props.project.projectLogo} />
        <p className="font-suitL text-[#6B7280] mr-[0.3vw]">{props.project.projectTitle}</p>
        {props.project.memberGrade == "LEADER" && <img className="w-[1vw] h-[1vw]" src={grade_master_logo} />}
      </div>
    </button>
  );
}
