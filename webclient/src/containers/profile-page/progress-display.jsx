import fire_icon from "./assets/fire.svg"
import rocket_icon from "./assets/rocket.svg"
import trophy_icon from "./assets/trophy.svg"

import { useState } from "react"

export function ProgressDisplay(){

    let [activeChallengesText, setActiveChallengesText] = useState("0 Active Challenges")
    let [streakText, setStreakText] = useState("0 Day Streak")
    let [completedChallengesText, setCompletedChallengesText] = useState("0 Completed Challenges")

    return <div id="progress-display">
        <div className="stat-row">
            <img class="icon" src={fire_icon}/>
            <a>{activeChallengesText}</a>
        </div>
        <div className="stat-row">
            <img class="icon" src={rocket_icon}/>
            <a>{streakText}</a>
        </div>
        <div className="stat-row">
            <img class="icon" src={trophy_icon}/>
            <a>{completedChallengesText}</a>
        </div>

    </div>
}