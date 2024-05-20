import React, {useContext} from 'react';
import {FaEdit, FaTimes} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {AuthorContext} from "../AuthorContext";

const SingleAuthor= ({author}) => {
    const navigate = useNavigate();
    const {refreshAuthorList} = useContext(AuthorContext)

    const handleEditAuthor = (id) => {
        navigate(`/author-edition/${id}`)
    }

    const handleDeleteAuthor = (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            axios.delete(`http://localhost:8082/api/authors/${id}`)
                .then(refreshAuthorList)
        }
    }

    return (
        <div className="card mb-4" style={{background: "azure"}}>
            <div className='d-flex flex-row justify-content-between'>
                <h2 className='card-title pt-4 px-4'> {author.name} {author.surname} </h2>
                <div className='card-header-tabs px-2'>
                    <button className='Item-top-button' onClick={() => handleEditAuthor(author.id)}><FaEdit/></button>
                    <button className='Item-top-button' onClick={() => handleDeleteAuthor(author.id)}><FaTimes/></button>
                </div>
            </div>
            <div className='card-body px-4'>
          <pre style={{
              whiteSpace: 'pre-wrap',
              fontSize: 'larger',
              fontFamily: 'serif'
          }}>{author.description}</pre>
            </div>
        </div>
    )
}
export default SingleAuthor;