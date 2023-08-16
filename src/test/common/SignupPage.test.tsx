import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SignupPage from "@pages/common/SignupPage";

describe("SignupPage", () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={["/signup"]}>
        <SignupPage />
      </MemoryRouter>
    );
  });

  it("renders the email input field", () => {
    const emailInput = screen.getByPlaceholderText("이메일을 입력하세요");
    expect(emailInput).toBeInTheDocument();
  });

  it("renders the nickname input field", () => {
    const nicknameInput = screen.getByPlaceholderText("닉네임을 입력하세요");
    expect(nicknameInput).toBeInTheDocument();
  });

  it("renders the password input field", () => {
    const passwordInput = screen.getByPlaceholderText("비밀번호를 입력하세요");
    expect(passwordInput).toBeInTheDocument();
  });

  it("renders the password confirmation input field", () => {
    const passwordConfirmationInput =
      screen.getByPlaceholderText("비밀번호를 재입력 하세요");
    expect(passwordConfirmationInput).toBeInTheDocument();
  });

  it("renders the email verification button", () => {
    const emailVerificationButton = screen.getByText("이메일 인증");
    expect(emailVerificationButton).toBeInTheDocument();
  });

  it("renders the signup button", () => {
    const signupButton = screen.findByText("회원가입");
    waitFor(() => expect(signupButton).toBeInTheDocument());
  });

  it("displays error message for invalid email", () => {
    const emailInput = screen.getByPlaceholderText("이메일을 입력하세요");
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });

    const errorMessage = screen.getByText("이메일 형식이 올바르지 않습니다.");
    expect(errorMessage).toBeInTheDocument();
  });

  it("입력창 및 버튼 렌더링 테스트", () => {
    const emailInput = screen.findByPlaceholderText("이메일을 입력하세요");
    const nicknameInput = screen.findByPlaceholderText("닉네임을 입력하세요");
    const passwordInput = screen.findByPlaceholderText("비밀번호를 입력하세요");
    const passwordConfirmationInput =
      screen.findByPlaceholderText("비밀번호를 재입력 하세요");
    const emailVerificationButton = screen.findByText("이메일 인증");
    const signupButton = screen.findByText("회원가입");

    waitFor(() => expect(emailInput).toBeInTheDocument());
    waitFor(() => expect(nicknameInput).toBeInTheDocument());
    waitFor(() => expect(passwordInput).toBeInTheDocument());
    waitFor(() => expect(passwordConfirmationInput).toBeInTheDocument());
    waitFor(() => expect(emailVerificationButton).toBeInTheDocument());
    waitFor(() => expect(signupButton).toBeInTheDocument());
  });
});
