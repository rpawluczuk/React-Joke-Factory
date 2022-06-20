import React, {createContext, useEffect, useState, useReducer} from "react";
import jokeReducer from "./JokeReducer";

const JokeContext = createContext()

export const JokeProvider = ({children}) => {

  const initialState = {
    jokeList: [],
    joke: {}
  }

  const [state, dispatch] = useReducer(jokeReducer, initialState)

  const getJoke = async (id) => {
    const response = await fetch(`/jokes/creator/${id}`, { method: 'GET'})
    const data = await response.json()
    dispatch({
      type: 'GET_JOKE',
      payload: data
    })
  }

  const getJokeList = async () => {
    const response = await fetch('/jokes')
    const data = await response.json()
    dispatch({
      type: 'GET_JOKES',
      payload: data
    })
  }

  const deleteJoke = async (id) => {
    if(window.confirm('Are you sure you want to delete?')) {
      await fetch(`/jokes/${id}`, { method: 'DELETE'})
    }
  }

  const addJoke = async (newJoke) => {
    await fetch('/jokes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newJoke),
    })
  }

  const updateJoke = async (id, updJoke) => {
    await fetch(`/jokes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updJoke)
    })
  }

  return <JokeContext.Provider value={{
    jokeList: state.jokeList,
    joke: state.joke,
    deleteJoke,
    addJoke,
    updateJoke,
    getJoke,
    getJokeList
  }}>
    {children}
  </JokeContext.Provider>
}

export default JokeContext