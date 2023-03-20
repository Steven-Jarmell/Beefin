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
            <div className='log' >                      
                <button onClick={() => navigate('/login')} id="login">Login</button> 
            </div>
            <div className='reg'>
                <button onClick={() => navigate('/register')} id="regis">Register</button> 
            </div>
            <p className='Info'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, 
                iure ullam! Veritatis nemo ut dolore 
                voluptatibus suscipit, sed aperiam accusantium 
                facilis corporis error quam libero atque ipsam commodi deleniti deserunt.
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. 
                Ipsa modi id laudantium, quas iure nobis quod minus facere illum 
                accusamus delectus
                 odio voluptate distinctio placeat molestiae sunt assumenda dolorem corrupti.
                 Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                 Aut incidunt reiciendis hic, quam voluptatum repellat sit officiis 
                 perspiciatis obcaecati, quia dolorum iusto, saepe qui eius.
                  Nemo explicabo odio illum ut?
            </p>
            </div>
            <img src={cow} alt="" />
        </div>
    );
}

export default LandingPage;