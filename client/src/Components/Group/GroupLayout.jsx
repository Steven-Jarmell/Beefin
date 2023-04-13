import { useState, useEffect } from "react";
import Group from "./Group";
import "/src/CSS/ViewGroups.css";

const GroupLayout = () => {
    const [groupList, setGroupList] = useState();
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
        let token = sessionStorage.getItem("token");

        if (!token) return;

        const decoded = jwtDecode(token);

        const userEmail = decoded.sub;

        // Save the user's email while we are here
        setUserEmail(userEmail);

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };

        fetch(`http://localhost:8080/api/groups`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
            })
            .catch((error) => console.log("error", error));
    }, []);

    useEffect( () => {
        setGroupList( [
        {
            "name": "Beefin 1", 
            "groupLeaderID": "jarmellsteve@yahoo.com", 
            "groupMembers":["jarmellsteve@yahoo.com", "prp48@pitt.edu"]
        }, 
        {
            "name": "Beefin 2", 
            "groupLeaderID": "jarmellsteve@yahoo.com", 
            "groupMembers":["jarmellsteve@yahoo.com", "prp48@pitt.edu"]
        },

        {
            "name": "Beefin 3", 
            "groupLeaderID": "prp48@pitt.edu", 
            "groupMembers":[ "prp48@pitt.edu"]
        },

        {
            "name": "Beefin 4", 
            "groupLeaderID": "jarmellsteve@yahoo.com", 
            "groupMembers":["jarmellsteve@yahoo.com", "prp48@pitt.edu"]
        }
    ])

    setUserEmail("jarmellsteve@yahoo.com")
    }, []) 

    let allGroups = groupList?.map((group, i) => (
        <Group
            key={i}
            name={group.name}
            groupLeaderID={group.groupLeaderID}
            groupMembers={group.groupMembers}
        />
    ));

    let groupsIn = [];

    for (let i = 0; i < groupList?.length; i++) {
        let groupMemberList = groupList[i].groupMembers;
        console.log(userEmail)
        console.log(groupMemberList)
        if (groupMemberList.includes(userEmail)) {
            groupsIn.push(groupList[i]);
        }
    }

    let myGroups = groupsIn?.map((group, i) => (
        <Group
            key={i}
            name={group.name}
            groupLeaderID={group.groupLeaderID}
            groupMembers={group.groupMembers}
        />
    ));


    return (
        < div className="viewgroups-container">
            <div className="left-container">
                <h2>Global Groups</h2>
                {allGroups ? allGroups : "No Groups"}
            </div>
            <div className="right-container">
                <h2>My Groups</h2>
                {myGroups ? myGroups : "No Groups"}
            </div>
            
            
        </div>
    );
};

export default GroupLayout;
