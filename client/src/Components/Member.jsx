import "../Style/Member.css";


const Member = (props) => {
    
    if(props.rank !== null){
        var idVal = "none";
        if(props.rank === 0){
            idVal = "first";
        } else if(props.rank === 1){
            idVal = "second";
        } else if(props.rank === 2){
            idVal = "third";
        } else{
            idVal = null;
        }
        return (
            <div id={idVal} className="member-container">
                <h2> <a href="" className="member-name-anchor" >{props.rank+1} &#8594;  {props.name}</a> </h2>
            </div>
        );
    } else{
        return (
            <div className="member-container">
                <h2> <a href="" className="member-name-anchor">{props.name}</a> </h2>
            </div>
        );
    }
    
  };

export default Member;
