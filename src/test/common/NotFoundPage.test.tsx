import NotFoundPage from "@pages/common/NotFoundPage";
import LandingPage from "@pages/common/LandingPage";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

describe("NotFoundPage", () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={["/notfound"]}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/notfound" element={<NotFoundPage />} />
        </Routes>
      </MemoryRouter>
    );
  });

	it("랜딩 페이지 복귀 버튼 렌더링 테스트", () => {
		const button = screen.getByText(/랜딩페이지로 돌아가기/i);
		expect(button).toBeInTheDocument();
	});
	
  it("랜딩 페이지 복귀 버튼 작동 테스트", () => {
    const button = screen.getByText(/랜딩페이지로 돌아가기/i);
    fireEvent.click(button);

		const landingPage = screen.findByText(/시작하기/);
    waitFor(() => expect(landingPage).toBeInTheDocument());
  });
});
