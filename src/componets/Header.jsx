import React from "react";
import WsaLogo from "../assets/wsa-logo.svg";

export default function Header() {
  return (
    <div className="header-contaier-div">
      <img src={WsaLogo} width={182} height={62} alt="Wsa Logo" />
    </div>
  );
}
