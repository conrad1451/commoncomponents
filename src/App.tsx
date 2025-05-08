import OldApp from "./OldApp";
import "./App.css";

// import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AutoCompleteTest from "./AutoCompleteTest";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<OldApp />} />
          <Route path="/testfieldfinisher" element={<AutoCompleteTest />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
