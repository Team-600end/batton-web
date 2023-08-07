import React, { useState, useCallback, useEffect } from "react";
import signup_hand_image from "@assets/images/signupPage/signup_hand3.svg";
import batton_logo_img from "@images/common/batton_logo_big.svg";
import { useNavigate } from "react-router-dom";
import { instanceNonAuth } from "@src/types/AxiosInterface";
import useInput from "@src/hooks/useInput";
// import styled from "styled-components";

// const ValidOK = styled.p`
//   color: green;
//   margin: 3px;
//   padding: 0;
//   font-size: 5pt;
// `;

// const ValidNO = styled.p`
//   color: red;
//   margin: 3px;
//   padding: 0;
//   font-size: 5pt;
// `;

export default function SignupPage() {
  //검증 코드
  const emailRegex = /\S+@\S+\.\S+/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!~*])[A-Za-z\d!~*]{8,15}$/;

  const [email, , setEmail] = useInput("");
  const [nickname, , setNickname] = useInput("");
  const [password, , setPassword] = useInput("");
  const [checkPassword, , setCheckPassword] = useInput("");
  const [authCode, setAuthCode] = useState("");

  const [nicknameStatus, setNicknameStatus] = useState("");
  const [emailStatus, setEmailStatus] = useState("");
  const [passwordStatus, setPasswordStatus] = useState("");
  const [checkPasswordStatus, setCheckPasswordStatus] = useState("");
  const [authCodeStatus, setAuthCodeSutatus] = useState(false);

  const navigate = useNavigate();
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

  interface SignupData {
    email: string;
    authCode: string;
    nickname: string;
    password: string;
    checkPassword: string;
  }

  interface EmailReq {
    email: string;
  }

  // const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setEmail(e.target.value);
  // };

  // const onChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setNickname(e.target.value);
  // };

  // const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setPassword(e.target.value);
  //   // 비밀번호 재확인 관련 추가 필요.
  // };

  // const onChangePasswordCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setCheckPassword(e.target.value);
  //   // 비밀번호 재확인 관련 추가 필요.
  // };
  const onChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
    [email]
  );

  const onChangeAuthCode = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setAuthCode(e.target.value);
    },
    [authCode]
  );

  const onChangeNickname = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNickname(e.target.value);
    },
    [nickname]
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
    // 이메일 형식 검증
    if (email === "") {
      setEmailStatus("");
    } else if (!emailRegex.test(email)) {
      setEmailStatus("이메일 형식이 올바르지 않습니다.");
    } else {
      setEmailStatus("사용 가능한 이메일입니다.");
    }
  }, [email]);

  useEffect(() => {
    // 닉네임 형식 검증
    if (nickname === "") {
      setNicknameStatus("");
    } else if (nickname.length < 2) {
      setNicknameStatus("2글자 이상 입력해 주세요.");
    } else {
      setNicknameStatus("사용 가능한 닉네임입니다.");
    }
  }, [nickname]);

  useEffect(() => {
    if (password === "") {
      setPasswordStatus("");
    } else if (!passwordRegex.test(password)) {
      setPasswordStatus("8~15자의 영문, 숫자, 특수문자(!, ~, *)를 입력해야합니다.");
    } else {
      setPasswordStatus("사용 가능한 비밀번호입니다.");
    }
  }, [password]);

  const signupRequest = async () => {
    // 닉네임 필드 검증
    if (nickname.length < 2) {
      alert("닉네임은 2글자 이상이어야 합니다.");
      return;
    }
    // 이메일 필드 검증
    if (!emailRegex.test(email)) {
      alert("이메일 형식이 올바르지 않습니다.");
      return;
    }

    //가능한 비밀번호 예시: kafeine1~!
    // 비밀번호 필드 검증
    if (!passwordRegex.test(password)) {
      alert("비밀번호는 8~15자의 영문, 숫자, 특수문자(!, ~, *)를 혼합해야 합니다.");
      return;
    }

    // 비밀번호 확인 필드 검증
    if (password !== checkPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      const signupData: SignupData = {
        email: email,
        authCode: authCode,
        nickname: nickname,
        password: password,
        checkPassword: checkPassword,
      };

      const result = instanceNonAuth.post(`/auth/signup`, signupData);
      console.log(result);

      // if (!(await result).isSuccess) throw new Error;
      // // return 값 조건 추가 필요.

      alert("회원가입이 완료되었습니다.");
      alert("로그인을 진행해주세요.");
      navigate(`/login`);
    } catch (error) {
      console.log(error);
    }
  };

  const emailCheck = async () => {
    const emailReq: EmailReq = {
      email: email
    };

    instanceNonAuth
    .post(`/auth/email`, emailReq)
    .then(() => {
      alert("인증 코드가 발송되었습니다.")
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden">
      <img
        className="absolute z-0"
        src={signup_hand_image}
        style={{ marginTop: "20vh", marginLeft: "-45vw" }}
      />
      <img className="relative z-10 mb-4" src={batton_logo_img} />
      <div className="flex flex-col space-y-6 relative z-10 items-center justify-center w-[38vw] p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
        <form className="space-y-6 w-[30vw]">
          <h4 className="text-2xl font-suitM text-gray-900">회원가입</h4>
          <div>
            <label id="email" className="block mb-1 text-sm font-suitM text-gray-900 dark:text-white">
              이메일
            </label>
            <div className="flex">
            <input
              type="text"
              value={email}
              onChange={onChangeEmail}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="이메일을 입력하세요"
            />
            <button className="w-[130px] ml-[10px] text-white bg-[#5AAE8A] shadow-md hover:bg-[#285F43] focus:ring-4 focus:outline-none focus:ring-[#F9F9F9] font-suitM rounded-lg text-sm px-3 py-2.5 text-center"
            type="button"
            onClick={emailCheck}>
              이메일 인증
            </button>
          </div>
          <div>{emailStatus == "사용 가능한 이메일입니다." ? <ValidOK text={emailStatus} /> : <ValidNO text={emailStatus} />}</div>
          </div>
          <div>
          <label id="email" className="block mb-1 text-sm font-suitM text-gray-900 dark:text-white">
              인증번호
            </label>
            <input
              type="text"
              value={authCode}
              onChange={onChangeEmail}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="이메일 인증 코드를 입력하세요"
            />
            <div></div>
          </div>
          <div>
            <label id="nickname" className="block mb-1 text-sm font-suitM text-gray-900 dark:text-white">
              닉네임
            </label>
            <input
              type="nickname"
              onChange={onChangeNickname}
              placeholder="닉네임을 입력하세요"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            <div>{nicknameStatus == "사용 가능한 닉네임입니다." ? <ValidOK text={nicknameStatus} /> : <ValidNO text={nicknameStatus} />}</div>
          </div>
          <div>
            <label id="password" className="block mb-1 text-sm font-suitM text-gray-900 dark:text-white">
              비밀번호
            </label>
            <input
              type="password"
              onChange={onChangePassword}
              placeholder="비밀번호를 입력하세요"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            <div>{passwordStatus == "사용 가능한 비밀번호입니다." ? <ValidOK text={passwordStatus} /> : <ValidNO text={passwordStatus} />}</div>
          </div>
          <div className="pb-[3vh]">
            <label id="password-check" className="block mb-1 text-sm font-suitM text-gray-900 dark:text-white">
              비밀번호 확인
            </label>
            <input
              type="password"
              value={checkPassword}
              onChange={onChangePasswordCheck}
              placeholder="비밀번호를 재입력 하세요"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            <div>{checkPasswordStatus == "비밀번호가 일치합니다." ? <ValidOK text={checkPasswordStatus} /> : <ValidNO text={checkPasswordStatus} />}</div>
          </div>
          <button
            onClick={signupRequest}
            type="button"
            className="w-full text-white bg-[#5AAE8A] shadow-md hover:bg-[#285F43] focus:ring-4 focus:outline-none focus:ring-[#F9F9F9] font-suitM rounded-lg text-sm px-5 py-2.5 text-center"
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}
