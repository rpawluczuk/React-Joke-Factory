import React, {useState, useEffect} from 'react';
import axios from "axios";
import SingleAlgorithm from "components/mainpanel/algorithm/algorithmmainview/SingleAlgorithm";

const AlgorithmMainView = () => {

    const [algorithmList, setAlgorithmList] = useState([])

    useEffect(() => {
        refreshAlgorithmList()
    }, [])

    const refreshAlgorithmList = () => {
        axios.get(`http://localhost:8082/api/algorithms`).then((res) => {
            setAlgorithmList(res.data)
        });
    }

    if (!algorithmList || algorithmList.length === 0) {
        return (
            <div className='container'>
                <p className="text-center display-6 m-5 fw-bolder" style={{color: 'red'}}>No Algorithms</p>
            </div>
        )
    }

    return (
        <div className="container">
            <h1 className="text-center display-2 text-dark m-5 fw-bolder">
                List of Algorithms
            </h1>

            {algorithmList.map((algorithm) => (
                <SingleAlgorithm key={algorithm.id} algorithm={algorithm}/>
            ))}

        </div>
    );
};

export default AlgorithmMainView;