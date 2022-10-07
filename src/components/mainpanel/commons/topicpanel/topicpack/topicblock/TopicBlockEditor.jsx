import React, {useEffect, useState} from 'react';
import axios from "axios";
import "components/mainpanel/commons/topicpanel/topicpack/TopicBlock.css";
import {FaCheck, FaTimes} from "react-icons/all";

const TopicBlockEditor = (props) => {

    const  {topic, onEditionSubmit, onCancelEditionClick, onTopicNameChange} = props;

    const [topicItemList, setTopicItemList] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8081/api/topics/list-items`).then((res) => {
            setTopicItemList(res.data)
        });
    }, [])

    return (
        <div className="topicBlock d-flex flex-column justify-content-between m-3">
            <form>
                <label>Name</label>
                <input list="topics"
                       onChange={onTopicNameChange}
                       value={topic.name}
                       type="text"
                       className="form-control"
                       placeholder="topic child name"/>
                <datalist id="topics">
                    {topicItemList.map((topicItem) => (
                        <option>
                            {topicItem.label}
                        </option>
                    ))}
                </datalist>
            </form>
            <div className="d-flex flex-row justify-content-center mb-4">
                <button onClick={onCancelEditionClick} className="btn-sm btn-outline-danger buttonSize m-1">
                    <FaTimes/>
                </button>
                <button onClick={onEditionSubmit} className="btn-sm btn-outline-success buttonSize m-1">
                    <FaCheck/>
                </button>
            </div>
        </div>
    );
}

export default TopicBlockEditor;