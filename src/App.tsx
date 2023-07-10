// import { useState } from 'react';
import Navbar from './components/Navbar';
import './assets/index.css';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SingupPage';
import ForgetPwPage from './pages/ForgetPwPage';
import MainNavbar from './components/MainNavbar';
import IssueBoardPage from './pages/IssueBoardPage';
import IssueBadge from './components/IssueBadge';
import IssueCard from './components/IssueCard';
import Notice from './components/Notice';
import NoticeDetailPage from './pages/NoticeDetailPage';
import ReleaseNoteEditPage from './pages/RnoteEditPage';
import PjCard from "./components/PjCard";
import DbMember from "./components/DbMember";
import DbIssueLog from "./components/DbIssueLog";
import MainPage from './pages/MainPage';


function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      {/* <ReleaseNoteEditPage/> */}
      <MainPage />
      {/* <Navbar /> */}
      {/* <LoginPage /> */}
      {/* <SignupPage/> */}
      {/* <ForgetPwPage /> */}

      {/* ---아래는 지울것--- */}
      {/* <PjCard /> */}
      {/* <DbMember /> */}
      {/* <DbIssueLog /> */}
    </>
  );
}

export default App;
