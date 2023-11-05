/**
 * Redirects to a page of choice when not logged in
 *
 * https://github.com/WebDevSimplified/css-tutorials/tree/master/Progress%20Bar
 */

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";


/**
 * Redirects away from a page if logged in / not logged in
 * 
 * @param {object} props The props object
 * @param {string} props.redirect The path to navigate to
 * @param {boolean} props.onLogin Redirect when logged in (true) or when logged out (false)
 * 
 */
export function Redirector(props) {
  const [cookies, setCookie] = useCookies(["api_key"]);
  const navigate = useNavigate();

  useEffect(() => {
    let isLoggedIn = false;

    // TODO: Run Test GET to validate key
    if (cookies.api_key !== undefined) {
      isLoggedIn = true;
    }

    if (isLoggedIn === props.onLogin){
        navigate(props.redirect)
    }

    console.log("reading cookies as", cookies.api_key);
  }, []);
}
