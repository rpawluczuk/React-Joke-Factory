import React, {useContext, useEffect, useState} from 'react';
import "../../../App.css"
import JokeContext from "../../../context/JokeContext";

const JokeCreation = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [isBtnDisabled, setIsBtnDisabled] = useState(true)
  const [titleMessage, setTitleMessage] = useState('')
  const [contentMessage, setContentMessage] = useState('')

  const {addJoke} = useContext(JokeContext)

  useEffect(() => {
    title.length < 3 || content.length < 10 ? setIsBtnDisabled(true) : setIsBtnDisabled(false)
    title.length > 0 && title.length < 3 ? setTitleMessage("Title must be at least 3 characters long!") : setTitleMessage(null)
    content.length > 0 && content.length < 10 ? setContentMessage("Content must be at least 10 characters long!") : setContentMessage(null)
  }, [title, content])

  const handleSubmit = (event) => {
    event.preventDefault()
    const newJoke = {
      title: title,
      content: content
    }
    addJoke(newJoke)
    setTitle('')
    setContent('')
  }

  return (
      <div>
        <p className="Data-header">Add a new joke</p>

        <form onSubmit={handleSubmit} className='mt-4'>
          <div className="d-flex flex-column align-items-center">
            <div className="row col-8 form-group">
              <label>Title</label>
              <input onChange={event => setTitle(event.target.value)}
                     value={title}
                     type="text"
                     className="form-control"
                     placeholder="title"/>
              {titleMessage && <div className='Validation-message'>{titleMessage}</div> }
            </div>
            <div className="row col-8 form-group">
              <label>Content</label>
              <textarea onChange={event => setContent(event.target.value)}
                        value={content}
                        placeholder="content"
                        className="form-control"
                        rows="6"/>
              {contentMessage && <div className='Validation-message'>{contentMessage}</div> }
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