import React, { useState, useCallback, useEffect } from "react";
import signup_hand_image from "@assets/images/signupPage/signup_hand3.svg";
import batton_logo_img from "@images/common/batton_logo_big.svg";
import { useNavigate } from "react-router-dom";
import { instanceAuth, instanceNonAuth } from "@src/types/AxiosInterface";
import useInput from "@src/hooks/useInput";
import Modal, { CommonModalInterface } from "@src/components/CommonModal";

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

export default function SignupPage() {
  // 이메일 및 비밀번호 정규식 모음
  const emailRegex = /\S+@\S+\.\S+/;
  const passwordRegex =
    /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!~*])[A-Za-z\d!~*]{8,15}$/;

  /** 이메일 입력 상태관리 */
  const [email, , setEmail] = useInput<string>("");
  /** 닉네임 입력 상태관리 */
  const [nickname, , setNickname] = useInput("");
  /** 비밀번호 입력 상태관리 */
  const [password, , setPassword] = useInput("");
  // 비밀번호확인 입력 상태관리
  const [checkPassword, , setCheckPassword] = useInput("");
  // 인증번호 입력 상태관리
  const [authCode, setAuthCode] = useState<string>("");

  /** 이메일 인증 요청 여부 */
  const [isAuthCodeLoading, setIsAuthCodeLoading] = useState<boolean>(false);
  // 이메일 인증번호 폼 flag 변수 상태관리
  const [isEnableAuthForm, setIsEnableAuthForm] = useState(false);
  // 타이머 작동 flag 변수 상태관리
  const [startTimer, setStartTimer] = useState(false);
  /** 이메일 인증 여부 상태관리 */
  const [isEmailAuthentication, setIsEmailAuthentication] = useState(false);
  // 닉네임 안내메세지 상태관리
  const [nicknameStatus, setNicknameStatus] = useState("");
  // 이메일 안내메시지 상태관리
  const [emailStatus, setEmailStatus] = useState("");
  /** 이메일 인증 안내메시지 상태관리 */
  const [authCodeStatus, setAuthCodeStatus] = useState("");
  // 비밀번호 안내메세지 상태관리
  const [passwordStatus, setPasswordStatus] = useState("");
  // 비밀번호 확인 안내메시지 상태관리
  const [checkPasswordStatus, setCheckPasswordStatus] = useState("");

  // CommonModal 표시
  const [isModalOpen, setIsModalOpen] = useState(false);
  // CommonModal Data
  const [modalData, setModalData] = useState<CommonModalInterface>({
    title: "",
    description: "",
    btnTitle: "",
    closeModal: () => {},
  });

  // 인증코드 타이머 상태관리 - 3분 설정
  const [minutes, setMinutes] = useState<number>(3);
  const [seconds, setSeconds] = useState<number>(0);

  const navigate = useNavigate();
  type ValidNOProps = {
    text: string;
  };

  type ValidOKProps = {
    text: string;
  };

  const ValidNO: React.FC<ValidNOProps> = ({ text }) => {
    return (
      <p
        style={{ color: "red", margin: "3px", padding: "0", fontSize: "10pt" }}
      >
        {text}
      </p>
    );
  };

  const ValidOK: React.FC<ValidOKProps> = ({ text }) => {
    return (
      <p
        style={{
          color: "green",
          margin: "3px",
          padding: "0",
          fontSize: "10pt",
        }}
      >
        {text}
      </p>
    );
  };

  const onChangeEmail = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
    [email]
  );

  const onChangeAuthCode = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, "");
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
      setPasswordStatus(
        "8~15자의 영문, 숫자, 특수문자(!, ~, *)를 입력해야합니다."
      );
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
      alert(
        "비밀번호는 8~15자의 영문, 숫자, 특수문자(!, ~, *)를 혼합해야 합니다."
      );
      return;
    }

    if (!isEmailAuthentication) {
      alert("이메일 인증을 진행해주세요.");
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

      alert("회원가입이 완료되었습니다.");
      alert("로그인을 진행해주세요.");
      navigate(`/login`);
    } catch (error) {
      console.log(error);
    }
  };

  /** 이메일 중복 검사 및 인증코드 발송 요청 */
  const emailCheck = async () => {
    if (!emailRegex.test(email)) {
      return;
    }

    if (isEnableAuthForm) {
      return;
    }

    setIsAuthCodeLoading(true);

    const emailReq: EmailReq = {
      email: email,
    };

    instanceNonAuth
      .post(`/auth/email`, emailReq)
      .then((response) => {
        if (response.data.code == 200) {
          setIsEnableAuthForm(true);
          setStartTimer(true);
        } else if (response.data.code == 601) {
          setEmailStatus("이미 가입된 이메일입니다.");
          return;
        } else return;
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setIsAuthCodeLoading(false));
  };

  const authCodeCheckRequest = async () => {
    if (isEmailAuthentication) {
      return;
    }

    const authCodeReqData = {
      email: email,
      authCode: authCode,
    };
    instanceNonAuth
      .post(`/auth/email/check`, authCodeReqData)
      .then((response) => {
        if (response.data.code == 200) {
          setIsEmailAuthentication(true);
          setStartTimer(false);
          setAuthCodeStatus("이메일 인증이 완료되었습니다.");
        } else if (response.data.code == 606) {
          setStartTimer(false);
          setAuthCodeStatus("인증번호가 올바르지 않습니다.");
        } else return;
      });
  };

  // 인증번호 타이머 - 3분 제한시간 설정
  useEffect(() => {
    let countdown: string | number | NodeJS.Timeout;

    if (startTimer && (minutes > 0 || seconds > 0)) {
      countdown = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else {
          if (minutes > 0) {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
    }

    return () => clearInterval(countdown);
  }, [startTimer, minutes, seconds]);

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden">
      <img
        className="absolute z-0"
        src={signup_hand_image}
        style={{ marginTop: "20vh", marginLeft: "-45vw" }}
      />
      <img className="relative z-10 mb-4" src={batton_logo_img} />
      <div className="flex flex-col space-y-6 relative z-10 items-center justify-center w-[38vw] p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8">
        {isModalOpen && (
          <Modal
            title={modalData.title}
            description={modalData.description}
            btnTitle={modalData.btnTitle}
            closeModal={() => setIsModalOpen(false)}
          />
        )}
        <form className="space-y-6 w-[30vw]">
          <h4 className="text-2xl font-suitM text-gray-900">회원가입</h4>
          <div>
            <label
              id="email"
              className="block mb-1 text-sm font-suitM text-gray-900"
            >
              이메일
            </label>
            <div className="flex flex-row">
              <div className="w-[27vw] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-gray-300 focus:ring-0 flex py-2.5">
                <input
                  type="text"
                  value={email}
                  onChange={onChangeEmail}
                  className={
                    !isEnableAuthForm
                      ? "w-[18vw] h-[2vh] bg-gray-50 border-none border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 focus:outline-none focus:border-gray-300 focus:ring-0"
                      : "w-[18vw] h-[2vh] bg-gray-50 border-none border-gray-300 text-gray-400 text-sm rounded-lg p-2.5 focus:outline-none focus:border-gray-300 focus:ring-0"
                  }
                  placeholder="이메일을 입력하세요"
                  readOnly={isEnableAuthForm}
                />
                {isAuthCodeLoading && (
                  <svg
                    width="2.5vh"
                    height="2.5vh"
                    viewBox="0 0 50 50"
                    xmlns="http://www.w3.org/2000/svg"
                    className="animate-spin ml-auto mr-[0.8vw]"
                  >
                    <circle
                      cx="25"
                      cy="25"
                      r="20"
                      fill="none"
                      stroke="#5AAE8A"
                      stroke-width="4"
                      stroke-dasharray="80, 70"
                    />
                  </svg>
                )}
              </div>
              <button
                className={
                  !isEnableAuthForm
                    ? "w-[8vw] ml-[10px] text-white bg-[#5AAE8A] shadow-md hover:bg-[#285F43] focus:outline-none focus:ring-0 font-suitM rounded-lg text-sm px-3 py-2.5 text-center"
                    : "w-[8vw] ml-[10px] text-white bg-gray-300 shadow-md hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-[#F9F9F9] font-suitM rounded-lg text-sm px-3 py-2.5 text-center"
                }
                type="button"
                onClick={emailCheck}
              >
                {!isEnableAuthForm ? "이메일 인증" : "인증 요청됨"}
              </button>
            </div>
            <div>
              {emailStatus == "사용 가능한 이메일입니다." ? (
                <ValidOK text={emailStatus} />
              ) : (
                <ValidNO text={emailStatus} />
              )}
            </div>
          </div>
          {isEnableAuthForm && (
            <div>
              <label
                id="email"
                className="block mb-1 text-sm font-suitM text-gray-900"
              >
                이메일 인증번호
              </label>
              <div className="flex flex-row">
                <div className="w-[24vw] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-gray-300 focus:ring-0 flex py-2.5">
                  <input
                    type="text"
                    value={authCode}
                    onChange={onChangeAuthCode}
                    maxLength={10}
                    className={!isEmailAuthentication ? "w-[16vw] h-[2vh] bg-gray-50 border-none text-gray-900 text-sm rounded-lg focus:outline-none focus:border-gray-50 focus:ring-0 p-2.5" : "w-[16vw] h-[2vh] bg-gray-50 border-none text-gray-400 text-sm rounded-lg focus:outline-none focus:border-gray-50 focus:ring-0 p-2.5"}
                    readOnly={isEmailAuthentication}
                    placeholder="이메일 인증 코드를 입력하세요"
                  />
                  {/* 인증 유효 시간 표시 */}
                  {startTimer && (
                    <p className="font-suitM text-[1.8vh] text-primary-4 ml-auto mr-[1vw]">
                      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                    </p>
                  )}
                </div>
                <button
                  className={
                    !isEmailAuthentication
                      ? "ml-[1vw] w-[5vw] text-white bg-[#5AAE8A] shadow-md hover:bg-[#285F43] focus:ring-4 focus:outline-none focus:ring-[#F9F9F9] font-suitM rounded-lg text-sm px-3 py-2.5 text-center"
                      : "w-[5vw] ml-[1vw] text-white bg-gray-300 shadow-md hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-[#F9F9F9] font-suitM rounded-lg text-sm px-3 py-2.5 text-center"
                  }
                  type="button"
                  onClick={authCodeCheckRequest}
                >
                  {!isEmailAuthentication ? "확인" : "인증됨"}
                </button>
              </div>
              <div>
                {authCodeStatus == "인증번호가 올바르지 않습니다." && (
                  <ValidNO text={authCodeStatus} />
                )}
                {authCodeStatus == "이메일 인증이 완료되었습니다." && (
                  <ValidOK text={authCodeStatus} />
                )}
              </div>
            </div>
          )}

          <div>
            <label
              id="nickname"
              className="block mb-1 text-sm font-suitM text-gray-900"
            >
              닉네임
            </label>
            <input
              type="nickname"
              onChange={onChangeNickname}
              placeholder="닉네임을 입력하세요"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-gray-300 focus:ring-0 block w-full p-2.5"
            />
            <div>
              {nicknameStatus == "사용 가능한 닉네임입니다." ? (
                <ValidOK text={nicknameStatus} />
              ) : (
                <ValidNO text={nicknameStatus} />
              )}
            </div>
          </div>
          <div>
            <label
              id="password"
              className="block mb-1 text-sm font-suitM text-gray-900 dark:text-white"
            >
              비밀번호
            </label>
            <input
              type="password"
              onChange={onChangePassword}
              placeholder="비밀번호를 입력하세요"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-gray-300 focus:ring-0 block w-full p-2.5"
            />
            <div>
              {passwordStatus == "사용 가능한 비밀번호입니다." ? (
                <ValidOK text={passwordStatus} />
              ) : (
                <ValidNO text={passwordStatus} />
              )}
            </div>
          </div>
          <div className="pb-[2vh]">
            <label
              id="password-check"
              className="block mb-1 text-sm font-suitM text-gray-900 dark:text-white"
            >
              비밀번호 확인
            </label>
            <input
              type="password"
              value={checkPassword}
              onChange={onChangePasswordCheck}
              placeholder="비밀번호를 재입력 하세요"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-gray-300 focus:ring-0 block w-full p-2.5"
            />
            <div>
              {checkPasswordStatus == "비밀번호가 일치합니다." ? (
                <ValidOK text={checkPasswordStatus} />
              ) : (
                <ValidNO text={checkPasswordStatus} />
              )}
            </div>
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
