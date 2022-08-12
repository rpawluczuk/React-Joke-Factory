import React, {useEffect, useState} from 'react';
import Select from 'react-select';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const JokeEdition = () => {
    const [jokeCreatorDto, setJokeCreatorDto] = useState({
        title: '',
        content: '',
        authorItem: null
    })
    const [isBtnDisabled, setIsBtnDisabled] = useState(true)
    const [titleMessage, setTitleMessage] = useState('')
    const [contentMessage, setContentMessage] = useState('')
    const [authorItemList, setAuthorItemList] = useState([])

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        jokeCreatorDto.title.length < 3 || jokeCreatorDto.content.length < 10 ? setIsBtnDisabled(true) : setIsBtnDisabled(false)
        jokeCreatorDto.title.length > 0 && jokeCreatorDto.title.length < 3 ? setTitleMessage("Title must be at least 3 characters long!") : setTitleMessage(null)
        jokeCreatorDto.content.length > 0 && jokeCreatorDto.content.length < 10 ? setContentMessage("Content must be at least 10 characters long!") : setContentMessage(null)
    }, [jokeCreatorDto.title, jokeCreatorDto.content])

    useEffect(() => {
        axios.get(`http://localhost:8081/api/authors/list-items`).then((res) => {
            setAuthorItemList(res.data)
        })
        axios.get(`http://localhost:8081/api/jokes/creator/${params.id}`).then((res) => {
            setJokeCreatorDto({
                id: params.id,
                title: res.data.title,
                content: res.data.content,
                authorItem: res.data.authorItem
            })
        })
    }, [])

    const handleSubmit = () => {
        axios.put(`http://localhost:8081/api/jokes`, jokeCreatorDto)
            .then(navigate(`/joke-list`))
    }

    const handleTitleChange = event => {
        setJokeCreatorDto(prevState => {
            return {...prevState, title: event.target.value}
        })
    }

    const handleContentChange = event => {
        setJokeCreatorDto(prevState => {
            return {...prevState, content: event.target.value}
        })
    }

    const handleAuthorSelect = selectedAuthor => {
        setJokeCreatorDto(prevState => {
            return {...prevState, authorItem: selectedAuthor}
        })
    };

    return (
        <div>
            <p className="Data-header">Edit a new joke</p>
            <form onSubmit={handleSubmit} className='mt-4'>
                <div className="d-flex flex-column align-items-center">
                    <div className="row col-8 form-group">
                        <label>Title</label>
                        <input onChange={handleTitleChange}
                               value={jokeCreatorDto.title}
                               type="text"
                               className="form-control"
                               placeholder="title"
                        />
                        {titleMessage && <div className='Validation-message'>{titleMessage}</div>}
                    </div>
                    <div className="row col-8 form-group">
                        <label>Content</label>
                        <textarea onChange={handleContentChange}
                                  value={jokeCreatorDto.content}
                                  placeholder="content"
                                  className="form-control"
                                  rows="6"/>
                        {contentMessage && <div className='Validation-message'>{contentMessage}</div>}
                    </div>
                    <div className="row col-8 form-group">
                        <label>Author</label>
                        <Select
                            className="p-0"
                            value={jokeCreatorDto.authorItem}
                            options={authorItemList}
                            onChange={handleAuthorSelect}
                            isSearchable={true}
                            placeholder={"Select Author Branch"}
                        />
                    </div>
                    <div className="row col-8 m-3">
                        <div className="d-flex flex-row-reverse">
                            <button className="btn btn-success float-right mx-2"
                                    type="submit" disabled={isBtnDisabled}>Update Joke
                            </button>
                            <button className="btn btn-primary float-right mx-2">Cancel
                            </button>
                            <button type="submit"
                                    className="btn btn-primary float-right mx-2">Reset
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default JokeEdition;