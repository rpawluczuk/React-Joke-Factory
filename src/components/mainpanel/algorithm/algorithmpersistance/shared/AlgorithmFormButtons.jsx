import React from 'react';
import Button from 'react-bootstrap/Button';

const AlgorithmFormButtons = ({ isBtnDisabled }) => {
    return (
        <div className="d-flex flex-row-reverse">
            <Button className="float-right mx-2" variant="success" type="submit" disabled={isBtnDisabled}>
                Save Algorithm
            </Button>
            <Button className="float-right mx-2" variant={"primary"}>
                Cancel
            </Button>
        </div>
    );
};

export default AlgorithmFormButtons;