import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom";
import NewPost from "./NewPost";
import Post from "./Post";
import ErrorPage from "./ErrorPage";

function Home(props) {
    
    const [posts, setPosts] = useState([]);
    const [postLimit, setPostLimit] = useState(10);
    const [errorMsg, setErrorMsg] = useState("");
    const [errorPage, setErrorPage] = useState(false);

    const api = process.env.REACT_APP_API_URL

    function openErrorPage(msg = null){
        setErrorMsg(msg);
        setErrorPage(true);
    }

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
            openErrorPage("Internal server error");
        }
    }

    function incrementPostLimit() {
        setPostLimit(postLimit + 5);
    }

    useEffect(() => {
        getPosts();
    }, [])
    
    if (errorPage) {
        return <ErrorPage err={errorMsg}></ErrorPage>
    }
    
    return (
        <div className="home">
            <div className="post-container">
                <NewPost userInfo={props.userInfo}></NewPost>
                {posts.slice(0,postLimit).map(e => <Post key={e._id} post={e} userInfo={props.userInfo}></Post>)}
                {posts.length > postLimit ?
                    <button onClick={incrementPostLimit}>View More</button>
                : <h3>There are no more posts to show right now.</h3>}
            </div>
        </div>
    );
}

export default Home;
