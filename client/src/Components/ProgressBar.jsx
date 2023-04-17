import "../CSS/ProgressBar.css";

const ProgressBar = ({ currentPoints }) => {
    return (
        <div className="progressbar-container">
            <b>Points Until Next Level</b>
            <div className="progressbar-visual">Needed: {1000 - (currentPoints % 1000)}</div>
            <div className="progressbar-visual">
                Current: {currentPoints % 1000}
            </div>
            
            + {Math.floor(currentPoints / 1000) > 1
                ? Math.floor(currentPoints / 1000)
                : 0}{" "}
            Levels worth of Points
        </div>
    );
};

export default ProgressBar;
