import React, {useContext, useEffect, useState} from 'react';
import TopicBlock from "components/mainpanel/commons/topicpanel/topicpack/TopicBlock";
import {TopicPackContext} from "components/mainpanel/commons/topicpanel/TopicPackContext";
import axios from "axios";
import TopicPackPagination from "components/mainpanel/commons/topicpanel/topicpack/TopicPackPagination";
import {FaRandom} from "react-icons/all";
import TopicBlockType from "components/mainpanel/commons/topicpanel/topicpack/TopicBlockType";
import {TopicPanelContext} from "components/mainpanel/commons/TopicPanelContext";

const TopicPack = (props) => {

    const [topicCreatorChildList, setTopicCreatorChildList] = useState([])
    const [selectedTopicId, setSelectedTopicId] = useState()
    const [pagination, setPagination] = useState({
        currentPage: 0,
        pageSize: 20
    })
    const {addTopicPack} = useContext(TopicPanelContext)

    useEffect(() => {
        refreshTopicPack()
    }, [props.parentId])

    const changeCurrentPage = (currentPage) => {
        setPagination(prevState => {
            return {...prevState, currentPage: currentPage}
        })
    }

    const refreshTopicPack = async () => {
        axios.get(`http://localhost:8081/api/topics/topic-creator-child-row`, {
            params: {
                topicCreatorChildRowRequestDto: JSON.stringify({
                    parentId: props.parentId,
                    topicPackPagination: {
                        currentPage: pagination.currentPage,
                        pageSize: 20
                    }
                })
            }
        }).then((res) => {
            setTopicCreatorChildList(res.data.topicCreatorChildList)
            setPagination(res.data.topicPackPagination)
        });
    }

    const handleRandom = () => {
        axios.get(`http://localhost:8081/api/topics/random`, {
            params: {
                randomTopicIdRequestDto: JSON.stringify({
                    parentId: props.parentId,
                    totalPages: pagination.totalPages,
                    pageSize: pagination.pageSize
                })
            }
        }).then((res) => {
            addTopicPack(res.data.randomTopicId, props.topicPackNumber)
            changeCurrentPage(res.data.randomPage)
            setTopicCreatorChildList(res.data.topicCreatorChildList)
        })
    }

    return (
        <TopicPackContext.Provider
            value={{refreshTopicPack, pagination, changeCurrentPage,
                setSelectedTopicId, selectedTopicId
            }}>
            <hr></hr>
            <div className="d-flex flex-row justify-content-center">
                <button className="btn-sm btn-outline-primary" onClick={handleRandom}>
                    <div>Random</div>
                    <FaRandom style={{fontSize: "26px"}}/>
                </button>
            </div>
            <div className="d-flex flex-row flex-wrap">
                {topicCreatorChildList.map((topic) => (
                    <TopicBlock
                        key={topic.id}
                        topic={topic}
                        topicPackNumber={props.topicPackNumber}
                        topicBlockType={TopicBlockType.PRESENTER}
                    />
                ))}
                <TopicBlock
                    topic={{parentId: props.parentId}}
                    topicBlockType={TopicBlockType.CREATOR}
                />
            </div>
            <TopicPackPagination></TopicPackPagination>

        </TopicPackContext.Provider>
    );
}

export default TopicPack;