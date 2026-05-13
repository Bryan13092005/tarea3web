// frontend/src/App.jsx
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register.jsx";
import VerifyAccount from "./pages/VerifyAccount.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <main>
        <h1>Auth Fullstack</h1>
        <nav>
          <Link to="/">Registro</Link>
          <Link to="/forgot-password">Recuperar contraseña</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/verify/:token" element={<VerifyAccount />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;