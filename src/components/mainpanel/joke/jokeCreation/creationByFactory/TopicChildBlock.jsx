import React, {useState} from 'react';
import "./TopicChildBlock.css";
import {FaWindowClose, FaGripHorizontal} from "react-icons/all";

const TopicChildBlock = ({topic}) => {

    const [isSelected, setIsSelected] = useState(false);

    const handleShowChildren = () => {
        setIsSelected(prevState => !prevState);
    }

    return (
        <div className="jokeTopicBlock d-flex flex-column justify-content-between m-3"
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

export default TopicChildBlock;