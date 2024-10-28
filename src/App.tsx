import {  Routes, Route } from "react-router-dom";
import Login from "./login";
import Dashboard from "./dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {/* 他のルート */}
    </Routes>
  );
}

export default App;
