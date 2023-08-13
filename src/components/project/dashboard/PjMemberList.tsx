import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import avatar_img from "@images/common/default_profile.png";
import MemberList from "@src/types/Users";
import PjMember from "@components/project/dashboard/PjMember";

//dummy data
// import avatar_yhg from "@images/dummy/avatar_yhg.jpg";
// import avatar_lsh from "@images/dummy/avatar_lsh.jpeg";
// import avatar_kch from "@images/dummy/avatar_kch.jpeg";
// import avatar_lyh from "@images/dummy/avatar_lyh.jpeg";
// import avatar_pmsc from "@images/dummy/avatar_pmsc.jpeg";
// import avatar_jhj from "@images/dummy/avatar_jhj.jpeg";
import { instanceAuth } from "@src/types/AxiosInterface";
import { useRecoilState } from "recoil";
import { projectNavs } from "@src/state/projectState";
import { ProjectNav } from "@typess/project";

export default function PjMemberList() {
  const [memberList, setMemberList] = useState<MemberList[]>([]);

  const [projectNav, setProjectNav] = useRecoilState(projectNavs);
  let { projectKey } = useParams();

  const pj = projectNav.find((element: ProjectNav) => element.projectKey.toString() == projectKey);

  useEffect(() => {
    (async () => {
      instanceAuth
        .get(`/belongs/list/${pj.projectId}`)
        .then((response) => {
          console.log(response.data);
          if (response.data.code === 200) {
            setMemberList(response.data.result);
          } else if (response.data.code === 707) {
            setMemberList([]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    })();
  }, []);
  return (
    <>
      <div className="relative w-[220px] h-[400px] bg-white rounded-xl shadow-md">
        <p className="pt-[20px] ml-[20px] text-black text-base font-suitB">프로젝트 멤버</p>
        <div>
          {/* map 반복문 사용 */}
          {memberList && memberList.map((member) => <PjMember key={member.memberId} member={member} />)}
        </div>
      </div>
    </>
  );
}

//dummy data
// const memberList: MemberList[] = [
//   {
//     id: 1,
//     grade: "LEADER",
//     memberId: 1,
//     nickname: "이승희",
//     profileImage: avatar_pmsc,
//   },
//   {
//     id: 2,
//     grade: "MEMBER",
//     memberId: 2,
//     nickname: "강창훈",
//     profileImage: avatar_kch,
//   },
//   {
//     id: 3,
//     grade: "MEMBER",
//     memberId: 3,
//     nickname: "정현진",
//     profileImage: avatar_jhj,
//   },
//   {
//     id: 4,
//     grade: "MEMBER",
//     memberId: 4,
//     nickname: "이서현",
//     profileImage: avatar_lsh,
//   },
//   {
//     id: 5,
//     grade: "MEMBER",
//     memberId: 5,
//     nickname: "임혜균",
//     profileImage: avatar_yhg,
//   },
//   {
//     id: 6,
//     grade: "MEMBER",
//     memberId: 6,
//     nickname: "이연희",
//     profileImage: avatar_lyh,
//   },
// ];
