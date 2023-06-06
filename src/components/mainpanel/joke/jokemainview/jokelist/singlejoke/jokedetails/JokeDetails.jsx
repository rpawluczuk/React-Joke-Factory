import React, {useState, useEffect} from 'react';
import ReactPaginate from "react-paginate";
import JokeBlock from "components/mainpanel/joke/jokemainview/jokelist/singlejoke/jokedetails/jokeblock/JokeBlock";
import {FaArrowDown} from "react-icons/all";
import axios from "axios";

const JokeDetails = (props) => {

    const {
        algorithmItemList = [],
        jokeId
    } = props;

    const [currentAlgorithmIndex, setCurrentAlgorithmIndex] = useState(0)
    const [jokeBlockList, setJokeBlockList] = useState([])

    useEffect(() => {
        if (algorithmItemList.length > 0) {
            const algorithmId = algorithmItemList[currentAlgorithmIndex].value;
            axios.get(`http://localhost:8082/api/joke-diagram/${jokeId}/${algorithmId}`)
                .then((res) => {
                    setJokeBlockList(res.data)
                })
        }
    }, [currentAlgorithmIndex])

    const handleAlgorithmChange = (event) => {
        setCurrentAlgorithmIndex(event.selected)
    };

    return (
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
                {jokeBlockList.map((jokeBlock, index) => (
                    <>
                        <JokeBlock jokeBlock={jokeBlock}/>
                        {index !== jokeBlockList.length - 1 &&
                            <div className="d-flex flex-column justify-content-center">
                                <FaArrowDown style={{fontSize: "52px"}}/>
                            </div>
                        }
                    </>
                ))}
            </div>
        </div>
    );
};

export default JokeDetails;