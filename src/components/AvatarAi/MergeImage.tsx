import React, { useRef, useEffect } from "react";

// Importa o define las rutas de tus imágenes de marco
//import claroMedia from "../../assets/img/ClaroMedia.png";
import TextDerechaSUP from "../../assets/img/logo_superiorder.png";
import TextIzquierdaSUP from "../../assets/img/logo_superiorizq.png";
import greencity from "../../assets/img/logos/greencity.png";
import imaterra_sala from "../../assets/img/logos/imaterra.png";
import imaterra_comedor from "../../assets/img/logos/imaterra.png";
import new_west from "../../assets/img/logos/new_west.png";
import noura from "../../assets/img/logos/noura.png";
import playa from "../../assets/img/logos/playa.png";

console.log("🚀 ~ claroMedia:", TextDerechaSUP);
console.log("🚀 ~ fraseClaro:", TextIzquierdaSUP);
interface MergeImageProps {
  imageUrl: string; // URL de la imagen principal (avatar)
  onMerged: (mergedDataUrl: string) => void; // Callback para retornar la imagen fusionada
  tipoSuenio: string;
}

const MergeImage: React.FC<MergeImageProps> = ({
  imageUrl,
  onMerged,
  tipoSuenio,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const logosMap: Record<string, string> = {
      greencity,
      imaterra_sala,
      imaterra_comedor,
      new_west,
      noura,
      playa,
    };
    let selectedLogo = logosMap[tipoSuenio];
    if (!selectedLogo) {
      console.warn(`No se encontró logo para el tipo de sueño: ${tipoSuenio}`);
      selectedLogo = greencity;
      //return;
    }
    console.log("🚀 ~ selectedLogo:", selectedLogo);

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
      loadImage(TextDerechaSUP),
      loadImage(TextIzquierdaSUP),
      loadImage(selectedLogo),
    ])
      .then(([avatar, TextDerechaSUP, TextIzquierdaSUP, logoInferior]) => {
        // Definir dimensiones del canvas en base al avatar (puedes ajustar según necesidad)
        canvas.width = avatar.width;
        canvas.height = avatar.height;

        // Dibuja la imagen principal (avatar)
        ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);

        const scaleFactorIzq = 0.2; // Factor de escala (0.5 = 50% más pequeño)
        const scaleFactorDer = 0.4;
        const scaleFactorAbajoDer = 0.6;
        ctx.drawImage(
          TextIzquierdaSUP,
          20,
          40,
          TextIzquierdaSUP.width * scaleFactorIzq,
          TextIzquierdaSUP.height * scaleFactorIzq
        );

        ctx.drawImage(
          TextDerechaSUP,
          canvas.width - TextDerechaSUP.width * scaleFactorDer + 10,
          20,
          TextDerechaSUP.width * scaleFactorDer,
          TextDerechaSUP.height * scaleFactorDer
        );

        // Dibuja LogosPequenios.png en la esquina inferior derecha
        ctx.drawImage(
          logoInferior,
          canvas.width - logoInferior.width + 390, // mueve hacia la izquierda
          canvas.height - logoInferior.height + 720, // mueve hacia arriba
          logoInferior.width * scaleFactorAbajoDer,
          logoInferior.height * scaleFactorAbajoDer
        );

        // Convierte el canvas a data URL (imagen en formato PNG)
        const mergedDataUrl = canvas.toDataURL("image/png");
        onMerged(mergedDataUrl);
      })
      .catch((error) => {
        console.error("Error al cargar las imágenes:", error);
      });
  }, [imageUrl, onMerged, tipoSuenio]);

  // El canvas se oculta ya que solo lo usamos para generar la imagen final
  return <canvas ref={canvasRef} style={{ display: "none" }} />;
};

export default MergeImage;
