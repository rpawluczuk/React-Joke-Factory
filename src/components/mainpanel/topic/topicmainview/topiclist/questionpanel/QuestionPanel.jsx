import React, {useState, useEffect} from 'react';
import {Badge, Card, Col, Form, InputGroup, Row} from "react-bootstrap";
import {FaBan, FaPlus, FaTimes} from "react-icons/all";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Select from "react-select";

const QuestionPanel = (props) => {

    const {sourceCategoryId} = props;
    const [isAddBadgeClicked, setIsAddBadgeClicked] = useState(false)
    const [questions, setQuestions] = useState(props.questions)
    const [questionText, setQuestionText] = useState("")
    const [categoryList, setCategoryList] = useState([])
    const [selectedTargetCategory, setSelectedTargetCategory] = useState()

    useEffect(() => {
        axios.get(`http://localhost:8081/api/topics/view/category-list`).then((res) => {
            setCategoryList(res.data)
        });
    }, [])

    function handleAddBadgeClick() {
        setIsAddBadgeClicked(prevState => !prevState)
    }

    function handleCancelButtonClick() {
        setIsAddBadgeClicked(false)
    }

    function handleQuestionChange(event) {
        setQuestionText(event.target.value)
    }

    function handleQuestionSubmit(event) {
        event.preventDefault()
        const questionDto = {
                sourceCategoryId: sourceCategoryId,
                questionText: questionText,
                targetCategoryId: selectedTargetCategory.value
        }
        axios.post(`http://localhost:8081/api/questions`, questionDto).then((res) => {
            setQuestions(res.data);
        })
    }

    function handleQuestionClick(question) {
        axios.put(`http://localhost:8081/api/questions`, {
            params: {
                questionId: question.value,
                questionText: questionText
            }
        }).then((res) => {
            setQuestions(res.data);
        })
    }

    function handleDeleteButtonClick(question) {
        console.log(question)
        axios.delete(`http://localhost:8081/api/questions/${question.value}`)
            .then((res) => {
                setQuestions(res.data);
            })
    }

    const handleTargetCategorySelect = (newSelectedTargetCategory) => {
        setSelectedTargetCategory(newSelectedTargetCategory)
    };

    return (
        <>
            <div className="d-flex flex-row justify-content-between">
                <Card.Text>
                    <span className="d-inline-block me-1"> Questions: </span>
                    {questions.map((question) => (
                        <Badge pill bg="success" className="d-inline-block me-1">
                            <span onClick={handleQuestionClick}>{question.label}</span>
                            <FaTimes className="ms-2" onClick={() => handleDeleteButtonClick(question)}></FaTimes>
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
                                <Select
                                    className="p-0"
                                    value={selectedTargetCategory}
                                    options={categoryList}
                                    onChange={handleTargetCategorySelect}
                                    isSearchable={true}
                                    placeholder={"Select Target Category"}
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