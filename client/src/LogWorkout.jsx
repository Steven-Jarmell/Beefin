import { useState } from "react";
import './CSS/LogWorkout.css'

const LogWorkout = () => {

    const exercises = [
        {value:"benchPress", label:"Bench Press"},
        {value:"squat", label:"Squat"},
        {value:"deadLift", label:"Deadlift"},
        {value:"triPush", label:"Tricep Pushdown"},
        {value:"dips", label:"Dips"},
        {value:"incPress", label:"Incline Press"},
        {value:"fly", label:"Flys"},
        {value:"rdl", label: "Romanian Deadlift"},
        {value:"lunge", label:"Lunge"},
        {value:"calfRaise", label:"Calf Raise"},
        {value:"hamCurl", label:"Hamstring Curl"},
        {value:"legPress", label:"Leg Press"},
        {value:"latPull", label:"Lat Pulldown"},
        {value:"row", label:"Row"},
        {value:"biCurl", label: "Bicep Curl"},
        {value:"pullUp", label:"Pullup"},
        {value:"pushUp", label:"Pushup"},
        {value:"sitUp", label:"Situp"}
    ];

    const [count, setCount] = useState(0);
    const [message, setMessage] = useState("");
    const [sets, setSets] = useState(0);
    const [reps, setReps] = useState(0);
    const [weight, setWeights] = useState(0);
    const [exercise, setExercise] = useState("");
    const [add, setAdd] = useState([]);

    const logExercise = (e) => {
        /*setExercises([...exercises, e.target.value]);*/
        setCount(count + 1);
        setAdd([...add, [exercise, weight, reps, sets]]);
        console.log(add);
    }

    let typed = exercises.filter(exe => {
        if(message.length > 0){
            if(exe.label.includes(message)){
             return true
            }
        }
    });

    return (
        <div>
            <label htmlFor="Weight">Weight: </label>
            <input type="text" id = "Weight" value={weight} onChange={e => {
                                    setWeights(e.target.value);}}/>

            <label htmlFor="Sets">Sets: </label>
            <input type="text" id = "Sets" value={sets} onChange={e => {
                                    setSets(e.target.value);}}/>

            <label htmlFor="Reps">Reps: </label>
            <input type="text" id = "Reps" value={reps} onChange={e => {
                                    setReps(e.target.value);}}/>
            <br />

            <label htmlFor="search">Search: </label>
            <input type="text" id = "search" value={message} onChange={e => {
                                    setMessage(e.target.value);}}/>

            <label htmlFor="exercise">Exercise:</label>
            <input type="text" value={exercise} id="exercise"/>

            <button onClick={e => logExercise(e)}>Add Exercise</button>
            <ul>
                {typed.map(exe => 
                    <li className="selection">
                        <button onClick={() => setExercise(exe.label)}>{exe.label}</button>
                    </li>
                )}
            </ul>
            <ul>
                {add.map(e => 
                <li>
                    <div className = "exercise">
                        <h2>{e[0]}</h2>
                        <p>Weight: {e[1]}, Reps: {e[2]}, Sets: {e[3]}</p>
                        <br />
                    </div>
                </li>
                )}

            </ul>
        </div>
    );
}

export default LogWorkout;
