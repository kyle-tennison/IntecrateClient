import "./login-page.css";
import Header from "/src/components/header/header";
import Footer from "/src/components/footer/footer";
import { useEffect, useState, useRef } from "react";
import { login } from "/src/util/api.js";
import { useCookies } from "react-cookie";
import login_image from "./assets/login-image.jpg";
import login_background from "./assets/login-background.jpg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [cookies, setCookie] = useCookies(['api_key'])

  const [buttonState, setButtonState] = useState("disabled");

  useEffect(() => {
    let button = document.getElementById("login-btn");

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

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("Login Submitted");

    let checks = [validateEmail(), validatePassword()];

    if (checks.includes(false)) {
      // We won't do anything if something is wrong
    } else {
      // If it looks good locally, we'll try to login
      setButtonState("loading");

      let response = await login(email, password);

      if (response.isError) {
        // Display an error if there was a problem fetching
        setButtonState("disabled");
        setErrorMsg(response.content);
      } else {
        // Check if the login was valid
        if (response.content.success) {
          console.log("valid login");

          let d = new Date();
          d.setTime(d.getTime() + (48*60*60*1000));
          setCookie('api_key', response.content.user.apiKey, { path: '/',  expires: d})

          setButtonState("enabled");
        } else {
          console.log("bad login")
          console.error(response.content.message);
          setErrorMsg(response.content.message);
          setButtonState("disabled");
        }
      }
    }
  }

  /**
   * Validates email syntax
   */
  function validateEmail(recurse = false) {
    var re = /\S+@\S+\.\S+/;
    let emailIsGood = re.test(email);

    if (!emailIsGood && email.length != 0) {
      setErrorMsg("whoops, it looks like your email is missing something");
      setButtonState("disabled");
    } else {
      if (recurse && validatePassword(false)) {
        setErrorMsg("");
        if (email.length !== 0 && password.length !== 0)
          setButtonState("enabled");
        else setButtonState("disabled");
      }
    }
    return emailIsGood;
  }

  /**
   * Validates password syntax
   */
  function validatePassword(recurse = false) {
    let passwordIsGood = false;

    if (password.length < 8 && password.length > 0) {
      setErrorMsg("oops, your password is at least 8 characters");
      setButtonState("disabled");
    } else {
      passwordIsGood = true;
      if (recurse && validateEmail(false)) {
        setErrorMsg("");
        if (email.length !== 0 && password.length !== 0)
          setButtonState("enabled");
        else setButtonState("disabled");
      }
    }
    return passwordIsGood;
  }

  return (
    <div
      id="login-page"
      style={{ backgroundImage: `url(${login_background})` }}
    >
      <div className="container">
        <div id="login-block">
          <div className="left half-left">
            <div className="container">
              <img src={login_image}></img>
            </div>
          </div>
          <div className="right half-right">
            <div className="container">
              <h1>welcome back</h1>
              <p id="error-box">{errorMsg}</p>
              <form onSubmit={handleSubmit}>
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
                <div>
                  <input id="login-btn" type="submit" value="Log In" />
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
