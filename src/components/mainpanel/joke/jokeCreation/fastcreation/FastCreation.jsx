import React, {useEffect, useState} from 'react';
import "App.css"
import axios from "axios";
import {Form} from "react-bootstrap";
import JokeFormButtons from "components/mainpanel/joke/jokeCreation/fastcreation/JokeFormButtons";
import JokeForm from "components/mainpanel/joke/jokeCreation/fastcreation/JokeForm";
import AlgorithmPanel from "components/mainpanel/joke/jokeCreation/fastcreation/AlgorithmPanel";

const FastCreation = (props) => {

    const {
        title,
        onTitleChange,
        content,
        onContentChange,
        authorItem,
        onAuthorSelect,
        algorithmItemList,
        onAlgorithmItemListChange,
        jokeBlockList,
        onJokeBlockListChange,
        onJokeSnippetChange,
        onFormSubmit
    } = props;

    const [isBtnDisabled, setIsBtnDisabled] = useState(true)
    const [currentAlgorithmItemIndex, setCurrentAlgorithmItemIndex] = useState(0)

    useEffect(() => {
        title.length < 3 || content.length < 10 ? setIsBtnDisabled(true) : setIsBtnDisabled(false)
    }, [title, content])

    function onAlgorithmsSelect(newAlgorithmItemList) {
        if (newAlgorithmItemList.length > algorithmItemList.length) {
            setCurrentAlgorithmItemIndex(algorithmItemList.length);
            let selectedAlgorithmItem = findExtraElement(algorithmItemList, newAlgorithmItemList)
            sendNewAlgorithmToBackend(selectedAlgorithmItem);
        } else {
            if (currentAlgorithmItemIndex > 0) {
                setCurrentAlgorithmItemIndex(currentAlgorithmItemIndex - 1);
            }
            let unselectedAlgorithmItem = findExtraElement(newAlgorithmItemList, algorithmItemList)
            onJokeBlockListChange(jokeBlockList.filter(jokeBlock => jokeBlock.algorithmId !== unselectedAlgorithmItem.value));
        }
        onAlgorithmItemListChange(newAlgorithmItemList)
    }

    function sendNewAlgorithmToBackend(newAlgorithm) {
        axios.get(`http://localhost:8082/api/joke-diagram/${newAlgorithm.value}`)
            .then(res => {
                onJokeBlockListChange([...jokeBlockList, ...res.data]);
            })
            .catch(error => {
                console.error(error);
            });
    }

    function findExtraElement(shortArr, longArr) {
        const shortSet = new Set(shortArr.map(JSON.stringify));
        return longArr.map(JSON.stringify).filter(item => !shortSet.has(item)).map(JSON.parse).pop();
    }

    return (
        <div className="Data-container">
            <Form onSubmit={onFormSubmit} className='mt-4'>
                <div className="d-flex flex-row">
                    <div className="d-flex flex-column col-6 p-4">
                        <JokeForm title={title}
                                  onTitleChange={onTitleChange}
                                  content={content}
                                  onContentChange={onContentChange}
                                  authorItem={authorItem}
                                  onAuthorSelect={onAuthorSelect}
                                  onAlgorithmsSelect={onAlgorithmsSelect}/>
                        <JokeFormButtons isBtnDisabled={isBtnDisabled}/>
                    </div>
                    <div className="col-6 p-4">
                        <AlgorithmPanel algorithmItemList={algorithmItemList}
                                        currentAlgorithmItemIndex={currentAlgorithmItemIndex}
                                        onCurrentAlgorithmItemIndexChange={setCurrentAlgorithmItemIndex}
                                        jokeBlockList={jokeBlockList}
                                        onJokeBlockListChange={onJokeBlockListChange}
                                        onJokeSnippetChange={onJokeSnippetChange}/>
                    </div>
                </div>
            </Form>
        </div>
    );
}

export default FastCreation;