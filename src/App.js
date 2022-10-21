import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate} from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Profile from "./components/Profile";
import FriendsPage from "./components/FriendsPage"
import ErrorPage from "./components/ErrorPage"

function App(props) {

    const [userInfo, setUserInfo] = useState([]);
    const [errorMsg, setErrorMsg] = useState("");
    const [errorPage, setErrorPage] = useState(false);
    const api = process.env.REACT_APP_API_URL

    const navigate = useNavigate();

    function openErrorPage(msg = ""){
        setErrorMsg(msg);
        setErrorPage(true);
    }

    const getUserInfo = async function() {
        try {
            let res = await fetch(api + `/users/${localStorage.userId}`, {
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
                resJson.refresh = getUserInfo;
                setUserInfo(resJson);
            } 
            else {
                console.log(res.status);
                console.log(resJson);
                throw res
            }
        } 
        catch (err) {
            console.log(err);
            openErrorPage("Internal server error");
        }
    }

    useEffect(() => {
        if (!localStorage.authToken) {
            navigate("/login");
        }
        else {
            getUserInfo();
        }
    }, [])

    if (!localStorage.authToken){
        return null;
    }

    if (errorPage) {
        return <ErrorPage err={errorMsg}></ErrorPage>
    }

    return (
        <div className="App">
            <Header userInfo={userInfo}></Header>
            <Routes>
                <Route path="/" element={<HomePage userInfo={userInfo} />} />
                <Route path="*" element={<ErrorPage err={"404 Page not found"} />} />
                <Route path="profile/:id" element={<Profile userInfo={userInfo} />} />
                <Route path="/friends" element={<FriendsPage userInfo={userInfo}/>} />
            </Routes>
        </div>
    );
}

export default App;
