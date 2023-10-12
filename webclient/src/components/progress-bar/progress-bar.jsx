/**
 * Code Appropriated from WebDevSimplified
 *
 * https://github.com/WebDevSimplified/css-tutorials/tree/master/Progress%20Bar
 */

import { useState } from "react";
import "./progress-bar.css";

export function ProgressBar(props) {
  return (
    <div
      id="progress-bar"
      style={{
        "--percent": props.percent,
        "--height": props.height,
        "--width": props.width,
      }}
    ></div>
  );
}
