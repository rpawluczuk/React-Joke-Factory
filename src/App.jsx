import React from "react";
import "./App.css"
import Sidebar from "./components/sidebar/Sidebar";
import JokeMainView from "./components/mainpanel/joke/jokemainview/JokeMainView";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import JokeCreation from "./components/mainpanel/joke/jokecreation/JokeCreation";
import JokeEdition from "./components/mainpanel/joke/jokeedition/JokeEdition";
import AuthorMainView from "./components/mainpanel/author/AuthorMainView";
import AuthorCreation from "./components/mainpanel/author/AuthorCreation";

function App() {

    return (

            <BrowserRouter>
                <div className="d-flex flex-row">
                    <div className="col-xl-1 col-md-2 col-3 mr-1">
                        <Sidebar/>
                    </div>
                    <div className="col container">
                        <Routes>
                            <Route exact path='/joke-list' element={<JokeMainView/>}/>
                            <Route exact path='/joke-creation' element={<JokeCreation/>}/>
                            <Route exact path='/joke-edition/:id' element={<JokeEdition/>}/>
                            <Route exact path='/author-list' element={<AuthorMainView/>}/>
                            <Route exact path='/author-creation' element={<AuthorCreation/>}/>
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>

    );
}

export default App;