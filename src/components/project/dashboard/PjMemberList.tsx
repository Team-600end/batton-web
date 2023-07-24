import React, { useState, useCallback, useEffect } from "react";
import avatar_img from "@images/common/default_profile.png";
import MemberList from "@src/types/Users";
import PjMember from "@components/project/dashboard/PjMember";

//dummy data
const memberList: MemberList[] = [
  {
    id: 1,
    grade: "LEADER",
    memberId: 1,
    nickname: "가나다",
    profileImage: "https://i.pravatar.cc/300?img=1",
  },
  {
    id: 2,
    grade: "LEADER",
    memberId: 2,
    nickname: "가나라",
    profileImage: "https://i.pravatar.cc/300?img=1",
  },
  {
    id: 3,
    grade: "MEMBER",
    memberId: 3,
    nickname: "나나라",
    profileImage: "https://i.pravatar.cc/300?img=1",
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
