import React from "react";
import "./Waiting.scss";

import fondo from "../../assets/img/fondo.png";
import logo from "../../assets/img/empresas.png";
//import waitingVideo from "../../assets/videos/video.mp4";
import gitEspera from "../../assets/img/esperacargando.gif";

interface WaitingProps {
  email: string;
  nombre: string;
  imagenGenerada: boolean; // Nuevo prop para indicar si la imagen ya se generó
  onEmailChange: (email: string) => void;
  onNombreChange: (nombre: string) => void;
  onShowPolicy: () => void;
  onContinue: () => void; // Función para continuar a AvatarResult
}

const Waiting: React.FC<WaitingProps> = ({
  email,
  nombre,
  imagenGenerada,
  onNombreChange,
  onEmailChange,
  onShowPolicy,
  onContinue,
}) => {
  // const styleVideo = {
  //   width: "60%",
  // };

  return (
    <div className="container">
      <img src={fondo} alt="Avatar" className="fondo" />
      <div className="card">
        <img src={logo} alt="Logo" className="clarologo" />

        {/* Se muestra un contenido distinto según si la imagen ya se generó o no */}
        {imagenGenerada ? (
          <div className="avatar-container-ready">
            <h2 className="subtitlewait">¡Tu imagen IA está lista!</h2>
            <p className="ready-text">
              Disfruta de un avatar único que fusiona arte y tecnología. <br />
              ¡Haz clic para verlo!
            </p>
          </div>
        ) : (
          <div className="avatar-container-wait">
            <h2 className="subtitlewait">Espera unos segundos ...</h2>

            <img
              src={gitEspera}
              alt="LOGO CARGANDO"
              style={{ width: "231px" }}
            />
            <p className="waiting-text">
              ¡Comparte tu avatar IA en redes sociales! Descarga la imagen desde
              tu correo.
            </p>
          </div>
        )}

        {/* Formulario con inputs de nombre y correo */}
        <form>
          <label className="label">NOMBRE</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => onNombreChange(e.target.value)}
            className="input"
            required
          />
          <label className="label">CORREO</label>
          <input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            className="input"
            required
          />
          <div className="checkbox-container">
            <input type="checkbox" className="checkbox" id="tratamiento" />
            <label htmlFor="tratamiento">
              <span>
                Autorizo el trato de mis datos personales conforme a la{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onShowPolicy();
                  }}
                >
                  política de tratamiento de datos.
                </a>
              </span>
            </label>
          </div>
        </form>

        {/* Botón para continuar a AvatarResult cuando la imagen esté lista */}
        {imagenGenerada && (
          <button className="button" onClick={onContinue}>
            Ver avatar
          </button>
        )}
      </div>
    </div>
  );
};

export default Waiting;
