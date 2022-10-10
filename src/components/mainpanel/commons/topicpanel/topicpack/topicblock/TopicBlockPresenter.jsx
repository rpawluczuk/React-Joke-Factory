import React, {useContext, useEffect, useState} from 'react';
import "components/mainpanel/commons/topicpanel/topicpack/TopicBlock.css";
import {FaWindowClose, FaGripHorizontal, FaEdit} from "react-icons/all";
import {TopicPackContext} from "components/mainpanel/commons/topicpanel/TopicPackContext";
import axios from "axios";

const TopicBlockPresenter = (props) => {

    const {topic, showChildren, selectedTopicId, onEditClick, onShowChildrenClick} = props;

    const [isSelected, setIsSelected] = useState(false);
    const {refreshTopicPack} = useContext(TopicPackContext)

    useEffect(() => {
        if (selectedTopicId === topic.id && isSelected === false) {
            setIsSelected(true)
        } else if (selectedTopicId !== topic.id && isSelected === true) {
            setIsSelected(false)
        }
    }, [selectedTopicId, refreshTopicPack])

    const handleDeleteRelation = async () => {
        await axios.delete(`http://localhost:8081/api/topics/remove-relation?topic-parent-id=${topic.parentId}&topic-child-id=${topic.id}`)
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
                    {topic.name}
                </pre>
            </div>
            <div className="d-flex flex-row justify-content-center">
                {showChildren !== false && <button className="btn-sm btn-outline-warning" onClick={onShowChildrenClick}>
                    <FaGripHorizontal style={{fontSize: "26px"}}/>
                </button>
                }
                <button className="btn-sm btn-outline-warning" onClick={onEditClick}>
                    <FaEdit style={{fontSize: "26px"}}/>
                </button>
            </div>
        </div>
    );
}

export default TopicBlockPresenter;