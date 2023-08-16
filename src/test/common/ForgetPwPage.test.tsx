import ForgetPwPage from '@pages/common/ForgetPwPage';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

describe('ForgetPwPage', () => {
	beforeEach(() => {
		render(
			<MemoryRouter initialEntries={['/forget-pw']}>
				<Routes>
					<Route path='/forget-pw' element={<ForgetPwPage/>}/>
				</Routes>
			</MemoryRouter>
		)
	});

	it('입력창 렌더링 테스트', () => {
		const emailLabel = screen.findByLabelText(/이메일/i);
		waitFor(() => expect(emailLabel).toBeInTheDocument());
	});

	it('비밀번호 재설정 버튼 렌더링 테스트', () => {
		const resetButton = screen.findByText(/비밀번호 재설정 이메일 받기/i);
		waitFor(() => expect(resetButton).toBeInTheDocument());
	});
});