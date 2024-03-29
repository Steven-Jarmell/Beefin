import { useState, useEffect } from "react";
import GroupCard from "./GroupCard";
import jwtDecode from "jwt-decode";
import "../../CSS/GroupLayout.css";

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
                setGroupList(result);
                console.log(result);
            })
            .catch((error) => console.log("error", error));
    }, []);

    let allGroups = groupList?.map((group, i) => (
        <GroupCard
            key={group.id}
            gID={group.id}
            name={group.name}
            groupMembers={group.groupMembers}
        />
    ));

    let groupsIn = [];

    for (let i = 0; i < groupList?.length; i++) {
        let groupMemberList = groupList[i].groupMembers;
        if (groupMemberList.includes(userEmail)) {
            groupsIn.push(groupList[i]);
        }
    }

    let myGroups = groupsIn?.map((group, i) => (
        <GroupCard
            key={group.id}
            gID={group.id}
            name={group.name}
            groupMembers={group.groupMembers}
        />
    ));

    return (
        <div className="groups-container">
            <div className="all-groups-container">
                <p className="group-list-title">All Groups</p>
                {allGroups ? allGroups : "No Groups"}
            </div>
            <div className="my-groups-container">
                <p className="group-list-title">My Groups</p>
                {myGroups}
            </div>
        </div>
    );
};

export default GroupLayout;
