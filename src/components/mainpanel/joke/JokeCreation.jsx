import React, {useState} from 'react';
import "../../../App.css"
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import axios from "axios";

import FastCreation from "./jokeCreation/FastCreation";
import CreationByFactory from "./jokeCreation/CreationByFactory";
import {useNavigate} from "react-router-dom";

const JokeCreation = () => {

    const [jokeCreatorDto, setJokeCreatorDto] = useState({
        title: '',
        content: '',
        authorItem: null
    })
    const navigate = useNavigate();

    function handleTitleChange (event) {
        setJokeCreatorDto({...jokeCreatorDto, title: event.target.value})
    }

    function handleContentChange (event) {
        setJokeCreatorDto({...jokeCreatorDto, content: event.target.value})
    }

    function handleAuthorSelect (selectedAuthor) {
        setJokeCreatorDto({...jokeCreatorDto, authorItem: selectedAuthor})
    }

    function handleFormSubmit(event) {
        event.preventDefault()
        axios.post(`http://localhost:8082/api/jokes`, jokeCreatorDto)
            .then(navigate(`/joke-list`))
    }

    return (
        <div className="px-4">
            <p className="Data-header">Add a new joke</p>

            <Tabs
                defaultActiveKey="creationByFactory"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="fastCreation" title="Fast Creation">
                    <FastCreation
                        jokeCreatorDto={jokeCreatorDto}
                        onTitleChange={handleTitleChange}
                        onContentChange={handleContentChange}
                        onAuthorSelect={handleAuthorSelect}
                        onFormSubmit={handleFormSubmit}
                    />
                </Tab>
                <Tab eventKey="creationByFactory" title="Creation by Factory">
                    <CreationByFactory/>
                </Tab>
            </Tabs>
        </div>
    )
}
export default JokeCreation;