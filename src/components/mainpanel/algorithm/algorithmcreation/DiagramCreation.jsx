import React from "react";
import DiagramBlockCreator from "components/mainpanel/algorithm/algorithmcreation/diagramcreation/DiagramBlockCreator";
import {FaArrowDown} from "react-icons/all";

const DiagramCreation = ({ diagramBlockList, setDiagramBlockList }) => {

    function handleArrowClick(index) {
        const newBlock = { title: "", description: "", position: diagramBlockList[index].position + 1 };
        const newList = [...diagramBlockList];
        newList.splice(index + 1, 0, newBlock);
        for (let i = index + 2; i < newList.length; i++) {
            newList[i].position++;
        }
        setDiagramBlockList(newList);
    }

    function handleDeleteBlock(index) {
        const newList = [...diagramBlockList];
        newList.splice(index, 1);
        for (let i = index; i < newList.length; i++) {
            newList[i].position--;
        }
        setDiagramBlockList(newList);
    }

    function handleDiagramBlockChange(index, updatedDiagramBlock) {
        const newList = [...diagramBlockList];
        newList[index] = updatedDiagramBlock;
        setDiagramBlockList(newList);
    }

    return (
        <div className="col-6 p-4">
            {diagramBlockList.map((diagramBlock, index) => (
                <div className="container d-flex flex-column align-items-center">
                    <DiagramBlockCreator
                        diagramBlock={diagramBlock}
                        onDelete={() => handleDeleteBlock(index)}
                        onDiagramBlockChange={(updatedDiagramBlock) => handleDiagramBlockChange(index, updatedDiagramBlock)}
                    />
                    <div className="d-flex flex-column justify-content-center">
                        <FaArrowDown style={{fontSize: "52px"}}
                                     onClick={() => handleArrowClick(index)}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DiagramCreation;