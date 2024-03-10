
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
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
          
        </Routes>
      </Router>
    </>
  );
}

export default App;
