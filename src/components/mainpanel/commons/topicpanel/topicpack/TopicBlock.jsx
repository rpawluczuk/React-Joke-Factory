import React, {useContext, useEffect, useState} from 'react';
import "components/mainpanel/commons/topicpanel/topicpack/TopicBlock.css";
import TopicBlockPresenter from "components/mainpanel/commons/topicpanel/topicpack/topicblock/TopicBlockPresenter";
import {TopicBlockContext} from "components/mainpanel/commons/topicpanel/topicpack/TopicBlockContext";
import TopicBlockCreator from "components/mainpanel/commons/topicpanel/topicpack/topicblock/TopicBlockCreator";
import TopicBlockType from "components/mainpanel/commons/topicpanel/topicpack/TopicBlockType";
import TopicBlockEditor from "components/mainpanel/commons/topicpanel/topicpack/topicblock/TopicBlockEditor";
import axios from "axios";
import {TopicPanelContext} from "components/mainpanel/commons/TopicPanelContext";
import {TopicPackContext} from "components/mainpanel/commons/topicpanel/TopicPackContext";

const TopicBlock = (props) => {

    const {selectedTopicId} = props;

    const [blockType, setBlockType] = useState(TopicBlockType.PRESENTER)
    const [topic, setTopic] = useState({
        id: null,
        parentId: null,
        name: ''
    })
    const {addTopicPack} = useContext(TopicPanelContext)
    const {refreshTopicPack, setSelectedTopicId} = useContext(TopicPackContext)

    useEffect(() => {
        if (props.topic !== undefined) {
            setTopic({
                id: props.topic.id,
                parentId: props.topic.parentId,
                name: props.topic.name
            })
        }
    }, [props.topic])

    useEffect(() => {
        setBlockType(props.topicBlockType)
    }, [props.topicBlockType])

    function handleTopicNameChange(event) {
        setTopic({...topic, name: event.target.value})
    }

    function handleEditClick() {
        setBlockType(TopicBlockType.EDITOR)
    }

    function handleShowChildrenClick() {
        addTopicPack(topic.id, props.topicPackNumber)
        setSelectedTopicId(topic.id)
    }

    function handleCancelEditionClick() {
        setBlockType(TopicBlockType.PRESENTER)
        refreshTopicBlock()
    }

    const refreshTopicBlock = () => {
        axios.get(`http://localhost:8081/api/topics/${topic.id}`).then((res) => {
            setTopic(res.data)
        })
    }

    function handleEditionSubmit() {
        axios.patch(`http://localhost:8081/api/topics`, topic).then(() => {
            setBlockType(TopicBlockType.PRESENTER);
            refreshTopicBlock()
        })
    }

    const handleTopicCreatorSubmit = async () => {
        const topicCreatorDto = {
            name: topic.name,
            parentId: topic.parentId,
        }
        await axios.post(`http://localhost:8081/api/topics`, topicCreatorDto).then( res => {
            setTopic(res.data)
            if (res.data.parentId === null) {
                addTopicPack(res.data.id, 0)
                setBlockType(TopicBlockType.PRESENTER)
            } else {
                refreshTopicPack()
                setTopic({
                    ...topic,
                    parentId: null,
                    name: ''
                })
            }
        })
    }

    return (
        <TopicBlockContext.Provider value={{topic, setTopic, refreshTopicBlock}}>
            { blockType === TopicBlockType.PRESENTER &&
                <TopicBlockPresenter
                    topic={topic}
                    showChildren={props.showChildren}
                    selectedTopicId={selectedTopicId}
                    onEditClick={handleEditClick}
                    onShowChildrenClick={handleShowChildrenClick}>
                </TopicBlockPresenter>
            }
            { blockType === TopicBlockType.EDITOR &&
                <TopicBlockEditor
                    topic={topic}
                    onEditionSubmit={handleEditionSubmit}
                    onCancelEditionClick={handleCancelEditionClick}
                    onTopicNameChange={handleTopicNameChange}>
                </TopicBlockEditor>
            }
            { blockType === TopicBlockType.CREATOR &&
                <TopicBlockCreator
                    topic={topic}
                    onTopicCreatorSubmit={handleTopicCreatorSubmit}
                    onTopicNameChange={handleTopicNameChange}>
                </TopicBlockCreator>
            }
        </TopicBlockContext.Provider>
    );
}

export default TopicBlock;