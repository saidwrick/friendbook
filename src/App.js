import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Profile from "./components/Profile";
import LoginForm from "./components/LoginForm";

function App(props) {

    if (!localStorage.authToken) {
        return <Navigate to="/login" replace />;
    }
    return (
        <div>
            <Header></Header>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<HomePage />} />
                <Route path="profile/:id" element={<Profile />} />
            </Routes>
        </div>
    );
}

export default App;
