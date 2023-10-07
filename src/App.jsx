import { useState } from "react";

import "./App.css";
import { Folder } from "./component/Folder";

function App() {
  const [files, setFiles] = useState([]);

  return (
    <>
 

      <Folder files={files} setFiles={setFiles} />
    </>
  );
}

export default App;
