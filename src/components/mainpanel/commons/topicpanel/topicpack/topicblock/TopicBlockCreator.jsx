import React, {useEffect, useState, useContext} from 'react';
import axios from "axios";
import "components/mainpanel/commons/topicpanel/topicpack/TopicBlock.css";
import {TopicPackContext} from "components/mainpanel/commons/topicpanel/TopicPackContext";
import {FaCheck} from "react-icons/all";

const TopicBlockCreator = () => {

    const [topicItemList, setTopicItemList] = useState([])
    const [topicName, setTopicName] = useState('')
    const {topicParentId, refreshTopicPack} = useContext(TopicPackContext)

    useEffect(() => {
        axios.get(`http://localhost:8081/api/topics/list-items`).then((res) => {
            setTopicItemList(res.data)
        });
    }, [])

    const handleSubmit = async () => {
        const topicCreatorChildDto = {
            name: topicName,
            parentId: topicParentId,
        }
        await axios.post(`http://localhost:8081/api/topics/add-topic-child`, topicCreatorChildDto)
            .then(setTopicName(''))
        await refreshTopicPack(0)
    }

    const handleNameChange = event => {
        setTopicName(event.target.value)
    }

    return (
        <div className="topicBlock d-flex flex-column justify-content-between m-3">
            <form>
                <label>Name</label>
                <input list="topics"
                       onChange={handleNameChange}
                       value={topicName}
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
                <button onClick={handleSubmit} className="btn-sm btn-outline-success buttonSize m-1">
                    <FaCheck/>
                </button>
            </div>
        </div>
    );
}

export default TopicBlockCreator;