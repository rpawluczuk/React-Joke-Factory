import React, {useState, useContext} from 'react';
import {Badge, Card} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {FaEdit, FaTimes} from "react-icons/all";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "App.css";
import QuestionPanel from "components/mainpanel/topic/topicmainview/topiclist/questionpanel/QuestionPanel";
import {TopicMainViewContext} from "components/mainpanel/topic/TopicMainViewContext";

const SingleTopic = (props) => {

    const navigate = useNavigate();

    const [topic, setTopic] = useState(props.topic)
    const [isCategory, setIsCategory] = useState(topic.category);
    const {refreshTopicView} = useContext(TopicMainViewContext)

    function refreshTopic() {
        axios.get(`http://localhost:8082/api/topics/${topic.id}`)
            .then((res) => {
                setTopic(res.data)
            })
    }

    function handleEditTopic(id) {
        navigate(`/topic-edition/${id}`)
    }

    function handleDeleteTopic(id) {
        if (window.confirm('Are you sure you want to delete?')) {
            axios.delete(`http://localhost:8082/api/topics/view/${id}`)
                .then(refreshTopicView)
        }
    }

    function handleCategoryButtonClick() {
        axios.patch(`http://localhost:8082/api/topics/changeCategoryStatus/${topic.id}`)
            .then(() => setIsCategory(prevState => !prevState))
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
                        <Button
                            variant={isCategory ? "primary" : "outline-primary"}
                            className="me-2 mt-2"
                            onClick={handleCategoryButtonClick}
                        >
                            Category
                        </Button>
                    </div>
                </div>
                {isCategory &&
                    <QuestionPanel
                        sourceCategory={{label: topic.name, value: topic.id}}
                        questions={topic.questions}
                        refreshTopic={refreshTopic}>
                    </QuestionPanel>}
            </Card.Body>
        </Card>
    )
}

export default SingleTopic;