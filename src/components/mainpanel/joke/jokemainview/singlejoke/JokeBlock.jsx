import React from 'react';

const JokeBlock = ({jokeBlock}) => {
    return (
        <div className="p-2 jokeBlock">
            <div className="d-flex flex-row justify-content-center">
                <h3>{jokeBlock.title}</h3>
            </div>
            <div className="d-flex flex-row">
                <div className="jokeSnippet col-6 px-2">
                         <pre style={{
                             whiteSpace: 'pre-wrap',
                             fontSize: 'larger',
                             fontFamily: 'serif'
                         }}>
                            {jokeBlock.jokeSnippet}
                         </pre>
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

export default JokeBlock;