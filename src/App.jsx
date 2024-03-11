
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import NewPage from "./components/NewPage";

import Distri from "./components/Distri";

import Organisation from "./components/Organisation";
import WebcamCapture from "./components/WebcamCapture";
import NameAndButtons from "./components/don";
import Form from "./components/form";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/user" element={<NameAndButtons />} />
          <Route path="/organisation" element={<Organisation />} />

          <Route path="organisation/webcam" element={<WebcamCapture/>} />
          <Route path="organisation/webcam/next" element={<Distri />} />
          
        </Routes>
      </Router>
    </>
  );
}

export default App;
