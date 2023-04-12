import { useEffect, useState } from "react";
import './CSS/LogWorkout.css'
//import Exercise from "./Exercise";

const LogWorkout = () => {

    const exercises = [
        {value:"benchPress", label:"Bench Press", compound:true},
        {value:"squat", label:"Squat", compound:true},
        {value:"deadLift", label:"Deadlift", compound:true},
        {value:"triPush", label:"Tricep Pushdown", compound:false},
        {value:"dips", label:"Dips" , compound:false},
        {value:"incPress", label:"Incline Press" , compound:true},
        {value:"fly", label:"Flys" , compound:false},
        {value:"rdl", label: "Romanian Deadlift", compound:true},
        {value:"lunge", label:"Lunge", compound:true},
        {value:"calfRaise", label:"Calf Raise", compound:false},
        {value:"hamCurl", label:"Hamstring Curl", compound:false},
        {value:"legPress", label:"Leg Press", compound:false},
        {value:"latPull", label:"Lat Pulldown", compound:false},
        {value:"row", label:"Row", compound:true},
        {value:"biCurl", label: "Bicep Curl", compound:false},
        {value:"pullUp", label:"Pullup", compound:true},
        {value:"pushUp", label:"Pushup", compound:true},
        {value:"sitUp", label:"Situp", compound:false}
    ];

    const [count, setCount] = useState(0);
    const [message, setMessage] = useState("");
    const [sets, setSets] = useState(0);
    const [reps, setReps] = useState(0);
    const [weight, setWeights] = useState(0);
    const [exercise, setExercise] = useState("");
    const [add, setAdd] = useState([]);
    const [date, setDate] = useState(new Date());
    const [points, setPoints] = useState(0);
    const [comp, setComp] = useState(false);

    const logExercise = (e) => {
        e.preventDefault();
        let mult = 1;
        if(comp) mult = 1.5;
        /*setExercises([...exercises, e.target.value]);*/
        if(exercise.length > 0){
            setCount(count + 1);
            setPoints(points + weight * reps * sets * mult);
            setAdd([...add, [exercise, weight, reps, sets]]);
        }
    }

    let typed = exercises.filter(exe => {
        if(message.length > 0){
            if(exe.label.includes(message)){
             return true
            }
        }
    });

    const dater = (i) => {
        let d = date;
        if(i != -1){
            d.setTime(d.getTime() + 1000 * 60 * 60 * 24);
        }
        else{
            d.setTime(d.getTime() - 1000 * 60 * 60 * 24);
        }
        
        /*
            Add the backend stuff
        */

        setDate(d);
        console.log(date);
        setCount(count + 1);
    }


    return (
        <div>
            <button id="prev" onClick={() => dater(-1)}>Previous Day</button>
            <span id="date">{date.toUTCString().substring(0, 17)}</span>
            <button id="next" onClick={() => dater(1)}>Next Day</button>
            <br />

            <label htmlFor="Weight">Weight: </label>
            <input type="text" id = "Weight" value={weight} onChange={e => {
                                    setWeights(e.target.value);}}/>

            <label htmlFor="Sets">Sets: </label>
            <input type="text" id = "Sets" value={sets} onChange={e => {
                                    setSets(e.target.value);}}/>

            <label htmlFor="Reps">Reps: </label>
            <input type="text" id = "Reps" value={reps} onChange={e => {
                                    setReps(e.target.value);}}/>

            <label htmlFor="search">Search: </label>
            <input type="text" id = "search" value={message} onChange={e => {
                                    setMessage(e.target.value);}}/>

            <label htmlFor="exercise">Exercise:</label>
            <input type="text" value={exercise} id="exercise"/>

            <button onClick={e => logExercise(e)}>Add Exercise</button>
            <ul>
                {typed.map(exe => 
                    <li className="selection">
                        <button onClick={() => {
                            setExercise(exe.label);
                            setComp(exe.compound);
                            }}>{exe.label}</button>
                    </li>
                )}
            </ul>
            <ul>
                {add.map(e => 
                <li>
                    <Exercise type={e[0]} weight={e[1]} reps={e[2]} sets={e[3]} />
                </li>
                )}

            </ul>
            <button className="points">{points}</button>
        </div>
    );
}

export default LogWorkout;