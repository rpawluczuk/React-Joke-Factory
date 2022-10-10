import React, {useContext, useEffect, useState} from 'react';
import TopicBlock from "components/mainpanel/commons/topicpanel/topicpack/TopicBlock";
import {TopicPackContext} from "components/mainpanel/commons/topicpanel/TopicPackContext";
import axios from "axios";
import TopicPackPagination from "components/mainpanel/commons/topicpanel/topicpack/TopicPackPagination";
import {FaRandom} from "react-icons/all";
import TopicBlockType from "components/mainpanel/commons/topicpanel/topicpack/TopicBlockType";
import {TopicPanelContext} from "components/mainpanel/commons/TopicPanelContext";

const TopicPack = (props) => {

    const {parentId, topicPackNumber} = props;

    const [topicList, setTopicList] = useState([])
    const [selectedTopicId, setSelectedTopicId] = useState()
    const [pagination, setPagination] = useState({
        currentPage: 0,
        pageSize: 20
    })
    const {addTopicPack} = useContext(TopicPanelContext)

    useEffect(() => {
        refreshTopicPack()
    }, [parentId, pagination.currentPage])

    function handlePageChange(pageNumber) {
        setPagination({...pagination, currentPage: pageNumber})
    }

    const refreshTopicPack = async () => {
        console.log("refresch pack")
        axios.get(`http://localhost:8081/api/topics/topic-creator-child-row`, {
            params: {
                topicCreatorChildRowRequestDto: JSON.stringify({
                    parentId: parentId,
                    topicPackPagination: {
                        currentPage: pagination.currentPage,
                        pageSize: 20
                    }
                })
            }
        }).then((res) => {
            setTopicList(res.data.topicCreatorChildList)
            setPagination(res.data.topicPackPagination)
        });
    }

    const handleRandomClick = async () => {
        const numer = axios.get(`http://localhost:8081/api/topics/random`, {
            params: {
                randomTopicIdRequestDto: JSON.stringify({
                    parentId: props.parentId,
                    totalPages: pagination.totalPages,
                    pageSize: pagination.pageSize
                })
            }
        }).then(async (res) => {
            await addTopicPack(res.data.randomTopicId, props.topicPackNumber)
            await handlePageChange(res.data.randomPage)
            await setTopicList(res.data.topicCreatorChildList)
            await setSelectedTopicId(res.data.randomTopicId)
            return res.data.randomTopicId
        })
        await setSelectedTopicId(numer)
    }

    return (
        <TopicPackContext.Provider
            value={{refreshTopicPack, pagination,
                setSelectedTopicId, selectedTopicId
            }}>
            <hr></hr>
            <div className="d-flex flex-row justify-content-center">
                <button className="btn-sm btn-outline-primary" onClick={handleRandomClick}>
                    <div>Random</div>
                    <FaRandom style={{fontSize: "26px"}}/>
                </button>
            </div>
            <div className="d-flex flex-row flex-wrap">
                {topicList.map((topic) => (
                    <TopicBlock
                        key={topic.id}
                        topic={topic}
                        selectedTopicId={selectedTopicId}
                        topicPackNumber={topicPackNumber}
                        topicBlockType={TopicBlockType.PRESENTER}
                    />
                ))}
                <TopicBlock
                    topic={{parentId: parentId}}
                    topicBlockType={TopicBlockType.CREATOR}
                />
            </div>
            <TopicPackPagination
                pagination={pagination}
                onPageChange={handlePageChange}>
            </TopicPackPagination>

        </TopicPackContext.Provider>
    );
}

export default TopicPack;