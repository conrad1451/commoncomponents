import OldApp from "./OldApp";
import "./App.css";

// import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import OldApp2 from "./OldApp2";
import VitePlusTextBox from "./VitePlusTextBox";
// import AutoCompleteTest from "./AutoCompleteTest";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<OldApp />} />
          <Route path="/secondapp" element={<OldApp2 />} />
          <Route path="/viteandtextbox" element={<VitePlusTextBox />} />
          {/* <Route path="/testfieldfinisher" element={<AutoCompleteTest />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
