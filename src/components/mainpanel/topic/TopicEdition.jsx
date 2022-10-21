import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import TopicPanel from "components/mainpanel/commons/TopicPanel";
import TopicBlockType from "components/mainpanel/commons/topicpanel/topicpack/TopicBlockType";
import axios from "axios";

const TopicEdition = () => {

    const [initialTopic, setInitialTopic] = useState({})

    useEffect(() => {
        axios.get(`http://localhost:8081/api/topics/${params.id}`).then((res) => {
            setInitialTopic(res.data)
        })
    }, [])

    const params = useParams();

    return(
        <div className="container">
            <p className="Data-header">Edit topic</p>
            <TopicPanel
                initialTopic={initialTopic}
                initialTopicType={TopicBlockType.EDITOR}
            ></TopicPanel>
        </div>
    )
}

export default TopicEdition;