import React from 'react';
import ReactPaginate from "react-paginate";


const TopicPackPagination = (props) => {

    const {pagination, onPageChange, onSizeChange} = props;

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
                    forcePage={pagination.number}
                    renderOnZeroPageCount={null}
                />
            <div className="ms-4">
                <span className="d-inline me-3" style={{height: `36px`}}>Page Size</span>
                <select onChange={(e) => onSizeChange(parseInt(e.target.value, 10))} className="d-inline page-item" style={{height: `36px`}}>
                    <option value={11}>11</option>
                    <option value={17}>17</option>
                    <option value={23} selected>23</option>
                    <option value={47}>47</option>
                </select>
            </div>
        </div>
    )
};

export default TopicPackPagination;