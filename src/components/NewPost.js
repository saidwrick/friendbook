import React, { useState, useEffect } from "react";

function NewPost(props) {

    const [name, setName] = useState("John");
    const [postContent, setPostContent] = useState("");

    async function submitPost (){
        try {
            let res = await fetch("/posts", {
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
            <span></span>
            <div className="new-post-text">
                <form id="new-post" onSubmit={submitPost}>
                    <textarea type="text" required placeholder={"What's on your mind, " + name + "?"} 
                    value={postContent} onChange={(e)=>setPostContent(e.target.value)}>
                    </textarea>
                </form>
                <button form="new-post" onClick={submitPost}>Post</button>
            </div>
        </div>
    );
}

export default NewPost;
