import React, {useState, useEffect} from 'react';
import {Badge, Card, Col, Form, InputGroup, Row} from "react-bootstrap";
import {FaBan, FaPlus, FaTimes} from "react-icons/all";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Select from "react-select";

const QuestionPanel = (props) => {

    const {sourceCategory} = props;
    const [questionDto, setQuestionDto] = useState({
        id: null,
        sourceCategory: sourceCategory,
        questionText: "",
        targetCategory: null
    })
    const [isQuestionFormVisible, setIsQuestionFormVisible] = useState(false)
    const [questions, setQuestions] = useState(props.questions)
    const [categoryList, setCategoryList] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8082/api/topics/view/category-list`).then((res) => {
            setCategoryList(res.data)
        });
    }, [])

    function handleAddBadgeClick() {
        setIsQuestionFormVisible(prevState => !prevState)
    }

    function handleCancelButtonClick() {
        setIsQuestionFormVisible(false)
        setQuestionDto({
            ...questionDto,
            id: null,
            questionText: "",
            targetCategory: null
        })
    }

    function handleQuestionChange(event) {
        setQuestionDto({
            ...questionDto,
            questionText: event.target.value
        })
    }

    function handleQuestionSubmit(event) {
        event.preventDefault()
        if (questionDto.id === null) {
            axios.post(`http://localhost:8082/api/questions`, questionDto).then((res) => {
                setQuestions(res.data);
                setQuestionDto({
                    ...questionDto,
                    id: null,
                    questionText: "",
                    targetCategory: null
                })
            })
        } else {
            axios.put(`http://localhost:8082/api/questions`, questionDto).then((res) => {
                setQuestions(res.data);
                setQuestionDto({
                    ...questionDto,
                    id: null,
                    questionText: "",
                    targetCategory: null
                })
            })
        }
    }

    function handleQuestionClick(question) {
        axios.get(`http://localhost:8082/api/questions/${question.id}`).then((res) => {
            setQuestionDto(
                res.data
            )
            setIsQuestionFormVisible(true)
        })
    }

    function handleDeleteButtonClick(question) {
        axios.delete(`http://localhost:8082/api/questions/${question.id}`)
            .then((res) => {
                setQuestions(res.data);
            })
    }

    const handleTargetCategorySelect = (newSelectedTargetCategory) => {
        setQuestionDto({
            ...questionDto,
            targetCategory: newSelectedTargetCategory
        })
    };

    return (
        <>
            <div className="d-flex flex-row justify-content-between">
                <Card.Text>
                    <span className="d-inline-block me-1"> Questions: </span>
                    {questions.map((question) => (
                        <Badge pill bg="success" className="d-inline-block me-1">
                            <span onClick={() => handleQuestionClick(question)}>{question.questionText}</span>
                            <FaTimes className="ms-2" onClick={() => handleDeleteButtonClick(question)}></FaTimes>
                        </Badge>
                    ))}
                    <Badge pill bg="success">
                        <FaPlus onClick={handleAddBadgeClick}></FaPlus>
                    </Badge>
                </Card.Text>
            </div>
            {isQuestionFormVisible &&
                <Row className="justify-content-md-center mt-4">
                    <Col xs={6}>
                        <Form onSubmit={handleQuestionSubmit}>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    placeholder="Type Question"
                                    onChange={handleQuestionChange}
                                    value={questionDto.questionText}
                                />
                                <Select
                                    className="p-0"
                                    value={questionDto.targetCategory}
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