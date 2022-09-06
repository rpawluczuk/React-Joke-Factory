import React, {useState, useContext} from 'react';
import {Badge, Card} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {FaEdit, FaTimes} from "react-icons/all";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {TopicContext} from "components/mainpanel/topic/TopicContext";
import "App.css";

const SingleTopic = ({topic}) => {

    const navigate = useNavigate();
    const {refreshTopicList} = useContext(TopicContext);
    const [isCategory, setIsCategory] = useState(false);

    const handleEditTopic = (id) => {
        navigate(`/topic-edition/${id}`)
    }

    const handleDeleteTopic = (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            axios.delete(`http://localhost:8081/api/topics/${id}`)
                .then(refreshTopicList)
        }
    }

    return (
        <Card>
            <Card.Body>
                <Card.Title className="mb-2">
                    <div className="d-flex flex-row justify-content-between">
                        <div className="d-flex flex-row">
                            <h5 className="me-4"> {topic.name} </h5>
                            <div className="text-muted"> {topic.dateCreated} </div>
                        </div>
                        <div>
                            <button className='Item-top-button' onClick={() => handleEditTopic(topic.id)}>
                                <FaEdit/>
                            </button>
                            <button className='Item-top-button' onClick={() => handleDeleteTopic(topic.id)}>
                                <FaTimes/>
                            </button>
                        </div>
                    </div>
                </Card.Title>
                <div className="d-flex flex-row justify-content-between">
                    <Card.Text>
                        <span className="d-inline-block me-1"> Connected Topics: </span>
                        {topic.children.map((connectedTopicName) => (
                            <Badge pill bg="primary" className="d-inline-block me-1">
                                {connectedTopicName}
                            </Badge>
                        ))}
                    </Card.Text>
                    <div>
                        {isCategory
                            ? <Button variant="primary" className="me-2 mt-2">Category</Button>
                            : <Button variant="outline-primary" className="me-2 mt-2">Category</Button>
                        }
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default SingleTopic;