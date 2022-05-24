import React from "react";
import "./App.css"
import Sidebar from "./components/sidebar/Sidebar";
import JokeMainView from "./components/mainpanel/jokemainview/JokeMainView";
import MainPanel from "./components/mainpanel/MainPanel";
import {BrowserRouter, BrowserRouter as Router, Route, Routes, Switch} from "react-router-dom";
import JokeCreation from "./components/mainpanel/jokecreation/JokeCreation";

function App() {

  return (
      <BrowserRouter>
        <div className="d-flex flex-row">
          <div className="col-xl-1 col-md-2 col-3 mr-1">
            <Sidebar/>
          </div>
          <div className="col container">
            <Routes>
              <Route exact path='/' element={<JokeMainView/>}/>
              <Route exact path='/joke-creation' element={<JokeCreation/>}/>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
  );
}

export default App;