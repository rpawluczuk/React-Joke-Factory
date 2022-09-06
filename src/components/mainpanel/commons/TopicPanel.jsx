import React, {useEffect, useState} from 'react';
import TopicPack from "components/mainpanel/commons/topicpanel/TopicPack";
import {TopicPanelContext} from "components/mainpanel/commons/TopicPanelContext";

const TopicPanel = ({initialTopicId}) => {

    const [selectedTopicIdList, setSelectedTopicIdList] = useState([])

    useEffect(() => {
        setSelectedTopicIdList([
            initialTopicId
        ])
    }, [initialTopicId])

    const addTopicPack = (parentId, topicPackNumber) => {
        setSelectedTopicIdList(oldArray => [...oldArray.slice(0, topicPackNumber + 1),
            parentId
        ]);
    }

    return (
        <TopicPanelContext.Provider value={{selectedTopicIdList, addTopicPack}}>
            {selectedTopicIdList.map((parentId, index) => (
                <TopicPack parentId={parentId} topicPackNumber={index}/>
            ))}
        </TopicPanelContext.Provider>
    )
};

export default TopicPanel;