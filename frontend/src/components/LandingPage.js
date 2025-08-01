import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* NAVBAR */}
      <nav className="navbar rounded-navbar">
        <div className="logo">
          <span role="img" aria-label="logo">🐾</span> La Unión
        </div>
        <ul className="nav-links">
          <li><a href="#nosotros">Nosotros</a></li>
          <li><a href="#servicios">Servicios</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
        <div className="nav-buttons">
          <button className="btn-outline" onClick={() => navigate("/login")}>Iniciar sesión</button>
          <button className="btn-primary" onClick={() => navigate("/registro")}>Reservar cita</button>
        </div>
      </nav>

      {/* HERO */}
      <header className="hero">
        <div className="hero-text">
          <h1>Veterinaria La Unión</h1>
          <p>Atención integral y amor por tus mascotas</p>
          <button className="btn-primary" onClick={() => navigate("/registro")}>
            Reserva tu cita
          </button>
        </div>
        <div className="hero-image">
          <img src="https://imgs.search.brave.com/adqrmL7zGee7pIJQ7TilFqQjw0eooUvJ3XlC1bI6nY4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90by1ncmF0aXMv/aW1hZ2VuLXBlcnJv/LWxhYnJhZG9yLXJl/dHJpZXZlci1nZW5l/cmFkYS1haV8yMy0y/MTUwNjQ0OTA2Lmpw/Zz9zZW10PWFpc19o/eWJyaWQmdz03NDA" alt="Perro feliz" />
        </div>
      </header>

      {/* CARACTERÍSTICAS */}
      <section className="features-section">
        <h2>¿Por qué elegirnos?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>📋 Historial Clínico</h3>
            <p>Registra y consulta los historiales médicos de tus mascotas de forma sencilla y segura.</p>
          </div>
          <div className="feature-card">
            <h3>📅 Citas Online</h3>
            <p>Agenda, modifica y consulta tus citas veterinarias desde cualquier lugar.</p>
          </div>
          <div className="feature-card">
            <h3>🤖 Chatbot Inteligente</h3>
            <p>Describe los síntomas de tu mascota y recibe orientación sobre la urgencia de la atención.</p>
          </div>
        </div>
      </section>

      {/* CARRUSEL DE SERVICIOS */}
      <section className="carousel-section" id="servicios">
        <h2>Nuestros Servicios</h2>
        <Carousel showThumbs={false} infiniteLoop autoPlay interval={3000}>
          <div>
            <img src="/images/servicio1.jpg" alt="Consulta general" />
            <p className="legend">Consulta general</p>
          </div>
          <div>
            <img src="/images/servicio2.jpg" alt="Vacunación" />
            <p className="legend">Vacunación</p>
          </div>
          <div>
            <img src="/images/servicio3.jpg" alt="Cirugía" />
            <p className="legend">Cirugía</p>
          </div>
        </Carousel>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <p>© {new Date().getFullYear()} Veterinaria La Unión - Todos los derechos reservados</p>
          <ul>
            <li><a href="#politica">Política de privacidad</a></li>
            <li><a href="#terminos">Términos y condiciones</a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
