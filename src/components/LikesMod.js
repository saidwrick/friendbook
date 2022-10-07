import React, { useState, useEffect } from "react";
import FriendButtons from './FriendButtons'
import { ReactComponent as CloseIcon} from '../icons/close.svg'

function LikesMod(props) {

    if (!props.likes || !props.userInfo){
        return (null);
    }

    return (
        <div className="likes-mod-bg" onClick={props.closeMod}>
            <div className="likes-mod" onClick={e=>e.stopPropagation()}>
                <div className="likes-mod-header">
                    Likes
                    <button className="likes-mod-close" onClick={props.closeMod}><CloseIcon/></button>
                </div>
                {props.likes.map((e) => 
                    <div className="likes-mod-user" key={e._id}>
                        <span>
                            <a className="profile-pic" href={"/profile/"+e._id}>
                                <img src={"https://res.cloudinary.com/dzflnyjtm/image/upload/c_fill,h_100,w_100/"+e.profilePicUrl}></img>
                            </a>
                        </span>
                        <a className="name" href={"/profile/"+e._id}>
                            {`${e.firstName} ${e.lastName}`}
                        </a>
                        <FriendButtons userInfo={props.userInfo} friendId={e._id}></FriendButtons>
                    </div>
                )}
                
            </div>
        </div>
    );
}

export default LikesMod;
