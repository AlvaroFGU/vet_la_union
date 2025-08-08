// src/components/Layout.jsx
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaDog, FaCalendarAlt, FaSyringe, FaClipboardList, FaUsers, FaChartBar, FaCog, FaBars, FaTimes } from "react-icons/fa";
import "../styles/Layout.css";

function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!usuario) {
    navigate("/login");
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  // Opciones del menú según rol
  const menuItemsByRole = {
    administrador: [
      { path: "/admin", label: "Dashboard", icon: <FaTachometerAlt /> },
      { path: "/usuarios", label: "Usuarios", icon: <FaUsers /> },
      { path: "/veterinarios", label: "Veterinarios", icon: <FaUsers /> },
      { path: "/cliente", label: "Clientes", icon: <FaUsers /> },
      { path: "/mascotas", label: "Mascotas", icon: <FaDog /> },
      { path: "/citas", label: "Citas", icon: <FaCalendarAlt /> },
      { path: "/vacunas", label: "Vacunas", icon: <FaSyringe /> },
      { path: "/historial", label: "Historial Clínico", icon: <FaClipboardList /> },
      { path: "/reportes", label: "Reportes", icon: <FaChartBar /> },
      { path: "/configuracion", label: "Configuración", icon: <FaCog /> },
    ],
    veterinario: [
      { path: "/dashboard-veterinario", label: "Dashboard", icon: <FaTachometerAlt /> },
      { path: "/mis-citas", label: "Mis Citas", icon: <FaCalendarAlt /> },
      { path: "/mis-pacientes", label: "Pacientes", icon: <FaDog /> },
      { path: "/vacunas", label: "Vacunas", icon: <FaSyringe /> },
      { path: "/historial", label: "Historial Clínico", icon: <FaClipboardList /> },
    ],
    recepcionista: [
      { path: "/dashboard-recepcionista", label: "Dashboard", icon: <FaTachometerAlt /> },
      { path: "/clientes", label: "Clientes", icon: <FaUsers /> },
      { path: "/mascotas", label: "Mascotas", icon: <FaDog /> },
      { path: "/citas", label: "Citas", icon: <FaCalendarAlt /> },
    ],
    cliente: [
      { path: "/mis-mascotas", label: "Mis Mascotas", icon: <FaDog /> },
      { path: "/mis-citas", label: "Mis Citas", icon: <FaCalendarAlt /> },
      { path: "/historial", label: "Historial Clínico", icon: <FaClipboardList /> },
    ],
  };

  const menuItems = menuItemsByRole[usuario.rol] || [];

  return (
    <div className="layout-container">
      {/* Sidebar lateral */}
      <aside className={`sidebar ${mobileMenuOpen ? "mobile-open" : ""}`}>
        <h2 className="sidebar-title">🐾 Veterinaria</h2>
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.path}
              className={location.pathname === item.path ? "active" : ""}
              onClick={() => {
                navigate(item.path);
                setMobileMenuOpen(false); // Cierra menú móvil al seleccionar
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
        {/* Botón cerrar menú móvil */}
        {mobileMenuOpen && (
          <button
            className="mobile-close-btn"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Cerrar menú"
          >
            <FaTimes />
          </button>
        )}
      </aside>

      {/* Contenido principal */}
      <div className="main-content">
        {/* Header */}
        <header className="topbar">
          {/* Botón hamburguesa solo visible en móvil */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menú"
          >
            <FaBars />
          </button>

          <div className="user-info" onClick={() => setMenuOpen(!menuOpen)}>
            <img
              src={usuario.fotografia || "/default-user.png"}
              alt="foto usuario"
              className="avatar"
            />
            <div className="user-text">
              <span className="user-name">{usuario.nombre_completo}</span>
              <span className="user-role">{usuario.rol}</span>
            </div>
          </div>

          {/* Menú desplegable */}
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
