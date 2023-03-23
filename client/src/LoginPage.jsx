import { useEffect, useState } from "react";
import "./CSS/LoginPage.css";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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

        fetch("http://localhost:8080/api/auth/authenticate", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));

        setEmail("");
        setPassword("");
    };

    return (
        <div className="Login">
            <p className="loginLabel">Login</p>
            <form onSubmit={(e) => logInfo(e)}>
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <label htmlFor="password">Password:</label>
                <input
                    type="text"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />

                <br />
                <br />
                <br />
                <br />

                <button className="submitButton" onClick={(e) => logInfo(e)}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default LoginPage;