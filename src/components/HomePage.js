import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import NewPost from "./NewPost";
import Post from "./Post";

function Home(props) {
    
    const [posts, setPosts] = useState([]);
    const [postLimit, setPostLimit] = useState(10);

    const api = process.env.REACT_APP_API_URL
    const navigate = useNavigate();

    async function getPosts() {
        try {
            let res = await fetch(api+"/users/" + localStorage.userId + "/posts", {
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
            } 
            else {
                console.log(res.status);
                console.log(resJson);
                throw res;
            }
        } 
        catch (err) {
            console.log(err);
            navigate("/404", { state: {err: "Internal server error"}});
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
