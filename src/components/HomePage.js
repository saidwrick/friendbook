import React, { useState, useEffect } from "react";
import NewPost from "./NewPost";
import Post from "./Post";

function Home(props) {
    
    const [posts, setPosts] = useState([]);
    const [postLimit, setPostLimit] = useState(5);
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
        const prevLimit = postLimit;
        setPostLimit(prevLimit + 5);
    }
    useEffect(() => {
        getPosts();
    }, [])

    useEffect(() => {
        if (posts.length > 0){
            setLimitedPosts(posts.slice(0,postLimit));
        }
    }, [postLimit])

    return (
        <div className="home">
            <div className="post-container">
                <NewPost userInfo={props.userInfo}></NewPost>
                {limitedPosts.map(e => <Post key={e._id} post={e} userInfo={props.userInfo}></Post>)}
                <button onClick={incrementPostLimit}>View More</button>
            </div>
        </div>
    );
}

export default Home;
