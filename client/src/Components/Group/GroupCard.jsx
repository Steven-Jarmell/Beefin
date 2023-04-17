import "../../CSS/GroupCard.css"
import { BsBoxArrowUpRight } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const GroupCard = ({name, gID, groupMembers}) => {
    const navigate = useNavigate();
    return (
        <div className="group-card-container">
            <p>{name}</p>
            <p>{groupMembers.length} {groupMembers.length > 1 ? "Members" : "Member"}</p>
            <BsBoxArrowUpRight className="group-card-button" onClick={() => navigate(`/groups/${gID}`)} />
        </div>
    )
}

export default GroupCard;