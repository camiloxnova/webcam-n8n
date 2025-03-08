import React, { useState, useEffect } from "react";
import "./AvatarPhoto.scss";
import avatarImage from "../../assets/img/avatar-2.png";
import fondo from "../../assets/img/fondo.png";
import logo from "../../assets/img/claro.png";
import logor from "../../assets/img/claro-r.png";

interface AvatarResultProps {
  imageUrl?: string;
}

const AvatarResult: React.FC<AvatarResultProps> = ({ imageUrl }) => {
  const [currentImage, setCurrentImage] = useState<string>(avatarImage);

  useEffect(() => {
    if (imageUrl) {
      setCurrentImage(imageUrl);
    }
  }, [imageUrl]);

  return (
    <div className="container">
      <img src={fondo} alt="Fondo" className="fondo" />
      <div className="card">
        <img src={logo} alt="Logo" className="clarologo" />
        <h2 className="subtitle">AVATAR AI</h2>
        <div className="avatar-container">
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
