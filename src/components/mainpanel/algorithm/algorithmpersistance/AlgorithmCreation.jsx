import React, {useState, useEffect} from 'react';
import {Form} from "react-bootstrap";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import DiagramCreation from "components/mainpanel/algorithm/algorithmpersistance/shared/DiagramCreation";
import AlgorithmForm from "components/mainpanel/algorithm/algorithmpersistance/shared/AlgorithmForm";
import AlgorithmFormButtons from "components/mainpanel/algorithm/algorithmpersistance/shared/AlgorithmFormButtons";

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
                        <div className="d-flex flex-column col-6 p-4">
                            <AlgorithmForm
                                algorithmDto={algorithmDto}
                                handleNameChange={handleNameChange}
                                handleDescriptionChange={handleDescriptionChange}
                                nameMessage={nameMessage}
                            />
                            <AlgorithmFormButtons isBtnDisabled={isBtnDisabled} />
                        </div>
                        <DiagramCreation
                            diagramBlockList={algorithmDto.diagramBlockList}
                            setDiagramBlockList={(newList) => setAlgorithmDto(prevState => ({ ...prevState, diagramBlockList: newList }))}
                        />
                    </div>
                </Form>
            </div>
        </>
    );
};

export default AlgorithmCreation;