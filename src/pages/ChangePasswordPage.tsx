import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { instanceAuth } from "@src/types/AxiosInterface";

export default function ChangePasswordPage() {
  const navigate = useNavigate();
  // 검증 코드
  const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!~*])[A-Za-z\d!~*]{8,15}$/;

  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [passwordStatus, setPasswordStatus] = useState("");
  const [checkPasswordStatus, setCheckPasswordStatus] = useState("");

  interface ModifyPasswordBody {
    currentPassword: string;
    changedPassword: string;
    checkChangedPassword: string;
  }

  const modifyPasswordBody: ModifyPasswordBody = {
    currentPassword: currentPassword,
    changedPassword: password,
    checkChangedPassword: checkPassword,
  };

  type ValidNOProps = {
    text: string;
  };

  type ValidOKProps = {
    text: string;
  };

  const ValidNO: React.FC<ValidNOProps> = ({ text }) => {
    return <p style={{ color: "red", margin: "3px", padding: "0", fontSize: "10pt" }}>{text}</p>;
  };

  const ValidOK: React.FC<ValidOKProps> = ({ text }) => {
    return <p style={{ color: "green", margin: "3px", padding: "0", fontSize: "10pt" }}>{text}</p>;
  };

  const onChangeCurrentPassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurrentPassword(e.target.value);
      // 비밀번호 재확인 관련 추가 필요.
    },
    [currentPassword]
  );

  const onChangePassword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
      // 비밀번호 재확인 관련 추가 필요.
    },
    [password]
  );

  const onChangePasswordCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setCheckPassword(e.target.value);
      // 비밀번호 재확인 관련 추가 필요.
    },
    [checkPassword]
  );

  useEffect(() => {
    if (password === "") {
      setPasswordStatus("");
    } else if (!passwordRegex.test(password)) {
      setPasswordStatus("8~15자의 영문, 숫자, 특수문자(!, ~, *)를 입력해야합니다.");
    } else {
      setPasswordStatus("사용 가능한 비밀번호입니다.");
    }
  }, [password]);

  useEffect(() => {
    if (checkPassword === "") {
      setCheckPasswordStatus("");
    } else if (password !== checkPassword) {
      setCheckPasswordStatus("비밀번호가 일치하지 않습니다.");
    } else {
      setCheckPasswordStatus("비밀번호가 일치합니다.");
    }
  }, [password, checkPassword]);

  // 유저 정보 수정 API
  const modifyPasswordRequest = async () => {
    instanceAuth
      .patch(`/members/password`, modifyPasswordBody)
      .then((response) => {
        if (response.data.code == 200) {
          alert("비밀번호가 변경되었습니다.");
          navigate(`/main`);
        } else if (response.data.code == 600) {
        } else if (response.data.code == 602) {
          alert("두 비밀번호를 같게 입력해주세요.");
        } else if (response.data.code == 603) {
          alert("현재 비밀번호가 일치하지 않습니다.");
        }
      })
      .catch((error) => {});
  };

  return (
    <>
      <div className="relative w-screen h-screen flex flex-col mt-12">
        <div className="flex flex-row items-center mt-[40px]" style={{ marginLeft: "16.9312vw" }}>
          <div className="w-[10px] h-[27px] bg-primary-5 mr-[10px]"></div>
          <p className="text-[28px] font-suitB text-gray-900">비밀번호 변경</p>
        </div>
        <div className="flex flex-row w-screen items-center justify-center" style={{}}>
          <div className="flex flex-col mt-[40px]" style={{ width: "28.3730vw" }}>
            <div className="mt-[16px]">
              <label id="current-password" className="block mb-2 text-sm font-suitM text-gray-900 dark:text-white">
                현재 비밀번호
              </label>
              <input
                type="password"
                name="current-password"
                id="current-password"
                value={currentPassword}
                onChange={onChangeCurrentPassword}
                placeholder="현재 비밀번호를 입력하세요."
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm font-suitL rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div className="mt-[16px]">
              <label id="password" className="block mb-2 text-sm font-suitM text-gray-900 dark:text-white">
                새 비밀번호
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={onChangePassword}
                placeholder="새 비밀번호를 입력하세요."
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm font-suitL rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
              <div>{passwordStatus == "사용 가능한 비밀번호입니다." ? <ValidOK text={passwordStatus} /> : <ValidNO text={passwordStatus} />}</div>
            </div>
            <div className="mt-[16px]">
              <label id="password-check" className="block mb-2 text-sm font-suitM text-gray-900 dark:text-white">
                새 비밀번호 확인
              </label>
              <input
                type="password"
                name="password-check"
                id="password-check"
                value={checkPassword}
                onChange={onChangePasswordCheck}
                placeholder="새 비밀번호를 재입력하세요."
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm font-suitL rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
              <div>{checkPasswordStatus == "비밀번호가 일치합니다." ? <ValidOK text={checkPasswordStatus} /> : <ValidNO text={checkPasswordStatus} />}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center" style={{ marginTop: "6.2159vh" }}>
          <button
            type="button"
            onClick={modifyPasswordRequest}
            className="text-white bg-primary-4 hover:bg-primary-2 focus:ring-4 focus:ring-primary-5 font-suitM rounded-lg text-sm px-9 py-3.5 mb-2 focus:outline-none"
          >
            변경하기
          </button>
        </div>
      </div>
    </>
  );
}
