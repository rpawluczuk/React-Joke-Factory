import React from 'react';
import ReactPaginate from 'react-paginate';

const TopicPagination = (props) => {

    const {number, totalPages, onPageChange, onSizeChange} = props;

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
                onPageChange={onPageChange}
                containerClassName="pagination"
                activeClassName="active"
                forcePage={number}
                renderOnZeroPageCount={null}
            />
            <div className="ms-4">
                <span className="d-inline me-3" style={{height: `36px`}}>Page Size</span>
                <select onChange={onSizeChange} className="d-inline page-item" style={{height: `36px`}}>
                    <option selected="true">5</option>
                    <option>10</option>
                    <option>20</option>
                    <option>50</option>
                </select>
            </div>
        </div>
    );
}

export default TopicPagination;