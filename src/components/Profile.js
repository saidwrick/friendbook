import React, { useState, useEffect } from "react";
import ProfilePosts from "./ProfilePosts";
import { useParams, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import FriendButtons from "./FriendButtons";

function Profile(props) {

    const [profileData, setProfileData] = useState("");
    const {id} = useParams();
    const [friendCount, setFriendCount] = useState(" friends");
    const navigate = useNavigate();

    async function getProfileData (){
        try {
            let res = await fetch(`/users/${id}`, {
                method: "GET",
                headers: {
                    'Content-type': 'application/json',
                    "Authorization": "Bearer " + localStorage.authToken,
                    "type" : "general"
                },
            });
            
            let resJson = await res.json();
            
            if (res.status === 200) {
                console.log("success");
                console.log(resJson);
                setProfileData(resJson);
                countFriends(resJson.friends);
            } 
            else {
                console.log(res.status);
                console.log(resJson);
                navigate("/");
            }
        } 
        catch (err) {
            console.log(err);
        }
    }

    function countFriends (array) {
        if (array==null){
            setFriendCount("0 friends");
        }
        else if (array.length == 1) {
            setFriendCount("1 friend");
        }
        else {
            setFriendCount(array.length + " friends")
        }
    }


    useEffect(() => {
        getProfileData();

    },[])

    return (
        <div className="profile-page">
            <div className="profile-page-header">
                <div className="profile-page-header-wrapper">
                    <span></span>
                    <div className="profile-page-details">
                        <h1>{profileData.firstName} {profileData.lastName}</h1>
                        <p>{friendCount}</p>
                    </div>

                    <FriendButtons userInfo={props.userInfo} friendId={id}></FriendButtons>
                </div>
                <div className="profile-nav-bar">
                    <a className="selected">Posts</a>
                    <a>Friends</a>
                </div>
            </div>
            <ProfilePosts profileData={profileData} userInfo={props.userInfo}></ProfilePosts>
        </div>
    );
}

export default Profile;