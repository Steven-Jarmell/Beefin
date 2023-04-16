import {} from 'react'
import cow from "./assets/DALL·E 2023-03-17 12.16.17 -Cow_lifter.png"
import './CSS/LandingPage.css'
import {useNavigate} from "react-router-dom";

////onClick={this.LoginRoute}
function LandingPage() {
    const navigate = useNavigate();
    return (
        <div className='LandingPage'>
            <div className="left">
                <p className="title">Beefin'</p> 
                <p className='Info'>
                    Beefin' is workout trakcking service that allows you to connect to 
                    your gym buddies by sharing your workouts and competing in group
                    competitions. Too scared to talk to THAT person at the gym?
                    Join their group show them what you're made of! Create some beefs,
                    squash some beefs, but most importanly, make the gym fun agin. Now, get 
                    moooving by logging in or regeristering.
                </p>
                <div className='buttons'>               
                <button onClick={() => navigate('/login')} id="login">Login</button>
                <button onClick={() => navigate('/register')} id="regis">Register</button> 
                </div>
            </div>
            <div className='rights'>
                <img src={cow} alt="" id='cow'/>
            </div>
        </div>
    );
}

export default LandingPage;