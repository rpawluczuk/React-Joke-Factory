import React, {useContext, useState, useRef, useEffect} from 'react';
import {FaEdit, FaTimes} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {JokeContext} from "components/mainpanel/joke/JokeContext";
import axios from "axios";
import "components/mainpanel/joke/jokemainview/jokelist/singlejoke/jokedetails/jokeblock/JokeBlock.css";
import JokeDetails from "components/mainpanel/joke/jokemainview/jokelist/singlejoke/jokedetails/JokeDetails";

const SingleJoke = ({joke}) => {

    const [isDetailsButtonClicked, setIsDetailsButtonClicked] = useState(false)
    const [algorithmItemList, setAlgorithmItemList] = useState([])
    const navigate = useNavigate();
    const {refreshJokeList} = useContext(JokeContext)
    const paginateRef = useRef(null);
    const jokeRef = useRef(null);


    useEffect(() => {
        if (jokeRef.current) {
            jokeRef.current.addEventListener('click', handleDetailsClick);
        }
        return () => {
            if (jokeRef.current) {
                jokeRef.current.removeEventListener('click', handleDetailsClick);
            }
        };
    }, []);

    const handleEditJoke = (id) => {
        navigate(`/joke-edition/${id}`)
    }

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            axios.delete(`http://localhost:8082/api/jokes/${id}`)
                .then(refreshJokeList)
        }
    }

    function handleDetailsClick(e) {
        if (paginateRef.current && paginateRef.current.contains(e.target)) {
            return;
        }
        axios.get(`http://localhost:8082/api/algorithms/item-list/${joke.id}`)
            .then((res) => {
                setAlgorithmItemList(res.data)
                setIsDetailsButtonClicked(prev => !prev)
            })
    }

    return (
        <div className="card mb-4" style={{background: "azure"}}
             ref={jokeRef}>
            <div className='d-flex flex-row justify-content-between'>
                <h2 className='card-title pt-4 px-4'> {joke.title} </h2>
                <div className='card-header-tabs px-2'>
                    <button className='Item-top-button' onClick={() => handleEditJoke(joke.id)}><FaEdit/></button>
                    <button className='Item-top-button' onClick={() => handleDelete(joke.id)}><FaTimes/></button>
                </div>
            </div>
            <div className='card-body px-4'>
                <pre style={{whiteSpace: 'pre-wrap', fontSize: 'larger', fontFamily: 'serif'}}>{joke.content}</pre>
                <div className='d-flex flex-row justify-content-between' style={{color: 'grey'}}>
                    <div>Creation Date: {joke.dateCreated}</div>
                    <div>Author: {joke.author}</div>
                </div>
            </div>
            {isDetailsButtonClicked &&
                <JokeDetails algorithmItemList={algorithmItemList}
                             jokeId={joke.id}
                             paginateRef={paginateRef}/>
            }
        </div>
    )
}
export default SingleJoke;