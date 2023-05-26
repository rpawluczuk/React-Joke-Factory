import React from 'react';
import JokeBlockCreator from "components/mainpanel/joke/jokeCreation/fastcreation/jokediagramcreation/jokeblockcreator/JokeBlockCreator";
import {FaArrowDown} from "react-icons/all";

const JokeDiagramCreation = ({jokeBlockList, onJokeSnippetChange}) => {


    return (
        <>
            {jokeBlockList.map((jokeBlock, index) => (
                <div key={jokeBlock.algorithmId + "-" + jokeBlock.position} className="d-flex flex-column align-items-center">
                    <JokeBlockCreator
                        jokeBlock={jokeBlock}
                        onJokeSnippetChange={(newJokeSnippet) => onJokeSnippetChange(jokeBlock.algorithmId, jokeBlock.position, newJokeSnippet)}
                    />
                    {index !== jokeBlockList.length - 1 &&
                        <div className="d-flex flex-column justify-content-center">
                            <FaArrowDown style={{fontSize: "52px"}}/>
                        </div>
                    }
                </div>

            ))}
        </>
    );
};

export default JokeDiagramCreation;