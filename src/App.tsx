// import { useState } from 'react';
import Navbar from './components/Navbar';
import './assets/index.css';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SingupPage';
import ForgetPwPage from './pages/ForgetPwPage';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      {/* <Navbar/> */}
      <LoginPage/>
      {/* <SignupPage/> */}
      <ForgetPwPage/> 
    </>
  )
}

export default App
