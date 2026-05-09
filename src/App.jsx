import { Routes, Route } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Main from "./pages/Main/Main";
import ItemDetail from "./pages/Item/ItemDetail";

function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route index element={<Main />} />
        <Route path="/item/:id" element={<ItemDetail />} />
      </Route>
    </Routes>
  );
}

export default App;