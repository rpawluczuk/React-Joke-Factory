import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const AuthorEdition = () => {
    const [authorCreatorDto, setAuthorCreatorDto] = useState({
        name: '',
        surname: '',
        description: '',
    })
    const [isBtnDisabled, setIsBtnDisabled] = useState(true)
    const [nameMessage, setNameMessage] = useState('')

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        authorCreatorDto.name.length < 3 ? setIsBtnDisabled(true) : setIsBtnDisabled(false)
        authorCreatorDto.name.length > 0 && authorCreatorDto.name.length < 3 ? setNameMessage("Name must be at least 3 characters long!") : setNameMessage(null)
    }, [authorCreatorDto.name])

    useEffect(() => {
        axios.get(`http://localhost:8081/api/authors/creator/${params.id}`).then((res) => {
            setAuthorCreatorDto({
                id: params.id,
                name: res.data.name,
                surname: res.data.surname,
                description: res.data.description
            })
        })
    }, [])

    const handleSubmit = () => {
        axios.put(`http://localhost:8081/api/authors`, authorCreatorDto).then(navigate(`/author-list`))
    }

    const handleNameChange = event => {
        setAuthorCreatorDto(prevState => {
            return {...prevState, name: event.target.value}
        })
    }

    const handleSurnameChange = event => {
        setAuthorCreatorDto(prevState => {
            return {...prevState, surname: event.target.value}
        })
    }

    const handleDescriptionChange = event => {
        setAuthorCreatorDto(prevState => {
            return {...prevState, description: event.target.value}
        })
    }

    return (
        <div>
            <p className="Data-header">Edit a new joke</p>
            <form onSubmit={handleSubmit} className='mt-4'>
                <div className="d-flex flex-column align-items-center">
                    <div className="row col-8 form-group">
                        <label>Title</label>
                        <input onChange={handleNameChange}
                               value={authorCreatorDto.name}
                               type="text"
                               className="form-control"
                               placeholder="name"/>
                        {nameMessage && <div className='Validation-message'>{nameMessage}</div>}
                    </div>
                    <div className="row col-8 form-group">
                        <label>Surname</label>
                        <input onChange={handleSurnameChange}
                               value={authorCreatorDto.surname}
                               type="text"
                               className="form-control"
                               placeholder="surname"/>
                    </div>
                    <div className="row col-8 form-group">
                        <label>Description</label>
                        <textarea onChange={handleDescriptionChange}
                                  value={authorCreatorDto.description}
                                  placeholder="description"
                                  className="form-control"
                                  rows="6"/>
                    </div>
                    <div className="row col-8 m-3">
                        <div className="d-flex flex-row-reverse">
                            <button className="btn btn-success float-right mx-2"
                                    type="submit" disabled={isBtnDisabled}>Update author
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
export default AuthorEdition;