import React, {useEffect, useState} from 'react';
import "../../../App.css"
import axios from "axios";
import {useNavigate} from "react-router-dom";

const AuthorCreation = () => {
  const [authorCreatorDto, setAuthorCreatorDto] = useState({
    name: '',
    surname: '',
    description: '',
  })
  const [isBtnDisabled, setIsBtnDisabled] = useState(true)
  const [nameMessage, setNameMessage] = useState('')

  const navigate = useNavigate();

  useEffect(() => {
    authorCreatorDto.name.length < 3 ? setIsBtnDisabled(true) : setIsBtnDisabled(false)
    authorCreatorDto.name.length> 0 && authorCreatorDto.name.length < 3 ? setNameMessage("Name must be at least 3 characters long!") : setNameMessage(null)
  }, [authorCreatorDto.name])


  const handleSubmit = () => {
    axios.post(`http://localhost:8082/api/authors`, authorCreatorDto).then(navigate(`/author-list`))
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
        <p className="Data-header">Add a new author</p>

        <form onSubmit={handleSubmit} className='mt-4'>
          <div className="d-flex flex-column align-items-center">
            <div className="row col-8 form-group">
              <label>Name</label>
              <input onChange={handleNameChange}
                     value={authorCreatorDto.name}
                     type="text"
                     className="form-control"
                     placeholder="name"/>
              {nameMessage && <div className='Validation-message'>{nameMessage}</div> }
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
                        type="submit" disabled={isBtnDisabled}>Add Author
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
export default AuthorCreation;