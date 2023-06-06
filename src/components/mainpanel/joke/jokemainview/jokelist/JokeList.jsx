import React from 'react';
import SingleJoke from "components/mainpanel/joke/jokemainview/jokelist/singlejoke/SingleJoke";
import JokesPagination from "components/mainpanel/joke/jokemainview/jokelist/JokesPagination";

const JokeList = (props) => {

    const {
        jokeList
    } = props;

    if (!jokeList || jokeList.length === 0) {
        return (
            <div className='container'>
                <p className="text-center display-6 m-5 fw-bolder" style={{color: 'red'}}>No Jokes</p>
            </div>
        )
    }

    return (
        <>
            {jokeList.map((joke) => (
                <SingleJoke key={joke.id} joke={joke}/>
            ))}

            <JokesPagination></JokesPagination>
        </>
    );
};

export default JokeList;