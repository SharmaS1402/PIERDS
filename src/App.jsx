import { useState } from "react";

import Form from "./components/form";
import NameAndButtons from "./components/don";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Form />
      {/* <NameAndButtons /> */}
    </>
  );
}

export default App;
