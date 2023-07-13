import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./assets/index.css";
import { RecoilRoot } from "recoil";
import LoginPage from "./pages/LoginPage";
import ForgetPwPage from "./pages/ForgetPwPage";
import SignupPage from "./pages/SingupPage";
import Release from "./pages/Release";
import RnoteEditPage from "./pages/RnoteEditPage";
import ReleaseNote from "./pages/ReleaseNote";
import MainPage from "./pages/MainPage";
import IssueBoardPage from "./pages/IssueBoardPage";
import BoardPage from "./pages/BoardPage";
import IssueHistoryPage from "./pages/IssueHistoryPage";
import NoticeDetailPage from "./pages/NoticeDetailPage";
import Navbar from "./components/Navbar";
import { CookiesProvider } from "react-cookie";
import LandingPage from "./pages/LandingPage";
import Layout from "./Layout";
import NotFoundPage from "./pages/NotFoundPage";

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
