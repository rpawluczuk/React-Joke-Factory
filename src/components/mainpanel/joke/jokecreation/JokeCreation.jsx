import React, {useEffect, useState} from 'react';
import "../../../../App.css"
import axios from "axios";
import {useNavigate} from "react-router-dom";

const JokeCreation = () => {
    const [jokeCreatorDto, setJokeCreatorDto] = useState({
        title: '',
        content: '',
        authorItem: {}
    })
    const [isBtnDisabled, setIsBtnDisabled] = useState(true)
    const [titleMessage, setTitleMessage] = useState('')
    const [contentMessage, setContentMessage] = useState('')
    const [authorItemList, setAuthorItemList] = useState([])

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8081/api/authors/list-items`).then((res) => {
            setAuthorItemList(res.data)
        });
    }, [])

    useEffect(() => {
        jokeCreatorDto.title.length < 3 || jokeCreatorDto.content.length < 10 ? setIsBtnDisabled(true) : setIsBtnDisabled(false)
        jokeCreatorDto.title.length > 0 && jokeCreatorDto.title.length < 3 ? setTitleMessage("Title must be at least 3 characters long!") : setTitleMessage(null)
        jokeCreatorDto.content.length > 0 && jokeCreatorDto.content.length < 10 ? setContentMessage("Content must be at least 10 characters long!") : setContentMessage(null)
    }, [jokeCreatorDto.title, jokeCreatorDto.content])


    const handleSubmit = () => {
        axios.post(`http://localhost:8081/api/jokes`, jokeCreatorDto).then(navigate(`/joke-list`))
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

    const handleAuthorSelect = event => {
        console.log(JSON.parse(event.target.value))
        setJokeCreatorDto(prevState => {
            return {...prevState, authorItem: JSON.parse(event.target.value)}
        })
    };

    return (
        <div>
            <p className="Data-header">Add a new joke</p>

            <form onSubmit={handleSubmit} className='mt-4'>
                <div className="d-flex flex-column align-items-center">
                    <div className="row col-8 form-group">
                        <label>Title</label>
                        <input onChange={handleTitleChange}
                               value={jokeCreatorDto.title}
                               type="text"
                               className="form-control"
                               placeholder="title"/>
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
                        <select onChange={handleAuthorSelect} className="form-control" data-toggle="tooltip"
                                data-placement="right" title="Select Author Branch">
                            <option value="null">--Select Author--</option>
                            {authorItemList.map(authorItem => (
                                <option key={authorItem.id} value={JSON.stringify(authorItem)}>
                                    {authorItem.text}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="row col-8 m-3">
                        <div className="d-flex flex-row-reverse">
                            <button className="btn btn-success float-right mx-2"
                                    type="submit" disabled={isBtnDisabled}>Add Joke
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
export default JokeCreation;