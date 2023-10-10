/*
Sometimes the header buttons will show login/signup options,
other times it should display a 'my profile' button
*/

import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function ActionButtons() {

  const [cookies, setCookie] = useCookies(['api_key'])
  const [isLoggedIn, setLoggedIn] = useState(false)

  useEffect(() => {

    let isLoggedIn = false

    if (cookies.api_key !== undefined){
      setLoggedIn(true)
    }

    console.log("reading cookies as", cookies.api_key)


  }, [])


  return (
    <>
      <button
        id="signup-btn"
        className="header-btn noauth"
        onClick={() => {
          window.location.href = "/signup";
        }}
        style={{display: isLoggedIn? "none" : "block" }}
      >
        Sign Up
      </button>
      <button
        id="login-btn"
        className="header-btn noauth"
        onClick={() => {
          window.location.href = "/login";
        }}
        style={{display: isLoggedIn? "none" : "block" }}
      >
        Login
      </button>
      <div
        id="profile-btn"
        className="header-btn yesauth"
        onClick={() => {
          window.location.href = "/profile";
        }}
        style={{display: isLoggedIn? "block" : "none" }}
      >
        <img src="https://upload.wikimedia.org/wikipedia/commons/2/2c/Default_pfp.svg" />
        <a>My Profile</a>
      </div>
    </>
  );
}
