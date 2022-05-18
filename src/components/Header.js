import React, { useState, useEffect } from "react";
import { ReactComponent as HomeIcon} from '../icons/home.svg'
import { ReactComponent as FriendsIcon} from '../icons/friends.svg'
import { ReactComponent as NotificationsIcon} from '../icons/notifications.svg'
import { ReactComponent as SettingsIcon} from '../icons/settings.svg'

function Header(props) {
    return (
        <div className="nav-bar">
            <div className="left">
                <div className="logo">friendbook</div>
            </div>
            <div className="middle">
                <a href="/">
                    <span>
                    <svg role="img"><HomeIcon/></svg>
                    </span>
                </a>
                <a href="/friends">
                    <span>
                        <svg role="img"><FriendsIcon/></svg>
                    </span>
                </a>
            </div>
            <div className="right">
                <div className="profile">
                    <span></span>
                    <div>Name</div>
                </div>
                <span>
                    <svg role="img"><NotificationsIcon fill="black"/></svg>
                </span>
                <span>
                    <svg role="img"><SettingsIcon/></svg>
                </span>
            </div>
        
        </div>
    );
}

export default Header;
