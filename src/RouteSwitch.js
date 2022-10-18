import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import App from "./App";
import LoginForm from "./components/LoginForm";
import ErrorPage from "./components/ErrorPage";
import jwtDecode from "jwt-decode";

const RouteSwitch = () => {

    const [loading, setLoading] = useState(true);

    const api = process.env.REACT_APP_API_URL

    // to wake up api on initial load (free service goes to sleep after inactivity)
    async function queryApi() {
        try {
            let res = await fetch(api + "/login", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        email: "a",
                        password: "a"
                    }
                ),
            });
            setLoading(false);
        }
        catch {
            setLoading(false);
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
        queryApi();
    },[]);

    if (loading){
        return (
            <div className="loading">
                <img src={require("./icons/loader.gif")}></img>
                <h2>server is waking up, initial load may take a minute...</h2>
            </div>
        )
    }

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