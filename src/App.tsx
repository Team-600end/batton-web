// import { useState } from 'react';
import Navbar from "./components/Navbar";
import "./assets/index.css";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SingupPage";
import ForgetPwPage from "./pages/ForgetPwPage";
import MainPage from "./pages/MainPage";
import PjCard from "./components/PjCard";
import DbMember from "./components/DbMember";
import DbIssueLog from "./components/DbIssueLog";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      {/* <MainPage /> */}
      {/* <Navbar /> */}
      {/* <LoginPage /> */}
      {/* <SignupPage/> */}
      {/* <ForgetPwPage /> */}

      {/* ---아래는 지울것--- */}
      {/* <PjCard /> */}
      {/* <DbMember /> */}
      <DbIssueLog />
    </>
  );
}

export default App;
