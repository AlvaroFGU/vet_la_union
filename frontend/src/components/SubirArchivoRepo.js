import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";

function SubirArchivoRepo() {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadStatus("");
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadStatus("Por favor selecciona un archivo");
      return;
    }

    setUploadStatus("Subiendo archivo...");

    // Crear un formulario para enviar el archivo
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "vet_la_union_images"); 
    formData.append("cloud_name", "dmk10qo7d"); 

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dmk10qo7d/upload", 
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.secure_url) {
        setUploadStatus("Archivo subido con éxito!");
        console.log("URL del archivo:", data.secure_url);
      } else {
        setUploadStatus("Error al subir el archivo");
      }
    } catch (error) {
      console.error("Error al subir el archivo:", error);
      setUploadStatus("Error al subir el archivo");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      

      <div style={{ marginTop: "50px" }}>
        <h3>Subir archivo a Cloudinary</h3>
        <input
          type="file"
          onChange={handleFileChange}
          style={{ marginBottom: "10px" }}
        /><br />
        <button onClick={handleUpload}>Subir Archivo</button>
        {uploadStatus && <p style={{ color: uploadStatus.includes("éxito") ? "green" : "red" }}>{uploadStatus}</p>}
      </div>
    </div>
  );
}

export default SubirArchivoRepo;