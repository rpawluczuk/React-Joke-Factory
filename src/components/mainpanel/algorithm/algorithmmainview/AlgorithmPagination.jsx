import React, {useEffect, useState, useContext} from 'react';
import ReactPaginate from "react-paginate";
import axios from "axios";
import {AlgorithmContext} from "components/mainpanel/algorithm/AlgorithmContext";


const AlgorithmPagination = () => {

    const [currentPage, setCurrentPage] = useState(0);
    const [totalItems, setTotalItems] = useState();
    const [totalPages, setTotalPages] = useState();
    const [pageSize, setPageSize] = useState(5);
    const {refreshAlgorithmList, algorithmList} = useContext(AlgorithmContext)

    useEffect(() => {
        axios.get(`http://localhost:8082/api/algorithms/pagination`)
            .then((res) => {
                setCurrentPage(res.data.currentPage)
                setTotalItems(res.data.totalItems)
                setTotalPages(res.data.totalPages)
                setPageSize(res.data.pageSize)
            })
    }, [])

    useEffect(() => {
        const pagination = {
            currentPage: currentPage,
            totalItems: totalItems,
            totalPages: totalPages,
            pageSize: pageSize
        }
        axios.put(`http://localhost:8082/api/algorithms/pagination`, pagination)
            .then(refreshAlgorithmList)
    }, [currentPage, pageSize])

    useEffect(() => {
        axios.get(`http://localhost:8082/api/algorithms/pagination`)
            .then((res) => {
                setCurrentPage(res.data.currentPage)
                setTotalItems(res.data.totalItems)
                setTotalPages(res.data.totalPages)
                setPageSize(res.data.pageSize)
            })
    }, [algorithmList])

    const handlePageChange = (event) => {
        setCurrentPage(event.selected)
    };

    const handleSizeChange = (event) => {
        setPageSize(event.target.value)
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
                pageCount={totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageChange}
                containerClassName="pagination"
                activeClassName="active"
                forcePage={currentPage}
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
};

export default AlgorithmPagination;