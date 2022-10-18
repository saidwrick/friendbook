import React, { useState, useEffect } from "react";
import { ReactComponent as CloseIcon} from '../icons/close.svg'
import ErrorPage from "./ErrorPage";

function SignUpForm(props) {

    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [password, setPassword] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [expandError, setExpandError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [errorPage, setErrorPage] = useState(false);

    const api = process.env.REACT_APP_API_URL

    function openErrorPage(msg = null){
        setErrorMsg(msg);
        setErrorPage(true);
    }

    async function signUp(imgUrl) {
        setExpandError(false);
        try {
            let res = await fetch(api + "/signup", {
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
                        birthday: birthday + "T00:00",
                        profilePicUrl: (imgUrl ? imgUrl : "friendbook/profiles/kfgsezi8aione4yvwgb3")
                    }
                ),
            });
            
            let resJson = await res.json();
            
            if (res.status === 200) {
                props.signUpSuccess();
                console.log("User signed up successfully");
            }
            else if (res.status === 400) {
                setErrorMsg(resJson);
                setExpandError(true);
            }
            else {
                console.log(res.status);
                console.log(resJson);
                throw "Internal server error";
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
    };

    async function uploadImg(){
        const data = new FormData();
        data.append("file", selectedFile);
        data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
        data.append("cloud_name", "dzflnyjtm")

        try {
            let res = await fetch("https://api.cloudinary.com/v1_1/dzflnyjtm/image/upload", {
                method: "POST",
                body: data
            });
            let resJson = await res.json();
            console.log("img uploaded");
            return(resJson.public_id);
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

    async function handleSignUp(e){
        e.preventDefault();
        console.log(selectedFile);
        if (selectedFile){
            const imgUrl = await uploadImg();
            signUp(imgUrl);
        }
        else {
            signUp();
        }
    }

    if (errorPage) {
        return <ErrorPage err={errorMsg}></ErrorPage>
    }
    
    return (
        <div className="sign-up-overlay" onClick={props.toggle}>
            <div className="sign-up-container" onClick={e=>e.stopPropagation()}>
                <div className="sign-up-header">
                    Sign up
                    <button onClick={props.toggle}><CloseIcon/></button>
                </div>
                {expandError? 
                    <p className="error">{errorMsg}</p>
                :null}
                <form id="signup" onSubmit={handleSignUp}>
                    <input required placeholder="First name" value={firstName} onChange={(e)=> setFirstName(e.target.value)} ></input>
                    <input required placeholder="Last name" value={lastName} onChange={(e)=> setLastName(e.target.value)}></input>
                    <input required placeholder="Email" type="email" value={email} onChange={(e)=> setEmail(e.target.value)}></input>
                    <input required type="password" placeholder="New password" value={password} onChange={(e)=> setPassword(e.target.value)}></input>
                    <label htmlFor="birthday">Birthday</label>
                    <input required id="birthday" type="date" value={birthday} onChange={(e)=> setBirthday(e.target.value)}></input>
                    <label htmlFor="file">Upload Profile Picture (optional)</label>
                    <input id="file" type="file" onChange={(e)=>setSelectedFile(e.target.files[0])}></input>
                </form>
                <button form="signup" type="submit">Sign Up</button>
            </div>
        </div>
    );
}

export default SignUpForm;
