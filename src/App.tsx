import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "@assets/index.css";
import { RecoilRoot } from "recoil";
import LoginPage from "@pages/common/LoginPage";
import ForgetPwPage from "@pages/common/ForgetPwPage";
import SignupPage from "@pages/common/SingupPage";
import Releases from "@src/pages/project/releases/Releases";
import RnoteEditPage from "@src/pages/project/releases/RnoteEditPage";
import ReleasesNote from "@src/pages/project/releases/ReleasesNote";
import MainPage from "@pages/main/MainPage";
import IssueBoardPage from "@pages/project/issue/IssueBoardPage";
import BoardPage from "@pages/board/BoardPage";
import IssueHistoryPage from "@pages/project/issue/IssueHistoryPage";
import NoticeDetailPage from "@pages/NoticeDetailPage";
import { CookiesProvider } from "react-cookie";
import CreatePjPage from "@pages/project/CreatePjPage";
import MyPage from "@pages/MyPage";
import LandingPage from "@pages/common/LandingPage";
import Layout from "@src/Layout";
import NotFoundPage from "@pages/common/NotFoundPage";
import DashBoardPage from "@pages/project/dashboard/DashBoardPage";
import HiddenIssuePage from "@pages/project/issue/HiddenIssuePage";
import WriteIssueReport from "./pages/project/issue/WriteIssueReport";
import IssueManagePage from "./pages/project/issue/IssueManagePage";
import IssueReportPage from "./pages/project/issue/IssueReportPage";
function App() {
  return (
    <CookiesProvider>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            {/* <Route
              path="/project/issueboard/:projectId"
              Component={IssueBoardPage}
            />
            <Route
              path="/project/releasesnote/:projectId"
              Component={ReleasesNote}
            />
            <Route path="/project/releases/:releasesId" Component={Releases} />
            <Route
              path="/project/releases/write/:projectId"
              Component={RnoteEditPage}
            /> */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forget-pw" element={<ForgetPwPage />} />
            <Route path="/dev" />
            <Route path="*" element={<NotFoundPage />} />
            <Route element={<Layout />}>
              <Route path="/main" element={<MainPage />} />
              <Route path="/project/:projectId/dashboard" element={<DashBoardPage />} />
              <Route path="/project/:projectId/issueboard" element={<IssueBoardPage />} />
              <Route path="/project/:projectId/issue/:issueId/write" element={<WriteIssueReport/>} />
              <Route path="/project/:projectId/issue/:issueId/edit" element={<IssueManagePage/>} />
              <Route path="/project/:projectId/issue/:issueId" element={<IssueReportPage/>} />
              <Route path="/project/:projectId/issue-history" element={<IssueHistoryPage />} />
              <Route path="/project/:projectId/hidden-issue" element={<HiddenIssuePage />} />
              <Route path="/project/:projectId/releasesnote" element={<ReleasesNote />} />
              <Route path="/project/:projectId/releasesnote/0" element={<Releases />} />
              <Route path="/project/:projectId/releasesnote/write" element={<RnoteEditPage />} />
              <Route path="/myinfo-edit" element={<MyPage />} />
              <Route path="/new-project" element={<CreatePjPage />} />
              <Route path="/board" element={<BoardPage />} />
              <Route path="/notifications" element={<NoticeDetailPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </CookiesProvider>
  );
}

export default App;
