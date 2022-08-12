import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import JokeMainView from "./joke/JokeMainView";
import JokeCreation from "./joke/JokeCreation";
import AuthorMainView from "./author/AuthorMainView";
import AuthorCreation from "./author/AuthorCreation";

const MainPanel = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/joke-list' element={<JokeMainView/>}/>
                <Route path='/joke-creation' element={<JokeCreation/>}/>
                <Route path='/author-list' element={<AuthorMainView/>}/>
                <Route path='/author-creation' element={<AuthorCreation/>}/>
            </Routes>
        </BrowserRouter>
    )
}
export default MainPanel;