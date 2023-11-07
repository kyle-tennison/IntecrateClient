import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./global.css";
import Home from "./containers/home-page/home";
import DevBlog from "./containers/dev-blog/dev-blog";
import Signup from "./containers/signup-page/signup-page";
import Login from "./containers/login-page/login-page";
import About from "./containers/about-page/about-page";
import Profile from "./containers/profile-page/profile-page";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dev-blog" element={<DevBlog />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
