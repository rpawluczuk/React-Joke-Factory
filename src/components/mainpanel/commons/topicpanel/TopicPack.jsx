import React, {useContext, useEffect, useState} from 'react';
import TopicBlock from "components/mainpanel/commons/topicpanel/topicpack/TopicBlock";
import {TopicPackContext} from "components/mainpanel/commons/topicpanel/TopicPackContext";
import axios from "axios";
import TopicPackPagination from "components/mainpanel/commons/topicpanel/topicpack/TopicPackPagination";
import {FaRandom} from "react-icons/all";
import TopicBlockType from "components/mainpanel/commons/topicpanel/topicpack/TopicBlockType";
import {TopicPanelContext} from "components/mainpanel/commons/TopicPanelContext";
import TopicPackFilter from "components/mainpanel/commons/topicpanel/topicpack/TopicPackFilter";

const TopicPack = (props) => {

    const {parentTopic, topicPackNumber, categoryList} = props;
    const [categoryFilter, setCategoryFilter] = useState({
        value: 0,
        label: "All"
    })
    const [topicList, setTopicList] = useState([])
    const [selectedTopicId, setSelectedTopicId] = useState()
    const [pagination, setPagination] = useState({
        currentPage: 0,
        pageSize: 20
    })
    const {addTopicPack} = useContext(TopicPanelContext)

    useEffect(() => {
        refreshTopicPack()
    }, [parentTopic, pagination.currentPage])

    function handlePageChange(pageNumber) {
        setPagination({...pagination, currentPage: pageNumber})
    }

    function handleCategorySelect(selectedCategory) {
        setCategoryFilter(selectedCategory)
        axios.get(`http://localhost:8081/api/topics/pack-filter`,
            {
                params: {
                    categoryId: selectedCategory.value,
                    parentId: parentTopic.id,
                    pageSize: pagination.pageSize
                }
            }).then((res) => {
            setTopicList(res.data)
        });
    }

    const refreshTopicPack = async () => {
        axios.get(`http://localhost:8081/api/topics/topic-creator-child-row`, {
            params: {
                topicCreatorChildRowRequestDto: JSON.stringify({
                    parentId: parentTopic.id,
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
        const number = axios.get(`http://localhost:8081/api/topics/random`, {
            params: {
                randomTopicIdRequestDto: JSON.stringify({
                    parentId: props.parentId,
                    totalPages: pagination.totalPages,
                    pageSize: pagination.pageSize
                })
            }
        }).then(async (res) => {
            await addTopicPack(res.data.randomTopic, props.topicPackNumber)
            await handlePageChange(res.data.randomPage)
            await setTopicList(res.data.topicCreatorChildList)
            await setSelectedTopicId(res.data.randomTopic.id)
            return res.data.randomTopicId
        })
        await setSelectedTopicId(number)
    }

    return (
        <TopicPackContext.Provider
            value={{refreshTopicPack, pagination, setSelectedTopicId, selectedTopicId}}>
            <hr></hr>
            {parentTopic.category === false &&
                <TopicPackFilter
                    categoryFilter={categoryFilter}
                    categoryList={categoryList}
                    onCategorySelect={handleCategorySelect}>
                </TopicPackFilter>
            }
            <div className="d-flex flex-row justify-content-center mt-3">
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
                    topic={{parentId: parentTopic.id}}
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