// import { useState } from 'react';
import Navbar from './components/Navbar';
import './assets/index.css';
import CreatePjPage from './pages/CreatePjPage';

import IssueEditPage from './pages/IssueEditPage';
import MyPage from './pages/MyPage';
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
