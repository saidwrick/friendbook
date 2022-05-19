import React, { useState, useEffect } from "react";
import Post from "./Post";
function ProfilePosts() {
    return (
        <div className="profile-posts-content">
            <div className="profile-intro">
                <h2>Intro</h2>
                <p>Lives in Los Angeles?</p>
                <p>Birthday: August 35</p>
            </div>
            <div className="profile-posts-container">
                <div className="profile-posts-title">
                    <h2>Posts</h2>
                </div>
                <Post></Post>
                <Post></Post>
            </div>

        </div>
    );
}

export default ProfilePosts;
