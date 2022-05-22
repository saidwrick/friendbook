import React, { useState, useEffect } from "react";
import FriendCard from "./FriendCard";

function FriendsPage(props) {

    const [cardLimit, setCardLimit] = useState(25);
    const [allUsers, setAllUsers] = useState([]);
    
    async function getAllUsers() {
        try {
            let res = await fetch("/users", {
                method: "GET",
                headers: {
                    'Content-type': 'application/json',
                    "Authorization": "Bearer " + localStorage.authToken,
                },
            });
            
            let resJson = await res.json();
            
            if (res.status === 200) {
                console.log("success");
                console.log(resJson);
                setAllUsers(resJson);

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

    function incrementCardLimit() {
        const prevLimit = cardLimit;
        setCardLimit(prevLimit + 5);
    }
    
    useEffect(() => {
        getAllUsers();
    }, [])

    // useEffect(() => {
    //     if (posts.length > 0){
    //         setLimitedPosts(posts.slice(0,postLimit));
    //     }
    // }, [posts])

    // useEffect(() => {
    //     if (posts.length > 0){
    //         setLimitedPosts(posts.slice(0,postLimit));
    //     }
    // }, [postLimit])

    return (
        <div className="friends-page">
            <div className="friends-container">
                <h2> Discover</h2>
                <div className="friends-nav-bar">
                    <a className="selected">All</a>
                    <a>Friends</a>
                    <a>Friend Requests</a>
                </div>
                <div className="friends-grid">
                    {allUsers.map((e) => <FriendCard key={e._id} user={e}></FriendCard>)}
                </div>
            <button onClick={incrementCardLimit}>View More</button>
            </div>
        </div>
    );
}

export default FriendsPage;
