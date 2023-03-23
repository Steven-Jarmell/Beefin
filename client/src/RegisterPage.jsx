import {} from 'react'
import './CSS/RegisterPage.css'
import { useNavigate } from 'react-router-dom';


function logInfo(){
    console.log("logging info");
    console.log(document.getElementById("firstName").value);
    console.log(document.getElementById("lastName").value);
    console.log(document.getElementById("email").value);
    console.log(document.getElementById("password").value);
}

function RegisterPage() {
    return (
        <div className="Regis">
            <p className='regisLabel'>Register</p>
            <form>
                <p className='firstLabel'>First Name:</p>
                <input type="text" id="firstName"/>
                <p className='lastLabel'>Last Name:</p>
                <input type="text" id="lastName"/>
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
export default RegisterPage;
