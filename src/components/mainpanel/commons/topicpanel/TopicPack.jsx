import React, {useState, useEffect, useContext} from 'react';
import TopicBlock from "components/mainpanel/commons/topicpanel/topicpack/TopicBlock";
import {TopicPackContext} from "components/mainpanel/commons/topicpanel/TopicPackContext";
import axios from "axios";
import TopicBlockCreator from "components/mainpanel/commons/topicpanel/topicpack/topicblock/TopicBlockCreator";
import TopicPackPagination from "components/mainpanel/commons/topicpanel/topicpack/TopicPackPagination";
import {FaRandom} from "react-icons/all";
import {TopicPanelContext} from "components/mainpanel/commons/TopicPanelContext";

const TopicPack = ({parentId, topicPackNumber}) => {

    const [topicCreatorChildList, setTopicCreatorChildList] = useState([])
    const [topicParentId, setTopicParentId] = useState()
    const [pagination, setPagination] = useState({
        currentPage: 0,
        pageSize: 20
    })
    const {addTopicPack} = useContext(TopicPanelContext)

    useEffect(() => {
        setTopicParentId(parentId)
        refreshTopicPack(0)
    }, [parentId])

    const changeCurrentPage = (currentPage) => {
        setPagination(prevState => {
            return {...prevState, currentPage: currentPage}
        })
    }

    const refreshTopicPack = async (currentPage) => {
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
            setTopicCreatorChildList(res.data.topicCreatorChildList)
            setPagination(res.data.topicPackPagination)
        });
    }

    const handleRandom = () => {
        axios.get(`http://localhost:8081/api/topics/random`, {
            params: {
                randomTopicIdRequestDto: JSON.stringify({
                    parentId: parentId,
                    totalPages: pagination.totalPages,
                    pageSize: pagination.pageSize
                })
            }
        }).then((res) => {
            setTopicParentId(res.data.randomTopicId)
            addTopicPack(res.data.randomTopicId, topicPackNumber)
            changeCurrentPage(res.data.randomPage)
            setTopicCreatorChildList(res.data.topicCreatorChildList)
        })
    }


    return (
        <TopicPackContext.Provider
            value={{topicParentId, setTopicParentId, topicPackNumber, refreshTopicPack, pagination, changeCurrentPage}}>
            <hr></hr>
            <div className="d-flex flex-row justify-content-center">
                <button className="btn-sm btn-outline-primary" onClick={handleRandom}>
                    <div>Random</div>
                    <FaRandom style={{fontSize: "26px"}}/>
                </button>
            </div>
            <div className="d-flex flex-row flex-wrap">
                {topicCreatorChildList.map((topic) => (
                    <TopicBlock key={topic.id} topicProp={topic}/>
                ))}
                <TopicBlockCreator/>
            </div>
            <TopicPackPagination></TopicPackPagination>

        </TopicPackContext.Provider>
    );
}

export default TopicPack;