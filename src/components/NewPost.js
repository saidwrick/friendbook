import React, { useState, useEffect } from "react";

function NewPost(props) {

    function submitPost (e){
            console.log("enter");
    }
    
    return (
        <div className="new-post">
            <span></span>
            <div className="new-post-text">
                <textarea type="text" placeholder="What's on your mind name?">
                </textarea>
                <button onClick={submitPost}>post</button>
            </div>
        </div>
    );
}

export default NewPost;
