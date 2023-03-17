import NavBar from "../Components/navbar";
import "../Style/Profile.css";
import reactLogo from "../assets/react.svg";
import chart from "../assets/Benchmark.svg";

const Profile = (props) => {
  return (
    <div>
      <NavBar></NavBar>
      <h1>Profile</h1>
      <div className="profile-container">
        <div className="profile-container-child">
          
          <div>
            <img src={reactLogo} alt="" id='profilePic'/>
            <br />
            <b>Current Rank: {props.currentRank}</b>
          </div>
        </div>
        <div className="profile-container-child">
          <h1>Welcome, {props.name}</h1>
          <b>Current Points: {props.currentPoints}</b>
        </div>
      </div>
      <h1>Stats</h1>
      <div className="stats-container">
        <div className="stats-container-child">
          <img src={chart} alt="" className="chartPic"/>
          <caption>Exercise Chart 1</caption>
        </div>
        <div className="stats-container-child">
          <img src={chart} alt="" className="chartPic"/>
          <caption>Exercise Chart 2</caption>
        </div>
      </div>
    </div>
  );
};

export default Profile;
