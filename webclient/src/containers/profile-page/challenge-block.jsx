import { useState } from "react"

import { ProgressBar } from "../../components/progress-bar/progress-bar"

import book_icon from "./assets/book.svg"
import calendar_icon from "./assets/calendar.svg"



export function ChallengeBlock(props){

    let [chapterText, setChapterText] = useState("Introduction")
    let [startDate, setStartDate] = useState("Started January 1, 1980")
    let [buttonText, setButtonText] = useState("Resume")

    return <div id="challenge-block">

    <div className="left">
        <img src={props.banner}/>
    </div>
    <div className="right">
        <div id="challenge-info">
            <h1 className="divider">{props.name}</h1>
            <div className="stat-row">
                <img className="icon" src={book_icon}/>
                <a>{chapterText}</a>
            </div>
            <div className="stat-row">
                <img className="icon" src={calendar_icon}/>
                <a>{startDate}</a>
            </div>
        </div>
        <div id="challenge-controls">
            <button>
                {buttonText}
            </button>
            <ProgressBar 
            percent="10"
            height="15px"
            />
        </div>

    </div>

    </div>

}