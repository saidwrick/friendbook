import React, { useState, useEffect } from "react";

function NewPost(props) {

    const [postContent, setPostContent] = useState("");
    const [expanded, setExpanded] = useState(false);

    async function submitPost (e){
        e.preventDefault();
        try {
            let res = await fetch("/users/" + localStorage.userId + "/posts", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                    "Authorization": "Bearer " + localStorage.authToken,
                },
                body: JSON.stringify ({
                    "content": postContent
                }),
            });
            
            let resJson = await res.json();
            
            if (res.status === 200) {
                console.log("success");
                console.log(resJson);
                window.location.reload();

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

    function handleOnClickText(e) {
        setExpanded(true);
    }

    function handleOnClickClose(e) {
        setExpanded(false);
    }

    if (!props.userInfo || !props.userInfo.profilePicUrl){
        return null;
    }
    
    return (
        <div className={expanded ? "new-post new-post-expanded" : "new-post"}>
            <div className="new-post-profile">
                <span>
                    <a className="profile-pic" href={"/profile/"+props.userInfo._id}>
                        <img src={"https://res.cloudinary.com/dzflnyjtm/image/upload/c_fill,h_100,w_100/"+props.userInfo.profilePicUrl}></img>
                    </a>
                </span>
            </div>
            <div className={expanded ? "new-post-text new-post-text-expanded" : "new-post-text"}>
                <form id="new-post" onSubmit={submitPost}>
                    <textarea className={expanded ? "expanded" : null} type="text" required 
                        placeholder={"What's on your mind, " + (props.userInfo.firstName ? props.userInfo.firstName : "") + "?"} 
                        value={postContent} onChange={(e)=>setPostContent(e.target.value)}
                        onClick={handleOnClickText}>
                    </textarea>
                </form>
                {expanded ? 
                    <div>
                        <button form="new-post">Post</button>
                        <button onClick={handleOnClickClose} className="close-button">Close</button>
                    </div>
                : null}
                
            </div>
        </div>
    );
}

export default NewPost;
