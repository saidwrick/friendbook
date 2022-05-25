import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { ReactComponent as HomeIcon} from '../icons/home.svg'
import { ReactComponent as FriendsIcon} from '../icons/friends.svg'
import { ReactComponent as NotificationsIcon} from '../icons/notifications.svg'
import { ReactComponent as SettingsIcon} from '../icons/settings.svg'

function Header(props) {

    const currentPage = useParams();

    function logOut() {
        localStorage.clear();
        window.location.reload();
    }

    if (!props.userInfo || !props.userInfo.profilePicUrl){
        return null;
    }

    return (
        <div className="nav-bar-wrapper">
            <div className="nav-bar">
                <div className="nav-bar-left">
                    <a href="/" className="logo">friendbook</a>
                </div>
                <div className="nav-bar-middle">
                    <a className = {(currentPage["*"].split('/')[0] == "") ? "current" : null} href="/">
                    <HomeIcon/>
                    </a>
                    <a className = {(currentPage["*"].split('/')[0] == "friends") ? "current" : null} href="/friends">
                    <FriendsIcon/>
                    </a>
                </div>
                <div className="nav-bar-right">
                    <a href={props.userInfo._id ? "/profile/"+props.userInfo._id : ""} className="profile">
                        <span className="profile-pic">
                            <img src={"https://res.cloudinary.com/dzflnyjtm/image/upload/c_fill,h_100,w_100/"+props.userInfo.profilePicUrl}></img>
                        </span>
                        
                        <div>{props.userInfo.firstName ? props.userInfo.firstName : ""}</div>
                    </a>
                    <span>
                        <svg role="img"><NotificationsIcon fill="black"/></svg>
                    </span>
                    <span onClick={logOut}>
                        <svg role="img"><SettingsIcon/></svg>
                    </span>
                </div>
            
            </div>
        </div>
    );
}

export default Header;
