import React from "react";
import "./App.css"
import Sidebar from "./components/sidebar/Sidebar";
import MainView from "./components/MainView";

function App() {

  return (
        <div className="d-flex flex-row">
          <div className="col-xl-1 col-md-2 col-3 mr-1">
            <Sidebar/>
          </div>
          <div className="col container">
            <MainView/>
          </div>
        </div>
  );
}

export default App;