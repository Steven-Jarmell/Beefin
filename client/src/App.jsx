import { useState, useEffect } from 'react'
import Profile from './Components/Profile'
import './App.css'
import ViewGroups from './Components/ViewGroups';

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


  const globalGroups = ['element_1', 'global', 'group']
  const myGroups = ['element_1_mygroup', 'my', 'groups']
  return (
    <div className="App">
      <ViewGroups globalGroups={globalGroups} myGroups={myGroups}></ViewGroups>
        {/* <Profile name={data.name} currentPoints={data.points} currentRank={data.rank} color={data.color} currentStreak={data.streak}></Profile> */}
      
    </div>
  )
}

export default App
