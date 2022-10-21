import React, {useEffect, useState} from 'react';
import TopicPack from "components/mainpanel/commons/topicpanel/TopicPack";
import {TopicPanelContext} from "components/mainpanel/commons/TopicPanelContext";
import TopicBlock from "components/mainpanel/commons/topicpanel/topicpack/TopicBlock";
import axios from "axios";

const TopicPanel = (props) => {

    const {initialTopicType, initialTopic} = props;
    const [topicItemList, setTopicItemList] = useState([])
    const [selectedTopicIdList, setSelectedTopicIdList] = useState([])

    useEffect(() => {
        if (initialTopic.id !== undefined) {
            setSelectedTopicIdList([
                initialTopic.id
            ])
        }
        refreshTopicItemList()
    }, [initialTopic])

    const addTopicPack = (parentId, topicPackNumber) => {
        setSelectedTopicIdList(oldArray => [...oldArray.slice(0, topicPackNumber + 1),
            parentId
        ]);
    }

    function refreshTopicItemList() {
        axios.get(`http://localhost:8081/api/topics/list-items`).then((res) => {
            setTopicItemList(res.data)
        });
    }

    return (
        <TopicPanelContext.Provider value={{selectedTopicIdList, addTopicPack, refreshTopicItemList, topicItemList}}>
            <div className="d-flex flex-column align-items-center">
                <TopicBlock
                    topic={initialTopic}
                    showChildren={false}
                    topicBlockType={initialTopicType}>
                </TopicBlock>
            </div>
            {selectedTopicIdList.map((parentId, index) => (
                <TopicPack
                    parentId={parentId}
                    topicPackNumber={index}
                />
            ))}
        </TopicPanelContext.Provider>
    )
};

export default TopicPanel;