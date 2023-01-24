import React, {useContext, useEffect, useState} from 'react';
import "components/mainpanel/commons/topicpanel/topicpack/TopicBlock.css";
import TopicBlockPresenter from "components/mainpanel/commons/topicpanel/topicpack/topicblock/TopicBlockPresenter";
import {TopicBlockContext} from "components/mainpanel/commons/topicpanel/topicpack/TopicBlockContext";
import TopicBlockCreator from "components/mainpanel/commons/topicpanel/topicpack/topicblock/TopicBlockCreator";
import TopicBlockType from "components/mainpanel/commons/topicpanel/topicpack/TopicBlockType";
import TopicBlockEditor from "components/mainpanel/commons/topicpanel/topicpack/topicblock/TopicBlockEditor";
import axios from "axios";
import {TopicPanelContext} from "components/mainpanel/commons/TopicPanelContext";

const TopicBlock = (props) => {

    const {topicPackIndex, categoryFilter} = props;

    const [blockType, setBlockType] = useState(TopicBlockType.PRESENTER)
    const [topicBlock, setTopicBlock] = useState({
        id: 0,
        parentId: null,
        name: ''
    })
    const [errorMessage, setErrorMessage] = useState(null)
    const {addTopicPack, refreshTopicPack, changeTopicPack, refreshTopicItemList} = useContext(TopicPanelContext)

    useEffect(() => {
        // changeTopicPack()
        if (props.topicBlock !== undefined) {
            setTopicBlock(props.topicBlock)
        }
    }, [props.topicBlock])

    useEffect(() => {
        setBlockType(props.topicBlockType)
    }, [props.topicBlockType])

    function handleTopicNameChange(event) {
        setTopicBlock({...topicBlock, name: event.target.value})
    }

    function handleEditClick() {
        setBlockType(TopicBlockType.EDITOR)
    }

    function handleShowChildrenClick() {
        axios.get(`http://localhost:8081/api/topics/panel/show-children`, {
            params: {
                parentId: topicBlock.id,
                topicPackIndex: topicPackIndex
            }
        }).then(async (res) => {
            await addTopicPack(res.data[0], topicPackIndex);
            await addTopicPack(res.data[1], topicPackIndex + 1);
        });
    }

    function handleSecondParentClick() {
        axios.get(`http://localhost:8081/api/topics/panel/second-parent`, {
            params: {
                secondParentId: topicBlock.id,
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
        axios.get(`http://localhost:8081/api/topics/${topicBlock.id}`).then((res) => {
            setTopicBlock(res.data)
        })
    }

    function handleEditionSubmit(event) {
        event.preventDefault();
        axios.patch(`http://localhost:8081/api/topics`, topicBlock).then(() => {
            setBlockType(TopicBlockType.PRESENTER);
            refreshTopicBlock()
        })
    }

    function handleTopicCreatorSubmit(event) {
        event.preventDefault();
        const topicBlockDto = {
            name: topicBlock.name,
            parentId: topicBlock.parentId,
            secondParentId: topicBlock.secondParentId,
            categories: [categoryFilter]
        }
        axios.post(`http://localhost:8081/api/topics/panel`, topicBlockDto).then(res => {
            if(res.data[0].topicBlockPage.totalElements === 0) {
                setTopicBlock(res.data[0].topicBlockParent)
                addTopicPack(res.data[0], 0)
                setBlockType(TopicBlockType.PRESENTER)
            } else {
                refreshTopicPack(res.data)
                setTopicBlock({
                    ...topicBlock,
                    parentId: null,
                    name: ''
                })
            }
            // refreshTopicItemList()
            setErrorMessage(null)
        }).catch((error) => {
            setErrorMessage(error.response.data.message)
        })
    }

    return (
        <TopicBlockContext.Provider value={{topic: topicBlock, setTopic: setTopicBlock, refreshTopicBlock}}>
                <div className="d-flex flex-column">
                    {blockType === TopicBlockType.PRESENTER &&
                        <TopicBlockPresenter
                            topicBlock={topicBlock}
                            showChildren={props.showChildren}
                            isAnySelectionInPack={props.isAnySelectionInPack}
                            onEditClick={handleEditClick}
                            onShowChildrenClick={handleShowChildrenClick}
                            onSecondParentClick={handleSecondParentClick}>
                        </TopicBlockPresenter>
                    }
                    {blockType === TopicBlockType.EDITOR &&
                        <TopicBlockEditor
                            topic={topicBlock}
                            onEditionSubmit={handleEditionSubmit}
                            onCancelEditionClick={handleCancelEditionClick}
                            onTopicNameChange={handleTopicNameChange}>
                        </TopicBlockEditor>
                    }
                    {blockType === TopicBlockType.CREATOR &&
                        <TopicBlockCreator
                            topic={topicBlock}
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