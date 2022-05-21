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
    return (
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
                <div className="profile">
                    <span></span>
                    <div>Name</div>
                </div>
                <span>
                    <svg role="img"><NotificationsIcon fill="black"/></svg>
                </span>
                <span onClick={logOut}>
                    <svg role="img"><SettingsIcon/></svg>
                </span>
            </div>
        
        </div>
    );
}

export default Header;
