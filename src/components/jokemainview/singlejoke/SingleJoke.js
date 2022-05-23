import React from 'react';

const SingleJoke = ({joke}) => {

  return (
      <div className='card-body'>
        <div className='d-flex flex-row justify-content-between'>
          <h2 className='card-title mb-4'> {joke.title} </h2>
        </div>
        <pre style={{whiteSpace: 'pre-wrap', fontSize: 'larger', fontFamily: 'serif'}}>{joke.content}</pre>
      </div>
  )
}
export default SingleJoke;