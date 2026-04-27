//
/*import {BrowserRouter, Routes, Route} from "react-router-dom";
import RootLayout from "../src/layout/RootLayout.jsx";
import Main from "../src/pages/Main/Main.jsx"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
        <Route path="/" element={<Main />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;*/

import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Main from "./pages/Main/Main";
// import Add from "./pages/Add/Add";
// import Edit from "./pages/Edit/Edit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Main />} />
          {/* <Route path="/add" element={<Add />} />
          <Route path="/edit" element={<Edit />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;