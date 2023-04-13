import { useState } from "react";
import './CSS/Exercise.css'
export default function Exercise({ type, sets, reps, weight }) {
    return(
        <div>
            <span className="bar">
            <button className="type">{type}</button>
            <button className="sets">Sets: {sets}</button>
            <button className="reps">Reps: {reps}</button>
            <button className="weight">Weight: {weight}</button>
            </span>
        </div>
    );
}
