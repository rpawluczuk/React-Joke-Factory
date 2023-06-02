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
    const [selectedAlgorithm, setSelectedAlgorithm] = useState({label: "All"})
    const [algorithmList, setAlgorithmList] = useState([{label: "All"}])

    const {setQuery} = useContext(JokeContext)

    useEffect(() => {
        axios.get(`http://localhost:8082/api/authors/list-items`).then((res) => {
            setAuthorList(prevState =>
                [...prevState, ...res.data]
            )
        });
        axios.get(`http://localhost:8082/api/algorithms/item-list`).then((res) => {
            setAlgorithmList(prevState =>
                [...prevState, ...res.data]
            )
        });
    }, [])

    useEffect(() => {
        if (selectedAuthor.label === "All" && selectedAlgorithm.label === "All") {
            setQuery({});
        } else {
            const newQuery = {};
            if (selectedAuthor.label !== "All") {
                newQuery.authorId = selectedAuthor.value;
            }
            if (selectedAlgorithm.label !== "All") {
                newQuery.algorithmId = selectedAlgorithm.value;
            }
            setQuery(newQuery);
        }
    }, [selectedAuthor, selectedAlgorithm])

    const handleAuthorSelect = (newSelectedAuthor) => {
        setSelectedAuthor(newSelectedAuthor)
    };

    const handleAlgorithmSelect = (newSelectedAlgorithm) => {
        setSelectedAlgorithm(newSelectedAlgorithm)
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
                        <label className="col-form-label col-md-2">Filter By Algorithm:</label>
                        <Select
                            className="col ms-4"
                            value={selectedAlgorithm}
                            options={algorithmList}
                            onChange={handleAlgorithmSelect}
                            placeholder={"Select Algorithm Branch"}
                        />
                    </div>
                </div>
            </Collapse>
        </div>
    )
}


export default JokeFilter;