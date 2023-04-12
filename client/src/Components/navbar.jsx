import '../CSS/navbar.css'
import logo from "../assets/Beefin.png";
import {useNavigate} from "react-router-dom";

const NavBar = (props) => {
  const navigate = useNavigate();
  return (
    <div className='navbar-container'>
      <div className="navbar-buttons-container">
         <img id="logo" className='logo-button' src={logo} alt="" />
        <button className='left' onClick={()=> navigate('/profile')}> My Profile </button>
        <button className='left' onClick={() => navigate('/profile/createGroup')}>Create/Join a Group</button>
        <button className='left' onClick={() => navigate('/profile/groups')}>See Groups</button>
        <button className='left'onClick={() => navigate('/log-workouts')}>Workouts</button>
        <button className='right'onClick={() => navigate()}>Logout</button>
      </div>
    </div>
  );
};

export default NavBar;
