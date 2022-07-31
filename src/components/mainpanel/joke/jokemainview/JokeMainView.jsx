import React, {useEffect, useState, createContext, useContext} from 'react';
import SingleJoke from "./singlejoke/SingleJoke";
import {JokeContext, JokeProvider} from "../../../../context/JokeContext";
import JokesPagination from "./JokesPagination";
import axios from "axios";

const JokeMainView = () => {

const [jokeList, setJokeList] = useState([])

    useEffect(() => {
        refreshJokeList()
    }, [])

    const refreshJokeList = () => {
        axios.get(`http://localhost:8081/api/jokes`).then((res) => {
            setJokeList(res.data)
        });
    }

    if (!jokeList || jokeList.length === 0) {
        return (
            <div className='container'>
                <p className="text-center display-6 m-5 fw-bolder" style={{color: 'red'}}>No Jokes</p>
            </div>
        )
    }

    return (
        <JokeContext.Provider value={{jokeList, setJokeList, refreshJokeList}}>
            <div className="container">
                <h1 className="text-center display-2 text-dark m-5 fw-bolder">List of
                    Jokes</h1>
                {jokeList.map((joke) => (
                    <SingleJoke key={joke.id} joke={joke}/>
                ))}

                <JokesPagination></JokesPagination>
            </div>
        </JokeContext.Provider>
    )
}
export default JokeMainView;