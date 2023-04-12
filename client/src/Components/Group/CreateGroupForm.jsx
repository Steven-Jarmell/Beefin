import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import jwtDecode from "jwt-decode";
import "../../CSS/NewGroupForm.css";

const CreateGroupForm = () => {
    const [groupName, setGroupName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [token, setToken] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        let token = sessionStorage.getItem("token");

        if (!token) return;

        setToken(token);

        const decoded = jwtDecode(token);

        const userEmail = decoded.sub;

        // Save the user's email
        setUserEmail(userEmail);
    }, []);

    const onGroupNameChanged = (e) => {
        setGroupName(e.target.value);
    };

    let canSave = groupName?.length;

    const onSaveGroupClicked = (e) => {
        e.preventDefault();

        if (canSave) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append(
                "Authorization",
                `Bearer ${token}`
            );

            var raw = JSON.stringify({
                name: groupName,
                groupLeaderID: userEmail,
                groupMembers: [userEmail],
            });

            console.log(raw);

            var requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow",
            };

            fetch("http://localhost:8080/api/groups", requestOptions)
                .then((response) => response.json())
                .then((result) => console.log(result))
                .catch((error) => console.log("error", error));
        }

        navigate("/profile/groups");
    };

    return (
        <>
            <form className="group-form" onSubmit={onSaveGroupClicked}>
                <h2 className="group-form-title">New Group</h2>
                <div className="group-form-input">
                    <label className="group-form-label" htmlFor="groupName">
                        Group Name:
                    </label>
                    <input
                        className="group-form-text-input"
                        id="groupName"
                        name="groupName"
                        placeholder="Enter Group Name Here"
                        type="text"
                        value={groupName}
                        onChange={onGroupNameChanged}
                    />
                </div>
                <button
                    className="group-form-button"
                    title="Save"
                    disabled={!canSave}
                >
                    Save
                </button>
            </form>
        </>
    );
};

export default CreateGroupForm;
