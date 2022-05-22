import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Profile from "./components/Profile";
import LoginForm from "./components/LoginForm";
import FriendsPage from "./components/FriendsPage"

function App(props) {

    const [userInfo, setUserInfo] = useState([]);

    async function getUserInfo(){
        try {
            let res = await fetch(`/users/${localStorage.userId}`, {
                method: "GET",
                headers: {
                    'Content-type': 'application/json',
                    "Authorization": "Bearer " + localStorage.authToken,
                    "type" : "self"
                },
            });
            
            let resJson = await res.json();
            
            if (res.status === 200) {
                console.log("success");
                console.log(resJson);
                setUserInfo(resJson);
            } 
            else {
                console.log(res.status);
                console.log(resJson);
            }
        } 
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {

        if (!localStorage.authToken) {
            window.location.href="/login"
        }
        getUserInfo();

    }, [])

    return (
        <div className="App">
            <Header userInfo={userInfo}></Header>
            <Routes>
                <Route path="/" element={<HomePage userInfo={userInfo} />} />
                <Route path="*" element={<HomePage userInfo={userInfo} />} />
                <Route path="profile/:id" element={<Profile userInfo={userInfo} />} />
                <Route path="/friends" element={<FriendsPage />} />
            </Routes>
        </div>
    );
}

export default App;
