import React, {createContext, useState} from "react";

export const jokeContext = createContext();

const JokeProvider = (props) => {

  const [jokeList, setJokeList] = useState();

  return (
      // this is the provider providing state
      <jokeContext.Provider value={[jokeList, setJokeList]}>
        {props.children}
      </jokeContext.Provider>
  );
}

export default JokeProvider;