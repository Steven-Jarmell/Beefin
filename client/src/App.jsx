import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Landing from "./LandingPage";
import Login from "./LoginPage";
import Register from "./RegisterPage";
import Profile from "./Components/Profile";
import Layout from "./Components/Layout";
import LogWorkout from "./LogWorkout";
import NavBar from "./Components/navbar";
import GroupLayout from "./Components/Group/GroupLayout";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/">
                        <Route index element={<Landing />} />
                        <Route path="login" element={<Login />} />
                        <Route path="log-workouts" element={<LogWorkout />} />
                        {/* <Route path="view-groups" element={<ViewGroups />} /> */}
                        <Route path="register" element={<Register />} />
                        <Route path="profile" element={<Layout />}>
                            <Route index element={<Profile />} />
                            {/* Add create/join group, see groups, workouts page routes here */}
                            <Route path="groups" element={<GroupLayout />} />
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;
