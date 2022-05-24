import React, { useState, useEffect } from "react";
import Comment from "./Comment.js";
import { ReactComponent as LikeIcon} from '../icons/thumb.svg'
import { ReactComponent as CommentIcon} from '../icons/comment.svg'

function Post(props) {
    
    const [postAge, setPostAge] = useState("0 days ago");
    const [userLiked, setUserLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(null);
    const [commentsCount, setCommentsCount] = useState(null);
    const [expandComments, setExpandComments] = useState(true);
    const [comments, setComments] = useState([]);
    const [inputComment, setInputComment] = useState("");

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

    async function handleLikeButton(){
        try {
            let res = await fetch("/posts/" + props.post._id, {
                method: "PUT",
                headers: {
                    'Content-type': 'application/json',
                    "Authorization": "Bearer " + localStorage.authToken,
                },
            });
            
            let resJson = await res.json();

            //updating likes counter in DOM so don't have to requery everytime
            if (res.status === 200) {
                if(userLiked){
                    setLikesCount(likesCount-1);
                }
                else{
                    setLikesCount(likesCount+1);
                }
                setUserLiked(!userLiked);
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

    function checkUserLikesPost() {
        if(props.post.likes.indexOf(localStorage.userId) >= 0){
            setUserLiked(true);
        }
    }

    async function getComments(){
        try {
            let res = await fetch("/posts/" + props.post._id + "/comments", {
                method: "GET",
                headers: {
                    'Content-type': 'application/json',
                    "Authorization": "Bearer " + localStorage.authToken,
                },
            });
            
            let resJson = await res.json();
            
            if (res.status === 200) {
                setComments(resJson.comments);
                setCommentsCount(resJson.comments.length);
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

    async function postComment(e){
        if(e.key === "Enter"){
            if(inputComment == ""){
                return
            }
            try {
                let res = await fetch("/posts/" + props.post._id + "/comments", {
                    method: "POST",
                    headers: {
                        'Content-type': 'application/json',
                        "Authorization": "Bearer " + localStorage.authToken,
                    },
                    body: JSON.stringify({
                        "content": inputComment
                    }),
                });
                
                let resJson = await res.json();
                
                if (res.status === 200) {
                    setInputComment("");
                    getComments();
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
    }

    function handleCommentsClick() {
        if  (expandComments){
            setExpandComments(!expandComments)
        }
        else{
            getComments();
            setExpandComments(!expandComments)
        }
    }

    useEffect(() => {
        if (props.post){
            checkUserLikesPost();
            setPostAge(formatTime(props.post.postDate));
            setLikesCount(props.post.likes.length);
            setCommentsCount(props.post.comments.length);
            getComments();
        }
    }, [props.post])
    
    if (!props.post || !props.userInfo){
        return (null)
    }

    return (
        <div className="post">
            <div className="post-profile">
                <span>
                    <a className="profile-pic" href={"/profile/"+props.post.user._id}>
                        <img src={"https://res.cloudinary.com/dzflnyjtm/image/upload/c_fill,h_100,w_100/"+props.post.user.profilePicUrl}></img>
                    </a>
               </span>
                <div className="post-details">
                    <a href={"/profile/" + props.post.user._id}>
                        {props.post.user.firstName+" "} 
                        {props.post.user.lastName}
                    </a>
                    <p>{postAge}</p>
                </div>
            </div>
            <div className="post-content">
                {props.post.content}
            </div>
            <div className="post-likes-comments-count">
                {likesCount > 0 ? <div className="post-likes"><LikeIcon/> {likesCount}</div> : <div></div>}
                <div className="post-comments" onClick={handleCommentsClick}>{commentsCount}{(commentsCount == 1) ? " comment" : " comments"}</div>
            </div>
            <div className="post-buttons">
                <button onClick = {handleLikeButton} className={userLiked ? "liked" : null}> <LikeIcon/> Like</button>
                <label onClick={expandComments? null : handleCommentsClick} htmlFor={props.post._id}> <CommentIcon/> Comment</label>
            </div>
            {expandComments? <div className="comments">
                {comments.map(e => <Comment key={e._id} comment={e}></Comment>)}
                <div className="post-comment">
                    <span>
                        <a className="profile-pic" href={"/profile/"+props.userInfo._id}>
                            <img src={"https://res.cloudinary.com/dzflnyjtm/image/upload/c_fill,h_100,w_100/"+props.userInfo.profilePicUrl}></img>
                        </a>
                    </span>
                    <input autoComplete="off" onKeyDown={postComment} id={props.post._id} value={inputComment} 
                    onChange={(e)=> setInputComment(e.target.value)} placeholder="Write a comment...">
                    </input>
                </div>
            </div> : null}
            
        </div>
    );
}

export default Post;
