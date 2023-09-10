import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import "./global.css";
import Home from "./containers/home-page/home";
import DevBlog from "./containers/dev-blog/dev-blog"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dev-blog" element={<DevBlog />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
