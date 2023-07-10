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

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      {/* <Navbar/>
      <MainNavbar/> */}
      {/* <LoginPage/>
      <SignupPage/>
      <ForgetPwPage/>  */}
      <IssueBoardPage/>
      {/* <IssueCard/> */}
    </>
  )
}

export default App
