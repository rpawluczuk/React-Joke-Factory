import React, {useContext} from 'react';
import ReactPaginate from "react-paginate";
import axios from "axios";
import {TopicPanelContext} from "components/mainpanel/commons/TopicPanelContext";


const TopicPackPagination = (props) => {

    const {pagination, onPageChange, topicPackIndex} = props;
    const {addTopicPack} = useContext(TopicPanelContext)

    function handleSizeChange(event) {
        axios.get(`http://localhost:8081/api/topics/panel/change-size`, {
            params: {
                pageSize: event.target.value,
                topicPackIndex: topicPackIndex
            }
        }).then((res) => {
            console.log('page size')
            console.log(res.data)
            addTopicPack(res.data, topicPackIndex);
        });
    }

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
                <select onChange={handleSizeChange} className="d-inline page-item" style={{height: `36px`}}>
                    <option>11</option>
                    <option>17</option>
                    <option selected="true">23</option>
                    <option>47</option>
                </select>
            </div>
        </div>
    )
};

export default TopicPackPagination;