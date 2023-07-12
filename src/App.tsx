// import { useState } from 'react';
import Navbar from "./components/Navbar";
import "./assets/index.css";
import WriteIssueReport from "./pages/WriteIssueReport";
import Release from "./pages/Release";
import IssueBoardPage from "./pages/IssueBoardPage";
import IssueReport from "./pages/IssueReport";
import ReleaseNote from "./pages/ReleaseNote";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      {/* <Navbar /> */}
      {/* <WriteIssueReport /> */}
      <Release />
      {/* <ReleaseNote /> */}
      {/* <IssueBoardPage /> */}
      {/* <IssueReport /> */}
    </>
  );
}

export default App;
