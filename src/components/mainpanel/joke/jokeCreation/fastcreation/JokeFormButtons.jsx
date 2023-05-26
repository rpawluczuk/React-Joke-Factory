import React from 'react';
import Button from 'react-bootstrap/Button';

const JokeFormButtons = ({ isBtnDisabled }) => {
    return (
        <div className="d-flex flex-row-reverse">
            <Button className="float-right mx-2" variant="success" type="submit" disabled={isBtnDisabled}>
                Save Joke
            </Button>
            <Button className="float-right mx-2" variant={"primary"}>
                Cancel
            </Button>
        </div>
    );
};

export default JokeFormButtons;