import React, { useState, useCallback, useEffect } from "react";
import avatar_img from "@images/common/default_profile.png";
import MemberList from "@src/types/Users";
import PjMember from "@components/project/dashboard/PjMember";

//dummy data
import avatar_yhg from "@images/dummy/avatar_yhg.jpg";
import avatar_lsh from "@images/dummy/avatar_lsh.jpeg";
import avatar_kch from "@images/dummy/avatar_kch.jpeg";
import avatar_lyh from "@images/dummy/avatar_lyh.jpeg";
import avatar_pmsc from "@images/dummy/avatar_pmsc.jpeg";
import avatar_jhj from "@images/dummy/avatar_jhj.jpeg";

//dummy data
const memberList: MemberList[] = [
  {
    id: 1,
    grade: "LEADER",
    memberId: 1,
    nickname: "이승희",
    profileImage: avatar_pmsc,
  },
  {
    id: 2,
    grade: "MEMBER",
    memberId: 2,
    nickname: "강창훈",
    profileImage: avatar_kch,
  },
  {
    id: 3,
    grade: "MEMBER",
    memberId: 3,
    nickname: "정현진",
    profileImage: avatar_jhj,
  },
  {
    id: 4,
    grade: "MEMBER",
    memberId: 4,
    nickname: "이서현",
    profileImage: avatar_lsh,
  },
  {
    id: 5,
    grade: "MEMBER",
    memberId: 5,
    nickname: "임혜균",
    profileImage: avatar_yhg,
  },
  {
    id: 6,
    grade: "MEMBER",
    memberId: 6,
    nickname: "이연희",
    profileImage: avatar_lyh,
  },
];

export default function PjMemberList() {
  return (
    <>
      <div className="relative w-[220px] h-[400px] bg-white rounded-xl shadow-md">
        <p className="pt-[20px] ml-[20px] text-black text-base font-suitB">프로젝트 멤버</p>

        {/* map 반복문 사용 */}
        {memberList.map((member) => (
          <PjMember key={member.id} member={member} />
        ))}
      </div>
    </>
  );
}
