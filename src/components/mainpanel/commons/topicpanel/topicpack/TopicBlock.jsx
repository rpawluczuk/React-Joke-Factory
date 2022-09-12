import React, {useContext, useEffect, useState} from 'react';
import "components/mainpanel/commons/topicpanel/topicpack/TopicBlock.css";
import TopicBlockPresenter from "components/mainpanel/commons/topicpanel/topicpack/topicblock/TopicBlockPresenter";
import {TopicBlockContext} from "components/mainpanel/commons/topicpanel/topicpack/TopicBlockContext";
import TopicBlockCreator from "components/mainpanel/commons/topicpanel/topicpack/topicblock/TopicBlockCreator";
import TopicBlockType from "components/mainpanel/commons/topicpanel/topicpack/TopicBlockType";
import TopicBlockEditor from "components/mainpanel/commons/topicpanel/topicpack/topicblock/TopicBlockEditor";
import axios from "axios";

const TopicBlock = ({topicProp, showChildren}) => {

    const [selectedType, setSelectedType] = useState(TopicBlockType.PRESENTER)
    const [topic, setTopic] = useState({
        id: null,
        name: ''
    })

    useEffect(() => {
        if (topicProp !== undefined) {
            setTopic({
                id: topicProp.id,
                name: topicProp.name
            })
        }
    }, [topicProp])

    const refreshTopicBlock = () => {
        axios.get(`http://localhost:8081/api/topics/${topic.id}`).then((res) => {
            console.log(res.data)
            setTopic(res.data)
        })
    }

    return (
        <TopicBlockContext.Provider value={{setSelectedType, topic, refreshTopicBlock}}>
            { selectedType === TopicBlockType.PRESENTER &&
                <TopicBlockPresenter
                    showChildren={showChildren}>
                </TopicBlockPresenter>
            }
            { selectedType === TopicBlockType.EDITOR &&
                <TopicBlockEditor></TopicBlockEditor>
            }
        </TopicBlockContext.Provider>
    );
}

export default TopicBlock;