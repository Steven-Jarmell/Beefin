import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import "../../CSS/Group.css";
import { BsBoxArrowUpRight } from "react-icons/bs";

const Group = () => {
    const [userEmail, setUserEmail] = useState("");
    const [groupInformation, setGroupInformation] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [canJoinGroup, setCanJoinGroup] = useState(true);

    const navigate = useNavigate();
    const { id } = useParams();
    // On render, fetch the group information
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

        fetch(`http://localhost:8080/api/groups?id=${id}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setGroupInformation(result);
                console.log(result);
            })
            .catch((error) => console.log("error", error));

        fetch(`http://localhost:8080/api/users`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setAllUsers(result);
            })
            .catch((error) => console.log("error", error));
    }, []);

    const onJoinGroupClicked = (e) => {
        let token = sessionStorage.getItem("token");

        if (!token) return;
        // Append to user's group list
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${token}`);

        var raw = JSON.stringify({
            id: sessionStorage.getItem("userID"),
            newGroupId: groupInformation[0].id,
        });

        var requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch("http://localhost:8080/api/users", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));

        // Append to group's member list
        raw = JSON.stringify({
            id: groupInformation[0].id,
            newGroupMember: userEmail,
        });

        var requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };

        fetch("http://localhost:8080/api/groups", requestOptions)
            .then((response) => response.text())
            .then((result) => navigate("/groups"))
            .catch((error) => console.log("error", error));
    };

    let groupLeaderName;
    for (let i = 0; i < allUsers.length; i++) {
        let currentUser = allUsers[i].email;
        if (currentUser === userEmail) {
            groupLeaderName =
                allUsers[i].firstName + " " + allUsers[i].lastName;
            break;
        }
    }

    let groupMembers = [];
    if (allUsers && groupInformation[0]) {
        for (let i = 0; i < allUsers.length; i++) {
            let currentUser = allUsers[i];
            if (currentUser.groupsList?.includes(groupInformation[0].id)) {
                groupMembers.push(currentUser);
                if (canJoinGroup && userEmail === currentUser.email)
                    setCanJoinGroup(false);
            }
        }
    }

    return groupInformation?.length === 0 ? (
        <h1>Loading...</h1>
    ) : (
        <div className="group-container">
            <h1>{groupInformation[0].name}</h1>
            <button
                onClick={(e) => onJoinGroupClicked(e)}
                disabled={!canJoinGroup}
            >
                Join Group
            </button>
            <p>Members:</p>
            <div className="group-members-container">
                {groupMembers.map((member, i) => (
                    <div key={i} className="group-member-card">
                        <p>
                            <b className="group-member-attribute">Name:</b>{" "}
                            {member.firstName + " " + member.lastName}
                        </p>
                        <p>
                            <b className="group-member-attribute">Role:</b>{" "}
                            {member.email === groupInformation[0].groupLeaderID
                                ? "Leader"
                                : "Member"}
                        </p>
                        <p>
                            <b className="group-member-attribute">Email:</b>{" "}
                            {member.email}
                        </p>
                        <p>
                            <b className="group-member-attribute">Points:</b>{" "}
                            {member.pointsEarned}
                        </p>
                        <BsBoxArrowUpRight />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Group;
