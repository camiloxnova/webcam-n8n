import React, { useRef, useEffect } from "react";

// Importa o define las rutas de tus imágenes de marco
import claroMedia from "../../assets/img/ClaroMedia.png";
import fraseClaro from "../../assets/img/FraseClaro.png";
import logosPequenios from "../../assets/img/LogosPequenios.png";

interface MergeImageProps {
  imageUrl: string; // URL de la imagen principal (avatar)
  onMerged: (mergedDataUrl: string) => void; // Callback para retornar la imagen fusionada
}

const MergeImage: React.FC<MergeImageProps> = ({ imageUrl, onMerged }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Función para cargar una imagen y retornar una promesa
    const loadImage = (src: string): Promise<HTMLImageElement> =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous"; // Útil si las imágenes provienen de otro dominio
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(err);
        img.src = src;
      });

    // Cargamos la imagen avatar y las imágenes de marco
    Promise.all([
      loadImage(imageUrl),
      loadImage(claroMedia),
      loadImage(fraseClaro),
      loadImage(logosPequenios),
    ])
      .then(([avatar, claro, frase, logos]) => {
        // Definir dimensiones del canvas en base al avatar (puedes ajustar según necesidad)
        canvas.width = avatar.width;
        canvas.height = avatar.height;

        // Dibuja la imagen principal (avatar)
        ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);

        // Dibuja ClaroMedia.png en la esquina superior izquierda
        ctx.drawImage(claro, 20, 20, claro.width, claro.height);

        // Dibuja FraseClaro.png en la esquina superior derecha
        ctx.drawImage(
          frase,
          canvas.width - frase.width - 20,
          20,
          frase.width,
          frase.height
        );

        // Dibuja LogosPequenios.png en la esquina inferior derecha
        ctx.drawImage(
          logos,
          canvas.width - logos.width - 20, // mueve hacia la izquierda
          canvas.height - logos.height - 20, // mueve hacia arriba
          logos.width,
          logos.height
        );

        // Convierte el canvas a data URL (imagen en formato PNG)
        const mergedDataUrl = canvas.toDataURL("image/png");
        onMerged(mergedDataUrl);
      })
      .catch((error) => {
        console.error("Error al cargar las imágenes:", error);
      });
  }, [imageUrl, onMerged]);

  // El canvas se oculta ya que solo lo usamos para generar la imagen final
  return <canvas ref={canvasRef} style={{ display: "none" }} />;
};

export default MergeImage;
