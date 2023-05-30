import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Form} from "react-bootstrap";
import JokeFormButtons from "components/mainpanel/joke/jokeCreation/fastcreation/JokeFormButtons";
import JokeForm from "components/mainpanel/joke/jokeCreation/fastcreation/JokeForm";
import AlgorithmPanel from "components/mainpanel/joke/jokeCreation/fastcreation/AlgorithmPanel";

const JokeEdition = () => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [authorItem, setAuthorItem] = useState();
    const [algorithmItemList, setAlgorithmItemList] = useState([]);
    const [jokeBlockList, setJokeBlockList] = useState([]);
    const [isBtnDisabled, setIsBtnDisabled] = useState(true)
    const [currentAlgorithmItemIndex, setCurrentAlgorithmItemIndex] = useState(0)
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        title.length < 3 || content.length < 10 ? setIsBtnDisabled(true) : setIsBtnDisabled(false)
    }, [title, content])

    useEffect(() => {
        axios.get(`http://localhost:8082/api/jokes/creator/${params.id}`).then((res) => {
            setTitle(res.data.title)
            setContent(res.data.content)
            setAuthorItem(res.data.authorItem)
            setAlgorithmItemList(res.data.algorithmItemList)
            setJokeBlockList(res.data.jokeBlockDtoList)
        })
    }, [])

    const handleFormSubmit = (event) => {
        event.preventDefault()
        const jokeCreatorDto = {
            id: params.id,
            title: title,
            content: content,
            authorItem: authorItem,
            algorithmItemList: algorithmItemList,
            jokeBlockDtoList: jokeBlockList,
        };
        axios.put(`http://localhost:8082/api/jokes`, jokeCreatorDto)
            .then(navigate(`/joke-list`))
    }

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
            setJokeBlockList(jokeBlockList.filter(jokeBlock => jokeBlock.algorithmId !== unselectedAlgorithmItem.value));
        }
        setAlgorithmItemList(newAlgorithmItemList)
    }

    function sendNewAlgorithmToBackend(newAlgorithm) {
        axios.get(`http://localhost:8082/api/joke-diagram/${newAlgorithm.value}`)
            .then(res => {
                setJokeBlockList([...jokeBlockList, ...res.data]);
            })
            .catch(error => {
                console.error(error);
            });
    }

    function findExtraElement(shortArr, longArr) {
        const shortSet = new Set(shortArr.map(JSON.stringify));
        return longArr.map(JSON.stringify).filter(item => !shortSet.has(item)).map(JSON.parse).pop();
    }

    function handleJokeSnippetChange(algorithmId, position, newJokeSnippet) {
        const index = jokeBlockList.findIndex(
            jokeBlock => jokeBlock.algorithmId === algorithmId && jokeBlock.position === position
        );
        const newJokeBlockList = [...jokeBlockList];
        newJokeBlockList[index].jokeSnippet = newJokeSnippet;
        setJokeBlockList(newJokeBlockList);
    }

    return (
        <div>
            <p className="Data-header">Edit a new joke</p>
            <Form onSubmit={handleFormSubmit} className='mt-4'>
                <div className="d-flex flex-row">
                    <div className="d-flex flex-column col-6 p-4">
                        <JokeForm title={title}
                                  onTitleChange={setTitle}
                                  content={content}
                                  onContentChange={setContent}
                                  authorItem={authorItem}
                                  onAuthorSelect={setAuthorItem}
                                  algorithmItemList={algorithmItemList}
                                  onAlgorithmsSelect={onAlgorithmsSelect}/>
                        <JokeFormButtons isBtnDisabled={isBtnDisabled}/>
                    </div>
                    <div className="col-6 p-4">
                        <AlgorithmPanel algorithmItemList={algorithmItemList}
                                        currentAlgorithmItemIndex={currentAlgorithmItemIndex}
                                        onCurrentAlgorithmItemIndexChange={setCurrentAlgorithmItemIndex}
                                        jokeBlockList={jokeBlockList}
                                        onJokeBlockListChange={setJokeBlockList}
                                        onJokeSnippetChange={handleJokeSnippetChange}/>
                    </div>
                </div>
            </Form>
        </div>
    )
}
export default JokeEdition;