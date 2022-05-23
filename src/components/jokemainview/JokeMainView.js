import React, {useState} from 'react';
import SingleJoke from "./singlejoke/SingleJoke";
import JokeData from "./data/JokeData";
import JokeCreation from "../jokecreation/JokeCreation";

const JokeMainView = () => {

  const [jokeList, setJokeList] = useState(JokeData)

  const deleteJoke = (id) => {
    if(window.confirm('Are you sure you want to delete?')) {
      setJokeList(jokeList.filter((joke) => joke.id !== id))
    }
  }

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
            <SingleJoke
                key={joke.id}
                joke={joke}
                handleDelete={(id) => deleteJoke(id)}
            />
        ))}
        <JokeCreation/>
      </div>
  )
}
export default JokeMainView;