import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import axios from "axios";
import AvatarResult from "./AvatarAi/AvatarResult";

function WebcamPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const videoRef = useRef<HTMLVideoElement>(document.createElement("video"));
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const webhookUrl =
    import.meta.env.VITE_N8N_WEBHOOK_URL ||
    "https://xnova360.app.n8n.cloud/webhook-test/497347b7-8019-4f9b-8541-2ae380e51920";

  // Inicializar webcam
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch(console.error);
  }, []);

  // Textura de video
  const texture = new THREE.VideoTexture(videoRef.current);

  // Capturar imagen con tecla 'M'
  useEffect(() => {
    const handleKeyPress = async (e: KeyboardEvent) => {
      if (e.key === "m" || e.key === "M") {
        const canvas = document.createElement("canvas");
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(videoRef.current, 0, 0);

        canvas.toBlob(async (blob) => {
          if (!blob) return;

          const formData = new FormData();
          formData.append("image", blob, "webcam-image.jpg");

          try {
            console.log("Proceso de imagen");
            const response = await axios.post(webhookUrl, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              timeout: 600000,
            });
            
            // Verificar si la respuesta contiene la URL de la imagen generada
            if (response.data && response.data.img_url) {
              setGeneratedImageUrl(response.data.img_url);
              console.log("Imagen generada:", response.data.img_url);
            }
            
            console.log("Imagen enviada a n8n!", response);
            alert("Imagen enviada a n8n!");
          } catch (error) {
            console.error("Error:", error);
          }
        }, "image/jpeg");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [webhookUrl]);

  return (
    <>
      <mesh ref={meshRef} scale={[4, 3, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
      {generatedImageUrl && (
        <Html position={[0, -2, 0]} center>
          <div style={{ width: "400px", height: "400px" }}>
            <AvatarResult imageUrl={generatedImageUrl} />
          </div>
        </Html>
      )}
    </>
  );
}

export default function WebcamScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <WebcamPlane />
      <OrbitControls enableZoom={false} />
      <Html>
        <div
          style={{ position: "absolute", top: 10, left: 10, color: "white" }}
        >
          Presiona 'M' para capturar y enviar
        </div>
      </Html>
    </Canvas>
  );
}
