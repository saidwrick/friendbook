import React, { useState, useEffect } from "react";
import Comment from "./Comment.js";
import { ReactComponent as LikeIcon} from "../icons/thumb.svg";
function Comments(props) {
    
    return (
        <div className="comments">
            <Comment></Comment>
            <div className="post-comment">
                <span></span>
                <input placeholder="Write a comment..."></input>
            </div>
        </div>
    );
}

export default Comments;
