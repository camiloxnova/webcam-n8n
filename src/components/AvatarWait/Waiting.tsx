import React, { useState } from "react";
import "./Waiting.scss";
import logo from "../../assets/img/logoScotia.png";

interface WaitingProps {
  email: string;
  nombre: string;
  imagenGenerada: boolean; // Indica si la imagen ya se generó
  onEmailChange: (email: string) => void;
  onNombreChange: (nombre: string) => void;
  onShowPolicy: () => void;
  onContinue: () => void; // Para continuar a AvatarResult
}

const Waiting: React.FC<WaitingProps> = ({
  email,
  nombre,
  imagenGenerada,
  onEmailChange,
  onNombreChange,
  onShowPolicy,
  onContinue,
}) => {
  // Si deseas manejar la cédula en el estado del padre, añade props similares a email/nombre
  // De momento, la manejamos localmente aquí como ejemplo:
  const [cedula, setCedula] = useState("");

  return (
    <div className="waiting-container">
      {/* Barra roja superior con "Scotia" o el logo */}
      <div className="header-bar">
        {/* Si quieres texto en vez de imagen, reemplaza <img> por <h1>Scotia</h1> */}
        <img src={logo} alt="Logo Scotia" className="logo-scotia" />
      </div>

      {/* Tarjeta de contenido */}
      <div className="waiting-card">
        {/* Subtítulo principal */}
        <h2 className="subtitle">Avatar IA</h2>

        {/* Sección de mensaje de espera o imagen generada */}
        {imagenGenerada ? (
          <div className="avatar-container-ready">
            <h2 className="subtitle-wait">¡Tu imagen IA está lista!</h2>
            <p className="ready-text">
              Disfruta de un avatar único que fusiona arte y tecnología. <br />
              ¡Haz clic para verlo!
            </p>
          </div>
        ) : (
          <div className="avatar-container-wait">
            <p className="waiting-text">
              Espera...
              <br /> ¡A segundos de
              <br /> cumplir tus
              <br /> sueños!
            </p>
          </div>
        )}

        {/* Formulario con placeholders en lugar de labels */}
        <form className="waiting-form">
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => onNombreChange(e.target.value)}
            className="input"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            className="input"
            required
          />

          {/* Campo de cédula (ejemplo local) */}
          <input
            type="text"
            placeholder="Cédula"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
            className="input"
          />

          {/* Checkbox de consentimiento */}
          <div className="checkbox-container">
            <input type="checkbox" className="checkbox" id="tratamiento" />
            <label htmlFor="tratamiento">
              <span>
                Consentimiento
                <br />
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onShowPolicy();
                  }}
                >
                  Ver política de tratamiento de datos
                </a>
              </span>
            </label>
          </div>
        </form>

        {/* Botón para ver el avatar si la imagen ya se generó */}

        <button className="button" onClick={onContinue}>
          Ver avatar
        </button>
      </div>
    </div>
  );
};

export default Waiting;
