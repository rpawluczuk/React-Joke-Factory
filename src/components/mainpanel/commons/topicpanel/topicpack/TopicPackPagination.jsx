import React, {useContext} from 'react';
import {TopicPackContext} from "components/mainpanel/commons/topicpanel/TopicPackContext";
import ReactPaginate from "react-paginate";


const TopicPackPagination = (props) => {

    const {pagination, onPageChange} = props;

    return (
        <div className="d-flex justify-content-center mb-5">

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
                    onPageChange={(e) => onPageChange(e.selected)}
                    containerClassName="pagination"
                    activeClassName="active"
                    forcePage={pagination.currentPage}
                    renderOnZeroPageCount={null}
                />
        </div>
    )
};

export default TopicPackPagination;