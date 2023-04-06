import '../Style/navbar.css'
import logo from "../assets/Beefin.png";
import {useNavigate} from "react-router-dom";

const NavBar = (props) => {
  const navigate = useNavigate();
  return (
    <div className='navbar-container'>
      <div className="navbar-buttons-container">
        <img id="logo" src={logo} alt="" />
        <button className='left' onClick={()=> navigate('/')}> My Profile </button>
        <button className='left' onClick={() => navigate('/join-group')}>Create/Join a Group</button>
        <button className='left'><a href="">See Groups</a></button>
        <button className='left'><a href="">Workouts</a></button>
        <button className='right'><a href="">Logout</a></button>
      </div>
    </div>
  );
};

export default NavBar;
