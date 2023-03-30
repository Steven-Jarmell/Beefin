import NavBar from "../Components/navbar";
import "../Style/Profile.css";
import ProgressBar from "./ProgressBar";
import rank_1 from "../assets/rank_1.svg";
import rank_2 from "../assets/rank_2.svg";
import rank_3 from "../assets/rank_3.svg";
import rank_4 from "../assets/rank_4.svg";
import rank_5 from "../assets/rank_5.svg";
import rank_6 from "../assets/rank_6.svg";
import rank_7 from "../assets/rank_7.svg";
import rank_8 from "../assets/rank_8.svg";
import rank_9 from "../assets/rank_9.svg";
import rank_10 from "../assets/rank_10.svg";
import fire from "../assets/fire.svg";

const Profile = (props) => {
  var rank;
  switch (props.currentRank){
    case 1: 
      rank=rank_1;
      break;
    case 2: 
      rank=rank_2;
      break;
    case 3: 
      rank=rank_3;
      break;
    case 4: 
      rank=rank_4;
      break;
    case 4: 
      rank=rank_4;
      break;
    case 5: 
      rank=rank_5;
      break;
    case 6: 
      rank=rank_6;
      break;
    case 7: 
      rank=rank_7;
      break;
    case 8: 
      rank=rank_8;
      break;
    case 9: 
      rank=rank_9;
      break;
    case 10: 
      rank=rank_10;
      break;
  }

  return (
    <div>
      <NavBar></NavBar>
      <h1>Profile</h1>
      <div className="profile-container">
        <div className="rank-information">
          
          <div>
            <img src={rank} fill='yellow' id='profilePic' />
            {/* <rank_1 fill="red"></rank_1> */}
          
            <br />
            <b>Current Rank: {props.currentRank}</b>
          </div>
        </div>
        <div className="profile-information">
          <h1>{props.name}</h1>
          <b>Current Points: {props.currentPoints}</b>
        </div>
      </div>
      <h1>Stats</h1>
      <div className="stats-container">
        <div className="current-streak-container">
          <b>Current Streak: {props.currentStreak}</b>
          <img src={fire} alt="" />
        </div>
        <div className="current-xp-level-container">
        <ProgressBar currentPoints={props.currentPoints}></ProgressBar>
        </div>
        <div className="current-random-container">
          <b>RANDOM: RANDOM</b>
        </div>
      </div>
    </div>
  );
};

export default Profile;
