import { BrowserRouter, Routes, Route, Navigate, useLocation} from "react-router-dom";
import {useState, useEffect} from "react";

function ErrorPage(props) {

    const {state} = useLocation();
    const [errMsg, setErrMsg] = useState(null);

    useEffect(()=>{
        if (props.err){
            setErrMsg(props.err);
        }
        if (state){
            if (state.err){
                setErrMsg(state.err)
            }
        }
    })

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => document.body.style.overflow = null;
    },[])

    return (
        <div className="error-page">
            <h1>Oops something went wrong :(</h1>
            <h3>
                {errMsg ? 
                    "Error: " + errMsg
                : null}
            </h3>
        </div>

    );
}

export default ErrorPage;
