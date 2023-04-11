import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css'
import Landing from './LandingPage';
import Login from './LoginPage';
import Register from './RegisterPage';

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
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/join-group" element={<ViewGroups globalGroups={globalGroups} myGroups={myGroups} />} />
          </Routes>
      </Router>
    </div>
  )
}

export default App
