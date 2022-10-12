import React, { useState, useEffect } from "react";
import NewPost from "./NewPost";
import Post from "./Post";

function Home(props) {
    
    const [posts, setPosts] = useState([]);
    const [postLimit, setPostLimit] = useState(2);
    const [limitedPosts, setLimitedPosts] = useState([]);

    async function getPosts() {
        try {
            let res = await fetch("/users/" + localStorage.userId + "/posts", {
                method: "GET",
                headers: {
                    'Content-type': 'application/json',
                    "Authorization": "Bearer " + localStorage.authToken,
                    "type" : "self"
                },
            });
            
            let resJson = await res.json();
            
            if (res.status === 200) {
                console.log("success");
                console.log(resJson);
                setPosts(resJson);
                setLimitedPosts(resJson.slice(0,postLimit));
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

    function incrementPostLimit() {
        setPostLimit(postLimit + 5);
    }
    useEffect(() => {
        getPosts();
    }, [])

    return (
        <div className="home">
            <div className="post-container">
                <NewPost userInfo={props.userInfo}></NewPost>
                {posts.slice(0,postLimit).map(e => <Post key={e._id} post={e} userInfo={props.userInfo}></Post>)}
                {posts.length > postLimit ?
                    <button onClick={incrementPostLimit}>View More</button>
                : null}
            </div>
        </div>
    );
}

export default Home;
