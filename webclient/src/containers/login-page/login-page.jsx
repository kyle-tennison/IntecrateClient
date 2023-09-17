import "./login-page.css";
import Header from "/src/components/header/header";
import Footer from "/src/components/footer/footer";
import { useState } from 'react';
import { login } from '/src/api.js'

export default function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("") 
  const [errorMsg, setErrorMsg] = useState("")

  async function handleSubmit(event) {
    event.preventDefault()
    console.log('Login Submitted')

    let checks = [
      validateEmail(),
      validatePassword()
    ]

    if (checks.includes(false)){
      // We won't do anything if something is wrong
    }
    else {
      // If it looks good locally, we'll try to login
      let button = document.getElementById("login-btn")
      button.disabled = true

      let response = await login(email, password)

      if (response.isError){
        // Display an error if there was a problem fetching
        button.disabled = false,
        setErrorMsg(response.content)
      }
      else {
        // Check if the login was valid
        if (response.content.validLogin){
          console.log('valid login!')
        }
        else {
          console.error(response.content.errMsg)
          setErrorMsg(response.content.errMsg)
        }
        button.disabled = false
      }

    }
  }

  /**
   * Validates email syntax
   */
  function validateEmail(recurse=false){
    var re = /\S+@\S+\.\S+/;
    let emailIsGood = re.test(email);

    if (!emailIsGood){
      setErrorMsg("whoops, it looks like your email is missing something")
    }
    else{
      if (recurse && validatePassword(false)){
        setErrorMsg("")
      }
    }
    return emailIsGood
  }

  /**
   * Validates password syntax
   */
  function validatePassword(recurse=false){
    console.log('validate password')

    let passwordIsGood = false;

    if (password.length < 8 && password.length > 0){
      setErrorMsg("oops, your password is at least 8 characters")
    }
    else{
      passwordIsGood = true
      if (recurse && validateEmail(false)){
        setErrorMsg("")
      }
    }

    return passwordIsGood
    
  }

  return (
    <div id="login-page">
      <div className="container">
        <div id="login-block">
          <h1>welcome back</h1>
          <p id="error-box">{errorMsg}</p>
          <form onSubmit={handleSubmit}>
            <div className="text-entry">
              <input 
                type="text" 
                value={email}
                onChange={(e) => {setEmail(e.target.value)}}
                onBlur={(e) => {validateEmail(e)}}
                id="email" 
                placeholder="Email" />
            </div>
            <div className="text-entry">
              <input 
                type="password" 
                value={password}
                onChange={(e) => {setPassword(e.target.value)}}
                onBlur={(e) => {validatePassword(e)}}
                id="password" 
                placeholder="Password"/>
            </div>
            <div>
                <input id="login-btn" type="submit" value="Log In"></input>
            </div>
          </form>
        </div>
      </div>
      <Header></Header>
      <Footer></Footer>
    </div>
  );
}
