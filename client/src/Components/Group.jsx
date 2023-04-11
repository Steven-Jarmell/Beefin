import "../CSS/Group.css";


const Group = (props) => {
    
    return (
        <div className="group-container">
            <h2> <a href="" className="group-name-anchor"> {props.name}</a> </h2>
        </div>
    );
  };

export default Group;
