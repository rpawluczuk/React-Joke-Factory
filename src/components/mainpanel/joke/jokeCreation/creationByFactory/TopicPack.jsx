import React, {useState, useEffect} from 'react';
import TopicChildBlock from "./topicpack/TopicChildBlock";
import {TopicContext} from "../../../../../context/TopicContext";
import axios from "axios";

const TopicPack = ({parentId, topicPackNumber}) => {

    const [topicCreatorChildList, setTopicCreatorChildList] = useState([])
    // const [topicPackNumber, setTopicPackNumber] = useState()

    useEffect(() => {
        console.log(parentId)
        const topicCreatorChildRowRequestDto = {
            parentId: parentId,
            topicPagination: {
                currentPage: 0,
                totalItems: 0,
                totalPages: 0,
                pageSize: 20
            }
        }
        axios.get(`http://localhost:8081/api/topics/topic-creator-child-row`, {
            params: {
                topicCreatorChildRowRequestDto: JSON.stringify(topicCreatorChildRowRequestDto)
            }
        }).then((res) => {
            setTopicCreatorChildList(res.data.topicCreatorChildList)
        });
    }, [parentId])

    const [selectedTopicId, setSelectedTopicId] = useState([])

    return (
        <TopicContext.Provider value={{selectedTopicId, setSelectedTopicId, topicPackNumber}}>
            <hr></hr>
            <div className="d-flex flex-row flex-wrap">
                {topicCreatorChildList.map((topic) => (
                    <TopicChildBlock key={topic.id} topic={topic}/>
                ))}
            </div>
        </TopicContext.Provider>
    );
}

export default TopicPack;