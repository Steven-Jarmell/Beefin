import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Landing from "./LandingPage";
import Login from "./LoginPage";
import Register from "./RegisterPage";
import Profile from "./Components/Profile";
import Layout from "./Components/Layout";
import LogWorkout from "./LogWorkout";
import GroupLayout from "./Components/Group/GroupLayout";
import CreateGroupForm from "./Components/Group/CreateGroupForm";
import Group from "./Components/Group/Group";
import PublicProfile from "./Components/PublicProfile";

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
                            <Route path=":email" element={<PublicProfile />} />
                        </Route>
                        <Route path="groups" element={<Layout />}>
                            <Route index element={<GroupLayout />} />
                            <Route path="createGroup" element={<CreateGroupForm />} />
                            <Route path=":id" element={<Group />} />
                        </Route>
                        <Route path="workouts" element={<Layout />}>
                            <Route index element={<LogWorkout />} />
                        </Route>
                    </Route>
                </Routes>
            </Router>
        </>
    );
}

export default App;
