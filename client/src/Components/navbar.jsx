import '../CSS/navbar.css'
import logo from "../assets/Beefin.png";
import {useNavigate} from "react-router-dom";

const NavBar = (props) => {
  const navigate = useNavigate();
  return (
    <div className='navbar-container'>
      <div className="navbar-buttons-container">
        <img id="logo" src={logo} alt="" />
        <button className='left' onClick={()=> navigate('/')}> My Profile </button>
        <button className='left' onClick={() => navigate()}>Create/Join a Group</button>
        <button className='left' onClick={() => navigate('/join-group')}>See Groups</button>
        <button className='left'onClick={() => navigate()}>Workouts</button>
        <button className='right'onClick={() => navigate()}>Logout</button>
      </div>
    </div>
  );
};

export default NavBar;
