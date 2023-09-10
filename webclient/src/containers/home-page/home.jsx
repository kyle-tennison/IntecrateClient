import "./home.css"
import Header from "../../components/header/header"
import BlenderAnimation from "./animation"
import Fade from "react-reveal/Fade"


import man_thinking from "/man-thinking.jpg"
import { useEffect } from "react"

export default function Home(){

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
                        <div className="home-paragraph half-left">
                            &emsp;Intecrate provides video lessons to help you
                            create your own, personal CAD designs. When you're done,
                            we'll connect you with world-class manufactures and 
                            deliver your custom-fabricated aluminum parts for you to
                            assembly.

                        </div>
                    </div>
                    <div className="home-block" style={{marginTop : "60px"}}>
                        <div className="home-img half-left">
                            <img src={man_thinking} alt="Someone using intecrate"></img>
                        </div>
                        <div className="home-paragraph half-right">
                            &emsp;Intecrate provides video lessons to help you
                            create your own, personal CAD designs. When you're done,
                            we'll connect you with world-class manufactures and 
                            deliver your custom-fabricated aluminum parts for you to
                            assembly.

                        </div>
                    </div>
                </Fade>
                <Header />  {/* Put header last so that it renders on top */}
            </div>
        </div>
    )
}