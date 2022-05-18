import React, { useState, useEffect } from "react";
import NewPost from "./NewPost";
import Post from "./Post";

function Home(props) {
    return (
        <div className="home">
            <div className="post-container">
                <NewPost></NewPost>
                <Post></Post>
                <Post></Post>
                <Post></Post>
            </div>
        </div>
    );
}

export default Home;
