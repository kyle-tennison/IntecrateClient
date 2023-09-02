import ActionButtons from "./action-buttons"
import "./header.css"


export default function Header(){

    return(
        <div id="header">
            <img class="logo icon" src="../../../public/icon.svg"/>
            <button class='header-btn default'>Home</button>
            <button class='header-btn default'>About Us</button>
            <button class='header-btn default'>Alpha Progression</button>
            <ActionButtons></ActionButtons>
        </div>
    )

}