import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import LandingPage from "./components/LandingPage";
import AdminPage from "./components/AdminPage";
import VeterinarioPage from "./components/VeterinarioPage";
import RecepcionistaPage from "./components/RecepcionistaPage";
import ClientePage from "./components/ClientePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/veterinario" element={<VeterinarioPage />} />
        <Route path="/recepcionista" element={<RecepcionistaPage />} />
        <Route path="/cliente" element={<ClientePage />} />
      </Routes>
    </Router>
  );
}

export default App;
