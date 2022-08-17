import React, {useContext, useEffect, useState} from 'react';
import "./TopicBlock.css";
import {FaWindowClose, FaGripHorizontal} from "react-icons/all";
import {TopicPackContext} from "../../../../../../context/TopicPackContext";
import {TopicPanelContext} from "../../../../../../context/TopicPanelContext";

const TopicBlock = ({topic}) => {

    const [isSelected, setIsSelected] = useState(false);
    const {selectedTopicId, setSelectedTopicId, topicPackNumber} = useContext(TopicPackContext)
    const {selectedTopicIdList, setSelectedTopicIdList} = useContext(TopicPanelContext)

    useEffect(() => {
        if (selectedTopicId === topic.id && isSelected === false) {
            setIsSelected(true)
        } else if (selectedTopicId !== topic.id && isSelected === true) {
            setIsSelected(false)
        }
    }, [selectedTopicId])

    const handleShowChildren = () => {
        setSelectedTopicId(topic.id);
        setSelectedTopicIdList(oldArray => [...oldArray.slice(0, topicPackNumber + 1),
            topic.id
        ]);
    }

    return (
        <div className="topicBlock d-flex flex-column justify-content-between m-3"
            style={{
                backgroundColor: isSelected ? 'burlywood' : 'blanchedalmond',
                borderColor: isSelected ? 'red' : 'black'
            }}>
            <div className="d-flex flex-row justify-content-end" style={{background: "darkseagreen"}}>
                <button className='Item-top-button'>
                    <FaWindowClose/>
                </button>
            </div>
            <div className="d-flex flex-row justify-content-center">
                <pre style={{whiteSpace: "pre-wrap", fontSize: "larger", fontFamily: "serif"}}>
                    {topic.name}
                </pre>
            </div>
            <div className="d-flex flex-row justify-content-center">
                <button className="btn-sm btn-outline-warning">
                    <FaGripHorizontal
                        style={{fontSize: "26px"}}
                        onClick={handleShowChildren}/>
                </button>
            </div>
        </div>
    );
}

export default TopicBlock;