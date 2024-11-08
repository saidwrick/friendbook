import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import App from "./App";
import LoginForm from "./components/LoginForm";
import ErrorPage from "./components/ErrorPage";
import Health from "./components/Health";
import jwtDecode from "jwt-decode";

const RouteSwitch = () => {

    // loading screen only if server hasn't been used for 14 mins
    const [loading, setLoading] = useState(
       Date.now() - localStorage.lastLog >= 840000 || !localStorage.lastLog ? true : false
    );

    const api = process.env.REACT_APP_API_URL

    // to wake up api on initial load (free service goes to sleep after inactivity)
    async function queryApi() {
        try {
            let res = await fetch(api)
            setLoading(false);
            localStorage.lastLog = Date.now();
        }
        catch {
            alert("error, try again")
        }
    }

//if token is expired or uId/token missing
    useEffect(() => {
        if (!(localStorage.userId && localStorage.authToken) || 
        Date.now() >= jwtDecode(localStorage.authToken).exp*1000){ 
            localStorage.clear();
        }
    }, []);

    useEffect(() => {
        if (loading){
            queryApi();
        }
    },[]);

    if (loading){
        return (
            <div className="loading">
                <img src={require("./icons/loader.gif")}></img>
                <h2>server is waking up, initial load may take a minute...</h2>
                <h3>if it's taking too long... you can check out one of my other projects here: <a href="http://storeify.netlify.app/">http://storeify.netlify.app/</a></h3>
            </div>
        )
    }

    return (
        <BrowserRouter>
                <Routes>
                    <Route path="/404" element={<ErrorPage />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/health" element={<Health />} />
                    <Route path="/*" element={<App />} />
                </Routes>
        </BrowserRouter>
    );
};

export default RouteSwitch;