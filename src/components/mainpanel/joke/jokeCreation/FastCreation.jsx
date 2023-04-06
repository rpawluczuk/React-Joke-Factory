import React, {useEffect, useState} from 'react';
import "../../../../App.css"
import axios from "axios";
import Select from "react-select";
import {Form, FormGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const FastCreation = (props) => {

    const {
        jokeCreatorDto,
        onTitleChange,
        onContentChange,
        onAuthorSelect,
        onFormSubmit
    } = props;

    const [isBtnDisabled, setIsBtnDisabled] = useState(true)
    const [titleMessage, setTitleMessage] = useState('')
    const [contentMessage, setContentMessage] = useState('')
    const [authorItemList, setAuthorItemList] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:8082/api/authors/list-items`).then((res) => {
            setAuthorItemList(res.data)
        });
    }, [])

    useEffect(() => {
        jokeCreatorDto.title.length < 3 || jokeCreatorDto.content.length < 10 ? setIsBtnDisabled(true) : setIsBtnDisabled(false)
        jokeCreatorDto.title.length > 0 && jokeCreatorDto.title.length < 3 ? setTitleMessage("Title must be at least 3 characters long!") : setTitleMessage(null)
        jokeCreatorDto.content.length > 0 && jokeCreatorDto.content.length < 10 ? setContentMessage("Content must be at least 10 characters long!") : setContentMessage(null)
    }, [jokeCreatorDto.title, jokeCreatorDto.content])

    return (
        <div className="container">
            <Form onSubmit={onFormSubmit} className='mt-4'>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Title"
                                  onChange={onTitleChange}
                                  value={jokeCreatorDto.title}/>
                    {titleMessage && <div className='Validation-message'>{titleMessage}</div>}
                </Form.Group>
                <FormGroup className="mb-3">
                    <Form.Label>Content</Form.Label>
                    <Form.Control as="textarea"
                                  rows={6}
                                  onChange={onContentChange}
                                  value={jokeCreatorDto.content}
                                  placeholder="content"/>
                    {contentMessage && <div className='Validation-message'>{contentMessage}</div>}
                </FormGroup>
                <FormGroup className="mb-3">
                    <Form.Label>Author</Form.Label>
                    <Select value={jokeCreatorDto.authorItem}
                            options={authorItemList}
                            onChange={onAuthorSelect}
                            isSearchable={true}
                            placeholder={"Select Author Branch"}/>
                </FormGroup>
                <div className="d-flex flex-row-reverse">
                    <Button className="float-right mx-2"
                            variant="success"
                            type="submit"
                            disabled={isBtnDisabled}
                        >
                        Add Joke
                    </Button>
                    <Button className="float-right mx-2"
                            variant={"primary"}>
                        Cancel
                    </Button>
                    {/*<Button type="submit"*/}
                    {/*        variant={"primary"}*/}
                    {/*        className="float-right mx-2">Reset*/}
                    {/*</Button>*/}
                </div>
            </Form>
        </div>
    );
}

export default FastCreation;