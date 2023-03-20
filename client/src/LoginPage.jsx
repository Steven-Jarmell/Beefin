import {} from 'react'
import './CSS/LoginPage.css'
import { useNavigate } from 'react-router-dom';

function logInfo(){
    console.log("logging info");
    console.log(document.getElementById("email").value);
    console.log(document.getElementById("password").value);
}

function LoginPage() {
    return (
        <div className="Login">
            <p className='loginLabel'>Login</p>
            <form>
                <p className='emailLabel'>Email:</p>
                <span className="emailField">
                    <input type="text" id="email"/>
                </span>
                <br />
                <p className='passLabel'>Password:</p>
                <span className='passField'>
                    <input type="text" id="password"/>
                </span>

                <br />
                <br />
                <br />
                <br />
                
                <button className='submitButton' onClick={() => logInfo()}>Submit</button>
            </form>

        </div>
    )
}

export default LoginPage;