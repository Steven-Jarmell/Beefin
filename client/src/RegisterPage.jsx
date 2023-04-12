import { useState } from 'react'
import './CSS/RegisterPage.css'
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const regInfo = (e) => {
        e.preventDefault();

        console.log(email);
        console.log(password)
        console.log(firstName);
        console.log(lastName);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                "email": email,
                "password": password,
                "firstName": firstName,
                "lastName": lastName,
                "roles" : [
                    "USER"
                ]
            })
        };

        
        fetch("http://localhost:8080/api/auth/register", requestOptions)
            .then((response) => response.json())
            .catch((error) => console.log("error", error));
        
        navigate("/login");
    }

    return (
        <div className="Regis">
            <p className='regisLabel'>Register</p>
            <form>
                <p className='firstLabel'>First Name:</p>
                <input type="text" id="firstName"
                value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                <p className='lastLabel'>Last Name:</p>
                <input type="text" id="lastName"
                value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                <p className='emailLabel'>Email:</p>
                <input type="text" id="email"
                value={email} onChange={(e) => setEmail(e.target.value)}/>
                <br />
                <p className='passLabel'>Password:</p>
                <input type="text" id="password"
                value={password} onChange={(e) => setPassword(e.target.value)}/>
                <br />
                <br />
                <br />
                <br />
                <button className='submitButton' onClick={(e) => regInfo(e)}>Submit</button>
            </form>

        </div>
    )
}
export default RegisterPage;
