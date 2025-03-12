import React, { useState, useRef } from "react";
import "./AvatarPhoto.scss";
import fondo from "../../assets/img/fondo.png";
import logo from "../../assets/img/claro.png";
// import logor from "../../assets/img/claro-r.png";

import { storage, db } from "../../firebaseConfig";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

import MergeImage from "./MergeImage";

interface AvatarResultProps {
  email: string;
  nombre: string;
  imageUrl: string;
  onReset: () => void;
}

const AvatarResult: React.FC<AvatarResultProps> = ({
  email,
  nombre,
  imageUrl,
  onReset,
}) => {
  const [mergedImage, setMergedImage] = useState<string | null>(null);
  const hasMergedRef = useRef(false);

  const handleMerged = async (dataUrl: string) => {
    if (hasMergedRef.current) return;
    hasMergedRef.current = true;

    try {
      const storageRef = ref(storage, `avatars/${email}-${Date.now()}.png`);
      await uploadString(storageRef, dataUrl, "data_url");
      const downloadURL = await getDownloadURL(storageRef);
      await addDoc(collection(db, "images"), {
        email: email,
        nombre: nombre,
        imageUrl: downloadURL,
        date: new Date(),
        correoEnviado: false,
      });
      console.log(
        "Imagen guardada en Storage y URL en Firestore:",
        downloadURL
      );
      setMergedImage(downloadURL);
    } catch (error) {
      console.error("Error al subir imagen:", error);
    }
  };

  return (
    <div className="containerResult">
      <img src={fondo} alt="Fondo" className="fondo" />
      <div className="card">
        <img src={logo} alt="Logo" className="clarologo" />
        <h2 className="subtitle">AVATAR AI</h2>
        <div className="avatar-container" style={{ position: "relative" }}>
          <MergeImage imageUrl={imageUrl} onMerged={handleMerged} />

          {/* Overlay de carga */}
          {!mergedImage && (
            <div className="processing-overlay">
              <div className="spinner"></div>
              <p className="processing-text">
                Estamos creando tu avatar, ¡la magia está en proceso!
              </p>
            </div>
          )}

          {mergedImage && (
            <img
              src={mergedImage}
              className="avatar"
              alt="Imagen final fusionada"
            />
          )}
        </div>
        {/* <div className="result">
          <img src={logor} alt="Logo Resultado" className="clarologo" />
          <p className="result-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div> */}
        {mergedImage && (
          <button type="submit" className="button" onClick={onReset}>
            Generar nueva
          </button>
        )}
      </div>
    </div>
  );
};

export default AvatarResult;
