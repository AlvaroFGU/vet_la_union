import React, { useState, useEffect } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import { FaSpinner, FaCheck, FaEnvelope, FaKey } from "react-icons/fa";
import "../styles/RecuperarContrasenia.css";

function RecuperarContrasena() {
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0 && isCodeSent) {
      setIsCodeSent(false);
    }
    return () => clearTimeout(timer);
  }, [countdown, isCodeSent]);

  const handleEnviarCodigo = async () => {
    setMensaje("");
    setError("");
    setIsLoading(true);

    try {
      const res = await api.post("enviar-codigo/", { email });
      setMensaje(res.data.mensaje || "Código enviado al correo.");
      setIsCodeSent(true);
      setCountdown(30);
    } catch (err) {
      setError(err.response?.data?.message || "Error al enviar el código. Verifica el correo.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmarCambio = async () => {
    setMensaje("");
    setError("");
    setIsLoading(true);

    if (contrasenia !== confirmar) {
      setError("Las contraseñas no coinciden.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await api.post("confirmar-cambio/", {
        email,
        codigo,
        contrasenia
      });

      setMensaje(res.data.mensaje || "Contraseña actualizada correctamente. Redirigiendo...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Error al cambiar la contraseña.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="recovery-container">
      <div className="recovery-card">
        <div className="recovery-header">
          <div className="icon-container">
            <FaEnvelope className="recovery-icon envelope" />
            <FaKey className="recovery-icon key" />
          </div>
          <h2>Recuperar contraseña</h2>
          <p>Ingresa tus datos para restablecer tu contraseña</p>
        </div>

        {/* Formulario completo */}
        <div className="form-group">
          <label>Correo electrónico</label>
          <div className="email-input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tucorreo@ejemplo.com"
              required
            />
            <button
              type="button"
              onClick={handleEnviarCodigo}
              disabled={!email || isCodeSent || isLoading}
              className={isCodeSent ? "success-button" : ""}
            >
              {isLoading ? (
                <FaSpinner className="spinner" />
              ) : isCodeSent ? (
                <FaCheck />
              ) : (
                "Enviar código"
              )}
            </button>
          </div>
          
          {isCodeSent && (
            <div className="success-message">
              <p>{mensaje}</p>
              <p className="countdown">Puedes solicitar otro código en {countdown} segundos</p>
            </div>
          )}
        </div>

        <div className="form-group">
          <label>Código de verificación</label>
          <input
            type="text"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="Ingresa el código recibido"
            required
          />
        </div>

        <div className="form-group">
          <label>Nueva contraseña</label>
          <input
            type="password"
            value={contrasenia}
            onChange={(e) => setContrasenia(e.target.value)}
            placeholder="Mínimo 8 caracteres"
            required
          />
        </div>

        <div className="form-group">
          <label>Confirmar nueva contraseña</label>
          <input
            type="password"
            value={confirmar}
            onChange={(e) => setConfirmar(e.target.value)}
            placeholder="Repite tu contraseña"
            required
          />
        </div>

        <button
          type="button"
          onClick={handleConfirmarCambio}
          disabled={isLoading || !codigo || !contrasenia || !confirmar}
          className="submit-button"
        >
          {isLoading ? (
            <>
              <FaSpinner className="spinner" /> Procesando...
            </>
          ) : (
            "Confirmar cambio"
          )}
        </button>

        <div className="recovery-footer">
          <button onClick={() => navigate("/login")} className="back-button">
            Volver al inicio de sesión
          </button>
        </div>
        {error && <div className="error-message">{error}</div>}
        {mensaje && !isCodeSent && <div className="success-message">{mensaje}</div>}
      </div>
    </div>
  );
}

export default RecuperarContrasena;