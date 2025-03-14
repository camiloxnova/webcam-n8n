import React, { useState, useRef } from "react";
import "./AvatarPhoto.scss";
import fondo from "../../assets/img/fondo.png";
import logo from "../../assets/img/claro.png";
import WebcamScene from "../WebcamScene";
import axios from "axios";
import Swal from "sweetalert2"; // Import sweetalert2
import { FaCamera } from "react-icons/fa";

interface AvatarPhotoProps {
  onProcess: (email: string) => void;
}
interface WebcamRef {
  captureImage: () => Promise<Blob>;
}

const AvatarPhoto: React.FC<AvatarPhotoProps> = ({ onProcess }) => {
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [capturedImage, setCapturedImage] = useState<Blob | null>(null);
  const [capturedImageUrl, setCapturedImageUrl] = useState<string>("");
  const webcamRef = useRef<WebcamRef | null>(null);

  const webhookUrl =
    import.meta.env.VITE_N8N_WEBHOOK_URL ||
    "https://xnova360.app.n8n.cloud/webhook-test/497347b7-8019-4f9b-8541-2ae380e51920";
  //const webhookUrl = "https://test231234423234432.com/";

  // Función para capturar la imagen desde el componente WebcamScene
  const handleCapture = async () => {
    if (webcamRef.current && webcamRef.current.captureImage) {
      try {
        const blob = await webcamRef.current.captureImage();
        setCapturedImage(blob);
        const url = URL.createObjectURL(blob);
        setCapturedImageUrl(url);
      } catch (error) {
        console.error("Error al capturar la imagen:", error);
      }
    }
  };

  // Envía la imagen capturada al endpoint de n8n
  const handleProcessImage = async () => {
    if (!capturedImage) return;
    const formData = new FormData();
    formData.append("image", capturedImage, "webcam-image.jpg");
    try {
      console.log("Enviando imagen...");
      //onProcess(); //TEMPORAL NO DEBE IR AQUI
      const responseFinal = await axios.post(webhookUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 600000,
      });
      console.log("Imagen enviada a n8n!", responseFinal);
      //alert("Imagen enviada a n8n!");
      onProcess(email); // Cambia de pantalla (por ejemplo, a 'waiting')
    } catch (error) {
      console.error("Error al procesar la imagen:", error);
    }
  };

  // Permite reiniciar la captura para tomar otra foto
  const handleResetCapture = () => {
    setCapturedImage(null);
    setCapturedImageUrl("");
  };

  // Validación del formulario y envío de la imagen
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accepted) {
      Swal.fire({
        icon: "warning",
        title: "Advertencia",
        text: "Debes aceptar la política de datos.",
      });
      return;
    }
    if (!capturedImage) {
      Swal.fire({
        icon: "warning",
        title: "Advertencia",
        text: "Primero toma una foto.",
      });
      return;
    }
    onProcess(email);
    handleProcessImage();
  };

  return (
    <div className="container">
      <img src={fondo} alt="Fondo" className="fondo" />
      <div className="card">
        <img src={logo} alt="Logo" className="clarologo" />
        <h2 className="subtitle">AVATAR AI</h2>
        <div className="avatar-container cam">
          {capturedImageUrl ? (
            // Si ya se capturó la imagen, se muestra la imagen fija
            <img
              src={capturedImageUrl}
              alt="Foto capturada"
              className="fotoCapturada"
            />
          ) : (
            // Si no, se muestra el feed en vivo de la cámara
            <WebcamScene ref={webcamRef} />
          )}
        </div>
        <div className="buttons-container">
          <button
            type="button"
            className="button button-camera"
            onClick={capturedImageUrl ? handleResetCapture : handleCapture}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <FaCamera size={38} style={{ marginRight: "8px" }} />
              {capturedImageUrl ? "Tomar otra" : "Tomar foto"}
            </div>
          </button>
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
          {capturedImageUrl && (
            <button type="submit" className="button">
              Procesar
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AvatarPhoto;
