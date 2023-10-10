import "./signup-page.css";

import Header from "/src/components/header/header";
import { useEffect, useState } from "react";
import { signup } from "/src/util/api.js";
import { useCookies } from "react-cookie";
import signup_background from "./assets/signup-background.jpg";
import signup_image from "./assets/signup-image.jpg";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [terms, setTerms] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [birthday, setBirthday] = useState("");
  const [cookies, setCookie] = useCookies(["api_key"]);

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
  async function handleSubmit(event) {
    event.preventDefault();
    console.log("Signup Submitted");

    if (!validateAll()) {
      console.error("Signup form did not meet criteria");
      return;
    }

    setButtonState("loading");

    let response = await signup(email, password, username, birthday);

    if (response.isError) {
      // Display an error if there was a problem fetching
      setButtonState("disabled");
      setErrorMsg(response.content);
    } else {
      // Check if the login was valid
      if (response.content.success) {
        console.log("valid signup");

        let d = new Date();
        d.setTime(d.getTime() + 48 * 60 * 60 * 1000);
        setCookie("api_key", response.content.user.apiKey, {
          path: "/",
          expires: d,
        });

        setButtonState("enabled");
      } else {
        console.error(response.content.message);
        setErrorMsg(response.content.message);
        setButtonState("disabled");
      }
    }
  }

  /**
   * Updates birthday text as it is being typed
   * @param {event} event
   */
  const handleBirthdayInput = (e) => {
    let birthday = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters

    if (birthday.length > 0) {
      if (birthday.length <= 2) {
        birthday = birthday;
      } else if (birthday.length <= 4) {
        birthday = birthday.slice(0, 2) + "/" + birthday.slice(2);
      } else {
        birthday =
          birthday.slice(0, 2) +
          "/" +
          birthday.slice(2, 4) +
          "/" +
          birthday.slice(4, 8);
        birthday = birthday.slice(0, 10);
      }
    }
    setBirthday(birthday);
  };

  /**
   * Validates birthday syntax
   */
  function validateBirthday(recurse = true) {
    const dateParts = birthday.split("/");
    if (dateParts.length !== 3) {
      if (birthday !== "") setErrorMsg("whoops, double check your birthday");
      if (recurse) validateAll();
      return false;
    }

    const [month, day, year] = dateParts.map(Number);

    if (
      isNaN(month) ||
      isNaN(day) ||
      isNaN(year) ||
      month < 1 ||
      month > 12 ||
      day < 1 ||
      day > 31 ||
      year < new Date().getFullYear() - 130 ||
      year > new Date().getFullYear()
    ) {
      if (birthday !== "") setErrorMsg("your birthday doesn't look right...");
      if (recurse) validateAll();
      return false;
    } else {
      if (recurse) validateAll();
      return true;
    }
  }

  /**
   * Validates email syntax
   * @returns bool
   */
  function validateEmail(recurse = true) {
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
   * @returns bool
   */
  function validatePassword(recurse = true) {
    let valid = false;
    let error = "sorry, your password ";

    switch (true) {
      case password.length < 8:
        error += "is too short";
        break;
      case !/[!@#$%^&*()_+{}\[\]:;<>,.?~\\|/]/.test(password):
        error += "doesn't contain a special character";
        break;
      case !/\d/.test(password):
        error += "doesn't contain a number";
        break;
      case !/[a-z]/.test(password):
        error += "doesn't contain a lowercase letter";
        break;
      case !/[A-Z]/.test(password):
        error += "doesn't contain an uppercase letter";
        break;
      default:
        valid = true;
        break;
    }

    if (!valid) {
      if (password !== "") setErrorMsg(error);
      if (recurse) validateAll();
      return false;
    } else {
      if (recurse) validateAll();
      return true;
    }
  }

  /**
   * Checks if the two passwords match
   * @returns bool
   */
  function passwordsMatch(recurse = true) {
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
    setErrorMsg("");
    let checks = [
      validatePassword(false),
      passwordsMatch(false),
      validateEmail(false),
      validateBirthday(false),
      username !== "",
      terms === true,
    ];

    if (checks.includes(false)) {
      console.debug("validation failed");
      setButtonState("disabled");
      return false;
    } else {
      setButtonState("enabled");
      console.debug("validation passed");
      return true;
    }
  }

  /**
   * Force update terms
   */
  useEffect(() => {
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
                <div className="text-entry">
                  <input
                    type="text"
                    value={birthday}
                    onChange={handleBirthdayInput}
                    onBlur={(e) => {
                      validateBirthday(e);
                    }}
                    id="bday"
                    placeholder="Birthday (MM/DD/YYYY)"
                  />
                </div>
                <div className="checkbox-entry">
                  <input
                    type="checkbox"
                    id="terms"
                    value={terms}
                    onChange={(e) => {
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
