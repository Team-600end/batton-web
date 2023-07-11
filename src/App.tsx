// import { useState } from 'react';
import Navbar from "./components/Navbar";
import "./assets/index.css";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SingupPage";
import ForgetPwPage from "./pages/ForgetPwPage";
import ReleaseNote from "./pages/ReleaseNote";
import MainPage from "./pages/MainPage";
import Release from "./pages/Release";
import MainNavbar from "./components/MainNavbar";
import IssueBoardPage from "./pages/IssueBoardPage";
import IssueBadge from "./components/IssueBadge";
import IssueCard from "./components/IssueCard";
import WriteIssueReport from "./pages/WriteIssueReport";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      {/* <ForgetPwPage /> */}
      {/* <ReleaseNote /> */}
      {/* <Release /> */}
      {/* <MainPage /> */}
      {/* <Navbar/> */}
      {/* <MainNavbar/> */}
      {/* <LoginPage/> */}
      {/* <SignupPage/> */}
      {/* <ForgetPwPage/>  */}
      {/* <IssueBoardPage /> */}
      {/* <IssueCard/> */}
      <WriteIssueReport />
    </>
  );
}

export default App;
