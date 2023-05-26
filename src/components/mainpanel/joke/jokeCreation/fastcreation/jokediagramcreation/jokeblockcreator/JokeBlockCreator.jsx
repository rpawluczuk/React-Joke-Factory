import React from 'react';
import {Form} from "react-bootstrap";

const JokeBlockCreator = (props) => {

    const {jokeBlock, onJokeSnippetChange} = props;

    return (
        <div className="p-2 jokeBlock">
            <div className="d-flex flex-row justify-content-center">
                <h3>{jokeBlock.title}</h3>
            </div>
            <div className="d-flex flex-row">
                <div className="col-6 px-2">
                    <Form.Control as="textarea"
                                  rows={6}
                                  onChange={(e) => onJokeSnippetChange(e.target.value)}
                                  value={jokeBlock.jokeSnippet}
                                  placeholder="joke snippet"/>
                </div>
                <div className="px-2">
                        <pre style={{
                            whiteSpace: 'pre-wrap',
                            fontSize: 'larger',
                            fontFamily: 'serif'
                        }}>
                            {jokeBlock.description}
                        </pre>
                </div>
            </div>
        </div>
    );
};

export default JokeBlockCreator;