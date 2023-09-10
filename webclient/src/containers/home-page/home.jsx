import "./home.css"
import Header from "/src/components/header/header"
import Footer from "/src/components/footer/footer"
import BlenderAnimation from "./animation"
import Fade from "react-reveal/Fade"


import man_thinking from "/man-thinking.jpg"
import laser_cutter from "/laser-cutter.jpg"
import kid_typing from "/kid-typing.jpg"
import { useEffect } from "react"

export default function Home(){

    useEffect(() => {
        let header = document.getElementById("header")

        setTimeout(
            () => {header.style.opacity = 1},
            4000
        )

    })

    return (
        <div id="home-page">
            <div id="animation">
                <BlenderAnimation></BlenderAnimation>
            </div>
            <div id="home-content">
                <h1 id="title">Intecrate</h1>
                <h2 id="subtitle">Early Alpha</h2>
                <div className="scroll-pad" style={{height: "2700px"}}></div>
                <h1 style={{marginBottom: "200px"}}> What is Intecrate?</h1>
                <Fade bottom distance="10%">
                    <div className="home-block">
                        <div className="home-img half-right">
                            <img src={man_thinking} alt="Someone using intecrate"></img>
                        </div>
                        <div className="home-paragraph half-left" style={{marginTop: "40px"}}>
                            <strong>You're the designer</strong><br></br>
                            Intecrate provides video lessons to help you
                            create your own, personal CAD designs. When you're done,
                            we'll connect you with world-class manufactures and 
                            deliver your custom-fabricated aluminum parts for you to
                            assembly.

                        </div>
                    </div>
                    <div className="home-block" style={{marginTop : "130px"}}>
                        <div className="home-img half-left">
                            <img src={laser_cutter} alt="Someone using intecrate"></img>
                        </div>
                        <div className="home-paragraph half-right" style={{marginTop: "50px"}}>
                            <strong>Built by the best</strong><br></br>
                            We send your designs out to Reno, Nevada, 
                            where our friends at <a href="https://sendcutsend.com" target="_blank">SendCutSend</a> have 
                            12kW laser-cutters waiting to fabricate your designs
                            at an industry-grade precision. 

                        </div>
                    </div>
                    <div className="home-block" style={{marginTop : "130px"}}>
                        <div className="home-img half-right">
                            <img src={kid_typing} alt="Someone using intecrate"></img>
                        </div>
                        <div className="home-paragraph half-left" style={{marginTop: "20px"}}>
                            <strong>We're here for you</strong><br></br>
                            We know that taking this next step in your engineering
                            journey is daunting, but we're here to assist you
                            regardless of your skill level. We've prepared hundreds
                            of videos and articles to help you through every problem
                            you can run into.

                        </div>
                    </div>
                    <h1 style={{marginTop : "200px"}}>Everything coming soon</h1>
                    <div style={{textAlign: "center"}}>
                        <button id="blog-button">Read the Development Blog</button>
                    </div>
                </Fade>
                <Footer />
                <Header />  {/* Put header last so that it renders on top */}
            </div>
        </div>
    )
}