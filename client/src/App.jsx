import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import DelegateProfile from "./pages/DelegateProfile";
import AdminDelegates from "./pages/AdminDelegates";
import AddDelegate from "./pages/AddDelegate";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Home */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Public Delegate Profile */}
        <Route
          path="/delegate/:id"
          element={<DelegateProfile />}
        />

        {/* Admin */}
        <Route
          path="/admin/delegates"
          element={<AdminDelegates />}
        />

        <Route
          path="/admin/delegates/new"
          element={<AddDelegate />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;