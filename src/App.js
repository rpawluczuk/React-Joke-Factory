import React, {useState} from "react";
import "./App.css"
import Sidebar from "./components/sidebar/Sidebar";
import JokeMainView from "./components/jokemainview/JokeMainView";
import JokeData from "./components/jokemainview/data/JokeData";

function App() {

  const [jokeList, setJokeList] = useState(JokeData)

  return (
        <div className="d-flex flex-row">
          <div className="col-xl-1 col-md-2 col-3 mr-1">
            <Sidebar/>
          </div>
          <div className="col container">
            <JokeMainView jokeList={jokeList}/>
          </div>
        </div>
  );
}

export default App;