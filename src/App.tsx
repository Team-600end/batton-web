import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "@assets/index.css";
import { RecoilRoot } from "recoil";
import LoginPage from "@pages/LoginPage";
import ForgetPwPage from "@pages/ForgetPwPage";
import SignupPage from "@pages/SingupPage";
import Release from "@src/pages/project/release/Release";
import RnoteEditPage from "@src/pages/project/release/RnoteEditPage";
import ReleaseNote from "@src/pages/project/release/ReleaseNote";
import MainPage from "@src/pages/main/MainPage";
import IssueBoardPage from "@pages/project/issue/IssueBoardPage";
import BoardPage from "@src/pages/board/BoardPage";
import IssueHistoryPage from "@pages/project/issue/IssueHistoryPage";
import NoticeDetailPage from "@pages/NoticeDetailPage";
import { CookiesProvider } from "react-cookie";
import LandingPage from "@pages/LandingPage";
import Layout from "@src/Layout";
import NotFoundPage from "@pages/NotFoundPage";
import DashBoardPage from "@src/pages/project/dashboard/DashBoardPage";

function App() {
  return (
    <CookiesProvider>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forget-pw" element={<ForgetPwPage />} />
            <Route path="*" element={<NotFoundPage/>} />
            <Route element={<Layout />}>
              <Route path="/main" element={<MainPage />} />
              <Route path="/project/0/dashboard" element={<DashBoardPage />} />
              <Route path="/project/0/issueboard" element={<IssueBoardPage />} />
              <Route path="/project/0/releasenote" element={<ReleaseNote />} />
              <Route path="/project/0/releasenote/0" element={<Release />} />
              <Route path="/project/0/releasenote/write" element={<RnoteEditPage />} />
              <Route path="/myinfo-edit" />
              <Route path="/new-project" />
              <Route path="/board" element={<BoardPage/>} />
              <Route path="/notifications" element={<NoticeDetailPage/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </CookiesProvider>
  );
}

export default App;
