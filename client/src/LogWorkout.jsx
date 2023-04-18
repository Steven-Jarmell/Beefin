import { useEffect, useState } from "react";
import "./CSS/LogWorkout.css";
import Exercise from "./Exercise";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const LogWorkout = () => {
    const [count, setCount] = useState(0);
    const [message, setMessage] = useState("");
    const [sets, setSets] = useState(0);
    const [reps, setReps] = useState(0);
    const [weight, setWeights] = useState(0);
    const [exercise, setExercise] = useState([]);
    const [add, setAdd] = useState([]);
    const [date, setDate] = useState(new Date());
    const [points, setPoints] = useState(0);
    const [comp, setComp] = useState(false);
    const [ide, setId] = useState(0);
    const [allExercises, setAllExercises] = useState([]);
    const [userWorkoutData, setUserWorkoutData] = useState();
    const [userExercises, setUserExercises] = useState([]);
    const [userPoints, setUserPoints] = useState(0);

    const navigate = useNavigate();

    //Runs on intial load in
    useEffect(() => {
        // Get all exercises
        let token = sessionStorage.getItem("token");

        if (!token) return;

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };

        fetch("http://localhost:8080/api/exercises", requestOptions)
            .then((response) => response.json())
            .then((result) => setAllExercises(result))
            .catch((error) => console.log(error));

        // Get user
        const decoded = jwtDecode(token);

        const userEmail = decoded.sub;

        fetch(
            `http://localhost:8080/api/users?email=${userEmail}`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                if (result[0]) {
                    //console.log(result[0].workoutsCompleted);
                    setUserWorkoutData(result[0].workoutsCompleted);
                    setUserPoints(result[0].pointsEarned);
                }
            })
            .catch((error) => console.log("error", error));
    }, []);

    //Ran when an exercise is added, update workout for the date
    const logExercise = (e) => {
        let mult = 1;
        if (comp) mult = 1.5;

        if (exercise.length > 0) {
            setCount(count + 1);
            setId(ide + 1);

            console.log(ide);
            let p = (weight * reps * sets * mult) / 100;
            setPoints(points + p);
            setAdd([...add, [exercise, weight, reps, sets, comp, ide, p]]);
        }
    };

    //Produces exercise options based on user input
    let typed = allExercises.filter((exe) => {
        if (message.length > 0) {
            if (exe.name.startsWith(message)) {
                return true;
            }
        }
    });

    //Changes date and updates list of exercies
    const dater = (i) => {
        let d = date;

        if (i == 1) {
            d.setTime(d.getTime() + 1000 * 60 * 60 * 24);
        } else if (i == -1) {
            d.setTime(d.getTime() - 1000 * 60 * 60 * 24);
        }

        setDate(d);
        setCount(count + 1);
    };

    let canAddExercise = [weight, sets, reps, exercise.length].every(Boolean);
    let canAddWorkout = add.length > 0;

    const submitWorkout = () => {
        let token = sessionStorage.getItem("token");

        if (!token) return;

        const id = sessionStorage.getItem("userID");

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");

        // Create the exerciseList to add
        const formattedExerciseList = add.map((exercise, i) => {
            return {
                name: exercise[0],
                compoundLift: exercise[4],
                numSets: exercise[3],
                numRepsPerSet: exercise[2],
                averageWeight: exercise[1],
            };
        });

        const month =
            date.getMonth() >= 10
                ? date.getMonth() + 1
                : "0" + (date.getMonth() + 1);
        const day =
            date.getDate() >= 10
                ? date.getDate()
                : "0" + (date.getDate() + 1);
        const dateAsString = date.getFullYear() + "-" + month + "-" + day;

        const raw = JSON.stringify({
            id: id,
            pointsEarned: Number(userPoints + points),
            workoutCompleted: {
                workoutDate: dateAsString,
                exerciseList: formattedExerciseList,
            },
        });

        console.log({
            id: id,
            pointsEarned: Number(userPoints + points),
            workoutCompleted: {
                workoutDate: dateAsString,
                exerciseList: formattedExerciseList,
            },
        });

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            redirect: "follow",
            body: raw,
        };
        fetch("http://localhost:8080/api/users", requestOptions)
            .then((response) => response.text())
            .then((response) => navigate("/profile"))
            .catch((error) => console.log("error", error));
    };

    let currentWorkoutShown = () => {
        let todaysWorkout;

        if (!userWorkoutData) return;

        for (let i = userWorkoutData.length - 1; i >= 0; i--) {
            // Javascript does not like hyphens
            const currentWorkoutDate = new Date(
                userWorkoutData[i].workoutDate
                    .slice(0, userWorkoutData[i].workoutDate.indexOf("T"))
                    .replaceAll("-", "/")
            );
            currentWorkoutDate.setHours(0, 0, 0, 0);
            date.setHours(0,0,0,0);
            if (date.getTime() === currentWorkoutDate.getTime()) {
                console.log(userWorkoutData[i]);
                return userWorkoutData[i];
            }
        }
        return todaysWorkout;
    };

    let workoutOfTheDay = currentWorkoutShown();

    return (
        <div className="logger">
            <button id="prev" onClick={() => dater(-1)}>
                Previous Day
            </button>
            <span id="date">{date.toUTCString().substring(0, 17)}</span>
            <button id="next" onClick={() => dater(1)}>
                Next Day
            </button>
            <div className="logger-body-container">
                <div className="add-workout-container">
                    <p className="logworkout-title">Add Exercise</p>
                    <div>
                        <label htmlFor="Weight" className="logworkout-label">
                            Weight:
                        </label>
                        <input
                            type="text"
                            id="Weight"
                            className="logworkout-input"
                            value={weight}
                            onChange={(e) => {
                                setWeights(e.target.value);
                            }}
                        />
                    </div>

                    <div>
                        <label htmlFor="Sets" className="logworkout-label">
                            Sets:{" "}
                        </label>
                        <input
                            type="text"
                            id="Sets"
                            className="logworkout-input"
                            value={sets}
                            onChange={(e) => {
                                setSets(e.target.value);
                            }}
                        />
                    </div>

                    <div>
                        <label htmlFor="Reps" className="logworkout-label">
                            Reps:{" "}
                        </label>
                        <input
                            type="text"
                            id="Reps"
                            className="logworkout-input"
                            value={reps}
                            onChange={(e) => {
                                setReps(e.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="search" className="logworkout-label">
                            Search:{" "}
                        </label>
                        <input
                            type="text"
                            id="search"
                            className="logworkout-input"
                            value={message}
                            onChange={(e) => {
                                setMessage(e.target.value);
                            }}
                        />
                    </div>

                    <div>
                        <label htmlFor="exercise" className="logworkout-label">
                            Exercise:
                        </label>
                        <input
                            type="text"
                            value={exercise}
                            id="exercise"
                            readOnly={true}
                            className="logworkout-input"
                        />
                    </div>

                    <button
                        onClick={(e) => logExercise(e)}
                        disabled={!canAddExercise || workoutOfTheDay !== undefined}
                        className="add-exercise-button"
                    >
                        Add Exercise
                    </button>
                    <ul className="logworkout-list">
                        {typed.map((exe, i) => (
                            <li className="selection" key={i}>
                                <button
                                    onClick={() => {
                                        setExercise(exe.name);
                                        setComp(exe.compound);
                                    }}
                                >
                                    {exe.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <button
                        className="points"
                        disabled={!canAddWorkout || workoutOfTheDay !== undefined}
                        onClick={() => {
                            submitWorkout();
                        }}
                    >
                        Add Workout
                    </button>
                </div>
                <div className="workout-items-container">
                    <p className="logworkout-title">Workout List</p>
                    {workoutOfTheDay === undefined && <p>Total Points: {points}</p>}
                    <ul>
                        {workoutOfTheDay
                            ? (
                                workoutOfTheDay.exerciseList.map((exercise, i) => (
                                    <li className="lister" key={i}>
                                      <Exercise
                                          className="exe"
                                          type={exercise.name}
                                          weight={exercise.averageWeight}
                                          reps={exercise.numRepsPerSet}
                                          sets={exercise.numSets}
                                      />

                                  </li>
                                ))
                            )
                            : add.map((e) => (
                                  <li className="lister">
                                      <Exercise
                                          className="exe"
                                          type={e[0]}
                                          weight={e[1]}
                                          reps={e[2]}
                                          sets={e[3]}
                                      />
                                      <button
                                          className="sub"
                                          onClick={() => {
                                              setAdd(
                                                  add.filter(
                                                      (a) => a[5] !== e[5]
                                                  )
                                              );
                                              setPoints(points - e[6]);
                                          }}
                                      >
                                          -
                                      </button>
                                  </li>
                              ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default LogWorkout;
