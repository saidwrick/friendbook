import React, { useState, useEffect } from "react";

function SignUpForm(props) {

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [password, setPassword] = useState("");

    async function handleSignUp(e) {
        e.preventDefault();
        try {
            let res = await fetch("/signup", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        email: email,
                        password: password,
                        firstName: firstName,
                        lastName: lastName,
                        birthday: birthday
                    }
                ),
            });
            
            let resJson = await res.json();
            
            if (res.status === 200) {
                props.signUpSuccess();
                console.log("User signed up successfully");
            } 
            else {
                console.log(res.status);
                console.log(resJson);
            }
        } 
        catch (err) {
            console.log(err);
        }
    };
    
    return (
        <div className="sign-up-overlay">
            <div className="sign-up-container">
                <div className="sign-up-header">
                    Sign up
                    <button onClick={props.toggle}>X</button>
                </div>
                <form id="signup" onSubmit={handleSignUp}>
                    <input required placeholder="First name" value={firstName} onChange={(e)=> setFirstName(e.target.value)} ></input>
                    <input required placeholder="Last name" value={lastName} onChange={(e)=> setLastName(e.target.value)}></input>
                    <input required placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)}></input>
                    <input required type="password" placeholder="New password" value={password} onChange={(e)=> setPassword(e.target.value)}></input>
                    <label htmlFor="birthday">Birthday</label>
                    <input required id="birthday" type="date" value={birthday} onChange={(e)=> setBirthday(e.target.value)}></input>
                </form>
                <button form="signup" type="submit">Sign Up</button>
            </div>
        </div>
    );
}

export default SignUpForm;
