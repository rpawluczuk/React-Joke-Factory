import React, {useEffect, useState} from 'react';
import axios from "axios";
import "components/mainpanel/commons/topicpanel/topicpack/TopicBlock.css";
import {FaCheck, FaTimes} from "react-icons/all";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const TopicBlockEditor = (props) => {

    const {topic, onEditionSubmit, onCancelEditionClick, onTopicNameChange} = props;

    const [topicItemList, setTopicItemList] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8081/api/topics/list-items`).then((res) => {
            setTopicItemList(res.data)
        });
    }, [])

    return (
        <div className="topicBlock d-flex flex-column justify-content-between m-3">
            <Form onSubmit={onEditionSubmit}>
                <Form.Group>
                    <Form.Label>Name</Form.Label>
                    <Form.Control list="topics"
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
                </Form.Group>
                <div className="d-flex flex-row justify-content-center mb-4">
                    <Button onClick={onCancelEditionClick}
                            variant="outline-danger"
                            size="sm"
                            className="buttonSize m-1">
                        <FaTimes/>
                    </Button>
                    <Button variant="outline-success"
                            type="submit"
                            size="sm"
                            className="buttonSize m-1">
                        <FaCheck/>
                    </Button>
                </div>
            </Form>
        </div>
    );
}

export default TopicBlockEditor;