import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import JokeMainView from "./jokemainview/JokeMainView";
import JokeCreation from "./jokecreation/JokeCreation";

const MainPanel = () => {

  return (
      <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<JokeMainView/>}/>
            <Route path='/joke-creation' element={<JokeCreation/>}/>
          </Routes>
      </BrowserRouter>
  )
}
export default MainPanel;