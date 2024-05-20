import React, {useContext} from 'react';
import "components/mainpanel/commons/topicpanel/topicpack/TopicBlock.css";
import {
    FaWindowClose,
    FaGripHorizontal,
    FaEdit,
    FaNetworkWired,
    FaExclamationTriangle
} from "react-icons/fa";
import axios from "axios";
import {TopicPanelContext} from "components/mainpanel/commons/TopicPanelContext";

const TopicBlockPresenter = (props) => {

    const {
        topicBlock,
        showChildren,
        onEditClick,
        onShowChildrenClick,
        onSecondParentClick,
        isAnySelectionInPack
    } = props;

    const {refreshTopicPack} = useContext(TopicPanelContext)

    const handleDeleteRelation = async () => {
        console.log(topicBlock)
        await axios.delete(`http://localhost:8082/api/topics/panel/remove-relation?topic-parent-id=${topicBlock.parentId}&topic-child-id=${topicBlock.id}`).then(res =>
            refreshTopicPack(res.data)
        )

    }

    function hasAnyCategory() {
        return topicBlock.categories !== undefined && topicBlock.categories !== null && topicBlock.categories.length === 0
    }

    return (
        <div className="topicBlock d-flex flex-column justify-content-between m-3"
             style={{
                 backgroundColor: topicBlock.selected || topicBlock.secondParent ? 'burlywood' : 'blanchedalmond',
                 borderColor: topicBlock.selected ? 'red' : 'black',
             }}>
            <div className="d-flex flex-row justify-content-between" style={{background: "darkseagreen"}}>
                <div>
                    {
                        hasAnyCategory() &&
                        <button className='Item-top-button' onClick={handleDeleteRelation}>
                            <FaExclamationTriangle/>
                        </button>
                    }
                </div>
                <button className='Item-top-button' onClick={handleDeleteRelation}>
                    <FaWindowClose/>
                </button>
            </div>
            <div className="d-flex flex-row justify-content-center">
                <pre style={{whiteSpace: "pre-wrap", fontSize: "larger", fontFamily: "serif"}}>
                    {topicBlock.name}
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
                {isAnySelectionInPack && <button className="btn-sm btn-outline-warning">
                    <FaNetworkWired style={{fontSize: "26px", transform: "rotate(180deg)"}}
                                    onClick={onSecondParentClick}/>
                </button>}
            </div>
        </div>
    );
}

export default TopicBlockPresenter;