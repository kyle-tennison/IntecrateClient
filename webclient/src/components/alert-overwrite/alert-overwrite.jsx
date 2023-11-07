import "./alert-overwrite.css";

import React from "react";
import { useEffect, useState } from "react";

import bug_icon from "./assets/bug.svg";

export function AlertOverwrite() {
  const [error, setError] = useState("");

  function showAlert() {
    document.getElementById("alert-box").style.display = "block";
    document.getElementById("alert-box").style.opacity = 1;
    // document.getElementById("alert-content").style.opacity = 1;
  }
  function hideAlert() {
    document.getElementById("alert-box").style.opacity = 0;
    // document.getElementById("alert-content").style.opacity = 0;
    setTimeout(() => {
      document.getElementById("alert-box").style.display = "block";
    }, 300);
  }

  function customAlert(message) {
    setError(message);
    console.log(`Received Error: ${message}`);
    showAlert();
  }

  useEffect(() => {
    // Hide by default
    hideAlert();

    // Overwrite default alert
    window.alert = customAlert;

    // Listen for click outside of alert box
    window.addEventListener("click", (e) => {
      if (e.target == document.getElementById("alert-box")) {
        hideAlert();
      }
    });
  }, []);

  return (
    <div id="alert-box" style={{ display: "none" }}>
      <div id="alert-content" style={{ backgroundImage: bug_icon }}>
        <span
          className="close"
          onClick={() => {
            hideAlert();
          }}
        >
          &times;
        </span>
        <h1>Sorry, we ran into an error:</h1>
        <p>{error}</p>
      </div>
    </div>
  );
}
