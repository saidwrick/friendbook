import React, { useState, useEffect } from "react";
import ProfilePosts from "./ProfilePosts";

function Profile() {
    return (
        <div className="profile-page">
            <div className="profile-page-header">
                <div className="profile-page-header-wrapper">
                    <span></span>
                    <div className="profile-page-details">
                        <h1>John Mayer</h1>
                        <p>100 friends</p>
                    </div>
                    <button>Add Friend</button>
                </div>
                <div className="profile-nav-bar">
                    <a className="selected">Posts</a>
                    <a>Friends</a>
                </div>
            </div>
            <ProfilePosts></ProfilePosts>
        </div>
    );
}

export default Profile;