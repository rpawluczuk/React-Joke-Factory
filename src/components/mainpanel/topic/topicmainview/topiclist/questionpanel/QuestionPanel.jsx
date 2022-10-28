import React, {useState} from 'react';
import {Badge, Card, Col, Form, InputGroup, Row} from "react-bootstrap";
import {FaBan, FaPlus, FaTimes} from "react-icons/all";
import Button from "react-bootstrap/Button";
import axios from "axios";

const QuestionPanel = (props) => {

    const {questions, categoryId, refreshTopic} = props;
    const [isAddBadgeClicked, setIsAddBadgeClicked] = useState(false)
    const [questionCreatorDto, setQuestionCreatorDto] = useState({
        question: "",
        categoryId: categoryId
    })


    function handleAddBadgeClick() {
        setIsAddBadgeClicked(prevState => !prevState)
    }

    function handleCancelButtonClick() {
        setIsAddBadgeClicked(false)
    }

    function handleQuestionChange(event) {
        setQuestionCreatorDto({...questionCreatorDto, question: event.target.value})
    }

    function handleQuestionSubmit(event) {
        event.preventDefault()
        axios.post(`http://localhost:8081/api/questions`, questionCreatorDto)
            .then(() => {
                setQuestionCreatorDto({...questionCreatorDto, question: ""});
            })
    }

    return (
        <>
            <div className="d-flex flex-row justify-content-between">
                <Card.Text>
                    <span className="d-inline-block me-1"> Questions: </span>
                    {questions.map((question) => (
                        <Badge pill bg="success" className="d-inline-block me-1">
                            {question}
                            <FaTimes className="ms-2"></FaTimes>
                        </Badge>
                    ))}
                    <Badge pill bg="success">
                        <FaPlus onClick={handleAddBadgeClick}></FaPlus>
                    </Badge>
                </Card.Text>
            </div>
            {isAddBadgeClicked &&
                <Row className="justify-content-md-center mt-4">
                    <Col xs={6}>
                        <Form onSubmit={handleQuestionSubmit}>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    placeholder="Type Question"
                                    onChange={handleQuestionChange}
                                />
                                <Button type="submit" variant="success">
                                    <FaPlus></FaPlus>
                                </Button>
                                <Button variant="secondary" onClick={handleCancelButtonClick}>
                                    <FaBan></FaBan>
                                </Button>
                            </InputGroup>
                        </Form>
                    </Col>
                </Row>
            }
        </>
    )
};

export default QuestionPanel;