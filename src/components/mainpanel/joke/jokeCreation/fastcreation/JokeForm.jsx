import React from 'react';
import {Form, FormGroup} from "react-bootstrap";
import Select from "react-select";
import {useEffect, useState} from 'react';
import axios from "axios";
import useLengthValidation from "hooks/useLengthValidation";

const JokeForm = (props) => {

    const {
        title,
        onTitleChange,
        content,
        onContentChange,
        authorItem,
        onAuthorSelect,
        algorithmItemList,
        onAlgorithmsSelect
    } = props

    const [authorItemList, setAuthorItemList] = useState([])
    const [allAlgorithmItemList, setAllAlgorithmItemList] = useState([])
    const [titleMessage] = useLengthValidation(title, 3);
    const [contentMessage] = useLengthValidation(content, 10);

    useEffect(() => {
        axios.get(`http://localhost:8082/api/authors/list-items`).then((res) => {
            setAuthorItemList(res.data)
        });
        axios.get(`http://localhost:8082/api/algorithms/item-list`).then((res) => {
            setAllAlgorithmItemList(res.data)
        });
    }, [])

    return (
        <>
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
                <Select key={JSON.stringify(algorithmItemList)}
                        options={allAlgorithmItemList}
                        onChange={onAlgorithmsSelect}
                        isSearchable={true}
                        isMulti
                        defaultValue={algorithmItemList}
                        placeholder={"Select Algorithm"}/>
            </FormGroup>
        </>
    );
};

export default JokeForm;