import "./home.css"
import Header from "../../components/header/header"
import BlenderAnimation from "./animation"

import man_thinking from "/man-thinking.jpg"
import { useEffect } from "react"

export default function Home(){

    useEffect(() => {
        document.onscroll = () => {
            let depth = document.body.getBoundingClientRect().top * -1

            if (depth < 2650){
                // not visible; ignore
            }
            else if (depth < 2850 ){
                document.getElementById("what-is-intecrate").style.opacity = 0
            }
            else if (depth > 2850 && depth < 3140){
                let opacity = (depth - 2850) / (3140 - 2850)
                document.getElementById("what-is-intecrate").style.opacity = opacity
            }
            else if (depth > 3140){
                document.getElementById("what-is-intecrate").style.opacity = 1
            }

        }
    })

    return (
        <div id="home-page">
            <div id="animation">
                <BlenderAnimation></BlenderAnimation>
            </div>
            <div id="home-content">
                <Header />
                <h1 id="title">Intecrate</h1>
                <h2 id="subtitle">Early Alpha</h2>
                <div className="scroll-pad" style={{height: "2700px"}}></div>
                <h1 style={{marginBottom: "200px"}}> What is Intecrate?</h1>
                <div className="home-block" id="what-is-intecrate">
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
            </div>
        </div>
    )
}