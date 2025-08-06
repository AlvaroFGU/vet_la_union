import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("login/", { email, contrasenia });
      const usuario = res.data;

      localStorage.setItem("usuario", JSON.stringify(usuario));

      // Redirigir según el rol
      switch (usuario.rol) {
        case "administrador":
          navigate("/admin");
          break;
        case "veterinario":
          navigate("/veterinario");
          break;
        case "recepcionista":
          navigate("/recepcionista");
          break;
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
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-image" style={{ backgroundImage: `url(https://images.unsplash.com/photo-1523480717984-24cba35ae1ef?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9uZG8lMjBkZSUyMHBhbnRhbGxhJTIwZGUlMjBwZXJyb3xlbnwwfHwwfHx8MA%3D%3D)` }}></div>
        
        <div className="login-form">
          <h2 className="login-title">Veterinaria La Unión</h2>
                    
          <div className="divider">
            <div className="divider-line"></div>
            <span className="divider-text">o</span>
            <div className="divider-line"></div>
          </div>
          
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Correo Electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                value={contrasenia}
                onChange={(e) => setContrasenia(e.target.value)}
                required
                className="form-input"
              />
            </div>
            
            <div className="forgot-password">
              <a href="#" onClick={(e) => {
                e.preventDefault();
                navigate("/RecuperarContrasenia"); 
              }} className="forgot-password-link">¿Olvidaste tu Contraseña?</a>
            </div>
            
            <button type="submit" className="login-btn">
              Iniciar Sesión
            </button>
          </form>
          
          {error && <p className="error-message">{error}</p>}
          
          <div className="signup-text">
            ¿No tienes una cuenta? <a href="#" className="signup-link">Registrarse</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;