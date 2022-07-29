import React, {useEffect, useState, createContext, useContext} from 'react';
import SingleJoke from "./singlejoke/SingleJoke";
import axios from "axios";
import JokeProvider from "../../../../context/JokeContext";

const JokeMainView = () => {

    const [jokeList, setJokeList] = useState(null)

    useEffect(() => {
        axios.get(`http://localhost:8081/api/jokes`).then((res) => {
            setJokeList(res.data)
        })
    }, [jokeList])

    if (!jokeList || jokeList.length === 0) {
        return (
            <div className='container'>
                <p className="text-center display-6 m-5 fw-bolder" style={{color: 'red'}}>No Jokes</p>
            </div>
        )
    }

    return (
        <JokeProvider>
            <div className="container">
                <h1 className="text-center display-2 text-dark m-5 fw-bolder">List of
                    Jokes</h1>
                {jokeList.map((joke) => (
                    <SingleJoke key={joke.id} joke={joke}/>
                ))}
            </div>
        </JokeProvider>
    )
}
export default JokeMainView;