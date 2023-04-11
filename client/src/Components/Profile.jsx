import React, { useState, useEffect } from "react";
import NavBar from "../Components/navbar";
import "../CSS/Profile.css";
import ProgressBar from "./ProgressBar";
import { useNavigate } from "react-router-dom";
import rank_1 from "../assets/rank_1.svg";
import rank_2 from "../assets/rank_2.svg";
import rank_3 from "../assets/rank_3.svg";
import rank_4 from "../assets/rank_4.svg";
import rank_5 from "../assets/rank_5.svg";
import rank_6 from "../assets/rank_6.svg";
import rank_7 from "../assets/rank_7.svg";
import rank_8 from "../assets/rank_8.svg";
import rank_9 from "../assets/rank_9.svg";
import rank_10 from "../assets/rank_10.svg";
import fire from "../assets/fire.svg";
import logo from "../assets/Beefin.png";
import jwtDecode from "jwt-decode";

const Profile = (props) => {
    const [name, setName] = useState("");
    const [points, setPoints] = useState(0);

    useEffect(() => {
        let token = sessionStorage.getItem("token");

        if (!token) return;

        const decoded = jwtDecode(token);

        console.log(decoded);

        const userEmail = decoded.sub;

        var myHeaders = new Headers();
        myHeaders.append(
            "Authorization",
            `Bearer ${token}`
        );

        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };

        fetch(
            `http://localhost:8080/api/users?email=${userEmail}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                if (result[0]) {
                    console.log(result);
                    setName(() => result[0].firstName);
                    setPoints(() => result[0].pointsEarned);
                }
            })
            .catch((error) => console.log("error", error));
    }, []);

    var rank;
    switch (props.currentRank) {
        case 1:
            rank = rank_1;
            break;
        case 2:
            rank = rank_2;
            break;
        case 3:
            rank = rank_3;
            break;
        case 4:
            rank = rank_4;
            break;
        case 4:
            rank = rank_4;
            break;
        case 5:
            rank = rank_5;
            break;
        case 6:
            rank = rank_6;
            break;
        case 7:
            rank = rank_7;
            break;
        case 8:
            rank = rank_8;
            break;
        case 9:
            rank = rank_9;
            break;
        case 10:
            rank = rank_10;
            break;
    }
    const navigate = useNavigate();
    return (
        <div>
            <NavBar></NavBar>
            <h1>Hello, {name}</h1>
            <div className="profile-container">
                <div className="rank-information">
                    <div>
                        <img src={rank} fill="yellow" id="profilePic" />
                        {/* <rank_1 fill="red"></rank_1> */}

                        <br />
                        <b>Current Rank: {props.currentRank}</b>
                    </div>
                </div>
                <div className="profile-information">
                    <h1>{props.name}</h1>
                    <b>Current Points: {points}</b>
                </div>
            </div>
            <h1>Stats</h1>
            <div className="stats-container">
                <div className="current-streak-container">
                    <b>Current Streak: {props.currentStreak}</b>
                    <img src={fire} alt="" />
                </div>
                <div className="current-xp-level-container">
                    <ProgressBar
                        currentPoints={props.currentPoints}
                    ></ProgressBar>
                </div>
                <div className="current-random-container">
                    <img id="logo_big" src={logo} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Profile;
