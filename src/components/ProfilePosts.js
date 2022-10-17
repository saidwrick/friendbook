import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Post from "./Post";
import NewPost from "./NewPost";
import { ReactComponent as CakeIcon} from '../icons/cake.svg';
import { ReactComponent as JoinedIcon} from '../icons/joined.svg';


function ProfilePosts(props) {

    const {id} = useParams();
    const [posts, setPosts] = useState([]);

    const api = process.env.REACT_APP_API_URL

    async function getProfilePosts (){
        try {
            let res = await fetch(api + `/users/${id}/posts`, {
                method: "GET",
                headers: {
                    'Content-type': 'application/json',
                    "Authorization": "Bearer " + localStorage.authToken,
                    "type" : "general"
                },
            });
            
            let resJson = await res.json();
            
            if (res.status === 200) {
                console.log("success");
                console.log(resJson);
                setPosts(resJson);

            } 
            else {
                console.log(res.status);
                console.log(resJson);
            }
        } 
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
            getProfilePosts();
    },[])

    if (!props.profileData || !props.userInfo.friends){
        return (null);
    }

    return (
        <div className="profile-posts-content">
            <div className="profile-intro">
                <h2>Intro</h2>
                <p><CakeIcon height="25px"/>Born on {props.profileData.birthdayFormatted}</p>
                <p><JoinedIcon height="25px"/>Joined {props.profileData.joinDateFormatted}</p>
            </div>
            <div className="profile-posts-container">
                <div className="profile-posts-title">
                    <h2>Posts</h2>
                </div>
                {(id == localStorage.userId)? <NewPost userInfo={props.userInfo}></NewPost> : null}
                {((props.userInfo.friends.indexOf(id) >= 0) || id == localStorage.userId) ?
                    posts.length > 0 ? 
                        posts.map(e => <Post key={e._id} post={e} userInfo={props.userInfo}></Post>)
                    : <h3>User has no posts</h3>
                : <h3>Add friend to view posts</h3>}
            </div>

        </div>
    );
}

export default ProfilePosts;
