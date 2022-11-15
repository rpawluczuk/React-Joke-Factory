import React, {useEffect, useState} from 'react';
import axios from "axios";
import {TopicContext} from "./TopicContext";
import TopicSearch from "components/mainpanel/topic/topicmainview/TopicSearch";
import TopicList from "components/mainpanel/topic/topicmainview/TopicList";

const TopicMainView = () => {

    const [topicView, setTopicView] = useState({})
    const [searchControl, setSearchControl] = useState("")

    useEffect(() => {
        refreshTopicView()
    }, [])

    const refreshTopicView = () => {
        axios.get(`http://localhost:8081/api/topics/view`).then((res) => {
            setTopicView(res.data)
        });
    }

    function handleSearchControlChange(event) {
        setSearchControl(event.target.value)
    }

    function handleSearchFormSubmit(event) {
        event.preventDefault();
        axios.get(`http://localhost:8081/api/topics/view/by-name?name=${searchControl}`).then((res) => {
            setTopicView(res.data)
        });
    }

    function handleCategorySwitch(event) {
        event.preventDefault();
        axios.get(`http://localhost:8081/api/topics/view/category-filter`)
            .then((res) => {
                setTopicView(res.data);
            });
    }

    function handlePageChange(event) {
        axios.get(`http://localhost:8081/api/topics/view/change-page`, {
            params: {
                pageNumber: event.selected
            }
        }).then((res) => {
            setTopicView(res.data)
        });
    }

    function handleSizeChange(event) {
        axios.get(`http://localhost:8081/api/topics/view/change-size`, {
            params: {
                pageSize: event.target.value
            }
        }).then((res) => {
            setTopicView(res.data)
        });
    }

    return (
        <TopicContext.Provider>
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
        </TopicContext.Provider>
    )
}

export default TopicMainView;