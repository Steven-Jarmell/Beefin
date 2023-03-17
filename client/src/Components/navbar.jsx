import '../Style/navbar.css'

const NavBar = (props) => {
  return (
    <div className='navbar-container'>
      <div className="navbar-buttons-container">
        <button className='left'>My Profile</button>
        <button className='left'>My Groups</button>
        <button className='left'>Create a Group</button>
        <button className='left'>Join a Group</button>
        <button className='left'>Workouts</button>
        <button className='right'>Logout</button>
      </div>
    </div>
  );
};

export default NavBar;
