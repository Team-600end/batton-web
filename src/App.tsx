// import { useState } from 'react';
import Navbar from './components/Navbar';
import './assets/index.css';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SingupPage';
import ForgetPwPage from './pages/ForgetPwPage';
import MyPage from './pages/MyPage';
import CreatePjPage from './pages/CreatePjPage';
import CreateIsModal from './components/CreateIssueModal';
import IssueManagePage from './pages/IssueManagePage';


function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <IssueManagePage/>
      {/* <CreatePjPage/> */}
      {/* {<Navbar/>} */}
      {/* <LoginPage/> */}
      {/* <SignupPage/> */}
      {/* <ForgetPwPage/>  */}
      {/* <Navbar/> */}
    </>
  );
}

export default App;
