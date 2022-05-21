import React, { useState, useEffect } from "react";
import Post from "./Post";
import NewPost from "./NewPost";
import { ReactComponent as CakeIcon} from '../icons/cake.svg';
import { ReactComponent as JoinedIcon} from '../icons/joined.svg';


function ProfilePosts(props) {

    return (
        <div className="profile-posts-content">
            <div className="profile-intro">
                <h2>Intro</h2>
                <p><CakeIcon height="25px"/>Born on {props.profileData.birthdayFormatted}</p>
                <p><JoinedIcon height="25px"/>Joined {props.profileData.joinDateFormatted}</p>
            </div>
            <div className="profile-posts-container">
                <NewPost></NewPost>
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
