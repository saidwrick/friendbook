import React, { useState } from "react";
import { Navigate} from "react-router-dom";
import SignUpForm from "./SignUpForm";
import ErrorPage from "./ErrorPage";

function LoginForm(props) {

    const [OpenSignUpForm, setOpenSignUpForm] = useState(false);
    const [signUpSuccessMsg, setSignUpSuccessMsg] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [expandError, setExpandError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [errorPage, setErrorPage] = useState(false);

    const api = process.env.REACT_APP_API_URL

    function openErrorPage(msg = ""){
        setErrorMsg(msg);
        setErrorPage(true);
    }

    function signUpSuccess() {
        setOpenSignUpForm(false);
        setSignUpSuccessMsg("Sign up success! Please login.");
    }

    function toggleSignUpForm(e) {
        e.preventDefault();
        setOpenSignUpForm(!OpenSignUpForm);
    }

    async function handleLogin(e) {
        e.preventDefault();
        setExpandError(false);
        try {
            let res = await fetch(api + "/login", {
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
            console.log(res)
            let resJson = await res.json();
            
            if (res.status === 200) {
                console.log("success");
                localStorage.authToken = resJson.token;
                localStorage.userId = resJson.userId;
                window.location.reload();
            } 
            else if (res.status === 401){
                console.log(resJson.message)
                setErrorMsg(resJson.message)
                setExpandError(true);
            }
            else {
                console.log(res.status);
                throw "Internal server error"
            }
        } 
        catch (err) {
            console.log(err);
            if (err instanceof SyntaxError){
                openErrorPage("Internal server error");
            }
            else {
                openErrorPage(err);
            } 
        }
    }

    async function demoLogin(e) {
        e.preventDefault();
        try {
            let res = await fetch(api + "/login", {
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
                throw "Internal server error"
            }
        } 
        catch (err) {
            console.log(err);
            if (err instanceof SyntaxError){
                openErrorPage("Internal server error");
            }
            else {
                openErrorPage(err);
            } 
        }
    }

    if (localStorage.authToken) {
        return <Navigate to="/" replace />;
    }

    if (errorPage) {
        return <ErrorPage err={errorMsg}></ErrorPage>
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
                        {expandError ? 
                            <p className="error">{errorMsg}</p> 
                        : null}
                        {signUpSuccessMsg ? 
                            <p className="success">{signUpSuccessMsg}</p> 
                        : null}
                        <form onSubmit={handleLogin}>
                            <input required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                            <input required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
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