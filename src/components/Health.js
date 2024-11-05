import React, { useState, useEffect } from "react";
import { Navigate} from "react-router-dom";

function Health(props){
    const api = process.env.REACT_APP_API_URL

    async function pingServer() {
        try {
            let res = await fetch(api)
                if (res.status === 200) {
                    console.log("success");
                }
                else{
                    console.log("error")
                }
        } 
        catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        pingServer()
    });

    return (
        <div>
        </div>

    );
}

export default Health;
