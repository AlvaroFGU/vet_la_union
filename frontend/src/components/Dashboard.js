import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Recuperar el usuario del localStorage
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // Validar login una sola vez
  useEffect(() => {
    if (!usuario) {
      navigate("/"); // si no hay usuario, redirigir al login
    }
  }, [usuario, navigate]);

  // Cargar mascotas solo si hay usuario
  useEffect(() => {
    if (usuario) {
      api.get("mascotas/")
        .then((res) => {
          setMascotas(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [usuario]); // solo se ejecuta si el usuario cambia

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/");
  };

  if (!usuario) return null; // evita renderizar si no hay usuario

  return (
    <div style={{ padding: "20px" }}>
      <h2>Bienvenido {usuario.nombre_completo}</h2>
      <button onClick={handleLogout}>Cerrar sesión</button>

      <h3>Mascotas registradas:</h3>
      {loading ? (
        <p>Cargando mascotas...</p>
      ) : (
        <ul>
          {mascotas.map((m) => (
            <li key={m.id}>{m.nombre} - {m.especie}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;
