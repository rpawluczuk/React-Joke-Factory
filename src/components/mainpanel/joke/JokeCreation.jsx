import React, {useState} from 'react';
import "../../../App.css"
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import axios from "axios";

import FastCreation from "components/mainpanel/joke/jokeCreation/fastcreation/FastCreation";
import CreationByFactory from "./jokeCreation/CreationByFactory";
import {useNavigate} from "react-router-dom";

const JokeCreation = () => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [authorItem, setAuthorItem] = useState();
    const [algorithmItemList, setAlgorithmItemList] = useState([]);
    const [jokeBlockList, setJokeBlockList] = useState([]);
    const navigate = useNavigate();

    function handleJokeSnippetChange(algorithmId, position, newJokeSnippet) {
        const index = jokeBlockList.findIndex(
            jokeBlock => jokeBlock.algorithmId === algorithmId && jokeBlock.position === position
        );
        const newJokeBlockList = [...jokeBlockList];
        newJokeBlockList[index].jokeSnippet = newJokeSnippet;
        setJokeBlockList(newJokeBlockList);
    }

    function handleFormSubmit(event) {
        event.preventDefault()
        const jokeCreatorDto = {
            title: title,
            content: content,
            authorItem: authorItem,
            algorithmItemList: algorithmItemList,
            jokeBlockDtoList: jokeBlockList,
        };
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
                        title={title}
                        onTitleChange={setTitle}
                        content={content}
                        onContentChange={setContent}
                        authorItem={authorItem}
                        onAuthorSelect={setAuthorItem}
                        algorithmItemList={algorithmItemList}
                        onAlgorithmItemListChange={setAlgorithmItemList}
                        jokeBlockList={jokeBlockList}
                        onJokeBlockListChange={setJokeBlockList}
                        onJokeSnippetChange={handleJokeSnippetChange}
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