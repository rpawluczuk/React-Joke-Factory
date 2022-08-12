import React, {useContext} from 'react';
import {FaEdit, FaTimes} from "react-icons/all";
import {useNavigate} from "react-router-dom";
import {JokeContext} from "../../../../../context/JokeContext";
import axios from "axios";

const SingleJoke = ({joke}) => {
    const navigate = useNavigate();
    const {refreshJokeList} = useContext(JokeContext)

    const handleEditJoke = (id) => {
        navigate(`/joke-edition/${id}`)
    }

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            axios.delete(`http://localhost:8081/api/jokes/${id}`)
                .then(refreshJokeList)
        }
    }

    return (
        <div className="card mb-4" style={{background: "azure"}}>
            <div className='d-flex flex-row justify-content-between'>
                <h2 className='card-title pt-4 px-4'> {joke.title} </h2>
                <div className='card-header-tabs px-2'>
                    <button className='Item-top-button' onClick={() => handleEditJoke(joke.id)}><FaEdit/></button>
                    <button className='Item-top-button' onClick={() => handleDelete(joke.id)}><FaTimes/></button>
                </div>
            </div>
            <div className='card-body px-4'>
                <pre style={{whiteSpace: 'pre-wrap', fontSize: 'larger', fontFamily: 'serif'}}>{joke.content}</pre>
                <div className='d-flex flex-row justify-content-end' style={{color: 'grey'}}> Author: { joke.author } </div>
            </div>
        </div>
    )
}
export default SingleJoke;