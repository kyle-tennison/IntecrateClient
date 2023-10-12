import "./profile-page.css";
import Header from "/src/components/header/header";
import Footer from "/src/components/footer/footer";

import { ProgressDisplay } from "./progress-display";
import { ChallengeBlock } from "./challenge-block"

import default_pfp from "/default_pfp.jpg"
import placeholder_img from "./assets/placeholder.jpeg"


export default function Profile() {
  return (
    <div id="profile-page">
      <div id="left">
        <img src={default_pfp}></img>
        <h3 className="pfp-caption">username</h3>
        <h3 className="pfp-caption divider">email</h3>

        <ProgressDisplay />
      </div>
      <div id="right">
        <h1 className="divider">Welcome Back</h1>

        <h2 className="divider">My Challenges</h2>

        <ChallengeBlock
          banner={placeholder_img}
          name="sample challenge"
        ></ChallengeBlock>

        <h2 className="divider">My Recommendations</h2>

      </div>
      <Header/>
    </div>
  );
}
