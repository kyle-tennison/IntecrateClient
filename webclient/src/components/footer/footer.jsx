import "./footer.css";

import full_logo from "/full-logo.svg";

import x_logo from "./assets/x-logo.svg";
import linkedin_logo from "./assets/linkedin-logo.png";
import facebook_logo from "./assets/facebook-logo.png";

export default function Footer() {
  return (
    <div id="footer">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridGap: 20,
          height: "100%",
        }}
      >
        <div className="column" id="col1">
          <img src={full_logo} id="full-logo"></img>
          <a>© Intecrate 2023</a>
        </div>
        <div className="column" id="col2">
          <h3>Check us out on social media</h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridGap: 20
            }}
          >
            <div className="subColumn">
              <a href="https://twitter.com/intecrate" target="_blank">
                <img src={x_logo} className="social-media-icon"></img>
              </a>
            </div>
            <div className="subColumn">
              <a
                href="https://www.linkedin.com/company/intecrate"
                target="_blank"
              >
                <img src={linkedin_logo} className="social-media-icon"></img>
              </a>
            </div>
            <div className="subColumn">
              <a
                href="https://www.makeuseof.com/reasons-to-quit-facebook/"
                target="_blank"
              >
                <img src={facebook_logo} className="social-media-icon"></img>
              </a>
            </div>
          </div>
        </div>
        <div className="column" id="col3">
          <div className="container">
            <h5>Business inquiries</h5>
            <a>kyletennison05@gmail.com</a>
            <br />
            <h5>Legal</h5>
            <a href="https://intecrate.co/legal/license">Copyright</a> <br />
            <a href="https://intecrate.co/legal/account_terms">Terms</a> <br />
            <a href="https://intecrate.co/legal/distribution_request">
              Distribution
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
