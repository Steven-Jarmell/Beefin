import "../CSS/ProgressBar.css";

const ProgressBar = (props) => {
    var needed =  1000 - (props.currentPoints % 1000);
    var current = props.currentPoints % 1000
    return (
        <div className="progressbar-container">
            <b>XP Until Next Level!</b>
            <div
                className="progressbar-visual-container"
                style={{ height: "25vh" }}
            >
                {needed < 100 ? null : `Needed: ${needed}`}
               
                <div
                    className="progressbar-visual"
                    style={{ height: `${(props.currentPoints % 1000) / 40}vh` }}
                >
                    {current < 100 ? null : `Current: ${current}`}
                </div>
            </div>
            +{" "}
            {Math.floor(props.currentPoints / 1000) > 1
                ? Math.floor(props.currentPoints / 1000)
                : 0}{" "}
            Levels worth of XP
        </div>
    );
};

export default ProgressBar;
