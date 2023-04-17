import {} from "react";
import cow from "./assets/DALL·E 2023-03-17 12.16.17 -Cow_lifter.png";
import "./CSS/LandingPage.css";
import { useNavigate } from "react-router-dom";

////onClick={this.LoginRoute}
function LandingPage() {
    const navigate = useNavigate();
    return (
        <div className="LandingPage">
            <div className="left">
                <p className="title">Beefin'</p>
                <div className="log landing-page-container">
                    <button onClick={() => navigate("/login")} id="login" className="landing-page-button">
                        Login
                    </button>
                </div>
                <div className="reg landing-page-container">
                    <button onClick={() => navigate("/register")} id="regis" className="landing-page-button">
                        Register
                    </button>
                </div>
                <p className="Info"><em>Get Mooovin With Beefin!</em></p>
            </div>
            <div className="right-div">
                <img src={cow} alt="" />
            </div>
        </div>
    );
}

export default LandingPage;
