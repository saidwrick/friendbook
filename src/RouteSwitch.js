import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import App from "./App";
import LoginForm from "./components/LoginForm";
import jwtDecode from "jwt-decode";

const RouteSwitch = () => {

    useEffect(() => {
        if (false) //if token is expired
            localStorage.clear();
    }, [])

    return (
        <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/*" element={<App />} />
                </Routes>
        </BrowserRouter>
    );
};

export default RouteSwitch;