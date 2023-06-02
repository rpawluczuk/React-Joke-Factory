import React, {useEffect, useState} from 'react';
import {JokeContext} from "./JokeContext";
import axios from "axios";
import JokeFilter from "./jokemainview/JokeFilter";
import JokeList from "components/mainpanel/joke/jokemainview/jokelist/JokeList";

const JokeMainView = () => {

const [jokeList, setJokeList] = useState([])
const [query, setQuery] = useState({})

    useEffect(() => {
        refreshJokeList()
    }, [])

    useEffect(() => {
        refreshJokeList()
    }, [query])

    const refreshJokeList = () => {
        const queryParameters = Object.entries(query).map(([key, value]) => `${key}=${value}`).join('&');
        const url = queryParameters ? `http://localhost:8082/api/jokes/filtered?${queryParameters}` : `http://localhost:8082/api/jokes`;

        axios.get(url).then((res) => {
            setJokeList(res.data)
        });
    }

    return (
        <JokeContext.Provider value={{jokeList, setJokeList, refreshJokeList, setQuery}}>
            <div className="container">
                <h1 className="text-center display-2 text-dark m-5 fw-bolder">List of
                    Jokes</h1>
                <JokeFilter></JokeFilter>
                <JokeList jokeList={jokeList}/>
            </div>
        </JokeContext.Provider>
    )
}
export default JokeMainView;