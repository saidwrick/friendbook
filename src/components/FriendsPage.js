import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FriendCard from "./FriendCard";
import { ReactComponent as SearchIcon} from '../icons/search.svg'

function FriendsPage(props) {

    const [cardLimit, setCardLimit] = useState(5);
    const [users, setUsers] = useState([]);
    const [pageSelect, setPageSelect] = useState("All");
    const [search, setSearch] = useState("")

    const navigate = useNavigate();
    
    async function getAllUsers() {

        let query = ""

        if (search != ""){
            query += "?search=" + search;
        }

        try {
            let res = await fetch("users" + query, {
                method: "GET",
                headers: {
                    'Content-type': 'application/json',
                    "Authorization": "Bearer " + localStorage.authToken,
                    "type": "all"
                },
            });
            
            let resJson = await res.json();
            
            if (res.status === 200) {
                console.log("success");
                console.log(resJson);
                setUsers(resJson);

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

    async function getFriends() {
        
        let query = ""

        if (search != ""){
            query = "?search=" + search
        }

        try {
            let res = await fetch("/users" + query, {
                method: "GET",
                headers: {
                    'Content-type': 'application/json',
                    "Authorization": "Bearer " + localStorage.authToken,
                    "type": "friends"
                },
            });
            
            let resJson = await res.json();
            
            if (res.status === 200) {
                console.log("success");
                console.log(resJson);
                setUsers(resJson.friends);

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

    async function getFriendRequests() {

        let query = ""

        if (search != ""){
            query += "?search=" + search;
        }

        try {
            let res = await fetch("users" + query, {
                method: "GET",
                headers: {
                    'Content-type': 'application/json',
                    "Authorization": "Bearer " + localStorage.authToken,
                    "type": "friend-requests"
                },
            });
            
            let resJson = await res.json();
            
            if (res.status === 200) {
                console.log("success");
                console.log(resJson);
                setUsers(resJson.recievedRequestFriends);

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

    function handleNavClick (e){
        setPageSelect(e.target.innerHTML);
    }

    function populateUsers(){
        setCardLimit(5);
        if (pageSelect == "All"){
            getAllUsers();
        }
        else if (pageSelect == "Friends"){
            getFriends();
        }
        else if (pageSelect == "Friend Requests"){
            getFriendRequests();
        }
    }

    function incrementCardLimit() {
        setCardLimit(cardLimit + 10);
    }

    useEffect(() => {
        populateUsers();
    }, [pageSelect])



    //auto search after delay
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            setCardLimit(5);
            if (pageSelect == "All"){
                getAllUsers();
            }
            else if (pageSelect == "Friends"){
                getFriends();
            }
            else if (pageSelect== "Friend Requests"){
                getFriendRequests();
            }
        }, 300)
    
        return () => clearTimeout(delayDebounceFn)

    }, [search]);

    if (!props.userInfo){
        return null;
    }

    return (
        <div className="friends-page">
            <div className="friends-container">
                <h2> Discover</h2>
                <div className="friends-nav-bar">
                    <button onClick={handleNavClick} 
                        className={pageSelect=="All" ? "selected" : null}>All
                    </button>
                    <button onClick={handleNavClick} 
                        className={pageSelect=="Friends" ? "selected" : null}>Friends
                    </button>
                    <button onClick={handleNavClick} 
                        className={pageSelect=="Friend Requests" ? "selected" : null}>Friend Requests
                    </button>
                    <div className="search">
                        <SearchIcon/>
                        <input placeholder="Search users" value={search} onChange={e=>setSearch(e.target.value)}></input>
                    </div>
                </div>
                <div className="friends-grid">
                    {users.length > 0 ? 
                        users.slice(0,cardLimit).map((e) => <FriendCard key={e._id} friend={e} 
                        userInfo={props.userInfo}></FriendCard>)
                    : <h3>No users</h3>}
                </div>
            {users.length > cardLimit ? 
                <button onClick={incrementCardLimit}>View More</button>
            : null}
            </div>
        </div>
    );
}

export default FriendsPage;
