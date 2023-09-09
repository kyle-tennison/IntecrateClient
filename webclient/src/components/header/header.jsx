import ActionButtons from "./action-buttons"
import "./header.css"

import icon from "../../../public/icon.svg"


export default function Header(){

    return(
        <div id="header" style={{
            position: "fixed",
            width: "100%",
            top: "0px",
        }}>
            <img className="logo icon" src={icon}/>
            <button className='header-btn default'>Home</button>
            <button className='header-btn default'>About Us</button>
            <button className='header-btn default'>Alpha Progression</button>
            <ActionButtons></ActionButtons>
        </div>
    )

}