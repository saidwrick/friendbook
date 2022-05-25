import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { ReactComponent as HomeIcon} from '../icons/home.svg'
import { ReactComponent as FriendsIcon} from '../icons/friends.svg'
import { ReactComponent as NotificationsIcon} from '../icons/notifications.svg'
import { ReactComponent as SettingsIcon} from '../icons/settings.svg'

function Header(props) {

    const [expandSettings, setExpandSettings] = useState(false);
    const [expandNotifications, setExpandNotifications] = useState(false);
    const currentPage = useParams();

    function logOut() {
        localStorage.clear();
        window.location.reload();
    }

    function handleSettingsClick(e){
        e.stopPropagation();
        // to close settings menu if click outside
        if (!expandSettings){
            function closeSettings (e) {
                e.stopPropagation();
                setExpandSettings(false);
                document.removeEventListener("click", closeSettings);
            }
            document.addEventListener("click", closeSettings);
        }
        setExpandSettings(!expandSettings);
    }

    function handleNotificationsClick(e){
        e.stopPropagation();
        // to close settings menu if click outside
        if (!expandSettings){
            function closeNotifications (e) {
                e.stopPropagation();
                setExpandNotifications(false);
                document.removeEventListener("click", closeNotifications);
            }
            document.addEventListener("click", closeNotifications);
        }
        setExpandNotifications(!expandNotifications);
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
                    <a href={"/profile/"+props.userInfo._id} className="profile">
                        <span className="profile-pic">
                            <img src={"https://res.cloudinary.com/dzflnyjtm/image/upload/c_fill,h_100,w_100/"+props.userInfo.profilePicUrl}></img>
                        </span>
                        
                        <div>{props.userInfo.firstName ? props.userInfo.firstName : ""}</div>
                    </a>
                    <span onClick={handleNotificationsClick}>
                        <svg role="img"><NotificationsIcon fill="black"/></svg>
                    </span>
                    <span onClick={handleSettingsClick}>
                        <svg role="img"><SettingsIcon/></svg>
                    </span>
                    {expandSettings ? 
                            <div className="settings-menu">
                                <a className="settings-profile" href={"/profile/"+props.userInfo._id}>
                                    <span className="profile-pic">
                                        <img src={"https://res.cloudinary.com/dzflnyjtm/image/upload/c_fill,h_100,w_100/"+props.userInfo.profilePicUrl}></img>
                                    </span>
                                    <div className="profile-text">
                                        <h2>{props.userInfo.firstName + " " + props.userInfo.lastName}</h2>
                                        <p> See your profile</p>
                                    </div>
                                </a>
                                <hr></hr>
                                <button className="logout" onClick={logOut}>Log Out</button>
                            </div> 
                        : null}
                </div>
            
            </div>
        </div>
    );
}

export default Header;
