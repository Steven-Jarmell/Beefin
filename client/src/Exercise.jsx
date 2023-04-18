import './CSS/Exercise.css'
export default function Exercise({ type, sets, reps, weight }) {
    return(
        <div className="exercise-container">
            <p className="type exercise-button">{type}</p>
            <p className="sets exercise-button">Sets: {sets}</p>
            <p className="reps exercise-button">Reps: {reps}</p>
            <p className="weight exercise-button">Weight: {weight}</p>
        </div>
    )
}
