import React from 'react';
import "components/mainpanel/algorithm/algorithmcreation/diagramcreation/DiagramBlockCreator.css";
import {FaWindowClose} from "react-icons/all";
import {Form, FormGroup} from "react-bootstrap";


const DiagramBlockCreator = (props) => {

    const {diagramBlock, onDelete, onDiagramBlockChange} = props;

    function handleTitleChange(event) {
        onDiagramBlockChange({...diagramBlock, title: event.target.value});
    }

    function handleDescriptionChange(event) {
        onDiagramBlockChange({...diagramBlock, description: event.target.value});
    }

    return (
        <div className="d-flex flex-column DiagramBlockCreator">
            <div className="d-flex flex-row justify-content-end">
                <FaWindowClose onClick={() => onDelete()} style={{fontSize: "26px"}}/>
            </div>
            <FormGroup className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control onChange={handleTitleChange}
                              type="text"
                              value={diagramBlock.title}
                              placeholder="Title"/>
            </FormGroup>
            <FormGroup className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control onChange={handleDescriptionChange}
                              as="textarea"
                              rows={6}
                              value={diagramBlock.description}
                              placeholder="Description"/>
            </FormGroup>
        </div>

    );
};

export default DiagramBlockCreator;