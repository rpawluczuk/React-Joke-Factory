import React, {useState} from 'react';
import {FaEdit, FaTimes} from "react-icons/all";
import {Button} from "react-bootstrap";
import axios from "axios";
import DiagramBlock from "components/mainpanel/algorithm/algorithmmainview/singlealgorithm/DiagramBlock";


const SingleAlgorithm = ({algorithm}) => {

    const {id, name, description} = algorithm;
    const [isDetailsButtonClicked, setIsDetailsButtonClicked] = useState(false)
    const [diagramBlockList, setDiagramBlockList] = useState([])


    function handleDetailsClick() {
        axios.get(`http://localhost:8082/api/algorithms/diagram/${id}`)
            .then((res) => {
                setDiagramBlockList(res.data)
                setIsDetailsButtonClicked(!isDetailsButtonClicked)
                console.log(res.data)
            })
    }

    return (
        <div className="card mb-4" style={{background: "aliceblue"}}>
            <div className='d-flex flex-row justify-content-between'>
                <h2 className='card-title pt-4 px-4'> {name} </h2>
                <div className='card-header-tabs px-2'>
                    <button className='Item-top-button'><FaEdit/></button>
                    <button className='Item-top-button'><FaTimes/></button>
                </div>
            </div>
            <div className='card-body px-4'>
                <pre style={{whiteSpace: 'pre-wrap', fontSize: 'larger', fontFamily: 'serif'}}>{description}</pre>
                <div className='d-flex justify-content-center mb-3'>
                    <Button variant="outline-primary" onClick={() => handleDetailsClick()}>Details</Button>
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