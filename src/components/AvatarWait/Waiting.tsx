import React from "react";
import "./Waiting.scss";

import fondo from "../../assets/img/fondo.png";
import logo from "../../assets/img/claro.png";
import waitingVideo from "../../assets/videos/video.mp4";

interface WaitingProps {
  email: string;
  onEmailChange: (email: string) => void;
}

const Waiting: React.FC<WaitingProps> = ({ email, onEmailChange }) => {
  return (
    <div className="container">
      <img src={fondo} alt="Avatar" className="fondo" />
      <div className="card">
        <img src={logo} alt="Logo" className="clarologo" />

        <div className="avatar-container-wait">
          <h2 className="subtitlewait">Espera ...</h2>
          <video width="65%" autoPlay loop playsInline>
            <source src={waitingVideo} type="video/mp4" />
            Tu navegador no soporta videos HTML5.
          </video>
          <p className="waiting-text">Espera unos segundos.....</p>
        </div>

        {/* Formulario con input de correo y checkbox */}
        <form>
          <label className="label">CORREO</label>
          <input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            className="input"
            required
          />
          <div className="checkbox-container">
            <input
              type="checkbox"
              // Puedes manejar el estado del checkbox de forma similar o localmente
              className="checkbox"
              id="tratamiento"
            />
            <label htmlFor="tratamiento">
              <span>
                Autorizo el trato de mis datos personales conforme a la política
                de tratamiento de datos.
              </span>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Waiting;
