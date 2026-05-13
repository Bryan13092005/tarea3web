// frontend/src/pages/Register.jsx
import { useState } from "react";
import { registerUser } from "../services/authService";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(form);
      setMessage(data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error al registrar");
    }
  };

  return (
    <section className="card">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} />
        <input name="email" placeholder="Correo" value={form.email} onChange={handleChange} />
        <input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} />
        <button type="submit">Registrarse</button>
      </form>
      <p>{message}</p>
    </section>
  );
}

export default Register;