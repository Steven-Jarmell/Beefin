import '../CSS/navbar.css'
import logo from "../assets/Beefin.png";
import {useNavigate} from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className='navbar-container'>
      <div className="navbar-buttons-container">
         <img id="logo" className='logo-button navbar-button' src={logo} alt="" />
        <button className='left navbar-button' onClick={()=> navigate('/profile')}> My Profile </button>
        <button className='left navbar-button' onClick={() => navigate('/profile/createGroup')}>Create Group</button>
        <button className='left navbar-button' onClick={() => navigate('/profile/groups')}>See Groups</button>
        <button className='left navbar-button'onClick={() => navigate('/log-workouts')}>Workouts</button>
        <button className='right navbar-button'onClick={() => {
            sessionStorage.clear();
            navigate('/');
            }}>Logout</button>
      </div>
    </div>
  );
};

export default NavBar;
