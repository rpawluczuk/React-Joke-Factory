import React from 'react';
import ReactPaginate from "react-paginate";
import JokeDiagramCreation
    from "components/mainpanel/joke/jokeCreation/fastcreation/jokediagramcreation/JokeDiagramCreation";

const AlgorithmPanel = (props) => {

    const {
        algorithmItemList,
        currentAlgorithmItemIndex,
        onCurrentAlgorithmItemIndexChange,
        jokeBlockList,
        onJokeBlockListChange,
        onJokeSnippetChange
    } = props

    return (
        <div className="container d-flex flex-column align-items-center">
            <ReactPaginate
                previousLabel="< previous"
                nextLabel="next >"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                pageCount={algorithmItemList.length}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={e => onCurrentAlgorithmItemIndexChange(e.selected)}
                containerClassName="pagination"
                activeClassName="active"
                forcePage={currentAlgorithmItemIndex}
                renderOnZeroPageCount={null}
            />
            <h2>{algorithmItemList[currentAlgorithmItemIndex]
                && algorithmItemList[currentAlgorithmItemIndex].label}</h2>
            <JokeDiagramCreation
                jokeBlockList={jokeBlockList.filter(jokeBlock =>
                    jokeBlock.algorithmId === algorithmItemList[currentAlgorithmItemIndex].value)}
                setJokeBlockList={onJokeBlockListChange}
                onJokeSnippetChange={onJokeSnippetChange}
            />
        </div>
    );
};

export default AlgorithmPanel;