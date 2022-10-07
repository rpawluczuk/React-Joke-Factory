import React, {useContext, useEffect, useState} from 'react';
import "components/mainpanel/commons/topicpanel/topicpack/TopicBlock.css";
import {FaWindowClose, FaGripHorizontal, FaEdit} from "react-icons/all";
import {TopicPackContext} from "components/mainpanel/commons/topicpanel/TopicPackContext";
import {TopicPanelContext} from "components/mainpanel/commons/TopicPanelContext";
import axios from "axios";
import {TopicBlockContext} from "components/mainpanel/commons/topicpanel/topicpack/TopicBlockContext";
import TopicBlockType from "components/mainpanel/commons/topicpanel/topicpack/TopicBlockType";

const TopicBlockPresenter = (props) => {

    const [isSelected, setIsSelected] = useState(false);
    const {refreshTopicPack} = useContext(TopicPackContext)
    const {addTopicPack} = useContext(TopicPanelContext)
    const {setSelectedType} = useContext(TopicBlockContext)

    useEffect(() => {
        if (props.topic.parentId === props.topic.id && isSelected === false) {
            setIsSelected(true)
        } else if (props.topic.parentId !== props.topic.id && isSelected === true) {
            setIsSelected(false)
        }
    }, [props.topic.parentId])

    const handleShowChildren = () => {
        addTopicPack(props.topic.id, props.topicPackNumber)
    }

    const handleEdit = () => {
        setSelectedType(TopicBlockType.EDITOR)
    }

    const handleDeleteRelation = async () => {
        await axios.delete(`http://localhost:8081/api/topics/remove-relation?topic-parent-id=${props.topic.parentId}&topic-child-id=${props.topic.id}`)
        await refreshTopicPack(0)
    }

    return (
        <div className="topicBlock d-flex flex-column justify-content-between m-3"
             style={{
                 backgroundColor: isSelected ? 'burlywood' : 'blanchedalmond',
                 borderColor: isSelected ? 'red' : 'black'
             }}>
            <div className="d-flex flex-row justify-content-end" style={{background: "darkseagreen"}}>
                <button className='Item-top-button' onClick={handleDeleteRelation}>
                    <FaWindowClose/>
                </button>
            </div>
            <div className="d-flex flex-row justify-content-center">
                <pre style={{whiteSpace: "pre-wrap", fontSize: "larger", fontFamily: "serif"}}>
                    {props.topic.name}
                </pre>
            </div>
            <div className="d-flex flex-row justify-content-center">
                {props.showChildren !== false && <button className="btn-sm btn-outline-warning" onClick={handleShowChildren}>
                    <FaGripHorizontal style={{fontSize: "26px"}}/>
                </button>
                }
                <button className="btn-sm btn-outline-warning" onClick={handleEdit}>
                    <FaEdit style={{fontSize: "26px"}}/>
                </button>
            </div>
        </div>
    );
}

export default TopicBlockPresenter;