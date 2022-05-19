import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Profile from "./components/Profile";

function App() {
    return (
        <div className="App">
            <Header></Header>
            <HomePage></HomePage>
            <Profile></Profile>
        </div>
    );
}

export default App;
