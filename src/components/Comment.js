import React, { useState, useEffect } from "react";
import { ReactComponent as LikeIcon} from "../icons/thumb.svg";
function Comment(props) {

    const [likesCount, setLikesCount] = useState(null);
    const [commentAge, setCommentAge] = useState(null);
    const [userLiked, setUserLiked] = useState(false);

    function formatTime (date){
        const seconds = (Date.now() - new Date(date))/1000;
        const minutes = seconds/60
        const hours = minutes/60
        const days = hours/24

        if (days >= 1){
            if (days < 2){
                return "1 day"
            }
            else {
                return Math.round(days) + " days"
            }
        }
        else if (hours >=1){
            if (hours < 2){
                return  "1 hour"
            }
            else {
                return Math.round(hours) + " hours"
            }
        }
        else if (minutes < 2){
            return "1 min"
        }
        else{
            return Math.round(minutes) + " mins"
        }
    }

    async function handleLikeButton(){
        try {
            let res = await fetch("/comments/" + props.comment._id, {
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

    useEffect(() => {
        if (props.comment){
            setCommentAge(formatTime(props.comment.commentDate));
            setLikesCount(props.comment.likes.length);
            checkUserLikesComment();
        }
    }, [props.comment])

    if (!props.comment){
        return null;
    }
    return (
        <div className="comment">
            <div className="comment-profile">
                <span></span>
            </div>
            <div className="comment-wrapper">
                <div className="comment-content">
                    <a href={"/profile/"+props.comment.user._id}>{props.comment.user.firstName + " "} {props.comment.user.lastName}</a>
                    <p>{props.comment.content}</p>
                </div>
                <div className="comment-buttons">
                    {likesCount>0 ? <button><LikeIcon/>{likesCount}</button> : null}
                    <button className={userLiked ? "liked" : null} onClick={handleLikeButton}>Like</button>
                    <p>{commentAge}</p>
                </div>
            </div>
        </div>

    );
}

export default Comment;
