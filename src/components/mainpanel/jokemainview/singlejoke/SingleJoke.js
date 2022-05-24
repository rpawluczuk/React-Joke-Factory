import React, {useContext} from 'react';
import JokeContext from "../../../../context/JokeContext";
import {FaEdit, FaTimes} from "react-icons/all";

const SingleJoke = ({joke}) => {
  const {deleteJoke} = useContext(JokeContext)

  return (
      <div className="card mb-4" style={{background: "azure"}}>
        <div className='d-flex flex-row justify-content-between'>
          <h2 className='card-title pt-4 px-4'> {joke.title} </h2>
          <div className='card-header-tabs px-2'>
            <button className='Item-top-button'><FaEdit/></button>
            <button className='Item-top-button' onClick={() => deleteJoke(joke.id)}><FaTimes/></button>
          </div>
        </div>
        <div className='card-body px-4'>
          <pre style={{
            whiteSpace: 'pre-wrap',
            fontSize: 'larger',
            fontFamily: 'serif'
          }}>{joke.content}</pre>
        </div>
      </div>
  )
}
export default SingleJoke;