import React, { useState, useEffect } from "react";
import FriendButtons from "./FriendButtons";

function FriendCard(props) {

    if (!props.friend){
        return (null)
    }
    return (
        <div className="friend-card">
            <div className="friend-card-pic"></div>
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
