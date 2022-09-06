import React, {useEffect, useState}from 'react';
import axios from "axios";
import SingleTopic from "./topicmainview/SingleTopic";
import {TopicContext} from "./TopicContext";
import TopicPackPagination from "../commons/topicpanel/topicpack/TopicPackPagination";
import TopicPagination from "./topicmainview/TopicPagination";

const TopicMainView = () => {

    const [topicList, setTopicList] = useState([])

    useEffect(() => {
        refreshTopicList()
    }, [])

    const refreshTopicList = () => {
        axios.get(`http://localhost:8081/api/topics`).then((res) => {
            setTopicList(res.data)
        });
    }

    if (!topicList || topicList.length === 0) {
        return (
            <div className='container'>
                <p className="text-center display-6 m-5 fw-bolder" style={{color: 'red'}}>No Topics</p>
            </div>
        )
    }

    return (
        <TopicContext.Provider value={{topicList, setTopicList, refreshTopicList}}>
            <div className="container">
                <div className="mb-4">
                    <h1 className="text-center display-2 text-dark m-5 fw-bolder">List of Topics</h1>
                    {topicList.map((topic) => (
                        <SingleTopic key={topic.id} topic={topic}/>
                    ))}
                </div>
                <TopicPagination></TopicPagination>
            </div>
        </TopicContext.Provider>
    )
}

export default TopicMainView;