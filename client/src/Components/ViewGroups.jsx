import "../Style/ViewGroups.css";
import NavBar from "../Components/navbar";
import Group from "../Components/Group";


const ViewGroups = (props) => {
    const globalGroups = [];
    // parse through data here
    for(let i = 0; i < props.globalGroups.length; i++){
        globalGroups.push(<Group name={props.globalGroups[i]}></Group>)
    }

    const myGroups = [];
    // parse through data here
    for(let i = 0; i < props.myGroups.length; i++){
        myGroups.push(<Group name={props.myGroups[i]}></Group>)
    }

    return (
        <div>
            <NavBar></NavBar>
            <div className="viewgroups-container">
                <div className="left-container">
                    <h1>Global Groups</h1>
                    <div className="left-container-groups">
                        {globalGroups}
                    </div>
                </div>
                <div className="right-container">
                    <h1>My Groups</h1>
                    <div className="right-container-groups">
                        {myGroups}
                    </div>
                </div>
            </div>
        </div>

        
    );
  };

export default ViewGroups;
