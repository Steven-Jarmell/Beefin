import {useNavigate} from "react-router-dom";
import "/src/CSS/Group.css";

const Group = ({name, groupLeaderID,  groupMembers, key}) => {
    console.log(name, groupLeaderID, groupMembers)
    const navigate = useNavigate();
    return (
        <div className="group-container">
            <button className="group-name-button" onClick={()=> navigate(`/profile?email=${groupLeaderID}`)}><h3>{name}</h3></button>
            <br></br>
            <button className="group-leader-button" id={key} onClick={()=> navigate(`/profile?email=${groupLeaderID}`)}>{groupLeaderID}</button>
        </div>
    )
}

export default Group;