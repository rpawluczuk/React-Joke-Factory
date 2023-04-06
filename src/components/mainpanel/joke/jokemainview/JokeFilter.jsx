import React, {useState, useEffect, useContext} from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Select from "react-select";
import axios from "axios";
import {JokeContext} from "../JokeContext";

const JokeFilter = () => {

    const [open, setOpen] = useState(false);
    const [selectedAuthor, setSelectedAuthor] = useState({label: "All"})
    const [authorList, setAuthorList] = useState([{label: "All"}])
    const [selectedStructure, setSelectedStructure] = useState({label: "All"})
    const [structureList, setStructureList] = useState([{label: "All"}])
    const [filters, setFilters] = useState({
        authorFilter: '',
        structureFilter: ''
    })

    const {setQuery} = useContext(JokeContext)

    useEffect(() => {
        axios.get(`http://localhost:8082/api/authors/list-items`).then((res) => {
            setAuthorList(prevState =>
                [...prevState, ...res.data]
            )
        });
        // axios.get(`http://localhost:8082/api/structures/list-items`).then((res) => {
        //     setStructureList(prevState =>
        //         [...prevState, ...res.data]
        //     )
        // });
    }, [])

    useEffect(() => {
        if (selectedAuthor.label === "All") {
            setFilters(prevState => {
                return {...prevState, authorFilter: ""}
            })
        } else {
            setFilters(prevState => {
                return {...prevState, authorFilter: "&author=" + selectedAuthor.value}
            })
        }
    }, [selectedAuthor])

    useEffect(() => {
        if (selectedStructure.label === "All") {
            setFilters(prevState => {
                return {...prevState, structureFilter: ""}
            })
        } else {
            setFilters(prevState => {
                return {...prevState, structureFilter: "&structures=" + selectedStructure.value}
            })
        }
    }, [selectedStructure])

    useEffect(() => {
        setQuery(filters.authorFilter + filters.structureFilter)
    }, [filters])

    const handleAuthorSelect = (newSelectedAuthor) => {
        setSelectedAuthor(newSelectedAuthor)
    };

    const handleStructureSelect = (newSelectedStructure) => {
        setSelectedStructure(newSelectedStructure)
    };

    return (
        <div className="mb-5">
            <div className="d-flex justify-content-center">
                <Button
                    variant="primary"
                    size="lg"
                    onClick={() => setOpen(!open)}
                    aria-controls="filters"
                    aria-expanded={open}
                    style={{width: '20%'}}
                >
                    Filters
                </Button>
            </div>
            <Collapse in={open}>
                <div className="collapse card card-body mt-3 px-5" id="filters">
                    <div className="d-flex flex-row justify-content-center">
                        <label className="col-form-label col-md-2">Filter By Author:</label>
                        <Select
                            className="col ms-4"
                            value={selectedAuthor}
                            options={authorList}
                            onChange={handleAuthorSelect}
                            placeholder={"Select Author Branch"}
                        />
                    </div>
                    <div className="d-flex flex-row justify-content-center mt-4">
                        <label className="col-form-label col-md-2">Filter By Structure:</label>
                        <Select
                            className="col ms-4"
                            value={selectedStructure}
                            options={structureList}
                            onChange={handleStructureSelect}
                            placeholder={"Select Structure Branch"}
                        />
                    </div>
                </div>
            </Collapse>
        </div>
    )
}


export default JokeFilter;