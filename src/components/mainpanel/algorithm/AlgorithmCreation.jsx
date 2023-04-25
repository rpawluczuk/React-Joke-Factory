import React, {useState, useEffect} from 'react';
import {Form, FormGroup} from "react-bootstrap";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Button from "react-bootstrap/Button";
import {FaArrowDown} from "react-icons/all";
import DiagramBlockCreator from "components/mainpanel/algorithm/algorithmcreation/DiagramBlockCreator";

const AlgorithmCreation = () => {

    const [algorithmDto, setAlgorithmDto] = useState({
        name: '',
        description: '',
        diagramBlockList: [{ title: "", description: "", position: 0}]
    })
    const [isBtnDisabled, setIsBtnDisabled] = useState(true)
    const [nameMessage, setNameMessage] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        algorithmDto.name.length < 3 ? setIsBtnDisabled(true) : setIsBtnDisabled(false)
        algorithmDto.name.length > 0 && algorithmDto.name.length < 3 ? setNameMessage("Name must be at least 3 characters long!") : setNameMessage(null)
    }, [algorithmDto.name])

    function handleNameChange(event) {
        setAlgorithmDto({...algorithmDto, name: event.target.value})
    }

    function handleDescriptionChange(event) {
        setAlgorithmDto({...algorithmDto, description: event.target.value})
    }

    function handleArrowClick(index) {
        const newBlock = { title: "", description: "", position: algorithmDto.diagramBlockList[index].position + 1 };
        const newList = [...algorithmDto.diagramBlockList];
        newList.splice(index + 1, 0, newBlock);
        // update positions
        for (let i = index + 2; i < newList.length; i++) {
            newList[i].position++;
        }
        setAlgorithmDto(prevState => ({
            ...prevState,
            diagramBlockList: newList
        }));
    }

    function handleDeleteBlock(index) {
        const newList = [...algorithmDto.diagramBlockList];
        newList.splice(index, 1);
        // update positions
        for (let i = index; i < newList.length; i++) {
            newList[i].position--;
        }
        setAlgorithmDto(prevState => ({
            ...prevState,
            diagramBlockList: newList
        }));
    }

    function handleDiagramBlockChange(index, updatedDiagramBlock) {
        const newList = [...algorithmDto.diagramBlockList];
        newList[index] = updatedDiagramBlock;
        setAlgorithmDto(prevState => ({
            ...prevState,
            diagramBlockList: newList
        }));
    }

    function handleFormSubmit(event) {
        event.preventDefault()
        axios.post(`http://localhost:8082/api/algorithms`, algorithmDto)
            .then(navigate(`/algorithm-list`))
    }

    return (
        <>
            <p className="Data-header">Add a new algorithm</p>
            <div className="Data-container">
                <Form onSubmit={handleFormSubmit} className='mt-4'>
                    <div className="d-flex flex-row">
                        {/*Left column*/}
                        <div className="d-flex flex-column col-6 p-4">
                            <Form.Group className="mb-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text"
                                              placeholder="Title"
                                              onChange={handleNameChange}
                                              value={algorithmDto.name}/>
                                {nameMessage && <div className='Validation-message'>{nameMessage}</div>}
                            </Form.Group>
                            <FormGroup className="mb-3">
                                <Form.Label>Content</Form.Label>
                                <Form.Control as="textarea"
                                              rows={6}
                                              onChange={handleDescriptionChange}
                                              value={algorithmDto.description}
                                              placeholder="content"/>
                            </FormGroup>
                            <div className="d-flex flex-row-reverse">
                                <Button className="float-right mx-2"
                                        variant="success"
                                        type="submit"
                                        disabled={isBtnDisabled}>
                                    Add Algorithm
                                </Button>
                                <Button className="float-right mx-2"
                                        variant={"primary"}>
                                    Cancel
                                </Button>
                            </div>
                        </div>
                        {/*Right column*/}
                        <div className="col-6 p-4">
                            {algorithmDto.diagramBlockList.map((diagramBlock, index) => (
                                <div className="container d-flex flex-column align-items-center">
                                    <DiagramBlockCreator
                                        diagramBlock={diagramBlock}
                                        onDelete={() => handleDeleteBlock(index)}
                                        onDiagramBlockChange={(updatedDiagramBlock) => handleDiagramBlockChange(index, updatedDiagramBlock)}
                                    />
                                    <div className="d-flex flex-column justify-content-center">
                                        <FaArrowDown style={{fontSize: "52px"}}
                                                     onClick={() => handleArrowClick(index)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Form>
            </div>
        </>
    );
};

export default AlgorithmCreation;