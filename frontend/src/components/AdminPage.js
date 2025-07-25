import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminPage() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  useEffect(() => {
    if (!usuario || usuario.rol !== "administrador") {
      navigate("/"); 
    }
  }, [usuario, navigate]);

  return <h2>Panel de Administrador</h2>;
}

export default AdminPage;
