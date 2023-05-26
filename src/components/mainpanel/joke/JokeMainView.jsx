import React, {useEffect, useState} from 'react';
import SingleJoke from "./jokemainview/SingleJoke";
import {JokeContext} from "./JokeContext";
import JokesPagination from "./jokemainview/JokesPagination";
import axios from "axios";
import JokeFilter from "./jokemainview/JokeFilter";

const JokeMainView = () => {

const [jokeList, setJokeList] = useState([])
const [query, setQuery] = useState('')

    useEffect(() => {
        refreshJokeList()
    }, [])

    useEffect(() => {
        refreshJokeList()
    }, [query])

    const refreshJokeList = () => {
        if (query.length === 0) {
            axios.get(`http://localhost:8082/api/jokes`).then((res) => {
                setJokeList(res.data)
            });
        } else {
            axios.get(`http://localhost:8082/api/jokes?query${query}`).then((res) => {
                setJokeList(res.data)
            });
        }
    }

    if (!jokeList || jokeList.length === 0) {
        return (
            <div className='container'>
                <p className="text-center display-6 m-5 fw-bolder" style={{color: 'red'}}>No Jokes</p>
            </div>
        )
    }

    return (
        <JokeContext.Provider value={{jokeList, setJokeList, refreshJokeList, setQuery}}>
            <div className="container">
                <h1 className="text-center display-2 text-dark m-5 fw-bolder">List of
                    Jokes</h1>

                <JokeFilter></JokeFilter>

                {jokeList.map((joke) => (
                    <SingleJoke key={joke.id} joke={joke}/>
                ))}

                <JokesPagination></JokesPagination>
            </div>
        </JokeContext.Provider>
    )
}
export default JokeMainView;