import React, { useState, useEffect } from "react";
import Comments from "./Comments.js";
import { ReactComponent as LikeIcon} from '../icons/thumb.svg'
import { ReactComponent as CommentIcon} from '../icons/comment.svg'
function Post(props) {
    
    return (
        <div className="post">
            <div className="post-profile">
                <span></span>
                <div className="post-details">
                    <a>First Last</a>
                    <p>Date</p>
                </div>
            </div>
            <div className="post-content">
                HELLO THIS IS A POST!
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
