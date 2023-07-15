import React from 'react';
import { ProjectS } from '../types/project';
import default_team_logo  from "../assets/images/nav/team_default.png";
import grade_master_logo from "../assets/images/nav/crown.svg";

type NavPjBottonProps = {
    project: ProjectS
};

export default function NavPjBotton(props: NavPjBottonProps) {
    return (
        <button className="block px-4 py-2 hover:bg-gray-100 w-full">
            <div className='flex items-center'>
                <img className="w-[2vw] h-[2vw] border rounded-full mr-[1vw]" src={props.project.logo ?? default_team_logo} />
                <p className='font-suitL text-[#6B7280] mr-[0.3vw]'>{props.project.name}</p>
                {(props.project.grade === "Master") && <img className='w-[1vw] h-[1vw]' src={grade_master_logo}/>}
            </div>
        </button>
    );
};