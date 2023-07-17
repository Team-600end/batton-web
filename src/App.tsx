import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "@assets/index.css";
import { RecoilRoot } from "recoil";
import LoginPage from "@pages/common/LoginPage";
import ForgetPwPage from "@pages/common/ForgetPwPage";
import SignupPage from "@pages/common/SingupPage";
import Release from "@pages/project/release/Release";
import RnoteEditPage from "@pages/project/release/RnoteEditPage";
import ReleaseNote from "@pages/project/release/ReleaseNote";
import MainPage from "@pages/main/MainPage";
import IssueBoardPage from "@pages/project/issue/IssueBoardPage";
import BoardPage from "@pages/board/BoardPage";
import IssueHistoryPage from "@pages/project/issue/IssueHistoryPage";
import NoticeDetailPage from "@pages/NoticeDetailPage";
import { CookiesProvider } from "react-cookie";
import LandingPage from "./pages/LandingPage";
import CreatePjPage from "@pages/project/CreatePjPage";
import MyPage from "./pages/MyPage";
import LandingPage from "@pages/common/LandingPage";
import Layout from "@src/Layout";
import NotFoundPage from "@pages/common/NotFoundPage";
import DashBoardPage from "@pages/project/dashboard/DashBoardPage";
function App() {
  return (
    <CookiesProvider>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" Component={LandingPage} />
            <Route path="/signup" Component={SignupPage} />
            <Route path="/forget-pw" Component={ForgetPwPage} />
            <Route path="/main" Component={MainPage} />
            <Route path="/project/0/issueboard" Component={IssueBoardPage} />
            <Route path="/project/0/releasenote" Component={ReleaseNote} />
            <Route path="/project/0/releasenote/0" Component={Release} />
            <Route path="/project/0/releasenote/write" Component={RnoteEditPage} />
            {/* <Route
              path="/project/issueboard/:projectId"
              Component={IssueBoardPage}
            />
            <Route
              path="/project/releasenote/:projectId"
              Component={ReleaseNote}
            />
            <Route path="/project/release/:releaseId" Component={Release} />
            <Route
              path="/project/release/write/:projectId"
              Component={RnoteEditPage}
            /> */}
            <Route path="/myinfo-edit" Component={MyPage}/>
            <Route path="/new-project" Component={CreatePjPage}/>
            <Route path="/board" Component={BoardPage} />
            <Route path="/notifications" Component={NoticeDetailPage} />
            <Route path="*" Component={LoginPage} />
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forget-pw" element={<ForgetPwPage />} />
            <Route path="*" element={<NotFoundPage/>} />
            <Route element={<Layout />}>
              <Route path="/main" element={<MainPage />} />
              <Route path="/project/:projectId/dashboard" element={<DashBoardPage />} />
              <Route path="/project/:projectId/issueboard" element={<IssueBoardPage />} />
              <Route path="/project/:projectId/releasenote" element={<ReleaseNote />} />
              <Route path="/project/:projectId/releasenote/0" element={<Release />} />
              <Route path="/project/:projectId/releasenote/write" element={<RnoteEditPage />} />
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
