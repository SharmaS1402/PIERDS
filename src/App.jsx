
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NewPage from "./components/NewPage";
import Organisation from "./components/Organisation";
function App() {

 

  return (
    <>
    <Router>
    <Routes>
      <Route path="/" element={<Organisation/>}/>
      <Route path="/new-page" element={<NewPage/>}/>
    </Routes>
    </Router>
    </>
  )
}

export default App
