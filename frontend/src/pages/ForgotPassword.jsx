// frontend/src/pages/ForgotPassword.jsx
import { useState } from "react";
import { forgotPassword } from "../services/authService";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await forgotPassword(email);
      setMessage(data.message);
      setToken(data.resetToken);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error al solicitar recuperación");
    }
  };

  return (
    <section className="card">
      <h2>Recuperar contraseña</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button>Solicitar recuperación</button>
      </form>
      <p>{message}</p>
      {token && <textarea readOnly value={token}></textarea>}
    </section>
  );
}

export default ForgotPassword;