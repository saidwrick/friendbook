import React, { useState, useEffect } from "react";
import Comments from "./Comments.js";

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
                <div className="post-likes">4 likes</div>
                <div className="post-comments">4 comments</div>
            </div>
            <div className="post-buttons">
                <button>Like</button>
                <button>Comment</button>
            </div>
            <Comments></Comments>
        </div>
    );
}

export default Post;
