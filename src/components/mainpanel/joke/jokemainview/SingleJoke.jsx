import React, {useContext, useEffect, useState} from 'react';
import {FaEdit, FaTimes} from "react-icons/all";
import {useNavigate} from "react-router-dom";
import {JokeContext} from "../JokeContext";
import axios from "axios";
import {Button} from "react-bootstrap";
import ReactPaginate from "react-paginate";

import "components/mainpanel/joke/jokemainview/singlejoke/JokeBlock.css";
import JokeBlock from "components/mainpanel/joke/jokemainview/singlejoke/JokeBlock";

const SingleJoke = ({joke}) => {

    const [isDetailsButtonClicked, setIsDetailsButtonClicked] = useState(false)
    const [algorithmItemList, setAlgorithmItemList] = useState([])
    const [currentAlgorithmIndex, setCurrentAlgorithmIndex] = useState()
    const [jokeBlockList, setJokeBlockList] = useState([])
    const navigate = useNavigate();
    const {refreshJokeList} = useContext(JokeContext)

    useEffect(() => {
        if (algorithmItemList.length > 0) {
            const algorithmId = algorithmItemList[currentAlgorithmIndex].value;
            axios.get(`http://localhost:8082/api/joke-diagram/${joke.id}/${algorithmId}`)
                .then((res) => {
                    setJokeBlockList(res.data)
                })
        }
    }, [currentAlgorithmIndex])

    const handleEditJoke = (id) => {
        navigate(`/joke-edition/${id}`)
    }

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            axios.delete(`http://localhost:8082/api/jokes/${id}`)
                .then(refreshJokeList)
        }
    }

    function handleDetailsClick(id) {
        axios.get(`http://localhost:8082/api/algorithms/item-list/${id}`)
            .then((res) => {
                setCurrentAlgorithmIndex(0)
                setAlgorithmItemList(res.data)
                setIsDetailsButtonClicked(!isDetailsButtonClicked)
            })
    }

    const handleAlgorithmChange = (event) => {
        setCurrentAlgorithmIndex(event.selected)
    };

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
                <div className='d-flex flex-row justify-content-between' style={{color: 'grey'}}>
                    <div>Creation Date: {joke.dateCreated}</div>
                    <div>Author: {joke.author}</div>
                </div>
            </div>
            <div className='d-flex justify-content-center mb-3'>
                <Button variant="outline-primary" onClick={() => handleDetailsClick(joke.id)}>Details</Button>
            </div>
            {isDetailsButtonClicked &&
                <div className="d-flex flex-column align-items-center">
                    <ReactPaginate
                        previousLabel="< previous"
                        nextLabel="next >"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        pageCount={algorithmItemList.length}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handleAlgorithmChange}
                        containerClassName="pagination"
                        activeClassName="active"
                        forcePage={currentAlgorithmIndex}
                        renderOnZeroPageCount={null}
                    />
                    {algorithmItemList[currentAlgorithmIndex] && (
                        <h2>{algorithmItemList[currentAlgorithmIndex].label}</h2>
                    )}
                    <div className="d-flex align-items-center flex-column">
                        {jokeBlockList.map((jokeBlock) => (
                            <JokeBlock jokeBlock={jokeBlock}/>
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}
export default SingleJoke;