import React, {useState} from 'react';
import SingleJoke from "./singlejoke/SingleJoke";

const JokeMainView = ({jokeList}) => {

  if (!jokeList || jokeList.length === 0) {
    return <p>No Jokes</p>
  }

  return (
      <div className="container">
        <h1 className="text-center display-2 text-dark m-5 fw-bolder">List of
          Jokes</h1>
        {jokeList.map((joke, index) => (
            <div className="card p-3 mb-4" style={{background: "azure"}}>
              <SingleJoke key={joke.id} joke={joke}/>
            </div>
        ))}
      </div>
  )
}
export default JokeMainView;