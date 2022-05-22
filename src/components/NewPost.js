import React, { useState, useEffect } from "react";

function NewPost(props) {

    const [postContent, setPostContent] = useState("");

    async function submitPost (){
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
    
    return (
        <div className="new-post">
            <div className="new-post-profile">
                <span></span>
            </div>
            <div className="new-post-text">
                <form id="new-post" onSubmit={submitPost}>
                    <textarea type="text" required placeholder={"What's on your mind, " 
                    + (props.userInfo.firstName ? props.userInfo.firstName : "") + "?"} 
                    value={postContent} onChange={(e)=>setPostContent(e.target.value)}>
                    </textarea>
                </form>
                <button form="new-post">Post</button>
            </div>
        </div>
    );
}

export default NewPost;
