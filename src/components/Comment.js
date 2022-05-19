import React, { useState, useEffect } from "react";
import { ReactComponent as LikeIcon} from "../icons/thumb.svg";
function Comment(props) {
    
    return (
        <div className="comment">
            <div className="comment-profile">
                <span></span>
            </div>
            <div className="comment-wrapper">
                <div className="comment-content">
                    <a>Name</a>
                    <p>Hello this is a comment.</p>
                </div>
                <div className="comment-buttons">
                    <p><LikeIcon/>5</p>
                    <button>Like</button>
                    <p>Date</p>
                </div>
            </div>
        </div>

    );
}

export default Comment;
