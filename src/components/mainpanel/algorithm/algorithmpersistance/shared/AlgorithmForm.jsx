import React from 'react';
import { Form, FormGroup } from 'react-bootstrap';

const AlgorithmForm = ({ algorithmDto, handleNameChange, handleDescriptionChange, nameMessage }) => {
    return (
        <>
            <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Title"
                    onChange={handleNameChange}
                    value={algorithmDto.name}
                />
                {nameMessage && <div className='Validation-message'>{nameMessage}</div>}
            </Form.Group>
            <FormGroup className="mb-3">
                <Form.Label>Content</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={6}
                    onChange={handleDescriptionChange}
                    value={algorithmDto.description}
                    placeholder="content"
                />
            </FormGroup>
        </>
    );
};

export default AlgorithmForm;