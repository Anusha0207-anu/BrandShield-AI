import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login, Register } from "./Auth";
import Dashboard from "./Dashboard";

function ProtectedDashboard() {
  const session =
    localStorage.getItem("brandshieldSession") ||
    sessionStorage.getItem("brandshieldSession");

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return <Dashboard />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedDashboard />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}