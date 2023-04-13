import { useState, useEffect } from "react";
import Member from "/src/Components/Member.jsx";
import "/src/CSS/SingleGroup.css";

const GroupLayout = () => {
    const [memberList, setMemberList] = useState()
    const [leaderboard, setLeaderboard] = useState();


    // useEffect(() => {
    //     let token = sessionStorage.getItem("token");

    //     if (!token) return;

    //     const decoded = jwtDecode(token);

    //     const userEmail = decoded.sub;

    //     // Save the user's email while we are here
    //     setUserEmail(userEmail);

    //     var myHeaders = new Headers();
    //     myHeaders.append("Authorization", `Bearer ${token}`);

    //     var requestOptions = {
    //         method: "GET",
    //         headers: myHeaders,
    //         redirect: "follow",
    //     };

    //     fetch(`http://localhost:8080/api/groups`, requestOptions)
    //         .then((response) => response.json())
    //         .then((result) => {
    //             console.log(result);
    //         })
    //         .catch((error) => console.log("error", error));
    // }, []);

    
    useEffect( () => {
        console.log("here")
        setMemberList( [
        {
            "name": "jarmellsteve@yahoo.com", 
            "rank": 1
        }, 
        {
            "name": "prp48@pitt.edu", 
            "rank": 10
        }, 
        {
            "name": "skhattab@pitt.edu", 
            "rank": 6
        },
        {
            "name": "dasdadsa@pitt.edu", 
            "rank": 10
        },
        {
            "name": "as@pitt.edu", 
            "rank": 10
        },
        {
            "name": "12313113@pitt.edu", 
            "rank": 10
        },
        {
            "name": "prpasdasdakdabdsadasd48@pitt.edu", 
            "rank": 10
        },

    ])
    }, []) 

    let members = memberList?.map((person, i) => (
        <Member
            key={i}
            name={person.name}
            rank={null}
        />
    ));

    let leaderBoard = memberList?.slice(0,3).map((person, i) => (
        <Member
            key={i}
            name={person.name}
            rank={i}
        />
    ));

    return (
        < div className="viewgroups-container">
            <div className="left-container">
                <h2>Members</h2>
                {members}
            </div>
            <div className="right-container">
                <h2>Leaderboard</h2>
                {leaderBoard}
            </div>
            
            
        </div>
    );
};

export default GroupLayout;
