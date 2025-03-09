import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import * as THREE from "three";

// Interfaz para definir los métodos que el ref puede exponer
interface WebcamRef {
  captureImage: () => Promise<Blob>;
}

// Tipamos el ref correctamente en forwardRef
const WebcamPlane = forwardRef<WebcamRef>((_, ref) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const videoRef = useRef<HTMLVideoElement>(document.createElement("video"));

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 } },
      })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch(console.error);
  }, []);

  const texture = new THREE.VideoTexture(videoRef.current);

  useImperativeHandle(ref, () => ({
    captureImage: () =>
      new Promise<Blob>((resolve, reject) => {
        const canvas = document.createElement("canvas");
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx?.drawImage(videoRef.current, 0, 0);
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
          else reject(new Error("No se pudo capturar la imagen"));
        }, "image/jpeg");
      }),
  }));

  return (
    <mesh ref={meshRef} scale={[11, 6, 1]}>
      <planeGeometry />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
});

// Tipamos el ref correctamente en WebcamScene
const WebcamScene = forwardRef<WebcamRef>((_, ref) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.5} />
      <WebcamPlane ref={ref} />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
});

export default WebcamScene;
