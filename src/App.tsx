import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "@assets/index.css";
import { RecoilRoot } from "recoil";
import LoginPage from "@pages/common/LoginPage";
import ForgetPwPage from "@pages/common/ForgetPwPage";
import SignupPage from "@src/pages/common/SignupPage";
import Releases from "@src/pages/project/releases/ReleasesPage";
import RnoteWritePage from "@src/pages/project/releases/RnoteWritePage";
import ReleasesNote from "@pages/project/releases/ReleasesNote";
import MainPage from "@pages/main/MainPage";
import IssueBoardPage from "@pages/project/issue/IssueBoardPage";
import BoardPage from "@pages/board/BoardPage";
import IssueHistoryPage from "@pages/project/issue/IssueHistoryPage";
import NoticeDetailPage from "@pages/NoticeDetailPage";
import CreatePjPage from "@pages/project/CreatePjPage";
import MyPage from "@pages/MyPage";
import LandingPage from "@pages/common/LandingPage";
import Layout from "@src/Layout";
import NotFoundPage from "@pages/common/NotFoundPage";
import DashBoardPage from "@pages/project/dashboard/DashBoardPage";
import IssueManagePage from "@pages/project/issue/IssueManagePage";
import IssueReportPage from "@pages/project/issue/IssueReportPage";
import IssueEditPage from "@pages/project/issue/IssueEditPage";
import EditPjPage from "@pages/project/EditPjPage";
import ChangePasswordPage from "@pages/ChangePasswordPage";
import RnoteEditPage from "@pages/project/releases/RnoteEditPage";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forget-pw" element={<ForgetPwPage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route element={<Layout />}>
            <Route path="/main" element={<MainPage />} />
            <Route path="/project/:projectKey/dashboard" element={<DashBoardPage />} />
            <Route path="/project/:projectKey/issueboard" element={<IssueBoardPage />} />
            <Route path="/project/:projectKey/issue/:issueId/manage" element={<IssueManagePage />} />
            <Route path="/project/:projectKey/issue/:issueId/edit" element={<IssueEditPage />} />
            <Route path="/project/:projectKey/issue/:issueId" element={<IssueReportPage />} />
            <Route path="/project/:projectKey/issue-history" element={<IssueHistoryPage />} />
            <Route path="/project/:projectKey/releasesnote" element={<ReleasesNote />} />
            <Route path="/project/:projectKey/releasesnote/:releaseId" element={<Releases />} />
            <Route path="/project/:projectKey/releasesnote/write" element={<RnoteWritePage />} />
            <Route path="/project/:projectKey/releasesnote/:releaseId/edit" element={<RnoteEditPage />} />
            <Route path="/project/:projectKey/project-edit" element={<EditPjPage />} />
            <Route path="/myinfo-edit" element={<MyPage />} />
            <Route path="/change-pw" element={<ChangePasswordPage />} />
            <Route path="/new-project" element={<CreatePjPage />} />
            <Route path="/board" element={<BoardPage />} />
            <Route path="/notifications" element={<NoticeDetailPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
