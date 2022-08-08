import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import JokeMainView from "./joke/jokemainview/JokeMainView";
import JokeCreation from "./joke/jokecreation/JokeCreation";
import AuthorMainView from "./author/AuthorMainView";

const MainPanel = () => {

  return (
      <BrowserRouter>
          <Routes>
            <Route exact path='/joke-list' element={<JokeMainView/>}/>
            <Route path='/joke-creation' element={<JokeCreation/>}/>
            <Route path='/author-list' element={<AuthorMainView/>}/>
          </Routes>
      </BrowserRouter>
  )
}
export default MainPanel;