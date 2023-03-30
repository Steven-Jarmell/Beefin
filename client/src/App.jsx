import { useState, useEffect } from 'react'
import Profile from './Components/Profile'
import './App.css'

function App() {
  const [data,setData]=useState([]);
  const getData=()=>{
    fetch('data.json')
      .then(function(response){
        console.log(response)
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
        setData(myJson)
      });
  }
  useEffect(()=>{
    getData()
  },[])



  return (
    <div className="App">
      
        <Profile name={data.name} currentPoints={data.points} currentRank={data.rank} color={data.color} currentStreak={data.streak}></Profile>
      
    </div>
  )
}

export default App
