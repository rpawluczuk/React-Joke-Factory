import React, {useState, useEffect} from 'react';
import TopicBlock from "./topicpack/TopicBlock";
import {TopicPackContext} from "../../../../../context/TopicPackContext";
import axios from "axios";
import TopicBlockCreator from "./topicpack/TopicBlockCreator";

const TopicPack = ({parentId, topicPackNumber}) => {

    const [topicCreatorChildList, setTopicCreatorChildList] = useState([])
    const [selectedTopicId, setSelectedTopicId] = useState()

    useEffect(() => {
        setSelectedTopicId(parentId)
        refreshTopicPack()
    }, [parentId])

    const refreshTopicPack = () => {
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
    }


    return (
        <TopicPackContext.Provider value={{selectedTopicId, setSelectedTopicId, topicPackNumber, refreshTopicPack}}>
            <hr></hr>
            <div className="d-flex flex-row flex-wrap">
                {topicCreatorChildList.map((topic) => (
                    <TopicBlock key={topic.id} topic={topic}/>
                ))}
                <TopicBlockCreator/>
            </div>
        </TopicPackContext.Provider>
    );
}

export default TopicPack;