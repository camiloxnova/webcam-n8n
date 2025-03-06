import React, { useState } from "react";
import "./AvatarPhoto.scss";
import fondo from "../../assets/img/fondo.png";
// import avatarImage from "../../assets/img/avatar.png";
import logo from "../../assets/img/claro.png";
import WebcamScene from "../WebcamScene";

interface AvatarPhotoProps {
  onProcess: () => void;
}

const AvatarPhoto: React.FC<AvatarPhotoProps> = ({ onProcess }) => {
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accepted) {
      alert("Debes aceptar la política de datos.");
      return;
    }
    onProcess(); // cambia de pantalla
  };

  return (
    <div className="container">
      <img src={fondo} alt="Avatar" className="fondo" />
      <div className="card">
        <img src={logo} alt="Logo" className="clarologo" />
        <h2 className="subtitle">AVATAR AI</h2>
        {/* <div className="avatar-container">
         <img src={avatarImage} alt="Avatar" className="avatar" /> 
        </div> */}
        <div className="avatar-container cam">
          <WebcamScene />
        </div>
        <form onSubmit={handleSubmit}>
          <label className="label">CORREO</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            required
          />
          <div className="checkbox-container">
            <input
              type="checkbox"
              checked={accepted}
              onChange={() => setAccepted(!accepted)}
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
          <button type="submit" className="button">
            Procesar
          </button>
        </form>
      </div>
    </div>
  );
};

export default AvatarPhoto;
