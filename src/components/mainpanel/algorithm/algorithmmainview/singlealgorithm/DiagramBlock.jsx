import React from 'react';
import "components/mainpanel/algorithm/algorithmmainview/singlealgorithm/DiagramBlock.css";
import {FaLongArrowAltDown} from "react-icons/fa";

const DiagramBlock = (props) => {

    const {diagramBlock, diagramSize} = props;

    return (
        <div className="d-flex flex-column justify-content-center">
            <div className="p-3 standardBlock">
                <h3>{diagramBlock.title}</h3>
                <pre style={{whiteSpace: 'pre-wrap', fontSize: 'larger', fontFamily: 'serif'}}>
                {diagramBlock.description}
            </pre>
            </div>
            {diagramBlock.position + 1 !== diagramSize && (
                <div className="d-flex justify-content-center">
                    <FaLongArrowAltDown style={{fontSize: "52px"}}/>
                </div>
            )}
        </div>
    );
};

export default DiagramBlock;