import '../Style/navbar.css'
import logo from "../assets/Beefin.png";

const NavBar = (props) => {
  return (
    <div className='navbar-container'>
      <div className="navbar-buttons-container">
        <img src={logo} alt="" />
        <button className='left'>My Profile</button>
        <button className='left'>See Groups</button>
        <button className='left'>Create/Join a Group</button>
        <button className='left'>Workouts</button>
        <button className='right'>Logout</button>
      </div>
    </div>
  );
};

export default NavBar;
