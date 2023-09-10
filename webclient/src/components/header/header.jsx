import ActionButtons from "./action-buttons";
import "./header.css";

import icon from "/icon.svg";

export default function Header() {
  return (
    <div
      id="header"
      style={{
        position: "fixed",
        width: "100%",
        top: "0px",
      }}
    >
      <img className="logo icon" src={icon} />
      <button className="header-btn default" onClick={() => {window.location.href = "/home?fadeBar=0"}}>Home</button>
      <button className="header-btn default" onClick={() => {window.location.href = "/about"}}>About Us</button>
      <button className="header-btn default" onClick={() => {window.location.href = "/dev-blog"}}>Alpha Progression</button>
      <ActionButtons></ActionButtons>
    </div>
  );
}
