import "./Waiting.scss";

import fondo from "../../assets/img/fondo.png";
// import avatarImage from "../../assets/img/avatar.png";
import logo from "../../assets/img/claro.png";

const Waiting = () => {
  return (
    <div className="container">
      <img src={fondo} alt="Avatar" className="fondo" />
      <div className="card">
        <img src={logo} alt="Logo" className="clarologo" />

        <div className="avatar-container-wait">
          <h2 className="subtitlewait">Espera ...</h2>
          <iframe
            className="avatar"
            width="100%"
            height="350"
            src="https://www.youtube.com/embed/GVuiftq3KsI?si=3Ac7-nzjhy1cwipL&amp;controls=0&amp;start=6&autoplay=1"
            title="YouTube video player"
            frameBorder="0"
            allow="autoplay"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <p className="waiting-text">Espera unos segundos.....</p>
        </div>
      </div>
      <div className="container"></div>
    </div>
  );
};

export default Waiting;
