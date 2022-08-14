import React, {useState, useEffect} from 'react';
import TopicChildBlock from "./topicchildset/TopicChildBlock";
import {TopicContext} from "../../../../../context/TopicContext";
import axios from "axios";

const TopicChildSet = ({topicSet}) => {

    const [topicCreatorChildList, setTopicCreatorChildList] = useState([])

    useEffect(() => {
        const topicCreatorChildRowRequestDto = {
            parentId: topicSet.parentId,
            topicPagination: {
                currentPage: 0,
                totalItems: 0,
                totalPages: 0,
                pageSize: 20
            }
        }
        console.log(topicCreatorChildRowRequestDto)
        axios.get(`http://localhost:8081/api/topics/topic-creator-child-row`, {
            params: {
                topicCreatorChildRowRequestDto: JSON.stringify(topicCreatorChildRowRequestDto)
            }
        }).then((res) => {
            setTopicCreatorChildList(res.data.topicCreatorChildList)
        });
    }, [topicSet])

    const [selectedTopicId, setSelectedTopicId] = useState([])

    return (
        <TopicContext.Provider value={{selectedTopicId, setSelectedTopicId}}>
            <div className="d-flex flex-row flex-wrap">
                {topicCreatorChildList.map((topic) => (
                    <TopicChildBlock key={topic.id} topic={topic}/>
                ))}
            </div>
        </TopicContext.Provider>
    );
}

export default TopicChildSet;