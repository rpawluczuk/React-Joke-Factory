import React, {useContext} from 'react';
import SingleJoke from "./singlejoke/SingleJoke";
import JokeContext from "../../../context/JokeContext";

const JokeMainView = () => {

  const {jokeList} = useContext(JokeContext)

  if (!jokeList || jokeList.length === 0) {
    return (
        <div className='container'>
          <p className="text-center display-6 m-5 fw-bolder" style={{ color: 'red'}}>No Jokes</p>
        </div>
    )
  }

  return (
      <div className="container">
        <h1 className="text-center display-2 text-dark m-5 fw-bolder">List of
          Jokes</h1>
        {jokeList.map((joke, index) => (
            <SingleJoke key={joke.id} joke={joke}/>
        ))}
      </div>
  )
}
export default JokeMainView;