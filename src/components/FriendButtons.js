import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUpForm from "./SignUpForm";

function FriendButtons(props) {

    const [expandButton, setExpandButton] = useState(false);

    async function handleButtonClick(e, action) {
        e.preventDefault();
        try {
            let res = await fetch("http://localhost:3001/users/" + props.friendId + "/friend-actions", {
                method: "PUT",
                headers: {
                    'Content-type': 'application/json',
                    "Authorization": "Bearer " + localStorage.authToken
                },
                body: JSON.stringify(
                    {
                        type: action
                    }
                ),
            });
            
            let resJson = await res.json();
            
            if (res.status === 200) {
                console.log("success");
                props.userInfo.refresh();
                setExpandButton(false);

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

    function handleExpandButtonClick() {
        setExpandButton(!expandButton);
    }
  
    if ( !props.friendId || !props.userInfo.recievedRequestFriends){
        return null;
    }
    
    if (props.userInfo._id == props.friendId){
        return null
    }
    console.log(props.userInfo);
    //Recieved Request
    if (props.userInfo.recievedRequestFriends.indexOf(props.friendId) >= 0){
        return (
            <div className="friend-button">
                <button className="respond" onClick={handleExpandButtonClick}>Respond
                </button>
                {expandButton ? 
                    <div className="expanded">
                        <button className="confirm" 
                            onClick={(e) => handleButtonClick(e, "accept")}>Confirm Friend Request
                        </button> 
                        <button className="deny"
                            onClick={(e) => handleButtonClick(e, "deny")}>Delete Friend Request
                        </button> 
                    </div>
                    : null}
            </div>
        );
    }

    //Sent Request
    if (props.userInfo.sentRequestFriends.indexOf(props.friendId) >= 0){
        return (
            <div className="friend-button">
                <button className="requested" onClick={handleExpandButtonClick}>Request Sent
                </button>
                {expandButton ?
                    <div className="expanded"> 
                        <button className="requested-cancel"
                            onClick={(e) => handleButtonClick(e, "cancel")}>Cancel Friend Request
                        </button>
                    </div> 
                    : null}
            </div>
        );
    }

    //Friends
    if (props.userInfo.friends.indexOf(props.friendId) >= 0){
        return (
            <div className="friend-button">
                <button className="friends" onClick={handleExpandButtonClick}>Friends
                </button>
                {expandButton ?
                    <div className="expanded">
                        <button className="friends-unfriend"
                            onClick={(e) => handleButtonClick(e, "delete")}>Unfriend
                        </button> 
                    </div>
                    : null}
            </div>
        );
    }

    //Not Friends
    return (
        <div className="friend-button">
            <button className="not-friends"
                onClick={(e) => handleButtonClick(e, "request")}>Add Friend</button>
        </div>
    );
}

export default FriendButtons;
