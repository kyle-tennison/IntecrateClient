import "./alert-overwrite.css";

import React from "react";
import { useEffect, useState } from "react";

export function AlertOverwrite() {
  const [error, setError] = useState("");

  function showAlert() {
    document.getElementById("alert-box").style.display = "block";

    // For some reason we need to allow the box to load before it can fade
    document.getElementById("alert-box").style.opacity = 0;
    setTimeout(() => {
      document.getElementById("alert-box").style.opacity = 1;
    }, 100);

  }
  function hideAlert() {
    document.getElementById("alert-box").style.opacity = 0;
    setTimeout(() => {
      document.getElementById("alert-box").style.display = "none";
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
    <div id="alert-box" style={{ display: "none"}}>
      <div id="alert-content" >
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
