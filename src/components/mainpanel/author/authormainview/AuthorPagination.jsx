import React, {useContext, useEffect, useState} from 'react';
import ReactPaginate from 'react-paginate';
import axios from "axios";
import {AuthorContext} from "../../../../context/AuthorContext";


const AuthorPagination = () => {

    const [pagination, setPagination] = useState({});
    const {refreshAuthorList} = useContext(AuthorContext)

    useEffect(() => {
        getPagination()
    }, [])

    useEffect(() => {
        axios.put(`http://localhost:8081/api/authors/pagination`, pagination).then(() => {
            refreshAuthorList()
        }).then(() => {
            getPagination()
        })
    }, [pagination.currentPage, pagination.pageSize])

    const getPagination = () => {
        axios.get(`http://localhost:8081/api/authors/pagination`).then((res) => {
            setPagination(res.data)
        })
    };

    const handlePageChange = (event) => {
        setPagination(prevState => {
            return {...prevState, currentPage: event.selected}
        })
    };

    const handleSizeChange = (event) => {
        setPagination(prevState => {
            return {...prevState, pageSize: event.target.value}
        })
    };

    return (
        <div className={"d-flex flex-row justify-content-center"}>
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
            <div className="ms-4">
                <span className="d-inline me-3" style={{height: `36px`}}>Page Size</span>
                <select onChange={handleSizeChange} className="d-inline page-item" style={{height: `36px`}}>
                    <option selected="true">5</option>
                    <option>10</option>
                    <option>20</option>
                    <option>50</option>
                </select>
            </div>
        </div>
    );
}

export default AuthorPagination;
