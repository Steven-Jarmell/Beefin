import "../Style/SingleGroup.css";
import NavBar from "../Components/navbar";
import Member from "./Member";

const SingleGroup = (props) => {

  const members = [];
    // parse through data here
  for(let i = 0; i < props.members.length; i++){
      members.push(<Member name={props.members[i]} rank={null}></Member>)
  }

  const leaderboard = [];
    // parse through data here
  for(let i = 0; i < 3; i++){
      leaderboard.push(<Member name={props.members[i]} rank={i}></Member>)
  }

  return (
    <div>
      <NavBar></NavBar>
      <div className="single-group">
        <div className="topArea">
          <h1>~ Group Name ~</h1>
        </div>
        <div className="single-group-container">
        <div className="left-side">
            <div className="members-list">
              <h2>Members</h2>
              {members}
            </div>
        </div>
        <div className="right-side">
          <div className="leaderboard">
            <h2>Leaderboard</h2>
            {leaderboard}
          </div>
        </div>
        </div>
        
      </div>
    </div>
  );
};

export default SingleGroup;
