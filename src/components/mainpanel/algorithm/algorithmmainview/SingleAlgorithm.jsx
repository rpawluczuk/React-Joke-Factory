import React from 'react';
import {FaEdit, FaTimes} from "react-icons/all";
import {Button} from "react-bootstrap";


const SingleAlgorithm = ({algorithm}) => {

    const { name, description } = algorithm;

    return (
        <div  className="card mb-4" style={{background: "aliceblue"}}>
            <div className='d-flex flex-row justify-content-between'>
                <h2 className='card-title pt-4 px-4'> {name} </h2>
                <div className='card-header-tabs px-2'>
                    <button className='Item-top-button'><FaEdit/></button>
                    <button className='Item-top-button'><FaTimes/></button>
                </div>
            </div>
            <div className='card-body px-4'>
                <pre style={{whiteSpace: 'pre-wrap', fontSize: 'larger', fontFamily: 'serif'}}>{description}</pre>
                <div className='d-flex justify-content-center'>
                    <Button variant="outline-primary">Details</Button>
                </div>
            </div>
        </div>
    );
};

export default SingleAlgorithm;