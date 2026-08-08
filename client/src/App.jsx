import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import DelegateProfile from "./pages/DelegateProfile";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/delegate/:id"
          element={<DelegateProfile />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;