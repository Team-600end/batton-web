import React from "react";
import rvector from "@images/common/rightVector.svg";
import { Release } from "@src/types/Release";
import RnoteButtonIssue from "./RnoteButtonIssue";
import { useNavigate, useParams } from "react-router-dom";

type RnoteButtonProps = {
  release: Release;
};

export default function RnoteButton(props: RnoteButtonProps) {
  const navigate = useNavigate();
  const { projectKey } = useParams();

  return (
    <button
      onClick={() => navigate(`/project/${projectKey}/releasesnote/${props.release.id}`)}
      className="p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-200 mb-5 items-center w-[70vw] grid-cols-[11vw,1vw,11vw,1vw,30vw,11vw] grid mx-[2vw]"
    >
      <p className="text-xl font-suitSB text-black mr-[1vw]">
        v.{props.release.versionMajor}.{props.release.versionMinor}.{props.release.versionPatch}
      </p>
      <div className="mr-[1.5vw] h-5/6 border-r-2 border-gray-100 rounded-md" />
      <p className="text-xl font-suitSB text-black mr-[1.5vw] ml-[1vw]">{props.release.date}</p>
      <div className="mr-[2vw] h-5/6 border-r-2 border-gray-100 rounded-md" />
      <div className="flex flex-col space-y-3 mr-[3vw] ml-[1.8vw]">
        {props.release.issueList?.map((issue) => (
          <RnoteButtonIssue issue={issue} />
        ))}
      </div>
      <img src={rvector} className="ml-auto" alt=">" />
    </button>
  );
}
