import React, {useEffect, useState, useContext} from 'react';
import axios from "axios";
import "components/mainpanel/commons/topicpanel/topicpack/TopicBlock.css";
import {FaCheck, FaTimes} from "react-icons/all";
import {TopicPackContext} from "components/mainpanel/commons/topicpanel/TopicPackContext";
import {TopicBlockContext} from "components/mainpanel/commons/topicpanel/topicpack/TopicBlockContext";
import TopicBlockType from "components/mainpanel/commons/topicpanel/topicpack/TopicBlockType";

const TopicBlockEditor = () => {

    const [topicItemList, setTopicItemList] = useState([])
    const [topicCreatorDto, setTopicCreatorDto] = useState({
        id: null,
        name: ''
    })
    const {setSelectedType, topic, refreshTopicBlock} = useContext(TopicBlockContext)

    useEffect(() => {
        axios.get(`http://localhost:8081/api/topics/list-items`).then((res) => {
            setTopicItemList(res.data)
        });
        setTopicCreatorDto({
            id: topic.id,
            name: topic.name
        })
    }, [topic])

    const handleSubmit = async () => {
        await axios.patch(`http://localhost:8081/api/topics`, topicCreatorDto)
        await setSelectedType(TopicBlockType.PRESENTER)
        await refreshTopicBlock()

    }

    const handleNameChange = event => {
        setTopicCreatorDto(prevState => {
            return {...prevState, name: event.target.value}
        })
    }

    const handleCancel = () => {
        setSelectedType(TopicBlockType.PRESENTER)
    }


    return (
        <div className="topicBlock d-flex flex-column justify-content-between m-3">
            <form>
                <label>Name</label>
                <input list="topics"
                       onChange={handleNameChange}
                       value={topicCreatorDto.name}
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
                <button onClick={handleCancel} className="btn-sm btn-outline-danger buttonSize m-1">
                    <FaTimes/>
                </button>
                <button onClick={handleSubmit} className="btn-sm btn-outline-success buttonSize m-1">
                    <FaCheck/>
                </button>
            </div>
        </div>
    );
}

export default TopicBlockEditor;