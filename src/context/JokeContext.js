import React, {createContext, useState} from "react";
import JokeData from "../components/mainpanel/jokemainview/data/JokeData";
import {v4 as uuidv4} from "uuid";

const JokeContext = createContext()

export const JokeProvider = ({children}) => {
  const [jokeList, setJokeList] = useState(JokeData)

  const deleteJoke = (id) => {
    if(window.confirm('Are you sure you want to delete?')) {
      setJokeList(jokeList.filter((joke) => joke.id !== id))
    }
  }

  const addJoke = (newJoke) => {
    newJoke.id = uuidv4()
    setJokeList([newJoke, ...jokeList])
  }

  return <JokeContext.Provider value={{
    jokeList,
    deleteJoke,
    addJoke
  }}>
    {children}
  </JokeContext.Provider>
}

export default JokeContext