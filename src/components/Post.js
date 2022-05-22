import React, { useState, useEffect } from "react";
import Comments from "./Comments.js";
import { ReactComponent as LikeIcon} from '../icons/thumb.svg'
import { ReactComponent as CommentIcon} from '../icons/comment.svg'

function Post(props) {
    
    const [postAge, setPostAge] = useState("0 days ago");

    function formatTime (date){
        const seconds = (Date.now() - new Date(date))/1000;
        const minutes = seconds/60
        const hours = minutes/60
        const days = hours/24

        if (days >= 1){
            if (days < 2){
                return "1 day ago"
            }
            else {
                return Math.round(days) + " days ago"
            }
        }
        else if (hours >=1){
            if (hours < 2){
                return  "1 hour ago"
            }
            else {
                return Math.round(hours) + " hours ago"
            }
        }
        else if (minutes < 2){
            return "1 min ago"
        }
        else{
            return Math.round(minutes) + " mins ago"
        }
    }

    useEffect(() => {
        setPostAge(formatTime(props.post.postDate));
    }, [])
    
    return (
        <div className="post">
            <div className="post-profile">
                <span></span>
                <div className="post-details">
                    <a href={props.post.user._id ? "/profile/" + props.post.user._id : 0}>
                    {props.post.user.firstName ? props.post.user.firstName+" " : ""} 
                    {props.post.user.lastName ? props.post.user.lastName : ""}</a>
                    <p>{postAge}</p>
                </div>
            </div>
            <div className="post-content">
                {props.post.content ? props.post.content : ""}
            </div>
            <div className="post-likes-comments-count">
                <div className="post-likes"><LikeIcon/> 4</div>
                <div className="post-comments">4 comments</div>
            </div>
            <div className="post-buttons">
                <button> <LikeIcon/> Like</button>
                <button> <CommentIcon/> Comment</button>
            </div>
            <Comments></Comments>
        </div>
    );
}

export default Post;
