import React, {useEffect, useState} from 'react';
import axios from "axios";
import {TopicContext} from "./TopicContext";
import TopicSearch from "components/mainpanel/topic/topicmainview/TopicSearch";
import TopicList from "components/mainpanel/topic/topicmainview/TopicList";

const TopicMainView = () => {

    const [topicList, setTopicList] = useState([])
    const [searchControl, setSearchControl] = useState("")

    useEffect(() => {
        refreshTopicList()
    }, [])

    const refreshTopicList = () => {
        axios.get(`http://localhost:8081/api/topics`).then((res) => {
            setTopicList(res.data)
        });
    }

    function handleSearchControlChange(event) {
        setSearchControl(event.target.value)
    }

    function handleSearchFormSubmit(event) {
        event.preventDefault();
        axios.get(`http://localhost:8081/api/topics/by-name?name=${searchControl}`).then((res) => {
            setTopicList(res.data)
        });
    }

    return (
        <TopicContext.Provider value={{topicList, setTopicList, refreshTopicList}}>
            <div className="container">
                <div className="mb-4">
                    <h1 className="text-center display-2 text-dark m-5 fw-bolder">List of Topics</h1>
                    <TopicSearch
                        onSearchControlChange={handleSearchControlChange}
                        onSearchFormSubmit={handleSearchFormSubmit}
                        searchControl={searchControl}
                    />
                    { (!topicList || topicList.length === 0)
                        ? <p className="text-center display-6 m-5 fw-bolder" style={{color: 'red'}}>No Topics</p>
                        : <TopicList topicList={topicList}></TopicList>
                    }
                </div>
            </div>
        </TopicContext.Provider>
    )
}

export default TopicMainView;