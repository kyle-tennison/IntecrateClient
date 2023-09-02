import "./home.css"
import Header from "../../components/header/header"
import BlenderAnimation from "./animation"

export default function Home(){
    return (
        <div id="home-page">
            <Header />
            <BlenderAnimation></BlenderAnimation>
            <h1>Intecrate!</h1>
            <p>Early Beta</p>
        </div>
    )
}