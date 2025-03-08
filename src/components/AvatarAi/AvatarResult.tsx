import React, { useState } from "react";
import "./AvatarPhoto.scss";

// Estas imágenes locales las mantienes si las necesitas
import avatarImage from "../../assets/img/avatar-2.png";
import fondo from "../../assets/img/fondo.png";
import logo from "../../assets/img/claro.png";
import logor from "../../assets/img/claro-r.png";

interface AvatarResultProps {
  imageUrl?: string;
}

const AvatarResult: React.FC<AvatarResultProps> = ({ imageUrl }) => {
  // URL de prueba fija (S3), para “forzar” a ver si se ve en Vercel
  const testImageUrl = "https://comfy-deploy-output.s3.us-east-2.amazonaws.com/outputs/runs/4bce9855-e131-47ea-bf26-722db7dbe775/ComfyUI_00002_.png";

  // En este caso, para la demo, vamos a ignorar la prop `imageUrl`
  // y usar testImageUrl como "currentImage".
  // Podrías usar useState, pero incluso podemos asignarlo directo.
  const [currentImage] = useState<string>(testImageUrl);

  return (
    <div className="container">
      <img src={fondo} alt="Fondo" className="fondo" />
      <div className="card">
        <img src={logo} alt="Logo" className="clarologo" />
        <h2 className="subtitle">AVATAR AI</h2>

        <div className="avatar-container">
          {/* Muestra la imagen de prueba fija de S3 */}
          <img src={currentImage} alt="Avatar" className="avatar" />
        </div>

        <div className="result">
          <img src={logor} alt="Logo Resultado" className="clarologo" />
          <p className="result-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AvatarResult;
