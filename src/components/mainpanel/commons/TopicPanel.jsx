import React, {useEffect, useState} from 'react';
import TopicPack from "components/mainpanel/commons/topicpanel/TopicPack";
import {TopicPanelContext} from "components/mainpanel/commons/TopicPanelContext";
import TopicBlock from "components/mainpanel/commons/topicpanel/topicpack/TopicBlock";
import axios from "axios";

const TopicPanel = (props) => {

    const {initialTopicType, initialTopicId} = props;

    const [selectedTopicIdList, setSelectedTopicIdList] = useState([])
    const [initialTopic, setInitialTopic] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8081/api/topics/${initialTopicId}`).then((res) => {
            setInitialTopic(res.data)
        })
    }, [initialTopicId])

    useEffect(() => {
        if (initialTopic !== undefined) {
            setSelectedTopicIdList([
                initialTopic.id
            ])
        }
    }, [initialTopic])

    const addTopicPack = (parentId, topicPackNumber) => {
        setSelectedTopicIdList(oldArray => [...oldArray.slice(0, topicPackNumber + 1),
            parentId
        ]);
    }

    return (
        <TopicPanelContext.Provider value={{selectedTopicIdList, addTopicPack}}>
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