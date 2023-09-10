import './dev-blog.css'

import Header from "/src/components/header/header";
import Footer from "/src/components/footer/footer";

import workshop from "./assets/workshop.jpg"

export default function DevBlog(){
    return <div id="dev-blog">

        <div id="banner" style={{backgroundImage: `url(${workshop})`}}>
            <h1>Intecrate Development</h1>
        </div>

        <h2>September, 2023 - Update to React</h2>
        <p>
        The previous version of Intecrate was a patched-together javascript mess 
        that used vanilla JS/HTML/CSS. As of now, development has officially 
        switched gears into react. <br /><br />

        For the next month, Intecrate will focus on building the front end. 
        A substantial part of the back-end is already built, but we're considering 
        translating it into Rust (from Python) before everything grows. <br /><br />

        We've published the web client source code (what you're using right now) 
        on Git Hub, and anyone who wants to make a contribution is welcome to. 
        (Guidelines on contributing have not been established yet.) <br /><br />

        </p>

        <Header></Header>
        <Footer></Footer>
    </div>
}