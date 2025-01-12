import React, {useEffect, useState} from 'react';
import axios from "axios";
import {TopicMainViewContext} from "components/mainpanel/topic/TopicMainViewContext";
import TopicSearch from "components/mainpanel/topic/topicmainview/TopicSearch";
import TopicList from "components/mainpanel/topic/topicmainview/TopicList";

const TopicMainView = () => {

    const [nameFilter, setNameFilter] = useState('');
    const [pageNumber, setPageNumber] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const [topicView, setTopicView] = useState({})

    useEffect(() => {
        refreshTopicView()
    }, []);

    useEffect(() => {
        refreshTopicView();
    }, [pageNumber]);

    const refreshTopicView = () => {
        const requestBody = {
            nameFilter,
            pageNumber,
            pageSize
        };

        axios.post(`http://localhost:8082/api/topics/view`, requestBody).then((res) => {
            setTopicView(res.data)
        });
    }

    function handleNameFilterChange(event) {
        setNameFilter(event.target.value)
    }

    function handleSearch(event) {
        event.preventDefault();
        setPageNumber(0);
        refreshTopicView();
    }

    function handleCategorySwitch(event) {
        event.preventDefault();
        axios.get(`http://localhost:8082/api/topics/view/category-filter`)
            .then((res) => {
                setTopicView(res.data);
            });
    }

    function handlePageChange(event) {
        setPageNumber(event.selected);
    }

    function handleSizeChange(event) {
        axios.get(`http://localhost:8082/api/topics/view/change-size`, {
            params: {
                pageSize: event.target.value
            }
        }).then((res) => {
            setTopicView(res.data)
        });
    }

    return (
        <TopicMainViewContext.Provider value={{refreshTopicView}}>
            <div className="container">
                <div className="mb-4">
                    <h1 className="text-center display-2 text-dark m-5 fw-bolder">List of Topics</h1>
                    <TopicSearch
                        onNameFilterChange={handleNameFilterChange}
                        onSearch={handleSearch}
                        nameFilter={nameFilter}
                        onCategorySwitch={handleCategorySwitch}
                        categoryFilter={topicView.categoryFilter}
                    />
                    {(!topicView.content || topicView.content.length === 0)
                        ? <p className="text-center display-6 m-5 fw-bolder" style={{color: 'red'}}>No Topics</p>
                        : <TopicList
                            topicView={topicView}
                            onPageChange={handlePageChange}
                            onSizeChange={handleSizeChange}>
                        </TopicList>
                    }
                </div>
            </div>
        </TopicMainViewContext.Provider>
    )
}

export default TopicMainView;