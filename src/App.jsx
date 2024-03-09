import { useState } from "react";

import Form from "./components/form";
import NameAndButtons from "./components/don";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NewPage from "./components/NewPage";
import Organisation from "./components/Organisation";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/user" element={<NameAndButtons />} />
          <Route path="/organisation" element={<Organisation />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
