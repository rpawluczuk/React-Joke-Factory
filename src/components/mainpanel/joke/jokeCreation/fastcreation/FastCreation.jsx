import React, {useEffect, useState} from 'react';
import "App.css"
import axios from "axios";
import Select from "react-select";
import {Form, FormGroup} from "react-bootstrap";
import JokeFormButtons from "components/mainpanel/joke/jokeCreation/fastcreation/JokeFormButtons";
import JokeDiagramCreation
    from "components/mainpanel/joke/jokeCreation/fastcreation/jokediagramcreation/JokeDiagramCreation";
import ReactPaginate from "react-paginate";
import useLengthValidation from "hooks/useLengthValidation";

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
    const [titleMessage] = useLengthValidation(title, 3);
    const [contentMessage] = useLengthValidation(content, 10);
    const [authorItemList, setAuthorItemList] = useState([])
    const [allAlgorithmItemList, setAllAlgorithmItemList] = useState([])
    const [currentAlgorithmItemIndex, setCurrentAlgorithmItemIndex] = useState(0)

    useEffect(() => {
        axios.get(`http://localhost:8082/api/authors/list-items`).then((res) => {
            setAuthorItemList(res.data)
        });
        axios.get(`http://localhost:8082/api/algorithms/item-list/`).then((res) => {
            setAllAlgorithmItemList(res.data)
        });
    }, [])

    useEffect(() => {
        title.length < 3 || content.length < 10 ? setIsBtnDisabled(true) : setIsBtnDisabled(false)
    }, [title, content])

    function onAlgorithmsSelect(newAlgorithmItemList) {
        if (newAlgorithmItemList.length > algorithmItemList.length) {
            setCurrentAlgorithmItemIndex(algorithmItemList.length);
            let selectedAlgorithmItem = findExtraElement(algorithmItemList, newAlgorithmItemList)
            sendNewAlgorithmToBackend(selectedAlgorithmItem);
        } else {
            if(currentAlgorithmItemIndex > 0) {
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

    const handleAlgorithmChange = (event) => {
        setCurrentAlgorithmItemIndex(event.selected)
    };

    function findExtraElement(shortArr, longArr) {
        const shortSet = new Set(shortArr.map(JSON.stringify));
        return longArr.map(JSON.stringify).filter(item => !shortSet.has(item)).map(JSON.parse).pop();
    }

    return (
        <div className="Data-container">
            <Form onSubmit={onFormSubmit} className='mt-4'>
                <div className="d-flex flex-row">
                    <div className="d-flex flex-column col-6 p-4">
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text"
                                          placeholder="Title"
                                          onChange={e => onTitleChange(e.target.value)}
                                          value={title}/>
                            {titleMessage && <div className='Validation-message'>{titleMessage}</div>}
                        </Form.Group>
                        <FormGroup className="mb-3">
                            <Form.Label>Content</Form.Label>
                            <Form.Control as="textarea"
                                          rows={6}
                                          onChange={e => onContentChange(e.target.value)}
                                          value={content}
                                          placeholder="content"/>
                            {contentMessage && <div className='Validation-message'>{contentMessage}</div>}
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Form.Label>Author</Form.Label>
                            <Select value={authorItem}
                                    options={authorItemList}
                                    onChange={onAuthorSelect}
                                    isSearchable={true}
                                    placeholder={"Select Author Branch"}/>
                        </FormGroup>
                        <FormGroup className="mb-3">
                            <Form.Label>Algorithm</Form.Label>
                            <Select options={allAlgorithmItemList}
                                    onChange={onAlgorithmsSelect}
                                    isSearchable={true}
                                    isMulti
                                    placeholder={"Select Algorithm"}/>
                        </FormGroup>
                        <JokeFormButtons isBtnDisabled={isBtnDisabled}/>
                    </div>
                    <div className="col-6 p-4">
                        <div className="container d-flex flex-column align-items-center">
                            <ReactPaginate
                                previousLabel="< previous"
                                nextLabel="next >"
                                pageClassName="page-item"
                                pageLinkClassName="page-link"
                                previousClassName="page-item"
                                previousLinkClassName="page-link"
                                nextClassName="page-item"
                                nextLinkClassName="page-link"
                                breakLabel="..."
                                breakClassName="page-item"
                                breakLinkClassName="page-link"
                                pageCount={algorithmItemList.length}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={handleAlgorithmChange}
                                containerClassName="pagination"
                                activeClassName="active"
                                forcePage={currentAlgorithmItemIndex}
                                renderOnZeroPageCount={null}
                            />
                            <h2>{algorithmItemList[currentAlgorithmItemIndex]
                                && algorithmItemList[currentAlgorithmItemIndex].label}</h2>
                            <JokeDiagramCreation
                                jokeBlockList={jokeBlockList.filter(jokeBlock =>
                                    jokeBlock.algorithmId === algorithmItemList[currentAlgorithmItemIndex].value)}
                                setJokeBlockList={onJokeBlockListChange}
                                onJokeSnippetChange={onJokeSnippetChange}
                            />
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    );
}

export default FastCreation;