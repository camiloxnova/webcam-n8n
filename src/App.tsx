import { useState, useEffect } from "react";
import AvatarPhoto from "./components/AvatarAi/AvatarPhoto";
import AvatarResult from "./components/AvatarAi/AvatarResult";
import Waiting from "./components/AvatarWait/Waiting";
import { db } from "./firebaseConfig"; // Import Firestore
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions

function App() {
  useEffect(() => {
    fetch("https://proyectoshm.com/marco_pruebas/imagen/clear_image_data.php")
      .then((response) => response.json())
      .then((data) => {
        console.log("Clear WS:", data.message);
      })
      .catch((error) => console.error("Error limpiando el archivo:", error));
  }, []);

  // "photo": para mostrar el componente de AvatarPhoto.
  // "waiting": para mostrar el componente de espera mientras se procesa la imagen.
  // "result": para mostrar el componente con la imagen final.
  const [step, setStep] = useState("photo");
  const [imageUrl, setImageUrl] = useState("");
  // Para recordar la última URL recibida y evitar transiciones repetidas
  const [lastImageUrl, setLastImageUrl] = useState("");
  const [email, setEmail] = useState(""); // State to store email

  // Esta función se invoca en AvatarPhoto cuando se envía la petición a n8n
  const handleProcess = () => {
    setEmail(""); // Store the email
    setStep("waiting");
    // Aquí ya se dispara la petición a n8n para iniciar el proceso.
  };

  // Función para actualizar el email conforme se escribe en Waiting.
  const handleEmailChange = (newEmail: string) => {
    setEmail(newEmail);
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    // Solo en el paso "waiting" se hace polling a la API de PHP
    if (step === "waiting") {
      interval = setInterval(async () => {
        try {
          //console.log("email", email);

          const response = await fetch(
            "https://proyectoshm.com/marco_pruebas/imagen/callback.php"
          );
          const data = await response.json();
          // Si existe una imagen y es distinta a la última recibida, es una imagen nueva
          if (
            data.img_url &&
            data.img_url !== "" &&
            data.img_url !== lastImageUrl
          ) {
            setLastImageUrl(data.img_url);
            setImageUrl(data.img_url);
            setStep("result");

            await addDoc(collection(db, "images"), {
              email: email,
              imageUrl: data.img_url,
              date: new Date(),
              correoEnviado: false,
            });
            console.log("Datos guardados en Firestore!");
          }
        } catch (error) {
          console.error("Error al obtener la imagen:", error);
        }
      }, 5000); // Consulta cada 5 segundos (ajusta el intervalo según tus necesidades)
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [step, lastImageUrl, email]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {step === "photo" && <AvatarPhoto onProcess={handleProcess} />}
      {step === "waiting" && (
        <Waiting email={email} onEmailChange={handleEmailChange} />
      )}
      {step === "result" && (
        <AvatarResult imageUrl={imageUrl} onReset={() => setStep("photo")} />
      )}
    </div>
  );
}

export default App;
