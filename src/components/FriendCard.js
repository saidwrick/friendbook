import React, { useState, useEffect } from "react";
import FriendButtons from "./FriendButtons";

function FriendCard(props) {

    if (!props.friend){
        return (null)
    }
    return (
        <div className="friend-card">
            <span className="friend-card-pic">
                <a className="profile-pic" href={"/profile/"+props.friend._id}>
                    <img src={"https://res.cloudinary.com/dzflnyjtm/image/upload/c_fill,h_200,w_200/"+props.friend.profilePicUrl}></img>
                </a>
            </span>
            <a href ={"/profile/"+props.friend._id}> 
                {props.friend.firstName + " " + props.friend.lastName} 
            </a>
            <div className="friend-card-buttons">
                <FriendButtons userInfo={props.userInfo} friendId={props.friend._id}></FriendButtons>
            </div>
        </div>
    );
}

export default FriendCard;
