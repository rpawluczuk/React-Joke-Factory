import React, {useState, useEffect} from 'react';
import TopicBlock from "./topicpack/TopicBlock";
import {TopicPackContext} from "../../../../../context/TopicPackContext";
import axios from "axios";
import TopicBlockCreator from "./topicpack/TopicBlockCreator";
import TopicPackPagination from "./topicpack/TopicPackPagination";

const TopicPack = ({parentId, topicPackNumber}) => {

    const [topicCreatorChildList, setTopicCreatorChildList] = useState([])
    const [topicParentId, setTopicParentId] = useState()
    const [pagination, setPagination] = useState({
        currentPage: 0,
        pageSize: 20
    })

    useEffect(() => {
        setTopicParentId(parentId)
        refreshTopicPack(0)
    }, [parentId])

    const changeCurrentPage = (currentPage) => {
        setPagination(prevState => {
            return {...prevState, currentPage: currentPage}
        })
    }

    const refreshTopicPack = (currentPage) => {
        console.log(currentPage)
        axios.get(`http://localhost:8081/api/topics/topic-creator-child-row`, {
            params: {
                topicCreatorChildRowRequestDto: JSON.stringify({
                    parentId: parentId,
                    topicPackPagination: {
                        currentPage: currentPage,
                        pageSize: 20
                    }
                })
            }
        }).then((res) => {
            console.log(res.data.topicCreatorChildList)
            setTopicCreatorChildList(res.data.topicCreatorChildList)
            setPagination(res.data.topicPackPagination)
        });
    }


    return (
        <TopicPackContext.Provider
            value={{topicParentId, setTopicParentId, topicPackNumber, refreshTopicPack, pagination, changeCurrentPage}}>
            <hr></hr>
            <div className="d-flex flex-row flex-wrap">
                {topicCreatorChildList.map((topic) => (
                    <TopicBlock key={topic.id} topic={topic}/>
                ))}
                <TopicBlockCreator/>
            </div>
            <TopicPackPagination></TopicPackPagination>

        </TopicPackContext.Provider>
    );
}

export default TopicPack;