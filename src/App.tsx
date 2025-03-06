import { useState } from "react";
import AvatarPhoto from "./components/AvatarAi/AvatarPhoto.tsx";
import AvatarResult from "./components/AvatarAi/AvatarResult.tsx";
import Waiting from "./components/AvatarWait/Waiting.tsx";

function App() {
  const [step, setStep] = useState("photo");

  const handleProcess = () => {
    setStep("waiting"); // Cambia a la pantalla de espera

    setTimeout(() => {
      setStep("result"); // Después de 3 segundos, muestra el resultado
    }, 7000);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {step === "photo" && <AvatarPhoto onProcess={handleProcess} />}
      {step === "waiting" && <Waiting />}
      {step === "result" && <AvatarResult />}
    </div>
  );
}

export default App;
