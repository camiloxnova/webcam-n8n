import { useState, useEffect } from "react";
import AvatarPhoto from "./components/AvatarAi/AvatarPhoto";
import AvatarResult from "./components/AvatarAi/AvatarResult";
import Waiting from "./components/AvatarWait/Waiting";

// Componente para mostrar la política de tratamiento de datos
const Policy = ({ onBack }: { onBack: () => void }) => {
  const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  };

  const cardStyle = {
    background: "white",
    padding: "40px",
    borderRadius: "8px",
    textAlign: "center" as const,
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "600px",
    width: "90%",
  };

  const titleStyle = {
    marginBottom: "20px",
    fontSize: "24px",
  };

  const textStyle = {
    marginBottom: "30px",
    fontSize: "16px",
    lineHeight: "1.5",
  };

  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "16px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>
          POLÍTICA DE TRATAMIENTO DE DATOS PERSONALES Y USO DE IMAGEN
        </h2>
        <h3>CLARO MEDIA</h3>
        <p style={textStyle}>
          Fecha de actualización: 10 de marzo de 2025 <br />
          <br />
          En CLARO MEDIA, protegemos la privacidad de los participantes en
          nuestra experiencia de inteligencia artificial. A continuación,
          detallamos cómo recopilamos, usamos y protegemos su información.{" "}
          <br />
          <br />
          <br />
          1.⁠ ⁠Datos recopilados Solicitamos los siguientes datos personales:{" "}
          <br />
          • Nombre <br />
          • Correo electrónico <br />
          • Fotografía inicial (para generar un avatar con inteligencia
          artificial) <br />
          <br />
          2.⁠ ⁠Finalidad del tratamiento Los datos se usarán exclusivamente
          para: <br />
          • Crear un avatar digital. <br />
          • Enviar la imagen final al correo del participante. <br />
          <br />
          3.⁠ ⁠Uso y protección de la información No usaremos ni publicaremos
          las imágenes con fines comerciales o publicitarios. <br />
          <br />
          4.⁠ ⁠Consentimiento y derechos del usuario <br />
          <br />
          5.⁠ ⁠Contacto Para dudas o solicitudes, comuníquese con nosotros en
          claro.media.ia@gmail.com. <br />
          <br />
          CLARO MEDIA
          <br />
          garantiza la confidencialidad y seguridad de su información,
          asegurando su uso exclusivo para la entrega de la imagen generada.
        </p>
        <button style={buttonStyle} onClick={onBack}>
          Volver
        </button>
      </div>
    </div>
  );
};

function App() {
  useEffect(() => {
    fetch("https://proyectoshm.com/marco_pruebas/imagen/clear_image_data.php")
      .then((response) => response.json())
      .then((data) => {
        console.log("Clear WS:", data.message);
      })
      .catch((error) => console.error("Error limpiando el archivo:", error));
  }, []);

  // "photo": para mostrar AvatarPhoto.
  // "waiting": para mostrar la pantalla de espera.
  // "result": para mostrar el resultado final.
  // "policy": para mostrar la política de tratamiento de datos.
  const [step, setStep] = useState("photo");
  const [imageUrl, setImageUrl] = useState("");
  const [lastImageUrl, setLastImageUrl] = useState("");
  const [email, setEmail] = useState("");

  // Esta función se invoca en AvatarPhoto al enviar la petición a n8n.
  // Además, al cambiar a Waiting se limpia el email para que el usuario lo ingrese nuevamente.
  const handleProcess = () => {
    setEmail("");
    setStep("waiting");
  };

  // Función para actualizar el email conforme se escribe en Waiting.
  const handleEmailChange = (newEmail: string) => {
    setEmail(newEmail);
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    // Solo en el paso "waiting" se hace polling a la API de PHP.
    if (step === "waiting") {
      interval = setInterval(async () => {
        try {
          const response = await fetch(
            "https://proyectoshm.com/marco_pruebas/imagen/callback.php"
          );
          const data = await response.json();
          // Si existe una imagen nueva, se actualiza el estado y se guarda en Firestore.
          if (
            data.img_url &&
            data.img_url !== "" &&
            data.img_url !== lastImageUrl
          ) {
            setLastImageUrl(data.img_url);
            setImageUrl(data.img_url);
            setStep("result");

            // await addDoc(collection(db, "images"), {
            //   email: email,
            //   imageUrl: data.img_url,
            //   date: new Date(),
            //   correoEnviado: false,
            // });
            // console.log("Datos guardados en Firestore!");
          }
        } catch (error) {
          console.error("Error al obtener la imagen:", error);
        }
      }, 5000); // Consulta cada 5 segundos
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [step, lastImageUrl, email]);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {step === "photo" && <AvatarPhoto onProcess={handleProcess} />}
      {step === "waiting" && (
        <Waiting
          email={email}
          onEmailChange={handleEmailChange}
          onShowPolicy={() => setStep("policy")}
        />
      )}
      {step === "result" && (
        <AvatarResult
          imageUrl={imageUrl}
          email={email}
          onReset={() => setStep("photo")}
        />
      )}
      {step === "policy" && <Policy onBack={() => setStep("waiting")} />}
    </div>
  );
}

export default App;
