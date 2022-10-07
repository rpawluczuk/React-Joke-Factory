import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";
import TopicPanel from "components/mainpanel/commons/TopicPanel";
import TopicBlockType from "components/mainpanel/commons/topicpanel/topicpack/TopicBlockType";

const TopicEdition = () => {

    const [topicCreatorDto, setTopicCreatorDto] = useState({
        id: null,
        name: ''
    })

    const params = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8081/api/topics/${params.id}`).then((res) => {
            setTopicCreatorDto(res.data)
        })
    }, [])

    return(
        <div className="container">
            <p className="Data-header">Edit topic</p>
            <TopicPanel
                initialTopic={topicCreatorDto}
                initialTopicType={TopicBlockType.EDITOR}
            ></TopicPanel>
        </div>
    )
}

export default TopicEdition;