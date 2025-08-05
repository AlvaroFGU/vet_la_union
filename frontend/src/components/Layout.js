import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Layout.css";

function Layout({ children }) {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [menuOpen, setMenuOpen] = useState(false);

  if (!usuario) {
    navigate("/login");
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  return (
    <div className="layout-container">
      {/* Navbar lateral */}
      <aside className="sidebar">
        <h2>🐾 Veterinaria</h2>
        <ul>
          <li onClick={() => navigate("/admin")}>Inicio</li>
          <li onClick={() => navigate("/mascotas")}>Mascotas</li>
          <li onClick={() => navigate("/citas")}>Citas</li>
          <li onClick={() => navigate("/reportes")}>Reportes</li>
        </ul>
      </aside>

      {/* Contenido principal */}
      <div className="main-content">
        {/* Header */}
        <header className="topbar">
          <div className="user-info" onClick={() => setMenuOpen(!menuOpen)}>
            <img
              src={usuario.fotografia} 
              alt="foto usuario"
              className="avatar"
            />
            <div>
              <span className="user-name">{usuario.nombre_completo}</span>
              <span className="user-role">{usuario.rol}</span>
            </div>
          </div>

          {/* Menu desplegable */}
          {menuOpen && (
            <div className="dropdown-menu">
              <p onClick={() => navigate("/perfil")}>Editar perfil</p>
              <p onClick={() => navigate("/cambiar-password")}>Cambiar contraseña</p>
              <p onClick={handleLogout}>Cerrar sesión</p>
            </div>
          )}
        </header>

        {/* Aquí va el contenido dinámico */}
        <main className="content">{children}</main>
      </div>
    </div>
  );
}

export default Layout;
