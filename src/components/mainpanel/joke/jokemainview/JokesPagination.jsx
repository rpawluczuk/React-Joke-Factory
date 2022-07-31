import React, {useContext, useEffect, useState} from 'react';
import ReactPaginate from 'react-paginate';
import axios from "axios";
import {JokeContext} from "../../../../context/JokeContext";



const JokesPagination = () => {

    const [pagination, setPagination] = useState({});
    const {refreshJokeList} = useContext(JokeContext)

    useEffect(() => {
        axios.get(`http://localhost:8081/api/jokes/pagination`).then((res) => {
            setPagination(res.data)
        })
    }, [])

    useEffect(() => {
        axios.put(`http://localhost:8081/api/jokes/pagination`, pagination).then(refreshJokeList)
    }, [pagination.currentPage])

    const handlePageChange = (event) => {
        setPagination(prevState => {
            return {...prevState, currentPage: event.selected}
        })
    };

    return (
        <div className={"d-flex justify-content-center"}>
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
                pageCount={pagination.totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName="pagination"
                activeClassName="active"
                forcePage={pagination.currentPage}
                renderOnZeroPageCount={null}
            />
        </div>
    );
}

export default JokesPagination;
