import "./home.css"
import Header from "../../components/header/header"
import BlenderAnimation from "./animation"

export default function Home(){

    

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
                <h1> What is Intecrate?</h1>
            </div>
        </div>
    )
}