import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css"; // estilos separados

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* Header */}
      <header className="landing-header">
        <h1>🐾 Veterinaria La Unión</h1>
        <p>Gestión clínica completa para mascotas</p>
      </header>

      {/* Sección de características */}
      <section className="landing-section">
        <div className="feature">
          <h3>📋 Historial Clínico</h3>
          <p>Registra y consulta los historiales médicos de tus mascotas de forma sencilla y segura.</p>
        </div>
        <div className="feature">
          <h3>📅 Citas Online</h3>
          <p>Agenda, modifica y consulta tus citas veterinarias desde cualquier lugar.</p>
        </div>
        <div className="feature">
          <h3>🤖 Chatbot Inteligente</h3>
          <p>Describe los síntomas de tu mascota y recibe orientación sobre la urgencia de la atención.</p>
        </div>
      </section>

      {/* Botón de iniciar sesión */}
      <section className="landing-action">
        <button onClick={() => navigate("/login")}>Iniciar sesión</button>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>© {new Date().getFullYear()} Veterinaria La Unión - Todos los derechos reservados</p>
      </footer>
    </div>
  );
}

export default LandingPage;
