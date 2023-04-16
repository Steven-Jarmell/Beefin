import { useEffect, useState } from "react";
import "./CSS/LoginPage.css";
import { Navigate, useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const logInfo = (e) => {
        e.preventDefault();

        console.log("Email:" + email);
        console.log("Password:" + password);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "email": email,
                "password": password
             })
        };
        let token = ""
        //Use /register route
        //Send post of user reques
        fetch("http://localhost:8080/api/auth/authenticate", requestOptions)
            .then((response) => response.json())
            .then((result) => token = result.token)
            .catch((error) => console.log("error", error));

        setEmail("");
        setPassword("");
        if(token != ""){
            sessionStorage.setItem("token", token);
            navigate("/profile");
        }

        navigate("/profile");
        
    };

    return (
        <div className="Login">
            <p className="loginLabel">Login:</p>
            <form onSubmit={(e) => logInfo(e)}>
                <div className='email'>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="pass">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="text"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button className="submitButton" onClick={(e) => logInfo(e)}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
