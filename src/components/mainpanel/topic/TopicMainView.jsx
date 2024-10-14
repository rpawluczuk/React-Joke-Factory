import React, {useEffect, useState} from 'react';
import axios from "axios";
import {TopicMainViewContext} from "components/mainpanel/topic/TopicMainViewContext";
import TopicSearch from "components/mainpanel/topic/topicmainview/TopicSearch";
import TopicList from "components/mainpanel/topic/topicmainview/TopicList";

const TopicMainView = () => {

    const [topicView, setTopicView] = useState({})
    const [searchControl, setSearchControl] = useState("")
    const [viewRequest, setViewRequest] = useState({
        pageNumber: 0,
        pageSize: 10
    })

    useEffect(() => {
        refreshTopicView()
    }, []);

    useEffect(() => {
        refreshTopicView();
    }, [viewRequest.pageNumber]);

    const refreshTopicView = () => {
        axios.post(`http://localhost:8082/api/topics/view`, viewRequest).then((res) => {
            setTopicView(res.data)
        });
    }

    function handleSearchControlChange(event) {
        setSearchControl(event.target.value)
    }

    function handleSearchFormSubmit(event) {
        event.preventDefault();
        axios.get(`http://localhost:8082/api/topics/view/by-name?name=${searchControl}`).then((res) => {
            setTopicView(res.data)
        });
    }

    function handleCategorySwitch(event) {
        event.preventDefault();
        axios.get(`http://localhost:8082/api/topics/view/category-filter`)
            .then((res) => {
                setTopicView(res.data);
            });
    }

    function handlePageChange(event) {
        setViewRequest(prevState => ({
            ...prevState,
            pageNumber: event.selected
        }));
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
                        onSearchControlChange={handleSearchControlChange}
                        onSearchFormSubmit={handleSearchFormSubmit}
                        searchControl={searchControl}
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