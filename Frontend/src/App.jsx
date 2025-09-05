import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        {/* Default route → Signup */}
        <Route path="/" element={<Signup />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protect home, redirect if no token */}
        <Route
          path="/home"
          element={token ? <Home /> : <Navigate to="/signup" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
