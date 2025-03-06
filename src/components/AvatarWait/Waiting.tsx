import "./Waiting.scss";

import fondo from "../../assets/img/fondo.png";
// import avatarImage from "../../assets/img/avatar.png";
import logo from "../../assets/img/claro.png";

import waitingVideo from "../../assets/videos/video.mp4";

const Waiting = () => {
  return (
    <div className="container">
      <img src={fondo} alt="Avatar" className="fondo" />
      <div className="card">
        <img src={logo} alt="Logo" className="clarologo" />

        <div className="avatar-container-wait">
          <h2 className="subtitlewait">Espera ...</h2>
          <video
            className="avatar"
            width="100%"
            height="350"
            autoPlay
            loop
            playsInline
          >
            <source src={waitingVideo} type="video/mp4" />
            Tu navegador no soporta videos HTML5.
          </video>
          <p className="waiting-text">Espera unos segundos.....</p>
        </div>
      </div>
      <div className="container"></div>
    </div>
  );
};

export default Waiting;
