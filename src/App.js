import React from "react";
import "./App.css"
import Sidebar from "./components/sidebar/Sidebar";
import JokeMainView from "./components/mainpanel/jokemainview/JokeMainView";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import JokeCreation from "./components/mainpanel/jokecreation/JokeCreation";
import {JokeProvider} from "./context/JokeContext";

function App() {

  return (
      <JokeProvider>
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
      </JokeProvider>
  );
}

export default App;