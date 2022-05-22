import React, { useState, useEffect } from "react";

function FriendCard(props) {

    return (
        <div className="friend-card">
            <div className="friend-card-pic"></div>
            <a href ={props.user._id ? "/profile/"+props.user._id : "/"}> 
                {props.user.firstName ? props.user.firstName + " " : ""} 
                {props.user.lastName ? props.user.lastName : ""}
            </a>
            <div className="friend-card-buttons">
                <button className="add">Add Friend</button>
                <button className="delete">Delete</button>
            </div>
        </div>
    );
}

export default FriendCard;
