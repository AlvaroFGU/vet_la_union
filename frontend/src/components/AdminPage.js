import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";

function AdminPage() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    if (!usuario || usuario.rol !== "administrador") {
      navigate("/"); 
    }
  }, [usuario, navigate]);

  return (
    <Layout>
      <h2>Panel de Administrador</h2>
      <p>Contenido exclusivo para el administrador.</p>
    </Layout>
  );
}

export default AdminPage;
