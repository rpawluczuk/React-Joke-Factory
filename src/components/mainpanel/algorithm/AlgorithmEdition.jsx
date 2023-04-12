import React, {useEffect, useState}  from 'react';
import {Form, FormGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const AlgorithmEdition = () => {


    const [algorithmDto, setAlgorithmDto] = useState({
        name: '',
        description: '',
    })
    const params = useParams();
    const [isBtnDisabled, setIsBtnDisabled] = useState(true)
    const [nameMessage, setNameMessage] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        algorithmDto.name.length < 3 ? setIsBtnDisabled(true) : setIsBtnDisabled(false)
        algorithmDto.name.length > 0 && algorithmDto.name.length < 3 ? setNameMessage("Name must be at least 3 characters long!") : setNameMessage(null)
    }, [algorithmDto.name])

    useEffect(() => {
        axios.get(`http://localhost:8082/api/algorithms/${params.id}`).then((res) => {
            setAlgorithmDto({
                id: params.id,
                name: res.data.name,
                description: res.data.description
            })
        })
    }, [])

    function handleNameChange (event) {
        setAlgorithmDto({...algorithmDto, name: event.target.value})
    }

    function handleDescriptionChange (event) {
        setAlgorithmDto({...algorithmDto, description: event.target.value})
    }

    function handleFormSubmit (event) {
        event.preventDefault()
        axios.put(`http://localhost:8082/api/algorithms`, algorithmDto)
            .then(navigate(`/algorithm-list`))
    }

    return (
        <div className="container">
            <p className="Data-header">Edit a new algorithm</p>

            <Form onSubmit={handleFormSubmit} className='mt-4'>
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
                        Update Algorithm
                    </Button>
                    <Button className="float-right mx-2"
                            variant={"primary"}>
                        Cancel
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default AlgorithmEdition;