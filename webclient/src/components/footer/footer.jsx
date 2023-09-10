import "./footer.css"

import full_logo from "/full-logo.svg"

import x_logo from "/x-logo.svg"
import linkedin_logo from "/linkedin-logo.png"
import facebook_logo from "/facebook-logo.png"

export default function Footer() {

    return <div id="footer">

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 20, height: "100%" }}>
            <div className="column">
                <img src={full_logo} id="full-logo"></img>
            </div>
            <div className="column">
                <h3>Check us out on social media</h3>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 20, height: "100%" }}>
                    <div className="subColumn"><img src={x_logo} className="social-media-icon"></img></div>
                    <div className="subColumn"><img src={linkedin_logo} className="social-media-icon"></img></div>
                    <div className="subColumn"><img src={facebook_logo} className="social-media-icon"></img></div>
                </div>
            </div >
            <div  className="column">Column 3</div>
        </div>

    </div>

}