import  React from "react";
import "./App.css"


function App () {
    const jokes = [
      { id : 1, text: "joke 1"},
      { id : 2, text: "joke 2"},
      { id : 3, text: "joke 3"}
    ]

    return(
        <div className="container">
          <h1 className="text-center display-2 text-dark m-5 fw-bolder">List of Jokes</h1>
          <ul>
            {jokes.map((joke, index) => (
                <li key={index}>{joke.text}</li>
            ))}
          </ul>
        </div>
    );
}

export default App;