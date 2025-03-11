import React, { useState } from "react";
import "./AvatarPhoto.scss";
import fondo from "../../assets/img/fondo.png";
import logo from "../../assets/img/claro.png";
import logor from "../../assets/img/claro-r.png";

import MergeImage from "./MergeImage";
interface AvatarResultProps {
  imageUrl: string;
  onReset: () => void;
}

const AvatarResult: React.FC<AvatarResultProps> = ({ imageUrl, onReset }) => {
  const [mergedImage, setMergedImage] = useState<string | null>(null);

  const handleMerged = (dataUrl: string) => {
    setMergedImage(dataUrl);
    // Aquí ya tienes la imagen fusionada en dataUrl,
    // la puedes enviar a tu WS con fetch o axios.
  };

  return (
    <div className="container">
      <img src={fondo} alt="Fondo" className="fondo" />
      <div className="card">
        <img src={logo} alt="Logo" className="clarologo" />
        <h2 className="subtitle">AVATAR AI</h2>
        <div className="avatar-container">
          {/* Componente para fusionar las imágenes */}
          <MergeImage imageUrl={imageUrl} onMerged={handleMerged} />

          {mergedImage && (
            <img
              src={mergedImage}
              className="avatar"
              alt="Imagen final fusionada"
            />
          )}
        </div>
        <div className="result">
          <img src={logor} alt="Logo Resultado" className="clarologo" />
          <p className="result-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
        <button type="submit" className="button" onClick={onReset}>
          Generar nueva
        </button>
      </div>
    </div>
  );
};

export default AvatarResult;
