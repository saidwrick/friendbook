import React, { useState, useEffect } from "react";
import { ReactComponent as LikeIcon } from "../icons/thumb.svg";
import { ReactComponent as TrashIcon } from "../icons/trash.svg";
import LikesMod from './LikesMod.js';

function Comment(props) {

    const [likesCount, setLikesCount] = useState(null);
    const [commentAge, setCommentAge] = useState(null);
    const [userLiked, setUserLiked] = useState(false);
    const [likes, setLikes] = useState([]);
    const [likesHover, setLikesHover] = useState(false);
    const [likesClick, setLikesClick] = useState(false);
    const [deleted, setDeleted] = useState(false);

    const api = process.env.REACT_APP_API_URL

    function formatTime (date){
        const seconds = (Date.now() - new Date(date))/1000;
        const minutes = seconds/60
        const hours = minutes/60
        const days = hours/24

        if (days >= 1){
            if (days < 2){
                return "1d"
            }
            else {
                return Math.round(days) + "d"
            }
        }
        else if (hours >=1){
            if (hours < 2){
                return  "1h"
            }
            else {
                return Math.round(hours) + "h"
            }
        }
        else if (minutes < 2){
            return "1 min"
        }
        else{
            return Math.round(minutes) + " min"
        }
    }

    async function handleLikeButton(){
        try {
            let res = await fetch(api + "/comments/" + props.comment._id, {
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

    function checkUserLikesComment() {
        if(props.comment.likes.indexOf(localStorage.userId) >= 0){
            setUserLiked(true);
        }
    }

    async function getLikes() {
        try {
            let res = await fetch(api + "/comments/" + props.comment._id + "/likes", {
                method: "GET",
                headers: {
                    'Content-type': 'application/json',
                    "Authorization": "Bearer " + localStorage.authToken,
                },
            });
            
            let resJson = await res.json();
            
            if (res.status === 200) {
                console.log(resJson);
                setLikes(resJson.likes);
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

    async function deleteComment() {
        try {
            let res = await fetch(api + "/comments/" + props.comment._id, {
                method: "DELETE",
                headers: {
                    'Content-type': 'application/json',
                    "Authorization": "Bearer " + localStorage.authToken,
                },
            });
            
            let resJson = await res.json();
            
            if (res.status === 200) {
                console.log(resJson);
                setDeleted(true);
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

    function likesHoverToggle(){
        if (likesHover) {
            setLikesHover(false);
        }
        else {
            getLikes()
            setLikesHover(true);
        }
    }

    function likesClickToggle(){
        if (likesClick) {
            setLikesClick(false);
        }
        else{
            getLikes()
            setLikesClick(true);
        }
    }

    useEffect(() => {
        if (props.comment){
            setCommentAge(formatTime(props.comment.commentDate));
            setLikesCount(props.comment.likes.length);
            checkUserLikesComment();
        }
    }, [props.comment])

    if (!props.comment || deleted){
        return null;
    }
    return (
        <div className="comment">
            <div className="comment-profile">
                <span>
                    <a className="profile-pic" href={"/profile/"+props.comment.user._id}>
                        <img src={"https://res.cloudinary.com/dzflnyjtm/image/upload/c_fill,h_100,w_100/"+props.comment.user.profilePicUrl}></img>
                    </a>
                </span>
            </div>
            <div className="comment-wrapper">
                <div className="comment-main">
                    <div className="comment-content">
                        <a href={"/profile/"+props.comment.user._id}>{props.comment.user.firstName + " "} {props.comment.user.lastName}</a>
                        <p>{props.comment.content}</p>
                    </div>
                    {props.comment.user._id == props.userInfo._id ? 
                        <div className="comment-self">
                            <button onClick={deleteComment}><TrashIcon/></button> 
                        </div>
                    : null}
                </div>
                <div className="comment-buttons">
                    {likesCount>0 ? 
                        <div className="comment-likes"
                            onMouseEnter={likesHoverToggle}
                            onMouseLeave={likesHoverToggle}
                            onClick={likesClickToggle}> 
                                <LikeIcon/>{likesCount}
                                {likesHover ? 
                                    <div className="likes-hover">
                                        {likes.slice(0,20).map(e => <div key={e._id}>{e.firstName + " " + e.lastName}</div>)}
                                        {likes.length > 20 ? <div>and {likes.length-20} more...</div> : null}
                                    </div> 
                                : null}
                        </div> 
                    : null}
                    {likesClick ? 
                    <LikesMod userInfo={props.userInfo} likes={likes} closeMod={likesClickToggle}></LikesMod>
                    : null}
                    <button className={userLiked ? "liked" : null} onClick={handleLikeButton}>Like</button>
                    <p>{commentAge}</p>
                </div>
            </div>
        </div>

    );
}

export default Comment;
