import React from 'react';
import { useState, useEffect } from 'react'
import Profile from './Components/Profile'
import './App.css'
import ViewGroups from './Components/ViewGroups';
import SingleGroup from './Components/SingleGroup';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';


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
  const members =['pratham', 'jim', 'steven', 'jon', 'stephen', 'pratham', 'jim', 'steven', 'jon', 'stephen']
  return (
    <div>
      <Router>
          <Routes>
            <Route path="/" element={<Profile name={data.name} currentPoints={data.points} currentRank={data.rank} color={data.color} currentStreak={data.streak} />} />
            <Route path="/join-group" element={<ViewGroups globalGroups={globalGroups} myGroups={myGroups} />} />
          </Routes>
      </Router>
      {/* <ViewGroups globalGroups={globalGroups} myGroups={myGroups}></ViewGroups> */}
    </div>
    // <div className="App">
    //   {/* <ViewGroups globalGroups={globalGroups} myGroups={myGroups}></ViewGroups> */}
    //     {/* <Profile name={data.name} currentPoints={data.points} currentRank={data.rank} color={data.color} currentStreak={data.streak}></Profile> */}
    //   <SingleGroup members={members}></SingleGroup>
    // </div>
  )
}

export default App
