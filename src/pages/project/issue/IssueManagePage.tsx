import React, { useState, useCallback, useRef, useEffect } from "react";
import Tag from "@src/components/project/issue/IssueBadge";
import profile_img from "@images/common/default_profile.png";
import Navbar from "@components/nav/Navbar.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "@toast-ui/react-editor";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import IssueBadge from "@src/components/project/issue/IssueBadge";
import MilestoneNavbar from "@src/components/nav/MilestoneNavbar";
import IssueStatusBadge from "@src/components/project/issue/IssueStatusBadge";
import { instanceAuth, instanceImageAuth } from "@src/types/AxiosInterface";
import { IssueStatus, IssueType } from "@src/types/Issue";
import { useRecoilState } from "recoil";
import { projectNavs } from "@src/state/projectState";
import { ProjectNav } from "@src/types/project";
import IssueInfoEditor from "@src/components/project/issue/IssueInfoEditor";
import { PjMember } from "@src/types/Users";
import chevron_up from "@images/common/chevron_up.png";
import chevron_down from "@images/common/chevron_down.png";
import titleBox_img from "@images/common/title_box.svg";
import CommonModal from "@src/components/CommonModal";

export default function IssueManagePage() {
  const { projectKey, issueId } = useParams();
  const [issueTitle, setIssueTitle] = useState<string>("");
  const [issueKey, setIssueKey] = useState<number>(null);
  const [issueContent, setIssueContent] = useState<string>("");
  const [managerId, setManagerId] = useState<number>(null);
  const [nickname, setNickname] = useState<string>("");
  const [isMine, setIsMine] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string>("");
  const [issueTag, setIssueTag] = useState<IssueType>(null);
  const [issueStatus, setIssueStatus] = useState<IssueStatus>(null);
  const [editorData, setEditorData] = useState<string>("");
  const [issueEditForm, setIssueEditForm] = useState<boolean>(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState<boolean>(false);

  const editorRef = useRef<Editor>(null);

  // 프로젝트 멤버 모달
  const [isMemberDropdownOpen, setIsMemberDropdownOpen] = useState(false);
  const [memberDropdownValue, setMemberDropdownValue] = useState("멤버 선택");
  const dropdownRef = useRef(null); //이외의 영역 클릭 시 드롭다운 버튼 숨기기
  const [memberList, setMemberList] = useState<PjMember[]>([]);
  const [belongId, setBelongId] = useState(0);

  const [alert, setAlert] = useState(false);

  // Project Recoil
  const [projectNav, setProjectNav] = useRecoilState(projectNavs);
  const pj = projectNav.find(
    (element: ProjectNav) => element.projectKey.toString() == projectKey
  );

  const navigate = useNavigate();

  useEffect(() => {
    issueManagerRequest();
  }, []);

  const handleEditorChange = () => {
    setEditorData(editorRef.current?.getInstance().getHTML());
  };

  const issueManagerRequest = async () => {
    instanceAuth
      .get(`/issues/${issueId}`)
      .then((response) => {
        if (response.data.code == 200) {
          setIssueTitle(response.data.result.issueTitle as string);
          setIssueKey(response.data.result.issueKey as number);
          setIssueContent(response.data.result.issueContent as string);
          setNickname(response.data.result.nickname as string);
          setProfileImage(response.data.result.profileImage as string);
          setIssueTag(response.data.result.issueTag as IssueType);
          setIsMine(response.data.result.mine as boolean);
          setManagerId(response.data.result.managerId as number);
          setIssueStatus(response.data.result.issueStatus as IssueStatus);
          setEditorData(response.data.result.reportContent as string);
        } else {
        }
      })
      .catch((error) => {});
  };

  useEffect(() => {
    editorRef.current?.getInstance().setHTML(editorData);
  }, [editorRef]);

  const issueDeleteRequest = async () => {
    instanceAuth
      .delete(`/issues/${issueId}`)
      .then((response) => {
        if (response.data.code == 200) {
          navigate(`/project/${projectKey}/issueboard`);
        } else {
        }
      })
      .catch((error) => {});
  };

  const issueReportPatchRequest = async () => {
    instanceAuth
      .patch(`/reports/${issueId}`, editorData)
      .then((response) => {
        if (response.data.code == 200) {
          setIsReportModalOpen(true);
        } else {
        }
      })
      .catch((error) => {});
  };

  const issueReportFetchRequest = async () => {
    instanceAuth
      .get(`/reports/${issueId}`)
      .then((response) => {
        if (response.data.code == 200) {
          editorRef.current
            ?.getInstance()
            .setHTML(response.data.result.reportContent as string);
          setEditorData(editorRef.current.getInstance().getHTML());
        } else {
        }
      })
      .catch((error) => {});
  };

  const issueInfoEditFetch = async () => {
    instanceAuth
      .get(`/issues/${issueId}/fetch`)
      .then((response) => {
        if (response.data.code == 200) {
          setIssueTitle(response.data.result.issueTitle);
          setIssueContent(response.data.result.issueContent);
          setIssueTag(response.data.result.issueTag);
          setManagerId(response.data.result.managerId);
          setNickname(response.data.result.nickname);
          setProfileImage(response.data.result.profileImage);
        } else {
        }
      })
      .catch((error) => {});
  };

  const handleMemberDropdown = () => {
    setIsMemberDropdownOpen(!isMemberDropdownOpen);
    if (isMemberDropdownOpen) {
      instanceAuth
        .get(`/belongs/list/${pj.projectId}`)
        .then((response) => {
          if (response.data.code === 200) {
            setMemberList(response.data.result);
          } else if (response.data.code === 707) {
            setMemberList([]);
          }
        })
        .catch((error) => {});
    }
  };

  return (
    <div className="flex flex-col overflow-hidden">
      <MilestoneNavbar />
      {/* 이슈 정보 */}
      <div className="flex items-center justify-start ml-auto mr-auto mt-[5vh] h-[5vh] w-[90vw]">
        <p className="font-bold text-[1.6vw] text-gray-900 ml-[2vw]">
          이슈 정보
        </p>
        {issueEditForm && (
          <p className=" text-primary-3 ml-[1vw] text-[1.6vw]">수정중</p>
        )}
      </div>

      {/* [프로젝트명-이슈키] 이슈타이틀 */}
      <div className="flex flex-row mr-auto ml-[10vw] w-[80vw] my-[1.5vh] font-suitB text-[2vw] text-gray-900 jusitfy-start">
        <p className="text-primary-3">
          [{pj.projectTitle}-{issueKey}]
        </p>
        {/* <p className="ml-[3vw]">{!issueEditForm ? ` ${issueTitle}` : ``}</p> */}
      </div>

      {!issueEditForm && (
        <div className="items-center justify-end mx-auto w-[71vw] flex flex-row ">
          <button
            type="button"
            onClick={issueDeleteRequest}
            className="h-[4vh] border border-error-3 text-error-3 bg-white hover:bg-error-4 font-suitM rounded-lg text-sm w-11 items-center mx-[0.5vw]"
          >
            삭제
          </button>
          <button
            type="button"
            onClick={() => setIssueEditForm(true)}
            className="h-[4vh] border border-primary-4 text-primary-4 bg-white hover:bg-primary-5 font-suitM rounded-lg text-sm w-11 items-center mx-[0.5vw]"
          >
            수정
          </button>
        </div>
      )}
      {issueEditForm ? (
        <div className="w-[100vw]">
          <IssueInfoEditor
            issueId={Number(issueId)}
            issueTitle={issueTitle}
            issueStatus={issueStatus}
            issueContent={issueContent}
            issueTag={issueTag}
            managerId={managerId}
            profileImage={profileImage}
            nickname={nickname}
            handleIssueEditForm={() => setIssueEditForm(false)}
            handleIssueInfoChange={issueInfoEditFetch}
          />
        </div>
      ) : (
        <div className="space-y-[1.7vh]">
          <div className="flex flex-row mx-auto mt-[1vw] w-[80vw] ">
            <p className="font-suitB text-[2vw] text-gray-900 pl-[2.5vw]">
              제목
            </p>
            <p className="font-suitM text-[1.7vw] text-gray-900 ml-[3.6vw] my-auto">
              {issueTitle}
            </p>
          </div>

          <div className="flex flex-row mx-auto mt-[1vw] w-[80vw] ">
            <p className="font-suitM text-[1.5vw] text-gray-900 pl-[3vw]">
              설명
            </p>
            <p className="font-suitM text-[1.3vw] text-gray-900 ml-[4vw] my-auto">
              {issueContent}
            </p>
          </div>

          <div className="flex flex-row mx-auto mt-[1vw] w-[80vw] ">
            <p className="font-suitM text-[1.5vw] text-gray-900 pl-[3vw]">
              상태
            </p>
            <div className="ml-[4vw] my-auto">
              <IssueStatusBadge issueStatus={issueStatus} />
            </div>
          </div>

          <div className="flex flex-row mx-auto mt-[1vw] w-[80vw]">
            <p className="font-suitM text-[1.5vw] text-gray-900 pl-[3vw]">
              태그
            </p>
            <div className="ml-[4vw] my-auto">
              <IssueBadge issueType={issueTag} />
            </div>
          </div>

          <div className="flex flex-row mx-auto mt-[1vw] w-[80vw]">
            <p className="font-suitM text-[1.5vw] text-gray-900 pl-[1.8vw]">
              담당자
            </p>
            <div className="flex flex-row ml-[3.7vw] my-auto">
              <img className="w-6 h-6 m-auto mr-3" src={profile_img} />
              <p className="font-suitM text-[1.3vw] text-gray-900 m-auto">
                {nickname}
              </p>
            </div>
          </div>
        </div>
      )}

      <hr className="h-px my-[1vw] mt-[3vw] bg-gray-200 border-0 w-[80vw] mx-auto" />
      {/* 바톤 멤버 선택 */}
      <div className="flex flex-col mx-auto my-[2vw] w-[80vw]">
        <div className="flex flex-col space-y-3">
          <div className="flex my-auto mb-[1vw]">
            <img
              className="mr-2 select-none pointer-events-none"
              src={titleBox_img}
            />
            <p className="font-suitB text-[1.6vw] text-gray-900 my-auto">
              바톤 넘겨주기
            </p>
          </div>
          <div className=" relative flex items-center justify-start ml-[2vw] my-auto ">
            <button
              onClick={handleMemberDropdown}
              className=" flex items-center justify-between w-[140px] h-[40px] text-[#1F2A37] bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 font-suitM rounded-lg text-xs px-3"
            >
              <div className="flex items-center justify-center">
                {memberDropdownValue === "멤버 선택" ? (
                  <div className="ml-2 text-sm text-grey-4 ">멤버 선택</div>
                ) : (
                  <div className="flex items-center">
                    <img
                      id="manager_icon"
                      src={profile_img}
                      className="w-6 h-6 ml-4 mr-3"
                      alt="Profile"
                    />
                    <div className="ml-2 text-sm">{memberDropdownValue}</div>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-center">
                <img
                  className="m-1 w-[9px] h-[6px]"
                  src={isMemberDropdownOpen ? chevron_up : chevron_down}
                  alt="Dropdown Icon"
                />
              </div>
            </button>
            {isMemberDropdownOpen && (
              <div
                ref={dropdownRef}
                className=" absolute z-10 top-full left-auto mt-2 w-[140px] bg-white divide-y divide-gray-100 rounded-lg shadow"
              >
                {/* 멤버 리스트 목록 map으로 보이기 */}
                {memberList.length === 0 ? (
                  <div className="py-2 px-4 text-center">멤버 없음</div>
                ) : (
                  memberList.map((member) => (
                    <div
                      key={member.memberId}
                      className="py-2 px-4 flex cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        setMemberDropdownValue(member.nickname);
                        setBelongId(member.memberId);
                      }}
                    >
                      <img
                        id="manager_icon"
                        src={member.profileImage}
                        alt="M"
                        className="w-6 h-6 ml-4 mr-3"
                      />
                      <div className="ml-2 text-sm">{member.nickname}</div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
          <p className="text-[1.6vh] font-suitL text-gray-400 ml-[2vw] my-auto">
            이슈 알림을 받을 멤버를 선택하실 수 있습니다.
          </p>
        </div>
      </div>

      <hr className="h-px my-[1vw] bg-gray-100 border-0 w-[80vw] mx-auto" />

      {isMine && (
        <div className="mb-[5vh]">
          <div className="flex flex-col mx-auto w-[80vw] mt-[2vh]">
            <div className="flex my-auto">
              <img
                className="mr-2 select-none pointer-events-none"
                src={titleBox_img}
              />
              <p className="font-bold text-[1.6vw] text-gray-900 mt-1">
                이슈 레포트
              </p>
            </div>
          </div>
          <div className="border border-primary-5 rounded-lg bg-white p-[0.2vw] w-[80vw] font-suitM my-[3vh] mx-auto">
            <div>
              <Editor
                previewStyle="vertical"
                height="500px"
                initialEditType="wysiwyg"
                initialValue={editorData}
                useCommandShortcut={true}
                hideModeSwitch={true}
                language="ko-KR"
                ref={editorRef}
                plugins={[colorSyntax]}
                onChange={handleEditorChange}
                toolbarItems={[
                  // 툴바 옵션 설정
                  ["heading", "bold", "italic", "strike"],
                  ["hr", "quote"],
                  ["ul", "ol", "task"],
                  ["image", "link"],
                  ["code", "codeblock"],
                ]}
                hooks={{
                  addImageBlobHook: async (blob, callback) => {
                    callback("");
                    setAlert(true);
                  },
                }}
              />
            </div>
          </div>
          <div className="mx-auto w-[80vw] flex flex-row">
            <button
              type="button"
              onClick={() => {
                issueReportFetchRequest();
              }}
              className="h-[5vh] border border-error-3 text-error-3 bg-white hover:bg-error-4 font-suitM rounded-lg text-sm py-2.5 items-center mr-[1vw] w-[6vw] ml-auto"
            >
              작성 취소
            </button>
            <button
              type="button"
              onClick={() => issueReportPatchRequest()}
              className="h-[5vh] border border-primary-4 text-primary-4 bg-white hover:bg-primary-5 font-suitM rounded-lg text-sm py-2.5 items-center w-[6vw] mr-[2vw]"
            >
              작성 저장
            </button>
          </div>
        </div>
      )}
      {isReportModalOpen && (
        <CommonModal title="안내메세지" description="이슈레포트가 정상적으로 수정되었습니다." btnTitle="확인" closeModal={() => setIsReportModalOpen(false)} />
      )}
      {alert && (
        <CommonModal
          title="안내메시지"
          description="해커톤 기간에는 이 기능을 제공하지 않습니다."
          btnTitle="확인"
          closeModal={() => setAlert(false)}
        />
      )}
    </div>
  );
}
