import React, { useState, useEffect } from "react";
import "./AvatarPhoto.scss";
import avatarImage from "../../assets/img/avatar-2.png";
import fondo from "../../assets/img/fondo.png";
import logo from "../../assets/img/claro.png";
import logor from "../../assets/img/claro-r.png";

interface AvatarResultProps {
  // En caso de que quieras seguir aceptando la URL por props (opcional)
  imageUrl?: string;
}

const AvatarResult: React.FC<AvatarResultProps> = ({ imageUrl }) => {
  // Estado local para guardar la URL de la imagen
  const [currentImage, setCurrentImage] = useState<string>(avatarImage);

  useEffect(() => {
    // 1) Si "imageUrl" viene por props y quieres priorizarlo, lo usas de inmediato:
    if (imageUrl) {
      setCurrentImage(imageUrl);
    } else {
      // 2) Si NO hay "imageUrl" en props, hacemos un fetch al endpoint (por ejemplo, n8n)
      //    que nos devuelva el objeto con la URL de la imagen.
      fetch("https://TU_ENDPOINT_DE_N8N_O_DE_DONDE_SEA.com") // reemplaza con tu URL real
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al obtener la imagen");
          }
          return response.json();
        })
        .then((data) => {
          // Suponiendo que data tenga esta forma:
          // [
          //   {
          //     "imageUrl": "https://comfy-deploy-output.s3.us-east-2.amazonaws.com/.../ComfyUI_00002_.png"
          //   }
          // ]
          if (data && data.length > 0 && data[0].imageUrl) {
            setCurrentImage(data[0].imageUrl);
          }
        })
        .catch((error) => {
          console.error("Error al obtener la imagen: ", error);
          // Maneja el error: podrías dejar la imagen por defecto
          setCurrentImage(avatarImage);
        });
    }
  }, [imageUrl]);

  return (
    <div className="container">
      <img src={fondo} alt="Fondo" className="fondo" />
      
      <div className="card">
        <img src={logo} alt="Logo" className="clarologo" />
        <h2 className="subtitle">AVATAR AI</h2>

        <div className="avatar-container">
          {/* Aquí es donde mostramos la imagen que hayamos obtenido */}
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
