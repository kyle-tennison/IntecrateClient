import "./signup-page.css";

import Header from "/src/components/header/header";
import { useEffect, useState } from "react";

import signup_background from "./assets/signup-background.jpg";
import signup_image from "./assets/signup-image.jpg";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [terms, setTerms] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [buttonState, setButtonState] = useState("disabled");

  useEffect(() => {
    let button = document.getElementById("signup-btn");

    switch (buttonState) {
      case "enabled":
        button.disabled = false;
        button.removeAttribute("style");
        break;
      case "disabled":
        button.disabled = true;
        button.style.color = "#808080";
        button.style.backgroundSize = 0;
        break;
      case "loading":
        button.disabled = true;
        button.removeAttribute("style");
        break;
      default:
        console.error(`Unexpected button state '${buttonState}'`);
    }
  }, [buttonState]);

  /**
   * Handles Signup Form Submit
   */
  function handleSubmit(event) {
    event.preventDefault();
    console.debug("Handling Submit");
  }

  /**
   * Validates email syntax
   */
  function validateEmail(recurse = true) {
    // console.debug("Validating email syntax");

    var re = /\S+@\S+\.\S+/;
    let emailIsGood = re.test(email);

    if (!emailIsGood) {
      if (email !== "") {
        setErrorMsg("oops, make sure your email is entered correct");
      }
      if (recurse) validateAll();
      return false;
    } else {
      if (recurse) validateAll();
      return true;
    }
  }

  /**
   * Validates password syntax
   */
  function validatePassword(recurse = true) {
    // console.debug("Validating password syntax");

    return true;
  }

  /**
   * Checks if the two passwords match
   */
  function passwordsMatch(recurse = true) {
    // console.debug("Checking if passwords match");

    if (password !== password2) {
      if (password2 !== "") {
        setErrorMsg(
          "oops, it looks like the passwords you entered don't match",
        );
        if (recurse) validateAll();
        return false;
      }
    } else {
      if (recurse) validateAll();
      return true;
    }
  }

  /**
   * Checks all the signup fields
   * @returns bool
   */
  function validateAll() {
    // console.debug("validateAll() reading terms as", terms)
    setErrorMsg("");
    let checks = [
      validatePassword(false),
      passwordsMatch(false),
      validateEmail(false),
      username !== "",
      terms === true,
    ];

    if (checks.includes(false)) {
      console.debug("checks failed", terms);
      setButtonState("disabled");
      return false;
    } else {
      console.debug("checks passed", terms);
      setButtonState("enabled");
      return true;
    }
  }


  /**
   * Force update terms
   */
  useEffect(() => {
    console.debug("reading terms as", terms);
    validateAll();
  }, [terms]);

  return (
    <div
      id="signup-page"
      style={{ backgroundImage: `url(${signup_background})` }}
    >
      <div className="container">
        <div id="signup-block">
          <div className="left half-left">
            <div className="container">
              <img src={signup_image}></img>
            </div>
          </div>
          <div className="right half-right">
            <div className="container">
              <h1>nice to meet you</h1>
              <p id="error-box">{errorMsg}</p>
              <form onSubmit={handleSubmit}>
                <div className="text-entry">
                  <input
                    type="text"
                    value={username}
                    onBlur={(e) => {
                      validateAll(e);
                    }}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    id="username"
                    placeholder="Username"
                  />
                </div>
                <div className="text-entry">
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    onBlur={(e) => {
                      validateEmail(e);
                    }}
                    id="email"
                    placeholder="Email"
                  />
                </div>
                <div className="text-entry">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    onBlur={(e) => {
                      validatePassword(e);
                    }}
                    id="password"
                    placeholder="Password"
                  />
                </div>
                <div className="text-entry">
                  <input
                    type="password"
                    value={password2}
                    onChange={(e) => {
                      setPassword2(e.target.value);
                    }}
                    onBlur={(e) => {
                      passwordsMatch(e);
                    }}
                    id="password2"
                    placeholder="Retype Password"
                  />
                </div>
                <div className="checkbox-entry">
                  <input
                    type="checkbox"
                    id="terms"
                    value={terms}
                    onChange={(e) => {

                      console.debug("setting terms to", e.target.checked)
                      setTerms(e.target.checked);
                    }}
                  />
                  <label>
                    &ensp;I have read and agree to the{" "}
                    <a
                      target="_blank"
                      className="link"
                      href="https://intecrate.co/legal/account_terms/"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
                <div>
                  <input id="signup-btn" type="submit" value="Sign Up" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Header></Header>
      {/* <Footer></Footer> */}
    </div>
  );
}
