import React, {useContext} from 'react';
import "components/mainpanel/commons/topicpanel/topicpack/TopicBlock.css";
import {FaCheck} from "react-icons/all";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {TopicPanelContext} from "components/mainpanel/commons/TopicPanelContext";

const TopicBlockCreator = (props) => {

    const {topic, onTopicNameChange, onTopicCreatorSubmit} = props;
    const {topicItemList} = useContext(TopicPanelContext)

    return (
        <div className="topicBlock d-flex flex-column justify-content-between m-3">
            <Form onSubmit={onTopicCreatorSubmit}>
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
                    <Button
                        variant="outline-success"
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

export default TopicBlockCreator;