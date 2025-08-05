import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";

function LoginApp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  try {
    const res = await api.post("login/", { email, contraseña });
    const usuario = res.data;

    localStorage.setItem("usuario", JSON.stringify(usuario));

    // Redirigir según el rol
    switch (usuario.rol) {
      case "cliente":
        navigate("/cliente");
        break;
      default:
        navigate("/dashboard"); 
    }
  } catch (err) {
    setError("Usuario o contraseña incorrectos");
  }
};

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br /><br />
        <input
          type="password"
          placeholder="Contraseña"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          required
        /><br /><br />
        <button type="submit">Ingresar</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default LoginApp;
