import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [error, setError] = useState("");

  // 👇 NUEVO: estados para el archivo y mensaje de subida
  const [archivo, setArchivo] = useState(null);
  const [mensajeImagen, setMensajeImagen] = useState("");

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

  // 👇 NUEVO: función para subir a Cloudinary
  const subirArchivoCloudinary = async () => {
    if (!archivo) {
      setMensajeImagen("Selecciona un archivo primero");
      return;
    }

    const formData = new FormData();
    formData.append("file", archivo);

    // Generar nombre personalizado con fecha/hora
    const ahora = new Date();
    const nombrePersonalizado =
      ahora.toLocaleDateString("es-BO", { day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\//g, "") +
      "_" +
      ahora.toTimeString().slice(0, 5).replace(":", "");

    formData.append("upload_preset", "vet_la_union_images"); // 👈 reemplaza
    formData.append("public_id", `mascota/${nombrePersonalizado}`); // 👈 carpeta + nombre

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dmk10qo7d/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.secure_url) {
        setMensajeImagen("Imagen subida correctamente.");
        console.log("URL imagen:", data.secure_url);
      } else {
        setMensajeImagen("Error al subir la imagen.");
      }
    } catch (err) {
      setMensajeImagen("Error en la solicitud.");
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
          value={contrasenia}
          onChange={(e) => setContrasenia(e.target.value)}
          required
        /><br /><br />
        <button type="submit">Ingresar</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* 👇 NUEVO: subir imagen a Cloudinary */}
      <hr />
      <h3>Subir Imagen (solo prueba)</h3>
      <input type="file" onChange={(e) => setArchivo(e.target.files[0])} /><br /><br />
      <button onClick={subirArchivoCloudinary}>Subir imagen</button>
      {mensajeImagen && <p>{mensajeImagen}</p>}
    </div>
  );
}

export default Login;
