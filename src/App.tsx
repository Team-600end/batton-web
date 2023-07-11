// import { useState } from 'react';
import Navbar from "./components/Navbar";
import "./assets/index.css";
import WriteIssueReport from "./pages/WriteIssueReport";
import Release from "./pages/Release";
import IssueBoardPage from "./pages/IssueBoardPage";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      {/* <Navbar /> */}
      <WriteIssueReport />
      {/* <Release /> */}
      {/* <IssueBoardPage /> */}
    </>
  );
}

export default App;
