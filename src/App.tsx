import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import CreatePjPage from "./pages/CreatePjPage";
import MyPage from "./pages/MyPage";

function App() {
  const showNavbar = !["/", "/signup", "/login", "/forget-pw"].includes(
    window.location.pathname
  );

  return (
    <CookiesProvider>
      <RecoilRoot>
        <BrowserRouter>
          {showNavbar && <Navbar />}
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
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </CookiesProvider>
  );
}

export default App;
