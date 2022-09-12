import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import TopicBlock from "components/mainpanel/commons/topicpanel/topicpack/TopicBlock";
import TopicPanel from "components/mainpanel/commons/TopicPanel";

const TopicEdition = () => {

    const [topicCreatorDto, setTopicCreatorDto] = useState({
        id: null,
        name: ''
    })

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8081/api/topics/${params.id}`).then((res) => {
            setTopicCreatorDto(res.data)
        })
    }, [])

    return(
        <div className="container">
            <div className="d-flex flex-column align-items-center">
                <TopicBlock
                    key={topicCreatorDto.id}
                    topicProp={topicCreatorDto}
                    showChildren={false}>
                </TopicBlock>
            </div>
            <TopicPanel
                initialTopicId={topicCreatorDto.id}
            ></TopicPanel>
        </div>
    )
}

export default TopicEdition;