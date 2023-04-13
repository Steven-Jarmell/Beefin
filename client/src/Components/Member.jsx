import "/src/CSS/Member.css";
import {useNavigate} from "react-router-dom";


const Member = ({rank, name}) => {
    const navigate = useNavigate();
    if(rank !== null){
        var idVal = "none";
        if(rank === 0){
            idVal = "first";
        } else if(rank === 1){
            idVal = "second";
        } else if(rank === 2){
            idVal = "third";
        } else{
            idVal = null;
        }
        return (
            <div className="member-container">
                <button id={idVal === null ? "" : idVal} className="member-name-button" onClick={()=> navigate(`/profile/user?email=${name}`)}>{rank+1} &#8594;  {name}</button>
            </div>
        );
    } else{
        return (
            <div className="member-container">
                <button className="member-name-button" onClick={()=> navigate(`/profile/user?email=${name}`)}>{name}</button>
            </div>
        );
    }
    
  };

export default Member;
