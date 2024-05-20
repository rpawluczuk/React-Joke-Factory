import React, {useState, useContext} from 'react';
import {FaEdit, FaTimes} from "react-icons/fa";
import {Button} from "react-bootstrap";
import axios from "axios";
import DiagramBlock from "components/mainpanel/algorithm/algorithmmainview/singlealgorithm/DiagramBlock";
import {AlgorithmContext} from "components/mainpanel/algorithm/AlgorithmContext";
import {useNavigate} from "react-router-dom";


const SingleAlgorithm = ({algorithm}) => {

    const {id, name, description} = algorithm;
    const [isDetailsButtonClicked, setIsDetailsButtonClicked] = useState(false)
    const [diagramBlockList, setDiagramBlockList] = useState([])
    const navigate = useNavigate();
    const {refreshAlgorithmList} = useContext(AlgorithmContext)


    function handleDetailsClick() {
        axios.get(`http://localhost:8082/api/algorithms/diagram/${id}`)
            .then((res) => {
                setDiagramBlockList(res.data)
                setIsDetailsButtonClicked(!isDetailsButtonClicked)
            })
    }

    const handleEditAlgorithm = (id) => {
        navigate(`/algorithm-edition/${id}`)
    }

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete?')) {
            axios.delete(`http://localhost:8082/api/algorithms/${id}`)
                .then(refreshAlgorithmList)
        }
    }

    return (
        <div className="card mb-4" style={{background: "aliceblue"}}
             onClick={() => handleDetailsClick()}>
            <div className='d-flex flex-row justify-content-between'>
                <h2 className='card-title pt-4 px-4'> {name} </h2>
                <div className='card-header-tabs px-2'>
                    <button className='Item-top-button' onClick={() => handleEditAlgorithm(algorithm.id)}><FaEdit/></button>
                    <button className='Item-top-button' onClick={() => handleDelete(algorithm.id)}><FaTimes/></button>
                </div>
            </div>
            <div className='card-body px-4'>
                <pre style={{whiteSpace: 'pre-wrap', fontSize: 'larger', fontFamily: 'serif'}}>{description}</pre>
                <div className='d-flex flex-row justify-content-between' style={{color: 'grey'}}>
                    <div>Creation Date: {algorithm.dateCreated}</div>
                </div>
                {isDetailsButtonClicked &&
                    diagramBlockList.map((diagramBlock) => (
                        <div className="d-flex justify-content-center" >
                            <DiagramBlock key={diagramBlock.id}
                                          diagramBlock={diagramBlock}
                                          diagramSize={diagramBlockList.length}/>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default SingleAlgorithm;