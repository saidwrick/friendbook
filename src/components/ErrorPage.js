import { BrowserRouter, Routes, Route, Navigate, useLocation} from "react-router-dom";

function ErrorPage(props) {

    const {state} = useLocation();

    return (
        <div className="error-page">
            <h1>Oops something went wrong :(</h1>
            {console.log(state.err)}
            <h3>{state.err ? "Error Message: " + state.err : null}</h3>
        </div>

    );
}

export default ErrorPage;
