import ActionButtons from "./action-buttons"
import "./header.css"


export default function Header(){

    return(
        <div id="header" style={{
            position: "fixed",
            width: "100%",
            top: "0px",
        }}>
            <img className="logo icon" src="../../../public/icon.svg"/>
            <button className='header-btn default'>Home</button>
            <button className='header-btn default'>About Us</button>
            <button className='header-btn default'>Alpha Progression</button>
            <ActionButtons></ActionButtons>
        </div>
    )

}