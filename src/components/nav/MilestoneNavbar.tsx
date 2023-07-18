import React from "react";
import right_arrow from "@images/common/chevron_right.svg";

export default function MilestoneNavbar() {
  return (
    <div className="mt-[10vh]">
      <span className="flex ml-[5vw] m-[1vw] mb-0 font-suitM">
        프로젝트
        <img src={right_arrow} />
        <a href="#####" className="flex items-center" style={{ cursor: "pointer" }}>
          600&
        </a>
      </span>
    </div>
  );
}
