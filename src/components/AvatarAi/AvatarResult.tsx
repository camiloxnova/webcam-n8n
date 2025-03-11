import React, { useState } from "react";
import "./AvatarPhoto.scss";
import fondo from "../../assets/img/fondo.png";
import logo from "../../assets/img/claro.png";
import logor from "../../assets/img/claro-r.png";

import { storage, db } from "../../firebaseConfig"; // Import Firebase Storage y Firestore
import { ref, uploadString, getDownloadURL } from "firebase/storage"; // Import funciones de Storage
import { collection, addDoc } from "firebase/firestore"; // Firestore

import MergeImage from "./MergeImage";
interface AvatarResultProps {
  email: string;
  imageUrl: string;
  onReset: () => void;
}

const AvatarResult: React.FC<AvatarResultProps> = ({
  email,
  imageUrl,
  onReset,
}) => {
  const [mergedImage, setMergedImage] = useState<string | null>(null);

  const handleMerged = async (dataUrl: string) => {
    try {
      if (mergedImage) return;
      // 1️⃣ Crear referencia en Firebase Storage
      const storageRef = ref(storage, `avatars/${email}-${Date.now()}.png`);

      // 2️⃣ Subir imagen en base64 a Firebase Storage
      await uploadString(storageRef, dataUrl, "data_url");

      // 3️⃣ Obtener la URL de descarga
      const downloadURL = await getDownloadURL(storageRef);

      // 4️⃣ Guardar URL en Firestore
      await addDoc(collection(db, "images"), {
        email: email,
        imageUrl: downloadURL, // Guardamos la URL en vez del base64
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
