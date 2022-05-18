import React, { useState, useEffect } from "react";

function Comments(props) {
    
    return (
        <div className="comments">
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
                        <p>5 likes</p>
                        <button>like</button>
                        <p>Date</p>
                    </div>
                </div>
            </div>
            <div className="comment">
                <div className="comment-profile">
                    <span></span>
                </div>
                <div className="comment-wrapper">
                    <div className="comment-content">
                        <a>Name</a>
                        <p>Hello this is a really long long long really long what happens if it goes over comment.</p>
                    </div>
                    <div className="comment-buttons">
                        <p>5 likes</p>
                        <button>like</button>
                        <p>Date</p>
                    </div>
                </div>
            </div>
            <div className="post-comment">
                <span></span>
                <input placeholder="Write a comment..."></input>
            </div>
        </div>
    );
}

export default Comments;
