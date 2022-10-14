import React, { useState, useEffect } from "react";
import ProfilePosts from "./ProfilePosts";
import { useParams, useNavigate } from "react-router-dom";
import FriendButtons from "./FriendButtons";
import { ReactComponent as CloseIcon} from '../icons/close.svg'

function Profile(props) {

    const [profileData, setProfileData] = useState("");
    const {id} = useParams();
    const [friendCount, setFriendCount] = useState(" friends");
    const [expandPic, setExpandPic] = useState(false);
    const [expandEdit, setExpandEdit] = useState(false);
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [birthday, setBirthday] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [expandErrorMsg, setExpandErrorMsg] = useState(false);
    
    const navigate = useNavigate();

    function getEditProfileData(){
        setFirstName(props.userInfo.firstName);
        setLastName(props.userInfo.lastName);
        setBirthday(props.userInfo.birthday.slice(0,10));
    }

    async function getProfileData (){
        try {
            let res = await fetch(`/users/${id}`, {
                method: "GET",
                headers: {
                    'Content-type': 'application/json',
                    "Authorization": "Bearer " + localStorage.authToken,
                    "type" : "general"
                },
            });
            
            let resJson = await res.json();
            
            if (res.status === 200) {
                console.log("success");
                console.log(resJson);
                setProfileData(resJson);
                countFriends(resJson.friends);
            } 
            else if (res.status === 404){
                throw "404 Page not found"
            }

            else {
                console.log(res.status);
                console.log(resJson);
                throw "Internal server error"
            }
        } 
        catch (err) {
            console.log(err);
            navigate("/404", { state: {err: err}});
        }
    }

    function countFriends (array) {
        if (array==null){
            setFriendCount("0 friends");
        }
        else if (array.length == 1) {
            setFriendCount("1 friend");
        }
        else {
            setFriendCount(array.length + " friends")
        }
    }

    function toggleExpandPic(e){
        e.stopPropagation();
        // to close expand pic if esc key is pressed
        if (!expandPic){
            function closePic (e) {
                e.stopPropagation();
                if (e.keyCode === 27){
                    setExpandPic(false);
                    document.removeEventListener("keydown", closePic);
                }
            }
            document.addEventListener("keydown", closePic);
        }
        setExpandPic(!expandPic);
    }

    function toggleExpandEdit(){
        setExpandEdit(!expandEdit);
    }

    async function uploadImg(){
        const data = new FormData();
        data.append("file", selectedFile);
        data.append("upload_preset", "sibt32fq");
        data.append("cloud_name", "dzflnyjtm")

        try {
            let res = await fetch("https://api.cloudinary.com/v1_1/dzflnyjtm/image/upload", {
                method: "POST",
                body: data
            });
            let resJson = await res.json();
            console.log("img uploaded");
            return(resJson.public_id);
        }
        catch (err){
            console.log(err);
            setExpandErrorMsg(true);
            setErrorMsg(err)
        }
    }

    async function updateProfile(imgUrl) {
        setExpandErrorMsg(false);
        let formBody = {                         
            firstName: firstName,
            lastName: lastName,
            birthday: birthday + "T00:00"
        }

        if (imgUrl){
            formBody["profilePicUrl"] = imgUrl
        }

        try {
            let res = await fetch("/users/" + props.userInfo._id, {
                method: "PUT",
                headers: {
                    'Content-type': 'application/json',
                    "Authorization": "Bearer " + localStorage.authToken
                },
                body: JSON.stringify(formBody),
            });
            
            let resJson = await res.json();
            
            if (res.status === 200) {
                console.log("Profile updated");
                window.location.reload();
            } 
            else {
                console.log(res.status);
                console.log(resJson);
                setExpandErrorMsg(true);
                setErrorMsg(resJson)
            }
        } 
        catch (err) {
            console.log(err);
            setExpandErrorMsg(true);
            setErrorMsg(err)
        }
    };

    async function handleUpdate(e){
        e.preventDefault();
        if (selectedFile){
            const imgUrl = await uploadImg();
            updateProfile(imgUrl);
        }
        else {
            updateProfile();
        }
    }

    useEffect(() => {
        getProfileData();
    },[])

    useEffect(() => {
        if (props.userInfo._id == id){
            getEditProfileData();
        }
    }, [props.userInfo, id])
    
    if (!profileData){
        return null;
    }

    return (
        <div className="profile-page">
            <div className="profile-page-header">
                <div className="profile-page-header-wrapper">
                    <span className="profile-pic" onClick={toggleExpandPic}>
                        <img src={"https://res.cloudinary.com/dzflnyjtm/image/upload/c_fill,h_400,w_400/"+profileData.profilePicUrl}></img>
                    </span>
                    {expandPic ? 
                        <div className="expand-profile-pic-bg" onClick={toggleExpandPic} onKeyDown={console.log("hello")}>
                            <button className="close-pic" onClick={toggleExpandPic}><CloseIcon/></button>
                            <div className="img-container">
                                <img onClick={e=>e.stopPropagation()} src={"https://res.cloudinary.com/dzflnyjtm/image/upload/"+profileData.profilePicUrl}></img>
                            </div>
                        </div>
                    : null}
                    <div className="profile-page-details">
                        <h1>{profileData.firstName} {profileData.lastName}</h1>
                        <p>{friendCount}</p>
                    </div>
                    {props.userInfo._id == id ? 
                        <div className="friend-button">
                            <button className="edit-profile" onClick={toggleExpandEdit}>Edit Profile</button>
                        </div> 
                    : 
                        <FriendButtons userInfo={props.userInfo} friendId={id}></FriendButtons>
                    }
                    {expandEdit ? 
                        <div className="edit-mod-bg" onClick={toggleExpandEdit}>
                            <div className="edit-mod-container" onClick={e=>e.stopPropagation()}>
                                <div className="edit-mod-header">
                                    <h1>Edit Profile</h1>
                                    <button className="edit-mod-close-button" onClick={toggleExpandEdit}><CloseIcon/></button>
                                </div>
                                <form id="edit-profile" onSubmit={handleUpdate}>
                                    {expandErrorMsg ? 
                                        <p className="error">{errorMsg}</p>
                                    :null}
                                    <input required placeholder="First name" value={firstName} onChange={(e)=> setFirstName(e.target.value)} ></input>
                                    <input required placeholder="Last name" value={lastName} onChange={(e)=> setLastName(e.target.value)}></input>
                                    <label htmlFor="birthday">Birthday</label>
                                    <input required id="birthday" type="date" value={birthday} onChange={(e)=> setBirthday(e.target.value)}></input>
                                    <label htmlFor="file">Change Profile Picture</label>
                                    <input id="file" type="file" onChange={(e)=>setSelectedFile(e.target.files[0])}></input>
                                </form>
                                <button form="edit-profile" type="submit">Save</button>
                            </div>
                        </div>
                    : null}
                </div>
                <div className="profile-nav-bar">
                    <button className="selected">Posts</button>
                    <button>Friends</button>
                </div>
            </div>
            <ProfilePosts profileData={profileData} userInfo={props.userInfo}></ProfilePosts>
        </div>
    );
}

export default Profile;