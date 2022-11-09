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

    const {topicPackIndex} = props;

    const [blockType, setBlockType] = useState(TopicBlockType.PRESENTER)
    const [topic, setTopic] = useState({
        id: 0,
        parentId: null,
        name: ''
    })
    const [errorMessage, setErrorMessage] = useState(null)
    const {addTopicPack, refreshTopicItemList} = useContext(TopicPanelContext)
    const {refreshTopicPack} = useContext(TopicPackContext)

    useEffect(() => {
        if (props.topic !== undefined) {
            setTopic(props.topic)
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
        axios.get(`http://localhost:8081/api/topics/panel/show-children`, {
            params: {
                parentId: topic.id,
                topicPackIndex: topicPackIndex
            }
        }).then(async (res) => {
            await addTopicPack(res.data[0], topicPackIndex);
            await addTopicPack(res.data[1], topicPackIndex + 1);
        });
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

    function handleEditionSubmit(event) {
        event.preventDefault();
        axios.patch(`http://localhost:8081/api/topics`, topic).then(() => {
            setBlockType(TopicBlockType.PRESENTER);
            refreshTopicBlock()
        })
    }

    function handleTopicCreatorSubmit(event) {
        event.preventDefault();
        const topicCreatorDto = {
            name: topic.name,
            parentId: topic.parentId,
        }
        axios.post(`http://localhost:8081/api/topics`, topicCreatorDto).then(res => {
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
            refreshTopicItemList()
            setErrorMessage(null)
        }).catch((error) => {
            setErrorMessage(error.response.data.message)
        })
    }

    return (
        <TopicBlockContext.Provider value={{topic, setTopic, refreshTopicBlock}}>
                <div className="d-flex flex-column">
                    {blockType === TopicBlockType.PRESENTER &&
                        <TopicBlockPresenter
                            topic={topic}
                            showChildren={props.showChildren}
                            onEditClick={handleEditClick}
                            onShowChildrenClick={handleShowChildrenClick}>
                        </TopicBlockPresenter>
                    }
                    {blockType === TopicBlockType.EDITOR &&
                        <TopicBlockEditor
                            topic={topic}
                            onEditionSubmit={handleEditionSubmit}
                            onCancelEditionClick={handleCancelEditionClick}
                            onTopicNameChange={handleTopicNameChange}>
                        </TopicBlockEditor>
                    }
                    {blockType === TopicBlockType.CREATOR &&
                        <TopicBlockCreator
                            topic={topic}
                            onTopicCreatorSubmit={handleTopicCreatorSubmit}
                            onTopicNameChange={handleTopicNameChange}>
                        </TopicBlockCreator>
                    }
                    {errorMessage !== null &&
                        <p1 style={{color:'red'}}>{errorMessage}</p1>
                    }
                </div>
        </TopicBlockContext.Provider>
    );
}

export default TopicBlock;