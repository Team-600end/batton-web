import LandingPage from "@src/pages/common/LandingPage";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

describe('LandingPage', () => {
    beforeEach(() => {
        render(
            <MemoryRouter initialEntries={['/']}> 
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                </Routes>
            </MemoryRouter>
        );
    });

    it('시작하기 버튼이 렌더링 테스트', () => {
        const button = screen.getByText(/시작하기/i);
        expect(button).toBeInTheDocument();
    });

    
    it('시작하기 버튼 작동 테스트', () => {
        const button = screen.getByText(/시작하기/i);
        fireEvent.click(button);
        
        // 로그인 페이지 텍스트가 나타날 때까지 대기하고 검증
        const loginPage = screen.findByText(/로그인/i);
        waitFor(() => expect(loginPage).toBeInTheDocument());
    });
});