
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
<<<<<<< HEAD
import NewPage from "./components/NewPage";
import Distri from "./components/Distri";
=======
>>>>>>> f158bf5b0288cd9e83d5289722fdc983112c7bd9
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
<<<<<<< HEAD
          <Route path="/distri" element={<Distri />} />
=======
          <Route path="organisation/webcam" element={<WebcamCapture/>} />
          
>>>>>>> f158bf5b0288cd9e83d5289722fdc983112c7bd9
        </Routes>
      </Router>
    </>
  );
}

export default App;
