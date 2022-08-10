import React, {useEffect, useState} from 'react';
import {AuthorContext} from "../../../context/AuthorContext";
import axios from "axios";
import SingleAuthor from "./authormainview/SingleAuthor";
import AuthorPagination from "./authormainview/AuthorPagination";

const AuthorMainView = () => {

const [authorList, setAuthorList] = useState([])

    useEffect(() => {
        refreshAuthorList()
    }, [])

    const refreshAuthorList = () => {
        axios.get(`http://localhost:8081/api/authors`).then((res) => {
            setAuthorList(res.data)
        });
    }

    if (!authorList || authorList.length === 0) {
        return (
            <div className='container'>
                <p className="text-center display-6 m-5 fw-bolder" style={{color: 'red'}}>No Authors</p>
            </div>
        )
    }

    return (
        <AuthorContext.Provider value={{authorList, setAuthorList, refreshAuthorList}}>
            <div className="container">
                <h1 className="text-center display-2 text-dark m-5 fw-bolder">List of
                    Authors</h1>
                {authorList.map((author) => (
                    <SingleAuthor key={author.id} author={author}/>
                ))}
                <AuthorPagination></AuthorPagination>
            </div>
        </AuthorContext.Provider>
    )
}
export default AuthorMainView;