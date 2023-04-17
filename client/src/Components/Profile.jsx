import React, { useState, useEffect } from "react";
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

const Profile = () => {
    const [name, setName] = useState("");
    const [points, setPoints] = useState(0);
    const [rank, setRank] = useState(1);
    const [rankImage, setRankImage] = useState("");
    const [streak, setStreak] = useState(0);
    const [searchParams, setSearchParams] = useState("");

    useEffect(() => {
        let token = sessionStorage.getItem("token");

        if (!token) return;

        const decoded = jwtDecode(token);

        console.log(decoded);

        const userEmail = decoded.sub;

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

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
                    console.log(result[0]);
                    sessionStorage.setItem("userID", result[0].id);
                    setName(result[0].firstName);
                    setPoints(result[0].pointsEarned);
                    setRank(points / 1000 > 0 ? points / 1000 : 1);
                    let currentStreak = () => {
                        let streak = 0;
                        let workoutsCompleted = result[0].workoutsCompleted;

                        if (!workoutsCompleted) return 0;

                        let date = new Date();
                        date.setHours(0,0,0,0);
                    
                        for (let i = workoutsCompleted.length-1; i >= 0; i--) {
                            // Javascript does not like hyphens
                            const currentWorkoutDate = new Date(workoutsCompleted[i].workoutDate.slice(0, workoutsCompleted[i].workoutDate.indexOf('T')).replaceAll('-', '/'));
                            currentWorkoutDate.setHours(0,0,0,0);
                            if (date.getTime() === currentWorkoutDate.getTime()) {
                                streak++;
                                date.setDate(date.getDate() - 1);
                            } else {
                                break;
                            }
                        }
                        
                        return streak;
                    }
                    setStreak(currentStreak ? currentStreak : 0);

                    switch (rank) {
                        case 1:
                            setRankImage(rank_1);
                            break;
                        case 2:
                            setRankImage(rank_2);
                            break;
                        case 3:
                            setRankImage(rank_3);
                            break;
                        case 4:
                            setRankImage(rank_4);
                            break;
                        case 5:
                            setRankImage(rank_5);
                            break;
                        case 6:
                            setRankImage(rank_6);
                            break;
                        case 7:
                            setRankImage(rank_7);
                            break;
                        case 8:
                            setRankImage(rank_8);
                            break;
                        case 9:
                            setRankImage(rank_9);
                            break;
                        case 10:
                            setRankImage(rank_10);
                            break;
                    }
                }
            })
            .catch((error) => console.log("error", error));
    }, []);

    const navigate = useNavigate();
    return (
        <div className="main-profile-container">
            <h1>Hello, {name}</h1>
            <div className="profile-container">
                <div className="rank-information">
                    <div className="rank-container">
                        <img src={rankImage} fill="yellow" id="profilePic" />
                        <b>Current Rank: {rank}</b>
                    </div>
                </div>
                <div className="profile-information">
                    <p className="profile-info-points">Current Points: {points}</p>
                </div>
            </div>
            <h1>Stats</h1>
            <div className="stats-container">
                <div className="current-streak-container">
                    <b>Workout Streak: {streak}</b>
                    <img src={fire} alt="" />
                </div>
                <div className="current-xp-level-container">
                    <ProgressBar currentPoints={points}/>
                </div>
                <div className="current-random-container">
                    <img id="logo_big" src={logo} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Profile;
