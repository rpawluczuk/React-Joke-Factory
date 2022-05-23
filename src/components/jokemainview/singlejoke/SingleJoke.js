import React from 'react';

const SingleJoke = ({joke, handleDelete }) => {

  return (
      <div className="card p-3 mb-4" style={{background: "azure"}}>
        <div className='card-body'>
          <div className='d-flex flex-row justify-content-between'>
            <h2 className='card-title mb-4'> {joke.title} </h2>
            <button className='btn-close' onClick={() => handleDelete(joke.id)}/>
          </div>
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