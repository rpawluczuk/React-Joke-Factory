import React from 'react';
import "./TopicChildBlock.css";
import {FaWindowClose} from "react-icons/all";

const TopicChildBlock = ({topic}) => {

    return (
        <div className="jokeTopicBlock d-flex flex-column justify-content-between m-3">
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
        </div>
    );
}

export default TopicChildBlock;