import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import App from "./App";
import LoginForm from "./components/LoginForm";
import ErrorPage from "./components/ErrorPage";
import jwtDecode from "jwt-decode";

const RouteSwitch = () => {


    useEffect(() => {
        if (false) //if token is expired or uId/token missing
            localStorage.clear();
    }, [])

    return (
        <BrowserRouter>
                <Routes>
                    <Route path="/404" element={<ErrorPage />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/*" element={<App />} />
                </Routes>
        </BrowserRouter>
    );
};

export default RouteSwitch;