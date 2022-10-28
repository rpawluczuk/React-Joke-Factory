import React, {useEffect, useState} from 'react';
import TopicPack from "components/mainpanel/commons/topicpanel/TopicPack";
import {TopicPanelContext} from "components/mainpanel/commons/TopicPanelContext";
import TopicBlock from "components/mainpanel/commons/topicpanel/topicpack/TopicBlock";
import axios from "axios";

const TopicPanel = (props) => {

    const {initialTopicType, initialTopic} = props;
    const [topicItemList, setTopicItemList] = useState([])
    const [selectedTopicList, setSelectedTopicList] = useState([])
    const [categoryList, setCategoryList] = useState([])

    useEffect(() => {
        if (initialTopic.id !== undefined) {
            setSelectedTopicList([
                initialTopic
            ])
        }
        refreshTopicItemList()
        axios.get(`http://localhost:8081/api/topics/category-list`).then((res) => {
            setCategoryList(res.data)
        });
    }, [initialTopic])

    const addTopicPack = (parentTopic, topicPackNumber) => {
        setSelectedTopicList(oldArray => [...oldArray.slice(0, topicPackNumber + 1),
            parentTopic
        ]);
    }

    function refreshTopicItemList() {
        axios.get(`http://localhost:8081/api/topics/list-items`).then((res) => {
            setTopicItemList(res.data)
        });
    }

    return (
        <TopicPanelContext.Provider value={{selectedTopicIdList: selectedTopicList, addTopicPack, refreshTopicItemList, topicItemList}}>
            <div className="d-flex flex-column align-items-center">
                <TopicBlock
                    topic={initialTopic}
                    showChildren={false}
                    topicBlockType={initialTopicType}>
                </TopicBlock>
            </div>
            {selectedTopicList.map((parentTopic, index) => (
                <TopicPack
                    parentTopic={parentTopic}
                    topicPackNumber={index}
                    categoryList={categoryList}
                />
            ))}
        </TopicPanelContext.Provider>
    )
};

export default TopicPanel;