import "../Style/ProgressBar.css";



const ProgressBar = (props) => {
    return (
      <div className='progressbar-container'>
        <b>XP Until Next Level!</b>
        <div className="progressbar-visual-container" style={{ 'height': '25vh' }}>
            Needed: {1000-(props.currentPoints%1000)}
            <div className="progressbar-visual" style={{ 'height': `${(props.currentPoints%1000)/40}vh` }}>
            Current: {props.currentPoints}
            </div>
        </div>
      </div>
    );
  };

export default ProgressBar;
