import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUpForm from "./SignUpForm";

function LoginForm(props) {

    const [OpenSignUpForm, setOpenSignUpForm] = useState(false);
    const [signUpSuccessMsg, setSignUpSuccessMsg] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function signUpSuccess() {
        setOpenSignUpForm(false);
        setSignUpSuccessMsg("*Sign up success! Please login.");
    }

    function toggleSignUpForm(e) {
        e.preventDefault();
        setOpenSignUpForm(!OpenSignUpForm);
    }

    async function handleLogin(e) {
        e.preventDefault();
        try {
            let res = await fetch("/login", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        email: email,
                        password: password,
                    }
                ),
            });
            
            let resJson = await res.json();
            
            if (res.status === 200) {
                console.log("success");
                localStorage.authToken = resJson.token;
                localStorage.userId = resJson.userId;
                window.location.reload();
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

    async function demoLogin(e) {
        e.preventDefault();
        try {
            let res = await fetch("/login", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        email: "john@john.com",
                        password: "john",
                    }
                ),
            });
            
            let resJson = await res.json();
            
            if (res.status === 200) {
                console.log("success");
                localStorage.authToken = resJson.token;
                localStorage.userId = resJson.userId;
                window.location.reload();
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

    if (localStorage.authToken) {
        return <Navigate to="/" replace />;
    }
    return (
        <div className="login-page">
            {OpenSignUpForm ? <SignUpForm toggle={toggleSignUpForm} signUpSuccess={signUpSuccess}></SignUpForm> : null}
            <div className="login-page-container">
                <div className="login-page-left">
                    friendbook
                </div>
                <div className="login-page-right">
                    <div className="login-form">
                        {signUpSuccessMsg ? <p className="success">{signUpSuccessMsg}</p> : null}
                        <form onSubmit={handleLogin}>
                            <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                            <button>Log In</button>
                        </form>
                        <button onClick={toggleSignUpForm}> Create new account</button>
                        <button className="demo" onClick={demoLogin}>Demo</button>

                    </div>
                </div>
            </div>
        </div>

    );
}

export default LoginForm;
