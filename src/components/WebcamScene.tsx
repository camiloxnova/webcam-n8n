// WebcamScene.tsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import * as THREE from "three";

const WebcamPlane = forwardRef((props, ref) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const videoRef = useRef<HTMLVideoElement>(document.createElement("video"));

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch(console.error);
  }, []);

  const texture = new THREE.VideoTexture(videoRef.current);

  // Exponemos la función captureImage para capturar una foto
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
    <mesh ref={meshRef} scale={[4, 3, 1]}>
      <planeGeometry />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
});

const WebcamScene = forwardRef((props, ref) => {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <WebcamPlane ref={ref} />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
});

export default WebcamScene;
